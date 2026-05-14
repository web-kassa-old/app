/**
 * POS Noir Backend - v5.4.1 (Staff Edition + Fixes)
 */

const SS = SpreadsheetApp.getActiveSpreadsheet();

function getAppConfig() {
  const dash = SS.getSheetByName("Dashboard");
  let cfg = { staff: [], folderId: "" };
  if (dash) {
    const staffData = dash.getRange("O2:Q22").getValues();
    cfg.staff = staffData.filter(r => r[0] !== "" && r[2] !== "").map(r => ({
      uid: r[0].toString(),
      name: r[1].toString(),
      pin: r[2].toString(),
      role: r[0].toString().startsWith('M') ? 'manager' : 'seller'
    }));
    cfg.folderId = dash.getRange("N1").getValue().toString().trim();
  }
  return cfg;
}

function dateStrToTs(dStr) {
  if (!dStr) return 0;
  let p = dStr.split('.');
  if (p.length !== 3) return 0;
  return new Date(p[2], p[1]-1, p[0]).getTime();
}

function doGet(e) {
  try {
    const config = getAppConfig();
    
    // --- ЛОГИКА ОТЧЕТОВ ВОЗВРАЩЕНА ---
    if (e && e.parameter && e.parameter.action === 'report') {
      const sheetTx = SS.getSheetByName("Transactions");
      const dateStartReq = e.parameter.date ? e.parameter.date.replace(/[^\d\.]/g, '') : "";
      const dateEndReq = e.parameter.endDate ? e.parameter.endDate.replace(/[^\d\.]/g, '') : dateStartReq;
      
      const tsStart = dateStrToTs(dateStartReq);
      const tsEnd = dateStrToTs(dateEndReq);
      const sellerIdReq = e.parameter.seller_id; // Запрос чеков конкретного продавца

      const lastRow = getTrueLastRow(sheetTx);
      let reportData = [];
      
      if (lastRow >= 3) {
        // Читаем 17 колонок (до Q), так как в Q лежит seller_id
        const data = sheetTx.getRange(3, 1, lastRow - 2, 17).getValues();
        let receiptsMap = {};
        
        for (let i = 0; i < data.length; i++) {
          let row = data[i];
          let strDate = "";
          let timeStr = "";
          
          if (row[0] instanceof Date) {
            strDate = Utilities.formatDate(row[0], "Asia/Almaty", "dd.MM.yyyy");
            timeStr = Utilities.formatDate(row[0], "Asia/Almaty", "HH:mm");
          } else {
            let cleanRaw = String(row[0]).replace(/[^\d\.\:\s]/g, '').trim();
            strDate = cleanRaw.split(' ')[0] || ""; 
            timeStr = cleanRaw.split(' ')[1] ? cleanRaw.split(' ')[1].substring(0, 5) : "";
          }

          let rowTs = dateStrToTs(strDate);
          let rowSellerId = row[16] ? row[16].toString() : ""; // 16 индекс = колонка Q

          // Проверка периода
          if (rowTs >= tsStart && rowTs <= tsEnd && rowTs !== 0) {
            // Если запрошен конкретный кассир, пропускаем чужие чеки
            if (sellerIdReq && rowSellerId !== sellerIdReq) {
              continue;
            }

            let tid = row[1];
            if (!receiptsMap[tid]) {
               receiptsMap[tid] = { 
                 type: row[2], 
                 total: 0, 
                 cart: [],
                 methodCode: row[11] || "cash", 
                 time: timeStr,
                 date: strDate
               };
            }
            let qty = Number(row[5]) || 0;
            let price = Number(row[6]) || 0;
            receiptsMap[tid].cart.push({ name: row[4], qty: qty, price: price });
            receiptsMap[tid].total += (qty * price);
          }
        }
        reportData = Object.keys(receiptsMap).map(key => receiptsMap[key]);
      }
      return ContentService.createTextOutput(JSON.stringify({ report: reportData })).setMimeType(ContentService.MimeType.JSON);
    }

    // --- ОБЫЧНАЯ ЗАГРУЗКА ТОВАРОВ ---
    const sheetItems = SS.getSheetByName("Items");
    const totalsData = sheetItems.getRange("M2:Q2").getValues()[0];
    const lastRowItems = getTrueLastRow(sheetItems);
    
    let items = [];
    if (lastRowItems >= 3) {
      const data = sheetItems.getRange(3, 1, lastRowItems - 2, 11).getValues();
      items = data.map(row => ({
        id: row[0].toString(), name: row[1], category: row[2],
        barcode: row[3], stock: row[4], cost: row[5],
        price: row[6], img: row[10] || ""
      })).filter(i => i.id !== "");
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      items: items, 
      staff: config.staff, 
      totals: { cash: totalsData[0], qr: totalsData[1], pos: totalsData[2], transfer: totalsData[3], red: totalsData[4] }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ error: e.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const p = JSON.parse(e.postData.contents);
    
    if (p.action === 'upload_photo') {
      const folder = DriveApp.getFolderById(getAppConfig().folderId);
      const contentType = p.base64.split(',')[0].split(':')[1].split(';')[0];
      const blob = Utilities.newBlob(Utilities.base64Decode(p.base64.split(',')[1]), contentType, p.filename);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const url = 'https://drive.google.com/uc?export=view&id=' + file.getId();
      
      const sheetItems = SS.getSheetByName("Items");
      const ids = sheetItems.getRange(3, 1, getTrueLastRow(sheetItems)-2, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (ids[i][0].toString() === p.item_id.toString()) {
          sheetItems.getRange(i + 3, 11).setValue(url);
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true, url: url })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheetTx = SS.getSheetByName("Transactions");
    const ts = Utilities.formatDate(new Date(), "Asia/Almaty", "dd.MM.yyyy HH:mm:ss");
    
    let rows = p.cart.map(c => {
      let row = new Array(17).fill(""); 
      row[0] = ts;
      row[1] = p.tx_id;
      row[2] = p.tx_type;
      row[3] = c.item_id;
      row[4] = c.item_name;
      row[5] = c.qty;
      row[6] = c.price;
      row[8] = c.cost_price;
      row[10] = "Клиент";
      row[11] = p.payment_method;
      row[13] = p.source;
      row[16] = p.seller_id; // Пишем ID продавца в Q
      return row;
    });

    if (rows.length > 0) {
      const lr = getTrueLastRow(sheetTx);
      sheetTx.getRange(lr + 1, 1, rows.length, 17).setValues(rows);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getTrueLastRow(sheet) {
  const values = sheet.getRange("A:A").getValues();
  let lastRow = values.length;
  while (lastRow > 0 && !values[lastRow - 1][0]) { lastRow--; }
  return lastRow;
}