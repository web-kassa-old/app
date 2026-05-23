function processIncomes(payload) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const db = getDB(); 
    const sheetItems = db.getSheetByName("Items");
    const sheetIncomes = db.getSheetByName("Incomes");
    const sheetShipments = db.getSheetByName("Shipments"); 

    const incomesData = payload.data;
    const reqCurrency = payload.currency || "USD"; 
    
    // --- 0. ЗАЩИТА ОТ ДУБЛИКАТОВ ---
    if (incomesData.length > 0 && sheetShipments) {
        const docNo = incomesData[0].doc_no;
        const dataShipments = sheetShipments.getDataRange().getValues();
        const exists = dataShipments.some(row => row[0] && row[0].toString() === docNo.toString());
        if (exists) {
            return { success: false, error: `Накладная с номером ${docNo} уже была проведена ранее!` };
        }
    }

    const ts = Utilities.formatDate(new Date(), "Asia/Almaty", "dd.MM.yyyy HH:mm:ss");
    const cfg = getAppConfig();

    // --- 1. СОХРАНЕНИЕ ОРИГИНАЛОВ В УМНЫЕ ПАПКИ НА ДИСКЕ ---
    let folderUrl = "";
    if (payload.files && payload.files.length > 0) {
      let rootFolder;
      // 1.1 Пытаемся найти корень по ID из конфига
      if (cfg.invoiceFolderId) {
        try { rootFolder = DriveApp.getFolderById(cfg.invoiceFolderId); } catch(e) {}
      }
      // 1.2 Если не нашли, ищем по имени "POS_Noir_Invoices" или создаем
      if (!rootFolder) {
        const folders = DriveApp.getFoldersByName("POS_Noir_Invoices");
        if (folders.hasNext()) rootFolder = folders.next();
        else rootFolder = DriveApp.createFolder("POS_Noir_Invoices");
      }
      
      // 1.3 Папка Года (например, "2026")
      const currentYear = new Date().getFullYear().toString();
      let yearFolder;
      const yearFolders = rootFolder.getFoldersByName(currentYear);
      if (yearFolders.hasNext()) {
        yearFolder = yearFolders.next();
      } else {
        yearFolder = rootFolder.createFolder(currentYear);
      }
      
      // 1.4 Папка конкретного Инвойса
      const invoiceName = (payload.docNo || "UNKNOWN_INVOICE").toString().trim().replace(/[\\/:*?"<>|]/g, "_");
      let invoiceFolder;
      const invFolders = yearFolder.getFoldersByName(invoiceName);
      if (invFolders.hasNext()) {
        invoiceFolder = invFolders.next();
      } else {
        invoiceFolder = yearFolder.createFolder(invoiceName);
      }
      
      // 1.5 Сохраняем все переданные оригиналы файлов в эту папку
      for (let i = 0; i < payload.files.length; i++) {
        const fileObj = payload.files[i];
        try {
          const contentType = fileObj.fileBase64.split(',')[0].split(':')[1].split(';')[0];
          const b64Data = fileObj.fileBase64.split(',')[1];
          const blob = Utilities.newBlob(Utilities.base64Decode(b64Data), contentType, fileObj.fileName);
          invoiceFolder.createFile(blob);
        } catch(err) {
          Logger.log("Ошибка сохранения файла " + fileObj.fileName + ": " + err.message);
        }
      }
      
      // Ссылка на созданную папку пойдет в базу данных!
      folderUrl = invoiceFolder.getUrl();
    }

    // --- 2. ОБРАБОТКА НОВЫХ ТОВАРОВ ---
    const lastRowItems = Math.max(1, sheetItems.getLastRow());
    const existingIds = lastRowItems > 1 ? sheetItems.getRange(2, 1, lastRowItems - 1, 1).getValues().flat().map(String) : [];

    let newItems = [];
    for (let j = 0; j < incomesData.length; j++) {
       let incId = (incomesData[j].item_id || "").toString().trim();
       if (!existingIds.includes(incId) && !newItems.find(n => n[0] === incId)) {
          newItems.push([incId, incomesData[j].item_name, "НОВЫЙ (ИМПОРТ)", ""]);
       }
    }

    if (newItems.length > 0) {
        let itemVals = sheetItems.getRange("A:A").getValues();
        let realLastRow = 2;
        for (let i = itemVals.length - 1; i >= 0; i--) {
            if (itemVals[i][0] !== "") { realLastRow = i + 2; break; }
        }
        sheetItems.getRange(realLastRow, 1, newItems.length, 4).setValues(newItems);
    }

    // --- 3. ЗАПИСЬ ЧИСТЫХ ДАННЫХ В INCOMES ---
    let incVals = sheetIncomes.getRange("A:A").getValues();
    let incLastRow = 4; 
    for (let i = incVals.length - 1; i >= 0; i--) {
        if (incVals[i][0] !== "") { incLastRow = i + 2; break; }
    }
    if (incLastRow < 4) incLastRow = 4;

    let colA_F = []; 
    let colI_K = []; 
    let colM = [];   
    let colO = [];   

    for (let i = 0; i < incomesData.length; i++) {
       let inc = incomesData[i];
       colA_F.push([ts, inc.doc_no, inc.supplier, inc.item_id, inc.item_name, inc.qty]);
       colI_K.push([inc.staff_id, "Completed", inc.cost]);
       colM.push([cfg.defaultVat]); 
       colO.push([folderUrl]); // <--- Теперь тут будет ссылка на папку инвойса
    }

    sheetIncomes.getRange(incLastRow, 1, incomesData.length, 6).setValues(colA_F); 
    sheetIncomes.getRange(incLastRow, 9, incomesData.length, 3).setValues(colI_K); 
    sheetIncomes.getRange(incLastRow, 13, incomesData.length, 1).setValues(colM);  
    sheetIncomes.getRange(incLastRow, 15, incomesData.length, 1).setValues(colO);  

    // --- 4. РАЗМНОЖЕНИЕ ЭТАЛОННЫХ ФОРМУЛ ИЗ 1-Й СТРОКИ ---
    sheetIncomes.getRange("G1:H1").copyTo(sheetIncomes.getRange(incLastRow, 7, incomesData.length, 2), SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);
    sheetIncomes.getRange("L1").copyTo(sheetIncomes.getRange(incLastRow, 12, incomesData.length, 1), SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);
    sheetIncomes.getRange("N1").copyTo(sheetIncomes.getRange(incLastRow, 14, incomesData.length, 1), SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);

    // --- 5. СТРОКА В Shipments (КУРС + ВАЛЮТА) ---
    if (incomesData.length > 0 && sheetShipments) {
        const docNo = incomesData[0].doc_no;
        let shipVals = sheetShipments.getRange("A:A").getValues();
        let shipLastRow = 2;
        for (let i = shipVals.length - 1; i >= 0; i--) {
            if (shipVals[i][0] !== "") { shipLastRow = i + 2; break; }
        }
        
        const todayRate = getLatestExchangeRate(reqCurrency);
        
        sheetShipments.getRange(shipLastRow, 1, 1, 7).setValues([[
            docNo, ts, todayRate, 0, 0, 0, 0
        ]]);
        sheetShipments.getRange(shipLastRow, 8, 1, 1).setFormulas([[`=SUM(D${shipLastRow}:G${shipLastRow})`]]);
        sheetShipments.getRange(shipLastRow, 9, 1, 1).setValue(reqCurrency);
    }

    return { success: true, fileUrl: folderUrl };
  } catch(e) { 
    return { success: false, error: e.toString() }; 
  } finally { 
    lock.releaseLock(); 
  }
}

function getLatestExchangeRate(baseCurrency) {
  if (baseCurrency === "KZT") return 1;
  try {
    const response = UrlFetchApp.fetch("https://open.er-api.com/v6/latest/" + baseCurrency);
    const json = JSON.parse(response.getContentText());
    if (json && json.rates && json.rates.KZT) return json.rates.KZT;
    return 1;
  } catch (e) {
    Logger.log("Ошибка API курсов: " + e.toString());
    return 1; 
  }
}