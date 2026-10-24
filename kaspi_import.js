// --- МОДУЛЬ УМНОЙ ПРИЕМКИ (ИНВОЙСЫ) ---selectImportMode
window.parsedInvoiceData = [];
window.invoiceGroups = {};

// Обработчик загрузки нового шаблона Kaspi при выборе "Новый шаблон"
document.addEventListener("change", function(e) {
    if (e.target && e.target.id === "kaspiTemplateSelect") {
        if (e.target.value === "new") {
            const modal = document.getElementById("newTemplateModal");
            if (modal) modal.style.display = "flex";
            e.target.value = ""; // Сбрасываем, чтобы можно было выбрать снова
        }
    }
});

function toggleIncomeModule() {
  const modal = document.getElementById("income-modal");

  // === ОЧИСТКА ПАМЯТИ МАТРЕШКИ ===
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.history = [];

  if (modal.style.display === "none" || modal.style.display === "") {
    // Принудительно включаем Шаг 1 перед открытием (true означает, что шаг не пишется в историю дублем)
    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(1, true);
    }
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

window.showComplexColumnSelector = function(headers, rows, templateData) {
    const overlay = document.createElement("div");
    overlay.className = "complex-overlay";
    overlay.id = "complexColsOverlay";

    const modal = document.createElement("div");
    modal.className = "complex-modal";

    // Умный поиск примера по ЧИСТЫМ строкам
    const getComplexExample = (colIdx) => {
        let bestVal = "";
        let maxScore = -1;
        
        for (let i = 0; i < rows.length; i++) {
            if (!rows[i]) continue;
            let val = String(rows[i][colIdx] || "").trim();
            if (!val) continue;
            
            let score = 0;
            // Ищем реальные признаки сложных параметров
            if (/[\/\\]/.test(val)) score += 50; // Слэши - главный маркер
            if (/[xXхХ*]/.test(val)) score += 40; // Габариты
            if (/[a-zA-Zа-яА-Я]/.test(val) && /[0-9]/.test(val)) score += 30; // Буквы + Цифры
            if (/\s/.test(val)) score += 20; // Пробелы
            score += val.length; 
            
            if (score > maxScore) {
                maxScore = score;
                bestVal = val;
            }
        }
        return bestVal;
    };

    let html = `<h3 class="complex-title" data-i18n="complex_title">Настройка сложных колонок</h3>`;
    html += `<p class="complex-desc" data-i18n="complex_desc">
                Отметьте галочкой колонки, в которых склеено несколько параметров (например, Габариты или Размер). 
                Остальные колонки скрипт загрузит напрямую.
             </p>`;

    html += `<div class="complex-list">`;
    
    headers.forEach((header, idx) => {
        let colName = header || `Колонка ${idx + 1}`;
        let sampleVal = getComplexExample(idx);
        
        if (sampleVal.length > 40) sampleVal = sampleVal.substring(0, 40) + "...";
        
        let displayVal = sampleVal 
            ? `<div class="complex-example"><span data-i18n="complex_example">Пример:</span> <span class="complex-tag">${sampleVal}</span></div>` 
            : `<div class="complex-example" style="opacity:0.5;" data-i18n="complex_empty">(Пустая колонка)</div>`;
        
        html += `
            <label class="complex-label">
                <input type="checkbox" class="complex-col-cb" value="${colName}">
                <div style="flex: 1;">
                    <div class="complex-name">${colName}</div>
                    ${displayVal}
                </div>
            </label>
        `;
    });

    html += `</div>`;
    html += `<div style="display:flex; justify-content:space-between; margin-top:20px;">
                <button id="btnComplexBack" class="complex-btn" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-main);" data-i18n="inc_back">🡠 НАЗАД</button>
                <button id="btnComplexNext" class="complex-btn" data-i18n="btn_next">ДАЛЕЕ ➔</button>
             </div>`;

    modal.innerHTML = html;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    if (typeof window.applyLanguage === "function") {
        window.applyLanguage();
    }

    // Обработчик кнопки НАЗАД
    document.getElementById("btnComplexBack").addEventListener("click", () => {
        document.body.removeChild(overlay);
        if (typeof window.navigateIncomeStep === "function") window.navigateIncomeStep(1);
    });

    // Обработчик кнопки ДАЛЕЕ
    document.getElementById("btnComplexNext").addEventListener("click", () => {
        const checkboxes = modal.querySelectorAll(".complex-col-cb:checked");
        const selected = Array.from(checkboxes).map(cb => cb.value);

        window.complexColumnsToTokenize = selected;
        window.mapper2State.lastComplexColumns = selected; 
        
        document.body.removeChild(overlay);

        if (selected.length > 0) {
            window.navigateIncomeStep("smart");
            if (typeof window.renderSmartMapper === "function") window.renderSmartMapper();
            else if (typeof window.initSmartMapper === "function") window.initSmartMapper();
        } else {
            window.navigateIncomeStep(2);
            if (typeof window.renderMapper2Cards === "function") window.renderMapper2Cards(templateData);
        }
    });
};

// 1. ЧТЕНИЕ ФАЙЛА И ПОИСК ТАБЛИЦЫ
window.processInvoiceFile = async function () {
  const fileInput = document.getElementById("invoiceFileInput");
  if (!fileInput || !fileInput.files.length)
    return alert(translations[currentLang]?.inc_no_file || "Выберите файл");

  // ⚡ 1. ЖЕСТКИЙ СБРОС СОСТОЯНИЯ (Лекарство от черных экранов при возврате "Назад")
  // Сохраняем только кэш словаря, а старые файлы, шапки и токены выжигаем под ноль
  const preservedDict = window.mapper2State?.dictValues || (typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : {});
  window.mapper2State = {
    dictValues: preservedDict
  };

  let templateData = null;

  if (window.currentImportMode === "kaspi") {
    const templateSelect = document.getElementById("kaspiTemplateSelect");
    const templateName = templateSelect ? templateSelect.value : "";
    if (!templateName)
      return alert("Пожалуйста, выберите шаблон Kaspi из списка!");

    window.kaspiTemplateCache = window.kaspiTemplateCache || {};

    if (window.kaspiTemplateCache[templateName]) {
      templateData = window.kaspiTemplateCache[templateName];
      window.showLoading("Чтение накладной...");
    } else {
      let tText = typeof translations !== "undefined" && translations[currentLang] && translations[currentLang].kaspi_download_tpl
          ? translations[currentLang].kaspi_download_tpl
          : "Скачивание структуры шаблона...";
      window.showLoading(tText);

      try {
        const payload = {
          action: "getKaspiTemplate",
          api_key: CLIENT_API_KEY,
          category: templateName,
        };
        const res = await window.smartFetch(GATEWAY_URL, payload);
        const headersRaw = res.headersJson || res.headers_json || res.headers;
        
        if (res && res.success && headersRaw) {
          templateData = typeof headersRaw === "string" ? JSON.parse(headersRaw) : headersRaw;
          if (res.memoryJson) templateData.memoryJson = res.memoryJson;
          window.kaspiTemplateCache[templateName] = templateData;
        } else {
          throw new Error("Структура шапок пустая");
        }
      } catch (err) {
        window.hideLoading();
        return alert("Ошибка загрузки шаблона: " + err.message);
      }
    }
  } else {
    window.showLoading("Чтение накладной...");
  }

  try {
    const file = fileInput.files[0];
    window.mapper2State.fileName = file.name;

    const b64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    window.mapper2State.originalBase64 = await b64Promise;

    const dataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.readAsArrayBuffer(file);
    });
    const arrayBuffer = await dataPromise;

    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    let rows = [];
    for (let sName of workbook.SheetNames) {
      let sRows = XLSX.utils.sheet_to_json(workbook.Sheets[sName], { header: 1 });
      if (sRows && sRows.length > 0) {
        rows = sRows;
        break;
      }
    }
    if (rows.length === 0) throw new Error("Пустой файл");

    let file_doc_no = "UNKNOWN";
    let file_supplier = "UNKNOWN";
    let dict = window.mapper2State.dictValues;
    
    let supSyns = [].concat(dict["Поиск имени поставщика"] || [], dict["supplier_keywords"] || [], ["supplier", "vendor", "the seller", "поставщик"])
      .map((s) => String(s).replace(/\s+/g, "").toLowerCase()).filter(Boolean);
      
    let docSyns = [].concat(dict["Номер накладной"] || [], dict["invoice_no"] || [], ["invoice no", "invoice", "doc", "инвойс", "№ накл"])
      .map((s) => String(s).replace(/\s+/g, "").toLowerCase()).filter(Boolean);

    for (let i = 0; i < Math.min(15, rows.length); i++) {
      let row = rows[i] || [];
      for (let j = 0; j < row.length; j++) {
        let rawCell = String(row[j] || "").trim();
        let cleanCell = rawCell.toLowerCase().replace(/\s+/g, "");
        if (!cleanCell) continue;

        if (supSyns.some((syn) => cleanCell.includes(syn))) {
          if (rawCell.includes(":")) {
            let parts = rawCell.split(":");
            if (parts[1] && parts[1].trim()) file_supplier = parts[1].trim().replace(/^"|"$/g, "");
          }
          if (file_supplier === "UNKNOWN") {
            for (let k = j + 1; k < row.length; k++) {
              if (row[k] && String(row[k]).trim() !== "") {
                file_supplier = String(row[k]).trim().replace(/^"|"$/g, "");
                break;
              }
            }
          }
        }

        if (docSyns.some((syn) => cleanCell.includes(syn))) {
          if (rawCell.includes(":")) {
            let parts = rawCell.split(":");
            if (parts[1] && parts[1].trim()) file_doc_no = parts[1].trim().replace(/^"|"$/g, "");
          }
          if (file_doc_no === "UNKNOWN" || file_doc_no === "") {
            let val = String(row[j + 1] || "").trim();
            if (val && val !== "UNKNOWN") file_doc_no = val;
          }
        }
      }
    }

    window.mapper2State.supplier = file_supplier !== "UNKNOWN" ? file_supplier : "Не указан";
    if (file_doc_no !== "UNKNOWN" && file_doc_no !== "") {
      window.mapper2State.docNo = file_doc_no;
    } else {
      let now = new Date();
      window.mapper2State.docNo = `IN-${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    }

    let firstDataRowIdx = -1;
    for (let i = 0; i < Math.min(50, rows.length); i++) {
      let row = rows[i] || [];
      let numCount = row.filter((c) => {
        let val = String(c).trim().replace(/,/g, "");
        return val !== "" && !isNaN(Number(val));
      }).length;
      if (numCount >= 2 && !String(row[0] || "").toUpperCase().includes("TOTAL")) {
        firstDataRowIdx = i;
        break;
      }
    }

    if (firstDataRowIdx > 0) {
      let rawHeaders = rows[firstDataRowIdx - 1] || [];
      window.mapper2State.invoiceHeaders = rawHeaders.map((h) => String(h || "").replace(/[\r\n]+/g, " ").trim());
      window.mapper2State.invoiceRows = rows.slice(firstDataRowIdx);

      // 🔥 АВТО-ОПРЕДЕЛЕНИЕ КОЛОНОК (Используем твой глобальный словарь invoiceSynonyms)
      let globalSyns = typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : {};
      let headersToSearch = window.mapper2State.invoiceHeaders.map(h => String(h).toLowerCase().replace(/\s+/g, ""));

      // Ищем колонку по системному ключу (sysKey) или запасным вариантам
      const findCol = (keys, fallbacks) => {
          let syns = [];
          keys.forEach(k => {
              if (globalSyns[k]) syns = syns.concat(globalSyns[k]);
          });
          syns = syns.concat(fallbacks).map(s => String(s).toLowerCase().replace(/\s+/g, "")).filter(Boolean);
          return headersToSearch.findIndex(h => syns.some(syn => h.includes(syn)));
      };

      // Ищем индексы, используя системные ключи из твоей конфигурации (price, barcode, name)
      let priceIdx = findCol(["price", "Розничная цена", "Закупочная цена"], ["usd", "цена", "стоимость", "amount"]);
      let idIdx = findCol(["barcode", "Артикул / Код товара", "id", "code"], ["артикул", "штрихкод"]);
      let nameIdx = findCol(["name", "Бренд / Производитель", "Наименование товара"], ["brand", "бренд", "наименование", "товар"]);

      // Запускаем 2-факторную очистку, если нашли Цену и хотя бы один идентификатор (Артикул или Название)
      if (priceIdx !== -1 && (idIdx !== -1 || nameIdx !== -1)) {
          window.mapper2State.invoiceRows = window.mapper2State.invoiceRows.filter(row => {
              if (!row || row.length === 0) return false;

              let isEmpty = row.every(cell => String(cell || "").trim() === "");
              if (isEmpty) return false;

              // Фактор 1: Цена > 0
              let rawPrice = String(row[priceIdx] || "").replace(",", ".").replace(/[^0-9.-]/g, "");
              let price = parseFloat(rawPrice);
              if (isNaN(price) || price <= 0) return false; 

              // Фактор 2: Наличие Идентификатора (Артикула ИЛИ Названия/Бренда)
              let rawId = idIdx !== -1 ? String(row[idIdx] || "").trim() : "";
              let rawName = nameIdx !== -1 ? String(row[nameIdx] || "").trim() : "";
              let hasIdentifier = rawId !== "" || rawName !== "";
              
              if (!hasIdentifier) return false;

              // Фактор 3: Защита от смещения "TOTAL AMOUNT" в рабочие колонки
              if (rawId.toUpperCase().includes("TOTAL") || rawName.toUpperCase().includes("TOTAL")) {
                  return false; 
              }

              return true; 
          });
      }

      let fileContentStr = window.mapper2State.docNo + "_" + window.mapper2State.supplier + "_" + JSON.stringify(window.mapper2State.invoiceRows.slice(0, 5));
      let hashNum = 0;
      for (let i = 0; i < fileContentStr.length; i++) {
        hashNum = (hashNum << 5) - hashNum + fileContentStr.charCodeAt(i);
        hashNum |= 0;
      }
      window.mapper2State.fileHash = "hash_" + Math.abs(hashNum).toString(16);

      window.hideLoading();
      window.currentTemplateData = templateData;

      let smartHeaders = window.mapper2State.invoiceHeaders || [];
      let smartRows = window.mapper2State.invoiceRows || [];

      // Вызываем модалку, передавая идеально чистую таблицу!
      window.showComplexColumnSelector(smartHeaders, smartRows, templateData);
    } else {
      throw new Error("Не удалось найти таблицу с товарами");
    }
  } catch (err) {
    window.hideLoading();
    console.error(err);
    alert("Ошибка обработки: " + err.message);
  }
};

// === РОУТЕР ШАГОВ ПРИЕМКИ (ОБНОВЛЕННЫЙ) ===
window.navigateIncomeStep = function (stepNumber, isBack = false) {

  // 1. Ведем запись в историю (если идем вперед)
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.history = window.mapper2State.history || [];

  if (!isBack) {
    const lastStep = window.mapper2State.history[window.mapper2State.history.length - 1];
    if (lastStep !== stepNumber) {
      window.mapper2State.history.push(stepNumber);
    }
  }

  // 2. Находим контейнеры экранов
  const step1 = document.getElementById("uploadStepArea");
  const step2 = document.getElementById("mapper2Area");
  const step3 = document.getElementById("invoicePreviewArea");
  const tabs = document.getElementById("mapperTabsContainer");
  const currency = document.getElementById("mapperCurrencyBlock");
  const smartContainer = document.getElementById("smartMapperContainer");

  // 3. Скрываем абсолютно ВСЕ слои перед отрисовкой нужного
  if (step1) step1.style.display = "none";
  if (step2) step2.style.display = "none";
  if (step3) step3.style.display = "none";
  if (smartContainer) {
    smartContainer.className = "";
    smartContainer.innerHTML = "";
    smartContainer.style.display = "none"; // ⚡ Надежно скрываем
  }

  // 4. Показываем запрошенный шаг
  if (stepNumber === 1 && step1) {
    step1.style.display = "block";

    if (tabs) tabs.style.display = "flex";
    if (currency) currency.style.display = "flex";

    const importMode = document.getElementById("importModeContainer");
    if (importMode) importMode.style.display = "block";

    const parseBtn = document.getElementById("parseInvoiceBtn");
    if (parseBtn) parseBtn.style.display = "block";

    const uploadWrapper = document.getElementById("invoiceUploadWrapper");
    if (uploadWrapper) {
      uploadWrapper.style.display = "block";
      uploadWrapper.style.opacity = "1";
      uploadWrapper.style.pointerEvents = "auto";
    }
  } else if (stepNumber === "smart") {
    // Включаем Умное сито (Токенизатор)
    if (tabs) tabs.style.display = "none";
    if (currency) currency.style.display = "none";

    if (smartContainer) {
      smartContainer.style.display = "flex"; // ⚡ Принудительно делаем видимым!
      smartContainer.className = "smart-mapper-overlay";
      
      // Вызываем отрисовку
      if (window.renderSmartMapperModal && window.mapper2State.lastComplexColumns) {
        window.renderSmartMapperModal(window.mapper2State.lastComplexColumns);
      } else if (typeof window.initSmartMapper === "function") {
        window.initSmartMapper();
      }
    }
  } else if (stepNumber === 2 && step2) {
    // Включаем Маппер (Шаг 2)
    step2.style.display = "flex";
    if (tabs) tabs.style.display = "none";
    if (currency) currency.style.display = "none";
    
    // ⚡ ПРИНУДИТЕЛЬНАЯ ОТРИСОВКА МАППЕРА ПРИ ВОЗВРАТЕ
    if (typeof window.renderMapper2Cards === "function" && window.currentTemplateData) {
      window.renderMapper2Cards(window.currentTemplateData);
    }
  } else if (stepNumber === 3 && step3) {
    step3.style.display = "flex";
    if (tabs) tabs.style.display = "none";
    if (currency) currency.style.display = "none";
  }
};

// Универсальная функция возврата
window.navigateBack = function () {
  window.mapper2State = window.mapper2State || {};
  let history = window.mapper2State.history || [];

  // Вычеркиваем текущий шаг (например, 'smart')
  if (history.length > 0) {
    history.pop();
  }

  // Смотрим, куда возвращаться
  if (history.length > 0) {
    const previousStep = history[history.length - 1];
    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(previousStep, true);
    }
  } else {
    // Если история пуста, принудительно возвращаемся на стартовый Шаг 1
    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(1, true);
    }
  }
};

// 2. ОТРИСОВКА КАРТОЧЕК НА ГЛАВНОМ ЭКРАНЕ
window.renderMapper2Cards = function (templateData) {
  // === КЭШИРОВАНИЕ ДАННЫХ ===
  // Запоминаем данные при первом вызове, чтобы перерисовка работала при вызове без аргументов
  if (templateData) {
    window.lastTemplateData = templateData;
  } else {
    templateData = window.lastTemplateData || {};
  }

  const t = translations[currentLang] || translations["ru"];

  // Защита: если dictionary нет в templateData, берем из памяти или ставим пустой объект
  window.kaspiDicts = templateData.dictionary || window.kaspiDicts || {};

  const container = document.getElementById("mapper2CardsContainer");
  container.innerHTML = "";

  window.mapper2State.colMap = window.mapper2State.colMap || {};
  window.mapper2State.dictValues = window.mapper2State.dictValues || {};
  window.mapper2State.splitRules = window.mapper2State.splitRules || {};

  if (
    window.mapper2State.smartRules &&
    templateData &&
    templateData.humanNames &&
    templateData.systemKeys
  ) {
    const headers = window.mapper2State.invoiceHeaders || [];

    Object.keys(window.mapper2State.smartRules).forEach((invoiceColName) => {
      const colIndex = headers.findIndex(
        (h) => String(h).trim() === invoiceColName,
      );

      if (colIndex !== -1) {
        const selectedParams = window.mapper2State.smartRules[invoiceColName];

        selectedParams.forEach((paramName) => {
          const pIdx = templateData.humanNames.indexOf(paramName);
          if (pIdx !== -1) {
            const sysKey = templateData.systemKeys[pIdx];
            window.mapper2State.colMap[sysKey] = colIndex;
          }
        });
      }
    });
  }

  let allReqs = [];
  let learnedSynonyms = {};

  if (templateData && templateData.memoryJson) {
    try {
      learnedSynonyms =
        typeof templateData.memoryJson === "string"
          ? JSON.parse(templateData.memoryJson)
          : templateData.memoryJson;
      window.mapper2State.rawMemoryJson = JSON.stringify(learnedSynonyms);
      if (learnedSynonyms._splitRules) {
        // ⚡ НЕ стираем свежие правила из Токенизатора! Только дополняем их старыми из памяти.
        const memorySplits = JSON.parse(JSON.stringify(learnedSynonyms._splitRules));
        window.mapper2State.splitRules = { ...memorySplits, ...window.mapper2State.splitRules };
      }
    } catch (e) {
      console.error("Ошибка парсинга памяти", e);
    }
  }

  if (templateData && templateData.systemKeys) {
    const { humanNames, systemKeys, requirements } = templateData;
    window.mapper2State.sysToHumanMap = {};

    for (let i = 0; i < systemKeys.length; i++) {
      let sysKey = systemKeys[i];
      let humName = humanNames[i];
      if (!sysKey || !humName) continue;

      window.mapper2State.sysToHumanMap[sysKey] = humName;

      let reqText = (requirements[i] || "").toLowerCase();
      let isReq =
        reqText.includes("обязательн") && !reqText.includes("необязательн");

      allReqs.push({
        sysKey,
        name: humName,
        req: isReq,
        desc: t.inc_dict_or_splitter || "Словарь или Сплиттер",
        descKey: "inc_dict_or_splitter",
        isKaspi: true,
      });
    }
  }

  const posBaseFields = [
    {
      sysKey: "name",
      name: t.pos_name || "Наименование",
      nameKey: "pos_name",
      req: true,
      desc: t.desc_req || "Обязательно",
      descKey: "desc_req",
      isKaspi: false,
    },
    {
      sysKey: "qty",
      name: t.pos_qty || "Количество",
      nameKey: "pos_qty",
      req: true,
      desc: t.desc_stock || "На складе (POS)",
      descKey: "desc_stock",
      isKaspi: false,
    },
    {
      sysKey: "price",
      name: t.pos_price || "Цена закупа",
      nameKey: "pos_price",
      req: true,
      desc: t.desc_currency || "В валюте накладной",
      descKey: "desc_currency",
      isKaspi: false,
    },
    {
      sysKey: "barcode",
      name: t.pos_barcode || "Код / Штрихкод",
      nameKey: "pos_barcode",
      req: false,
      desc: t.desc_id_link || "Связь с ID товара в POS",
      descKey: "desc_id_link",
      isKaspi: false,
    },
    {
      sysKey: "cbm",
      name: t.pos_cbm || "Объем (CBM)",
      nameKey: "pos_cbm",
      req: false,
      desc: t.desc_calc || "Для расчета",
      descKey: "desc_calc",
      isKaspi: false,
    },
    {
      sysKey: "weight",
      name: t.pos_weight || "Вес (кг)",
      nameKey: "pos_weight",
      req: false,
      desc: t.desc_calc || "Для расчета",
      descKey: "desc_calc",
      isKaspi: false,
    },
  ];

  posBaseFields.forEach((field) => {
    if (!allReqs.some((r) => r.sysKey === field.sysKey)) allReqs.push(field);
  });

  const globalSynonyms =
    typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : {};
  const headersLower = (window.mapper2State.invoiceHeaders || []).map((h) =>
    String(h || "")
      .trim()
      .toLowerCase(),
  );

  let htmlRequired = "";
  let htmlOptional = "";
  let htmlFilled = "";

  allReqs.forEach((req) => {
    let isKaspiSku =
      req.sysKey.toLowerCase().includes("sku") ||
      req.name.toLowerCase().includes("артикул");

    if (isKaspiSku) {
      htmlFilled += `
            <div class="req-card" style="opacity: 0.6; filter: grayscale(1); cursor: not-allowed; background: var(--bg-panel); border-color: var(--border-light);">
                <div class="req-info">
                    <span class="req-title required" style="color: var(--text-main);">${req.name}</span>
                    <span class="req-subtitle" data-i18n="inc_auto_fill" style="color: var(--text-muted);">${t.inc_auto_fill || "Заполняется автоматически"}</span>
                </div>
                <div class="req-status status-dict" style="background: var(--bg-body); border-color: var(--border-light); color: var(--text-muted);">
                    <span data-i18n="inc_db_barcode">🔒 ${t.inc_db_barcode || "Штрихкод БД"}</span>
                </div>
            </div>`;
      return;
    }

    let learned = learnedSynonyms[req.sysKey] || [];
    let baseRaw = [];
    if (globalSynonyms[req.sysKey])
      baseRaw = baseRaw.concat(globalSynonyms[req.sysKey]);
    if (globalSynonyms[req.name])
      baseRaw = baseRaw.concat(globalSynonyms[req.name]);
    if (req.isDict && globalSynonyms["Brand"])
      baseRaw = baseRaw.concat(globalSynonyms["Brand"]);

    let base = baseRaw
      .map((w) => String(w).trim().toLowerCase())
      .filter(Boolean);
    let foundIndex = -1;

    const safeLearned = Array.isArray(learned)
      ? learned
      : typeof learned === "string"
        ? [learned]
        : [];

    foundIndex = headersLower.findIndex((h) => h && safeLearned.includes(h));
    if (foundIndex === -1)
      foundIndex = headersLower.findIndex((h) => h && base.includes(h));
    if (foundIndex === -1)
      foundIndex = headersLower.findIndex(
        (h) => h && safeLearned.some((w) => w.length > 2 && h.includes(w)),
      );
    if (foundIndex === -1)
      foundIndex = headersLower.findIndex(
        (h) => h && base.some((w) => w.length > 2 && h.includes(w)),
      );

    if (foundIndex !== -1) window.mapper2State.colMap[req.sysKey] = foundIndex;

    let mappedIndex = window.mapper2State.colMap[req.sysKey];
    let dictValue =
      window.mapper2State.dictValues &&
      window.mapper2State.dictValues[req.sysKey];

    let statusClass = "status-empty";
    let statusText = t.inc_select || "ВЫБРАТЬ";
    let statusI18n = `data-i18n="inc_select"`;
    let statusStyle = "";
    let extraPreviewHtml = "";

    if (dictValue) {
      statusClass = "status-filled";
      let shortVal =
        dictValue.length > 15 ? dictValue.substring(0, 15) + "..." : dictValue;
      // ИСПРАВЛЕНИЕ 1: Добавляем галочку и красим кнопку для словаря
      statusText = `✓ ${shortVal}`;
      statusI18n = "";
      statusStyle =
        "border: 1px solid var(--accent-green, #2ecc71); color: var(--accent-green, #2ecc71); background: var(--bg-success-dim, rgba(46, 204, 113, 0.15)); font-weight: bold;";
    } else if (mappedIndex !== undefined) {
      statusClass = "status-filled";
      let colName =
        window.mapper2State.invoiceHeaders[mappedIndex] ||
        `Колонка ${mappedIndex + 1}`;

      // ⚡ Читаем правила И по ключу (Specs), И по имени (Ширина профиля)
      let splitData =
        window.mapper2State.splitRules &&
        (window.mapper2State.splitRules[req.name] || window.mapper2State.splitRules[req.sysKey]);
        
      if (splitData) { // Убрали жесткую проверку массива, проверяем просто наличие данных
        let sampleText = "";
        let gluedText = "";
        let highlighted = "";

        for (
          let i = 0;
          i < Math.min(10, window.mapper2State.invoiceRows.length);
          i++
        ) {
          let val = String(
            window.mapper2State.invoiceRows[i][mappedIndex] || "",
          ).trim();
          if (val) {
            sampleText = val;
            break;
          }
        }

        if (sampleText) {
          // ⚡ Строго та же регулярка, что и в Токенизаторе
          const regex = /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g;
          let tokens = sampleText.match(regex) || [];
          
          // Генерируем сигнатуру для превью
          const sig = tokens.map(t => {
            if (/\d/.test(t)) return 'D';
            if (/[a-zA-Zа-яА-ЯёЁ]/.test(t)) return 'L';
            return '.';
          }).join('-');
          
          // ⚡ ДОСТАЕМ ИНДЕКСЫ (поддерживаем и старый массив, и новые сигнатуры)
          let rawIndices = [];
          if (Array.isArray(splitData)) {
            rawIndices = splitData; // Старый формат
          } else if (splitData[sig]) {
            rawIndices = splitData[sig]; // Новый формат по точной сигнатуре
          } else if (Object.keys(splitData).length > 0) {
            // Фолбэк для превью: берем первое попавшееся правило, если сигнатура образца не совпала
            let firstKey = Object.keys(splitData)[0];
            rawIndices = Array.isArray(splitData[firstKey]) ? splitData[firstKey] : [];
          }

          let validIndices = rawIndices.map(idx => {
            if (typeof idx === 'object' && idx !== null) {
              return idx.index !== undefined ? parseInt(idx.index) : parseInt(idx.i);
            }
            return parseInt(idx);
          }).filter(n => !isNaN(n));

          // Убираем дубликаты и сортируем по порядку
          validIndices = [...new Set(validIndices)].filter(n => n >= 0 && n < tokens.length).sort((a, b) => a - b);

          validIndices.forEach(i => {
            if (tokens[i] !== undefined) gluedText += tokens[i];
          });

          highlighted = tokens
            .map((tok, i) => {
              if (validIndices.includes(i)) {
                return `<b style="color:#000; background:var(--accent-green, #4CAF50); padding:0 3px; border-radius:3px;">${tok}</b>`;
              } else {
                return `<span style="color:#666; text-decoration:line-through;">${tok}</span>`;
              }
            })
            .join("");
        }
        
        statusText = `✂ ${gluedText || colName}`;
        statusI18n = "";
        statusStyle =
          "border: 1px solid var(--accent-green, #2ecc71); color: var(--accent-green, #2ecc71); background: var(--bg-success-dim, rgba(46, 204, 113, 0.15)); font-weight: bold;";

        if (highlighted) {
          extraPreviewHtml = `
                    <div id="preview-${req.sysKey}" style="margin-top: 6px; font-size: 11px; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                        ${highlighted}
                    </div>`;
        }
      } else {
        // ИСПРАВЛЕНИЕ 3: Меняем текст кнопки для обычного маппинга
        statusText = `✓ ${colName}`;
        statusI18n = "";
        statusStyle =
          "border: 1px solid var(--accent-green, #2ecc71); color: var(--accent-green, #2ecc71); background: var(--bg-success-dim, rgba(46, 204, 113, 0.15)); font-weight: bold;";
      }
    }

    let nameI18nAttr = req.nameKey ? `data-i18n="${req.nameKey}"` : "";
    let descI18nAttr = req.descKey ? `data-i18n="${req.descKey}"` : "";

    let cardHtml = `
        <div class="req-card" onclick="openColumnSelector('${req.sysKey}', '${req.name.replace(/'/g, "\\'")}', ${req.isKaspi === true})">
            <div class="req-info">
                <span class="req-title ${req.req ? "required" : ""}" ${nameI18nAttr}>${req.name}</span>
                <span class="req-subtitle" id="subtitle-${req.sysKey}" ${descI18nAttr}>${req.desc}</span>
                ${extraPreviewHtml}
            </div>
            <div class="req-status ${statusClass}" id="status-${req.sysKey}" style="${statusStyle}" ${statusI18n}>${statusText}</div>
        </div>`;

    if (statusClass === "status-filled") {
      htmlFilled += cardHtml;
    } else if (req.req) {
      htmlRequired += cardHtml;
    } else {
      htmlOptional += cardHtml;
    }
  });

  let finalHtml = "";

  if (htmlRequired) {
    finalHtml +=
      `<div class="section-header" data-i18n="req_fill_title" style="color: #ff4444; padding: 15px 10px 5px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">🔴 ${t.req_fill_title || "Обязательные для заполнения"}</div>` +
      htmlRequired;
  }
  if (htmlOptional) {
    finalHtml +=
      `<div class="section-header" data-i18n="add_params_title" style="color: var(--accent-blue); padding: 15px 10px 5px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">🔵 ${t.add_params_title || "Дополнительные параметры"}</div>` +
      htmlOptional;
  }
  if (htmlFilled) {
    finalHtml +=
      `<div class="section-header" data-i18n="desc_invoice_sys" style="color: var(--accent-green); padding: 15px 10px 5px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">✅ ${t.desc_invoice_sys || "Из накладной и системы"}</div>` +
      htmlFilled;
  }

  container.innerHTML = finalHtml;

  const parseBtn = document.getElementById("parseInvoiceBtn");
  if (parseBtn) parseBtn.style.display = "none";

  const importModeContainer = document.getElementById("importModeContainer");
  if (importModeContainer) importModeContainer.style.display = "none";

  const invoiceUploadWrapper = document.getElementById("invoiceUploadWrapper");
  if (invoiceUploadWrapper) invoiceUploadWrapper.style.display = "none";

  const tabs = document.getElementById("mapperTabsContainer");
  if (tabs) tabs.style.display = "none";

  const currency = document.getElementById("mapperCurrencyBlock");
  if (currency) currency.style.display = "none";

  document.getElementById("mapper2Area").style.display = "flex";
  document.getElementById("applyMapper2Btn").style.display = "block";

  window.checkMapperReadiness();
};

// 3. ОТКРЫТИЕ ШТОРКИ И ОТРИСОВКА КОЛОНОК
window.openColumnSelector = function (sysKey, reqName, isKaspi) {
  window.mapper2State.currentSysKey = sysKey;
  window.mapper2State.currentReqName = reqName;

  document.getElementById("sheet-title").innerText = translations[currentLang].mapper_source + reqName;

  const colList = document.getElementById("sheet-col-list");

  // 🔥 УМНАЯ ПРОВЕРКА: Есть ли у этого поля реальный справочник в Kaspi?
  let hasDict = window.kaspiDicts && window.kaspiDicts[reqName] && window.kaspiDicts[reqName].length > 0;

  let dictBtnHtml = "";
  if (isKaspi) {
      if (hasDict) {
          // Если справочник есть — показываем стандартную кнопку поиска
          dictBtnHtml = `<button onclick="window.openKaspiDictSearch()" style="background: var(--accent-green, #4CAF50); border: none; color: #000; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer; margin-right: 8px;">
          🔍 <span data-i18n="mapper_btn_dict">Справочник</span></button>`;
      } else {
          // Если справочника НЕТ — даем кнопку ручного ввода константы!
          dictBtnHtml = `<button onclick="window.setManualConstantValue('${sysKey}', '${reqName.replace(/'/g, "\\'")}')" style="background: var(--accent-blue, #3498db); border: none; color: #fff; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer; margin-right: 8px;">
          ✍️ Ввести вручную</button>`;
      }
  }

  colList.innerHTML = `
    <div style="position: sticky; top: 0; background: var(--bg-panel, #1e1e1e); z-index: 10; padding: 15px 20px; margin: -20px 0 15px 0; border-bottom: 1px solid var(--border-light, #333); display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: bold;" data-i18n="mapper_inv_cols">
    Колонки из накладной
</div>
        <div style="display: flex; align-items: center;">
            ${dictBtnHtml}
            <button onclick="clearMapper2Col('${sysKey}')" style="background: rgba(255, 68, 68, 0.1); border: 1px solid #ff4444; color: #ff4444; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer;">
    ❌ <span data-i18n="mapper_btn_clear">Очистить</span>
</button>
        </div>
    </div>`;

  let currentlyMappedIndex = window.mapper2State.colMap ? window.mapper2State.colMap[sysKey] : undefined;
  let currentSplitRule = window.mapper2State.splitRules ? window.mapper2State.splitRules[sysKey] : null;
  let splitRules = window.mapper2State.splitRules || {};
  let usedByOthers = {};

  if (window.mapper2State.colMap) {
    Object.keys(window.mapper2State.colMap).forEach((k) => {
      if (k !== sysKey) {
        let idx = window.mapper2State.colMap[k];
        if (!usedByOthers[idx]) usedByOthers[idx] = [];
        usedByOthers[idx].push(k);
      }
    });
  }

  const regex = /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g;

  window.mapper2State.invoiceHeaders.forEach((rawColName, index) => {
    let colName = String(rawColName || "").trim();
    if (!colName) colName = `[Колонка ${index + 1} Пустой заголовок]`;

    let displayColName = colName.replace(/[\r\n]+/g, " ");
    let safeColName = displayColName.replace(/'/g, "\\'").replace(/"/g, '\\"');

    let previews = [];
    for (let i = 0; i < Math.min(10, window.mapper2State.invoiceRows.length); i++) {
      let val = String(window.mapper2State.invoiceRows[i][index] || "").trim();
      if (val && previews.length < 3 && !previews.some((p) => p.orig === val)) {
        previews.push({ orig: val });
      }
    }

    if (rawColName === "" && previews.length === 0) return;

    let isSelected = currentlyMappedIndex === index;
    let isUsedByOther = usedByOthers[index] !== undefined && usedByOthers[index].length > 0;

    let takenTokens = new Set();
    let isFullyTaken = false;

    if (isUsedByOther) {
      usedByOthers[index].forEach((otherSysKey) => {
        let rule = splitRules[otherSysKey];
        if (rule && rule.length > 0) {
          rule.forEach((t) => takenTokens.add(t));
        } else {
          isFullyTaken = true;
        }
      });
    }

    let previewHtmlArr = [];
    previews.forEach((p) => {
      let text = p.orig;
      let tokens = text.match(regex) || [];

      let highlightedHtml = tokens.map((tok, i) => {
          let isCurrentSplit = isSelected && currentSplitRule && currentSplitRule.includes(i);
          let isTakenByOther = isFullyTaken || takenTokens.has(i);

          if (isCurrentSplit) {
            return `<b style="color:#000; background:var(--accent-green, #4CAF50); padding:0 3px; border-radius:3px;">${tok}</b>`;
          } else if (isTakenByOther) {
            return `<span style="color:#555; text-decoration:line-through; background:rgba(255,255,255,0.05); padding:0 2px; border-radius:2px;" title="Уже занято">${tok}</span>`;
          } else {
            return tok;
          }
        }).join("");

      if (isSelected && (!currentSplitRule || currentSplitRule.length === 0)) {
        highlightedHtml = `<b style="color:var(--accent-green, #4CAF50);">${text}</b>`;
      }

      previewHtmlArr.push("- " + highlightedHtml);
    });

    let previewText = previewHtmlArr.length > 0 ? previewHtmlArr.join("<br>") : "Пустая колонка (нет данных)";
    let safePreview = previews[0] ? String(previews[0].orig).replace(/[\r\n]+/g, " ").replace(/'/g, "\\'").replace(/"/g, '\\"') : "";

    let itemStyle = "background: var(--bg-card, #252525); border: 1px solid var(--border-light, #333); border-radius: 6px; padding: 10px; margin-bottom: 10px; transition: 0.2s;";
    let badgeHtml = "";

    if (isSelected) {
      itemStyle = "border: 2px solid var(--accent-green, #4CAF50); background: rgba(76, 175, 80, 0.05); border-radius: 6px; padding: 10px; margin-bottom: 10px;";
      let splitNote = currentSplitRule && currentSplitRule.length > 0 ? " (Часть)" : " (Целиком)";
      badgeHtml = `<div style="font-size: 10px; margin-bottom: 8px;"><span style="background: var(--accent-green, #4CAF50); color: #000; padding: 3px 8px; border-radius: 4px; font-weight: bold;">📌 ВЫБРАНО${splitNote.toUpperCase()}</span></div>`;
    } else if (isUsedByOther) {
      itemStyle = "background: #151515; border: 1px solid #222; border-radius: 6px; padding: 10px; margin-bottom: 10px; opacity: 0.9;";
      let usedLabel = isFullyTaken ? `⚠️ ${translations[currentLang].mapper_busy_full}` : `⚠️ ${translations[currentLang].mapper_busy_part}`;
      badgeHtml = `<div style="font-size: 10px; margin-bottom: 8px;"><span style="background: rgba(255, 152, 0, 0.15); border: 1px solid rgba(255, 152, 0, 0.4); color: #ff9800; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${usedLabel}</span></div>`;
    }

    colList.innerHTML += `
        <div class="col-item" style="${itemStyle}">
            ${badgeHtml}
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="col-content" onclick="selectMapper2Col(${index}, '${safeColName}')">
                    <div class="col-name" style="${isUsedByOther && !isSelected ? "color: #777;" : "font-weight:bold;"}">${displayColName}</div>
                    <div class="col-examples" style="margin-top: 6px; line-height: 1.4;">${previewText}</div>
                </div>
                <button class="btn-split" onclick="toggleSplitter(this, ${index}, '${safePreview}')" style="margin-left:10px;">✂️</button>
            </div>
            
            <div class="splitter-zone" id="splitter-zone-${index}">
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">Выберите фрагменты:</div>
                <div id="token-container-${index}"></div>
                <div style="margin-top: 10px; font-size: 13px; color: var(--accent-yellow);">
                    Результат: <b id="split-result-${index}">...</b>
                </div>
                <button class="btn-apply-split" onclick="applySplitRule(${index}, '${safeColName}')">Применить правило</button>
            </div>
        </div>`;
  });

  document.getElementById("sheet-overlay").style.display = "block";
  setTimeout(() => (document.getElementById("sheet-overlay").style.opacity = "1"), 10);
  document.getElementById("bottom-sheet").style.transform = "translateY(0)";
};

window.setManualConstantValue = function(sysKey, reqName) {
    let val = prompt(`Введите постоянное значение для поля "${reqName}"\n(Оно будет применено ко всем товарам в накладной):`);
    if (val !== null && val.trim() !== "") {
        window.mapper2State.dictValues = window.mapper2State.dictValues || {};
        window.mapper2State.dictValues[sysKey] = val.trim();
        
        // Скрываем окно селектора колонок
        document.getElementById('sheet-overlay').style.opacity = '0';
        document.getElementById('bottom-sheet').style.transform = 'translateY(100%)';
        setTimeout(() => { document.getElementById('sheet-overlay').style.display = 'none'; }, 300);
        
        // Обновляем интерфейс (поле станет зеленым, кнопка разблокируется)
        if (typeof window.renderMapper2Cards === 'function') {
            window.renderMapper2Cards();
        }
    }
};

window.selectMapper2Col = function (colIndex, colName) {
  const sysKey = window.mapper2State.currentSysKey;
  delete window.mapper2State.splitRules[sysKey];
  delete window.mapper2State.dictValues[sysKey];

  window.mapper2State.colMap[sysKey] = colIndex;

  // Ищем первый непустой пример для показа
  let previewVal = "";
  for (let i = 0; i < window.mapper2State.invoiceRows.length; i++) {
    let val = String(window.mapper2State.invoiceRows[i][colIndex] || "").trim();
    if (val) {
      previewVal = val;
      break;
    }
  }

  // Передаем чистое имя колонки (без лишних эмодзи кружочков)
  updateReqCardStatus(sysKey, colName, "status-filled", previewVal || "Пусто");
  closeSheet();
};

window.clearMapper2Col = function (sysKey) {
  if (window.mapper2State && window.mapper2State.colMap) {
    delete window.mapper2State.colMap[sysKey];
  }
  if (window.mapper2State && window.mapper2State.dictValues) {
    delete window.mapper2State.dictValues[sysKey];
  }
  if (window.mapper2State && window.mapper2State.splitRules) {
    delete window.mapper2State.splitRules[sysKey];
  }

  const statusEl = document.getElementById("status-" + sysKey);
  if (statusEl) {
    statusEl.className = "req-status status-empty";
    statusEl.innerText = "Выбрать";
  }

  if (typeof window.closeSheet === "function") {
    window.closeSheet();
  }
};

window.closeSheet = function () {
  document.getElementById("sheet-overlay").style.opacity = "0";
  document.getElementById("bottom-sheet").style.transform = "translateY(100%)";
  setTimeout(
    () => (document.getElementById("sheet-overlay").style.display = "none"),
    300,
  );
};

// 4. СПЛИТТЕР (Регулярные выражения для нарезки токенов)
window.activeTokensState = {};

window.toggleSplitter = function (btn, colIndex, sampleText) {
  const zone = document.getElementById("splitter-zone-" + colIndex);
  if (zone.style.display === "block") {
    zone.style.display = "none";
    return;
  }

  document
    .querySelectorAll(".splitter-zone")
    .forEach((el) => (el.style.display = "none"));
  zone.style.display = "block";

  window.activeTokensState[colIndex] = [];
  document.getElementById("split-result-" + colIndex).innerText = "...";

  // Алгоритм разделения (дроби, цифры, слова, символы)
  const regex = /\d+,\d+|\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ,]/g;
  const matches = (sampleText || "").match(regex) || [];

  const container = document.getElementById("token-container-" + colIndex);
  container.innerHTML = "";

  matches.forEach((token, tokenIndex) => {
    const span = document.createElement("span");
    span.innerText = token;
    if (token.length === 1 && !/[a-zA-Zа-яА-ЯёЁ0-9]/.test(token))
      span.className = "token separator";
    else span.className = "token";

    span.onclick = function () {
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        window.activeTokensState[colIndex][tokenIndex] = true;
      } else {
        delete window.activeTokensState[colIndex][tokenIndex];
      }

      let resultArr = [];
      for (let i = 0; i < matches.length; i++) {
        if (window.activeTokensState[colIndex][i]) resultArr.push(matches[i]);
      }
      document.getElementById("split-result-" + colIndex).innerText =
        resultArr.join("") || "...";
    };
    container.appendChild(span);
  });
};

window.applySplitRule = function (colIndex, colName) {
  const sysKey = window.mapper2State.currentSysKey;
  const tokenIndices = [];
  for (let idx in window.activeTokensState[colIndex]) {
    if (window.activeTokensState[colIndex][idx])
      tokenIndices.push(parseInt(idx));
  }

  if (tokenIndices.length === 0) return alert("Выберите фрагменты!");

  // Сохраняем новые данные
  delete window.mapper2State.dictValues[sysKey];
  window.mapper2State.colMap[sysKey] = colIndex;
  window.mapper2State.splitRules[sysKey] = tokenIndices;

  // Генерируем пример склейки из первой попавшейся непустой строки
  let rawVal = "";
  for (let i = 0; i < window.mapper2State.invoiceRows.length; i++) {
    let val = String(window.mapper2State.invoiceRows[i][colIndex] || "").trim();
    if (val) {
      rawVal = val;
      break;
    }
  }

  // 1. КРАСИМ КНОПКУ
  const statusEl = document.getElementById("status-" + sysKey);
  if (statusEl) {
    statusEl.className = "req-status status-filled";
    statusEl.innerText = `✂️ ${colName}`;
    statusEl.style.cssText =
      "border: 1px solid #4CAF50; color: #4CAF50; background: rgba(76, 175, 80, 0.1); font-weight: bold;";
  }

  // 2. ДОБАВЛЯЕМ ВИЗУАЛЬНЫЙ ТОКЕНИЗАТОР
  let subtitleEl = document.getElementById("subtitle-" + sysKey);
  if (subtitleEl && subtitleEl.parentElement) {
    let reqInfo = subtitleEl.parentElement;

    // Удаляем старое превью, если оно там уже было
    let oldPreview = document.getElementById("preview-" + sysKey);
    if (oldPreview) oldPreview.remove();

    // Удаляем старый "желтый" результат от старых скриптов, если он есть
    let oldResult = reqInfo.querySelector(".req-result");
    if (oldResult) oldResult.remove();

    if (rawVal) {
      const regex = /\d+,\d+|\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ,]/g;
      const tokens = rawVal.match(regex) || [];

      let highlighted = tokens
        .map((tok, i) => {
          if (tokenIndices.includes(i)) {
            return `<b style="color:#000; background:var(--accent-green, #4CAF50); padding:0 3px; border-radius:3px;">${tok}</b>`;
          } else {
            return `<span style="color:#666; text-decoration:line-through;">${tok}</span>`;
          }
        })
        .join("");

      let extraPreviewHtml = `
            <div id="preview-${sysKey}" style="margin-top: 6px; font-size: 11px; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                ${highlighted}
            </div>`;

      reqInfo.insertAdjacentHTML("beforeend", extraPreviewHtml);
    }
  }

  closeSheet();
};

window.openKaspiDictSearch = function () {
  let sysKey = window.mapper2State.currentSysKey;
  let reqName = window.mapper2State.currentReqName;
  let dict = window.kaspiDicts[reqName] || [];

  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const t =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  if (dict.length === 0) {
    return alert(
      (t.msg_dict_empty_1 || "") + reqName + (t.msg_dict_empty_2 || ""),
    );
  }

  // Прячем нижнюю шторку
  document.getElementById("bottom-sheet").style.transform = "translateY(100%)";
  setTimeout(() => {
    let overlay = document.getElementById("sheet-overlay");
    if (overlay) overlay.style.display = "none";
  }, 300);

  window.tempSelectedDictValue = null;
  window.currentModalSysKey = sysKey;
  window.currentModalDict = dict;

  if (!window.applyToAllMap) window.applyToAllMap = {};
  let isGlobal = window.applyToAllMap[sysKey] !== undefined;

  let modal = document.getElementById("kaspiDictModal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "kaspiDictModal";
  // Прижимаем окно к верхней части экрана (flex-start) с отступом
  modal.style.cssText =
    "display:flex; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:999999; flex-direction:column; align-items:center; justify-content:flex-start; padding-top:40px; padding-left:15px; padding-right:15px; box-sizing:border-box; backdrop-filter:blur(3px);";

  modal.onclick = (e) => {
    if (e.target.id === "kaspiDictModal")
      document.getElementById("kaspiDictModal").remove();
  };

  let clearBtnHtml = `
      <div onclick="window.clearKaspiDictSelection()" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:15px; padding:12px; background:rgba(255,68,68,0.1); color:#ff4444; border-radius:8px; border:1px solid rgba(255,68,68,0.3); font-size:14px; font-weight:bold; cursor:pointer; transition:background 0.2s;">
          <span>✖</span> ${t.inc_clear_selection || "Очистить выбор"}
      </div>`;

  // РЕШЕНИЕ: Единый контейнер с жесткой высотой (height: 80vh) и общим отступом (padding: 20px)
  modal.innerHTML = `
      <div id="dictModalContent" style="background:var(--bg-body, #f9f9f9); color:var(--text-main, #000); width:100%; max-width:420px; border-radius:12px; display:flex; flex-direction:column; height: 80vh; max-height: 800px; box-sizing:border-box; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          
          <div style="padding: 20px; display: flex; flex-direction: column; flex: 1; overflow: hidden; box-sizing: border-box;">
              
              <!-- ХЕДЕР: Теперь внутри общего отступа, без лишних границ и фонов -->
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                  <span onclick="document.getElementById('kaspiDictModal').remove()" style="color:var(--accent-blue, #3b82f6); font-size:24px; cursor:pointer; line-height:1; display:flex; align-items:center;">
                      <span style="font-size:20px;">&#10094;</span>
                  </span>
                  <div style="flex: 1; display: flex; flex-direction: column; text-align: center; padding: 0 15px; overflow: hidden;">
                      <b id="dictModalTitle" style="font-size:15px; color:var(--text-main, #000); text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${reqName}</b>
                      <div id="dictModalCountInfo" style="font-size: 11px; font-weight: bold; color: var(--text-muted, #888); margin-top: 2px;">
                          <span id="dictModalCountText">${t.dict_total || "Всего:"}</span> <span id="dictTotalCount">${dict.length}</span>
                      </div>
                  </div>
                  <span onclick="window.confirmKaspiDictSelection()" style="color:var(--accent-green, #2ecc71); font-size:16px; font-weight:bold; cursor:pointer;">${t.inc_save || "OK"}</span>
              </div>

              <!-- ПОИСК И ГАЛОЧКА -->
              <input type="text" id="dictModalSearch" class="kaspi-input-field" value="" 
                  placeholder="${t.inc_search_enter || "Поиск..."}"
                  onfocus="this.select()"
                  oninput="window.filterDictionary()"
                  style="width:100%; padding:12px; margin-bottom:15px; border:1px solid var(--accent-blue, #3b82f6); background:var(--bg-panel, #fff); color:var(--text-main, #000); border-radius:8px; font-size:15px; outline:none; box-sizing:border-box;">
              
              <label style="display:flex; align-items:center; gap:10px; margin-bottom:15px; padding:12px; background:var(--bg-panel, #fff); border-radius:8px; border:1px solid var(--border-light, #ddd); cursor:pointer;">
                  <input type="checkbox" id="dictModalApplyAll" ${isGlobal ? "checked" : ""} style="width:20px; height:20px;">
                  <span style="font-size:14px; color:var(--text-main, #000);">${t.inc_apply_all || "Применить ко всем товарам"}</span>
              </label>
              
              ${clearBtnHtml}

              <!-- СПИСОК: Жестко задаем min-height, чтобы CSS не смог его схлопнуть -->
              <ul id="dictModalList" style="list-style:none; padding:0; margin:0; overflow-y:auto; flex:1; min-height:150px; background:var(--bg-panel, #fff); border-radius:8px; border:1px solid var(--border-light, #ddd); overscroll-behavior:contain;"></ul>

          </div>
      </div>
  `;

  document.body.appendChild(modal);

  // Скрытие клавиатуры при скролле
  const listElem = document.getElementById("dictModalList");
  if (listElem) {
    listElem.addEventListener(
      "touchstart",
      () => {
        const searchEl = document.getElementById("dictModalSearch");
        if (searchEl) searchEl.blur();
      },
      { passive: true },
    );
  }

  // Запускаем рендер элементов списка
  window.filterDictionary();
};

// Функция завершения выбора (вызывается по кнопке ОК)
window.confirmKaspiDictSelection = function () {
  if (!window.tempSelectedDictValue) {
    const lang = window.currentLang || "ru";
    const tr =
      typeof translations !== "undefined" && translations[lang]
        ? translations[lang]
        : {};
    return alert(
      tr.err_select_val || "Пожалуйста, сначала выберите значение из списка.",
    );
  }

  const applyAll = document.getElementById("dictModalApplyAll").checked;

  if (applyAll) {
    if (!window.applyToAllMap) window.applyToAllMap = {};
    window.applyToAllMap[window.currentModalSysKey] = true;
  } else {
    if (
      window.applyToAllMap &&
      window.applyToAllMap[window.currentModalSysKey]
    ) {
      delete window.applyToAllMap[window.currentModalSysKey];
    }
  }

  // ИСПРАВЛЕНИЕ 3: Вызываем сохранение ДО удаления окна, чтобы ядро не падало
  if (typeof window.selectDictionaryValue === "function") {
    window.selectDictionaryValue(window.tempSelectedDictValue, false, applyAll);
  }

  // Теперь окно можно безопасно добить
  const modal = document.getElementById("kaspiDictModal");
  if (modal) modal.remove();
};

// Функция очистки выбора
window.clearKaspiDictSelection = function () {
  window.tempSelectedDictValue = null;
  document.getElementById("dictModalSearch").value = "";
  document.getElementById("dictModalApplyAll").checked = false;
  window.filterDictionary(); // перерисовываем список
};

// Полностью обновленная функция фильтрации и рендера списка
window.filterDictionary = function () {
  let searchEl = document.getElementById("dictModalSearch");
  let listEl = document.getElementById("dictModalList");
  let countText = document.getElementById("dictModalCountText");
  let totalCount = document.getElementById("dictTotalCount");

  // Защита от ошибок, если окно еще не открыто
  if (!searchEl || !listEl) return;

  let query = searchEl.value.toLowerCase().trim();
  let dict = window.currentModalDict || [];

  // Фильтруем справочник по запросу
  let filtered = dict.filter((item) =>
    String(item).toLowerCase().includes(query),
  );

  // Локализация счетчика
  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const tr =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  if (countText && totalCount) {
    countText.innerText =
      query === "" ? tr.dict_total || "Всего:" : tr.dict_found || "Найдено:";
    totalCount.innerText = filtered.length;
  }

  // Если ничего не нашли
  if (filtered.length === 0) {
    listEl.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted, #888); font-size: 14px;">${tr.tok_not_found || "Ничего не найдено"}</div>`;
    return;
  }

  // Рендерим пункты меню
  listEl.innerHTML = filtered
    .map((val) => {
      let safeVal = String(val).replace(/'/g, "\\'").replace(/"/g, "&quot;");

      // Красивая подсветка совпадений текста при поиске
      let displayVal = val;
      if (query) {
        let regex = new RegExp(`(${query})`, "gi");
        displayVal = String(val).replace(
          regex,
          "<mark style='background:#fef08a; color:#854d0e; padding:0 2px; border-radius:2px;'>$1</mark>",
        );
      }

      // Проверяем, выбран ли этот пункт
      let isSelected = window.tempSelectedDictValue === val;
      let bg = isSelected ? "rgba(59, 130, 246, 0.15)" : "transparent";
      let check = isSelected
        ? `<span style="color:var(--accent-blue, #3b82f6); font-weight:bold; font-size:16px;">✔</span>`
        : "";

      // Генерируем строку списка
      return `<li onclick="window.selectKaspiDictItem('${safeVal}')" style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; border-bottom:1px solid var(--border-light, #ddd); cursor:pointer; background:${bg}; font-size:14px; color:var(--text-main, #000); transition: background 0.2s;">
            <span>${displayVal}</span>${check}
        </li>`;
    })
    .join("");
};

// Функция клика по элементу списка
window.selectKaspiDictItem = function (val) {
  // 1. Сохраняем во временную переменную
  window.tempSelectedDictValue = val;

  // 2. ПЕРЕНОСИМ ВЫБОР В ПОЛЕ ПОИСКА
  let searchEl = document.getElementById("dictModalSearch");
  if (searchEl) {
    searchEl.value = val;
  }

  // 3. Перерисовываем список (он отфильтруется по этому слову и подсветится)
  window.filterDictionary();
};

window.selectDictionaryValue = function (value, isCustom) {
  let sysKey = window.currentModalSysKey;

  // 1. Очищаем старые привязки (если были)
  if (window.mapper2State.colMap) delete window.mapper2State.colMap[sysKey];
  if (window.mapper2State.splitRules)
    delete window.mapper2State.splitRules[sysKey];
  if (!window.mapper2State.dictValues) window.mapper2State.dictValues = {};

  // 2. Записываем новое значение
  window.mapper2State.dictValues[sysKey] = value;

  // 3. Закрываем модалку справочника
  document.getElementById("kaspiDictModal").style.display = "none";

  // === 4. ПЕРЕРИСОВЫВАЕМ КАРТОЧКИ (второй маппер) ===
  if (typeof window.renderMapper2Cards === "function") {
    window.renderMapper2Cards();
  } else {
    console.error("Функция renderMapper2Cards не найдена!");
  }
};

// Функция выбора и сохранения
window.selectDictValue = function (sysKey, value) {
  // Очищаем старые связи (колонка или сплиттер)
  if (window.mapper2State.colMap) delete window.mapper2State.colMap[sysKey];
  if (window.mapper2State.splitRules)
    delete window.mapper2State.splitRules[sysKey];

  if (!window.mapper2State.dictValues) window.mapper2State.dictValues = {};

  // Возвращаем кавычки на место
  window.mapper2State.dictValues[sysKey] = value.replace(/&quot;/g, '"');

  const modal = document.getElementById("dict-search-modal");
  if (modal) document.body.removeChild(modal);

  const statusEl = document.getElementById("status-" + sysKey);
  if (statusEl) {
    statusEl.className = "req-status status-dict";
    statusEl.innerText = `[Словарь] ${window.mapper2State.dictValues[sysKey]}`;
  }
};

window.updateReqCardStatus = function (sysKey, text, className, previewText) {
  const badge = document.getElementById("status-" + sysKey);
  const subtitle = document.getElementById("subtitle-" + sysKey);

  if (badge) {
    if (className === "status-filled") {
      badge.innerText = "✓ " + text.replace(" 🟢", "");
      badge.removeAttribute("data-i18n");
      badge.style.backgroundColor =
        "var(--bg-success-dim, rgba(46, 204, 113, 0.15))";
      badge.style.borderColor = "var(--accent-green, #2ecc71)";
      badge.style.color = "var(--accent-green, #2ecc71)";
    } else {
      badge.innerText = text;
      badge.setAttribute("data-i18n", "inc_select");
      badge.style = "";
    }
    badge.className = "req-status " + className;
  }

  if (subtitle && previewText) {
    subtitle.innerHTML = `<span style="color: var(--accent-yellow); font-weight: bold;">Результат: ${previewText}</span>`;
  }

  // ФИЗИЧЕСКИЙ ПЕРЕНОС БЕЗ ДУБЛИРОВАНИЯ ШАПКИ
  if (className === "status-filled" && badge) {
    const card = badge.closest(".req-card");
    const container = document.getElementById("mapper2CardsContainer");
    if (card && container) {
      // Ищем шапку строго по её уникальному якорю перевода
      let filledHeader = container.querySelector(
        '[data-i18n="desc_invoice_sys"]',
      );

      if (!filledHeader) {
        filledHeader = document.createElement("div");
        filledHeader.className = "section-header";
        filledHeader.setAttribute("data-i18n", "desc_invoice_sys");
        filledHeader.style.cssText =
          "color: var(--accent-green); padding: 15px 10px 5px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;";
        const t =
          typeof translations !== "undefined" && translations[currentLang]
            ? translations[currentLang]
            : typeof translations !== "undefined"
              ? translations["ru"]
              : {};
        filledHeader.innerHTML =
          "✅ " + (t.desc_invoice_sys || "Из накладной и системы");
        container.appendChild(filledHeader);
      }
      container.appendChild(card);
    }
  }
  window.checkMapperReadiness();
};

// 6. ФИНАЛЬНАЯ СБОРКА JSON ДЛЯ СЕРВЕРА
window.applyMapper2Logic = function () {
  const state = window.mapper2State || {};
  const colMap = state.colMap || {};
  const dict = state.dictValues || {};

  // Проверяем: есть ли привязка к Excel ИЛИ ручной ввод для каждого обязательного поля
  const hasQty = colMap["qty"] !== undefined || dict["qty"] !== undefined;
  
  const hasPrice = colMap["price"] !== undefined || colMap["cost"] !== undefined || 
                   dict["price"] !== undefined || dict["cost"] !== undefined;
                   
  const hasName = colMap["name"] !== undefined || colMap["model"] !== undefined || 
                  dict["name"] !== undefined || dict["model"] !== undefined;

  // Если хотя бы одно обязательное поле вообще никак не заполнено — блокируем
  if (!hasQty || !hasPrice || !hasName) {
    const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
    const tr = typeof translations !== "undefined" && translations[lang] ? translations[lang] : {};
    const errorMsg = tr.mapper_err_missing_cols || "⚠️ Обязательно привяжите колонки (или введите вручную):\n1. Наименование (или model)\n2. Количество (qty)\n3. Цена (price/cost)";
    return alert(errorMsg);
  }

  if (window.currentImportMode === "kaspi") {
    const templateSelect = document.getElementById("kaspiTemplateSelect");
    const templateName = templateSelect ? templateSelect.value : "";
    if (templateName) {
      let currentMemory = {};
      try { currentMemory = JSON.parse(window.mapper2State.rawMemoryJson || "{}"); } catch (e) {}
      let memoryUpdated = false;

      Object.keys(state.colMap).forEach((sysKey) => {
        let colIndex = state.colMap[sysKey];
        let headerText = state.invoiceHeaders[colIndex];
        if (headerText) {
          let cleanWord = String(headerText).trim().toLowerCase();
          if (!Array.isArray(currentMemory[sysKey])) {
            currentMemory[sysKey] = [];
          }
          if (!currentMemory[sysKey].includes(cleanWord)) {
            currentMemory[sysKey].push(cleanWord);
            memoryUpdated = true;
          }
        }
      });

      if (state.splitRules && Object.keys(state.splitRules).length > 0) {
        currentMemory._splitRules = state.splitRules;
        memoryUpdated = true;
      }

      if (memoryUpdated) {
        const payload = {
          action: "updateKaspiMemory",
          api_key: CLIENT_API_KEY,
          category: templateName,
          memoryJson: JSON.stringify(currentMemory),
        };
        window.smartFetch(GATEWAY_URL, payload).catch((e) => console.error("Ошибка обновления словаря", e));
      }
    }
  }

  window.parsedInvoiceData = [];
  window.invoiceGroups = {};
  window.invoiceGroups[state.docNo] = {
    supplier: state.supplier,
    items: [],
    originalFiles: [{ fileName: state.fileName, fileBase64: state.originalBase64 }],
  };

  let mappedIndices = Object.values(state.colMap).filter((v) => v !== undefined);

  window.mapper2State.quarantine = [];

  state.invoiceRows.forEach((row, index) => {
    if (!row || row.length === 0) return;

    const getValue = (primaryKey, kaspiKey) => {
      if (state.dictValues && state.dictValues[primaryKey]) return state.dictValues[primaryKey];
      if (kaspiKey && state.dictValues && state.dictValues[kaspiKey]) return state.dictValues[kaspiKey];

      let colIdx = state.colMap[primaryKey];
      if (colIdx === undefined && kaspiKey) colIdx = state.colMap[kaspiKey];
      if (colIdx === undefined) return "";

      let rawVal = String(row[colIdx] || "").trim();
      let excelHeader = state.invoiceHeaders ? state.invoiceHeaders[colIdx] : "";

      if (state.splitRules && typeof parseAndMatchTokens === "function") {
        // 1. Прогоняем строку через наше умное ядро (с очисткой пробелов и слиянием мусора)
        let tokenObjects = parseAndMatchTokens(rawVal, excelHeader || primaryKey);

        if (tokenObjects.length > 0) {
          // 2. Находим Якорь (первое число = индекс 100)
          let anchorIndex = tokenObjects.findIndex(t => /\d/.test(t.cleanText));
          if (anchorIndex === -1) anchorIndex = 0;

          tokenObjects.forEach((tok, idx) => {
              tok.universalIndex = 100 + (idx - anchorIndex);
          });

          // 3. Генерируем новую сигнатуру (N - число, G - мусор)
          const sig = tokenObjects.map(t => {
              if (/\d/.test(t.cleanText)) return 'N';
              let val = String(t.cleanText).trim().toUpperCase();
              if (val === 'X') return 'X';
              if (/[A-ZА-ЯЁ]/i.test(val)) return 'G';
              return val;
          }).join('-');

          // 4. Ищем правило по новой сигнатуре
          let targetIndices = null;
          
          // Проверяем по заголовку колонки Excel
          if (state.splitRules[excelHeader] && state.splitRules[excelHeader][sig]) {
              targetIndices = state.splitRules[excelHeader][sig][primaryKey];
          }
          // Фоллбэк: проверяем по системному ключу (для обратной совместимости)
          if (!targetIndices && state.splitRules[primaryKey] && state.splitRules[primaryKey][sig]) {
              targetIndices = state.splitRules[primaryKey][sig];
          }

          // 5. Если правило найдено, собираем результат по универсальным индексам
          if (targetIndices) {
             let resultArr = [];
             let indicesArray = Array.isArray(targetIndices) ? targetIndices : [targetIndices];
             
             indicesArray.forEach((targetIdx) => {
               // Ищем токен с нужным универсальным индексом
               let matchedTok = tokenObjects.find(t => t.universalIndex === targetIdx);
               if (matchedTok) resultArr.push(matchedTok.text);
             });
             return resultArr.join(""); 
          }
        }
      }
      return rawVal;
    };

    let rawQty = getValue("qty");
    let rawPrice = getValue("price", "cost");
    let rawId = getValue("barcode", "merchant_sku");
    let rawName = getValue("name", "model");

    let qty = parseFloat(rawQty) || 0; // Если пустая или текст - будет 0
    let price = parseFloat(String(rawPrice).replace(",", "."));

    // 🔥 1. БАЗОВЫЙ ФИЛЬТР МУСОРА: Цена должна быть числом больше нуля
    if (isNaN(price) || price <= 0) {
        return; // Пропускаем строку (нет цены -> это шапка, подвал или разделитель)
    }

    // 🔥 2. ФИЛЬТР ТЕХНИЧЕСКИХ ПОДВАЛОВ: Должен быть хоть какой-то идентификатор
    let hasIdentifier = (rawId && String(rawId).trim() !== "") || (rawName && String(rawName).trim() !== "");
    if (!hasIdentifier) {
        return; // Пропускаем строку (есть цифры, но нет ни названия, ни артикула -> это строка "Итого")
    }

    let barcode = /^\d{8,13}$/.test(rawId) ? rawId : "";
    let name = rawName || rawId || "Без названия";

    let rawLogisticsStr = "";
    row.forEach((cellVal, idx) => {
      if (mappedIndices.includes(idx)) return;
      let val = String(cellVal || "").trim();
      if (val && val.length < 30 && !/^\d{8,15}$/.test(val)) {
        rawLogisticsStr += " " + val;
      }
    });

    let rawCbm = getValue("cbm");
    let cbm = rawCbm ? parseFloat(String(rawCbm).replace(",", ".")) : "";
    let rawWeight = getValue("weight");
    let weight = rawWeight ? parseFloat(String(rawWeight).replace(",", ".")) : "";

    let attributesObj = {};
    let itemHasCollisions = false;
    let itemCollisionsList = [];

    const processAttribute = (key) => {
      let lowerKey = String(key).toLowerCase();
      let rawValue = getValue(key);

      // Пропускаем базовые системные поля (они уже обработаны выше)
      if (["qty", "price", "cost", "name", "model", "barcode", "cbm", "weight"].includes(lowerKey)) return;
      if (!rawValue) return;

      let humanName = state.sysToHumanMap ? state.sysToHumanMap[key] : key;
      let searchString = rawValue;

      let dict = window.kaspiDicts && window.kaspiDicts[humanName];
      let hasDictionary = dict && Array.isArray(dict) && dict.length > 0;
      let foundMatch = false;
      let matchedDictValue = searchString; // По умолчанию берем сырое значение

      // 1. Ищем точное совпадение в справочнике Kaspi (если он есть)
      if (hasDictionary) {
        for (let dv of dict) {
          let strDv = String(dv).trim();
          let baseDv = strDv.split("(")[0].trim();
          let isStrictNumber = /^[\d\.]+$/.test(String(searchString).trim());

          if (
            strDv.toLowerCase() === String(searchString).trim().toLowerCase() ||
            baseDv.toLowerCase() === String(searchString).trim().toLowerCase() ||
            (isStrictNumber && !isNaN(parseFloat(baseDv)) && parseFloat(baseDv) === parseFloat(searchString))
          ) {
            matchedDictValue = strDv;
            foundMatch = true;
            break;
          }
        }
      }

      // 2. Логика коллизий (есть словарь, но нет совпадения)
      if (window.currentImportMode === "kaspi" && hasDictionary && !foundMatch) {
        let colIdx = state.colMap[key];
        let excelHeader = colIdx !== undefined && state.invoiceHeaders ? state.invoiceHeaders[colIdx] : "";

        // 🔥 ПРОВЕРКА "БЕЛОГО СПИСКА": Отметил ли клиент эту колонку в интерфейсе?
        let isComplex = window.complexColumnsToTokenize && window.complexColumnsToTokenize.includes(excelHeader);

        // 🔥 ШАГ 1: Проверяем наличие правила СТРОГО ПО СИГНАТУРЕ (чтобы ловить все паттерны колонки)
        let isAlreadyProcessed = false;
        if (state.splitRules) {
            let sigForCheck = "";
            if (typeof parseAndMatchTokens === "function") {
                let tempTokens = parseAndMatchTokens(rawValue, excelHeader || key);
                if (tempTokens.length > 0) {
                    sigForCheck = tempTokens.map(t => {
                        if (/\d/.test(t.cleanText)) return 'N';
                        let val = String(t.cleanText).trim().toUpperCase();
                        if (val === 'X') return 'X';
                        if (/[A-ZА-ЯЁ]/i.test(val)) return 'G';
                        return val;
                    }).join('-');
                }
            }
            
            if (state.splitRules[key] && state.splitRules[key][sigForCheck]) isAlreadyProcessed = true;
            else if (humanName && state.splitRules[humanName] && state.splitRules[humanName][sigForCheck]) isAlreadyProcessed = true;
            else if (excelHeader && state.splitRules[excelHeader] && state.splitRules[excelHeader][sigForCheck]) isAlreadyProcessed = true;
        }

        // Если колонка сложная и еще НЕ прошла Токенизатор -> в карантин
        if (isComplex && !isAlreadyProcessed) {
          itemHasCollisions = true;
          itemCollisionsList.push({
            sysKey: key,
            humanName: humanName,
            rawString: rawValue,
            excelColumnName: excelHeader || "ДАННЫЕ ИЗ НАКЛАДНОЙ",
          });
        } else {
          // Колонка простая (или УЖЕ прошла Токенизатор) -> принудительно сохраняем текст
          attributesObj[key] = rawValue;
        }
        return; // Завершаем обработку для этого поля
      }

      // 3. Сохраняем словарное значение (или оригинальное, если словаря не было)
      attributesObj[key] = matchedDictValue;
    };

    let allKeys = new Set(Object.keys(state.colMap));
    if (state.dictValues) Object.keys(state.dictValues).forEach((k) => allKeys.add(k));
    if (state.splitRules) Object.keys(state.splitRules).forEach((k) => allKeys.add(k));

    allKeys.forEach((key) => processAttribute(key));

    // ⚡ 1. ИЗОЛИРУЕМ ДУБЛИ ДЛЯ ИНТЕРФЕЙСА (но сохраняем оригинальный маппинг)
    let cleanAttributesObj = Object.assign({}, attributesObj);
    delete cleanAttributesObj['Артикул'];
    delete cleanAttributesObj['Название модели'];
    delete cleanAttributesObj['sku'];
    delete cleanAttributesObj['title'];

    let finalAttributes = Object.keys(cleanAttributesObj).length > 0 ? JSON.stringify(cleanAttributesObj) : "";

    const templateDropdown = document.getElementById("kaspiTemplateSelect");
    const activeCategoryText = templateDropdown && templateDropdown.selectedIndex !== -1 
      ? templateDropdown.options[templateDropdown.selectedIndex].text.trim() 
      : "Новые товары";

    // ⚡ 2. ГИБРИДНАЯ СБОРКА ТОВАРА (База + Каспи)
    const itemData = {
      doc_no: state.docNo,
      supplier: state.supplier,
      item_id: rawId,
      item_name: name,
      qty: qty,
      cost: price, // База ждет закупочную цену именно тут
      cbm: cbm,
      weight: weight,
      raw_logistics: rawLogisticsStr.trim(),
      staff_id: typeof currentUser !== "undefined" && currentUser ? currentUser.uid : "Auto-Import",
      id: rawId,
      name: name,
      desc: name,
      description: name,
      barcode: barcode, // 🔥 ИСПРАВЛЕНО: Убрали || rawId. Если штрихкода нет, отправляем пустоту!
      category: activeCategoryText, // Динамическая категория (Текст)
      sku: rawId, // Поле для выгрузки в Каспи
      title: name, // Поле для выгрузки в Каспи
      attributes: finalAttributes,
      _hasCollisions: itemHasCollisions,
      _collisionsList: itemCollisionsList,
      _attributesObj: attributesObj,
    };

    window.parsedInvoiceData.push(itemData);
    window.invoiceGroups[state.docNo].items.push(itemData);

    if (itemHasCollisions) {
      itemCollisionsList.forEach((collision) => {
        const exists = window.mapper2State.quarantine.find(
          (q) => q.rawString === collision.rawString && q.sysKey === collision.sysKey
        );
        if (!exists) {
          window.mapper2State.quarantine.push(collision);
        }
      });
    }
  });

  if (window.parsedInvoiceData.length === 0) {
    return alert("Не удалось сформировать товары. Убедитесь, что в колонках «Количество» и «Цена» находятся ТОЛЬКО цифры.");
  }

  if (window.mapper2State.quarantine && window.mapper2State.quarantine.length > 0) {
    if (typeof window.startTokenizerQueue === "function") {
      window.startTokenizerQueue();
    } else {
      alert("Найдены сложные форматы, но модуль Токенизатора еще не загружен.");
    }
    return;
  }

  window.renderPreviewTable();
  document.getElementById("mapper2Area").style.display = "none";
  document.getElementById("invoicePreviewArea").style.display = "flex";

  if (window.isKaspiExportMode) {
    const sendBtn = document.getElementById("sendInvoiceBtn");
    if (sendBtn) sendBtn.style.display = "none";

    const exportBtns = document.getElementById("exportActionButtons");
    if (exportBtns) exportBtns.style.display = "flex";
  } else {
    // 🔥 ФИКС: Возвращаем зеленую кнопку при обычной приемке
    const sendBtn = document.getElementById("sendInvoiceBtn");
    if (sendBtn) sendBtn.style.display = "flex"; // или "block", в зависимости от твоей верстки

    const exportBtns = document.getElementById("exportActionButtons");
    if (exportBtns) exportBtns.style.display = "none";
  }
};

// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ РЕДАКТОРА ===
window.currentEditIndex = null;
window.tempAttrs = {};
window.applyToAllMap = {};
window.currentFieldDict = [];

// === ОТРИСОВКА ГЛАВНОЙ ТАБЛИЦЫ ===
window.renderPreviewTable = function () {
  const state = window.mapper2State;
  const t = translations[currentLang] || translations["ru"];

  // Запускаем авто-дописывание параметров перед рендером
  window.autoCleanInvoiceAttributes();

  // Скрываем вкладки и валюту по их ID
  const tabs = document.getElementById("mapperTabsContainer");
  if (tabs) tabs.style.display = "none";

  const currency = document.getElementById("mapperCurrencyBlock");
  if (currency) currency.style.display = "none";

  const supplierI18nAttr = !state.supplier
    ? `data-i18n="inc_not_specified"`
    : "";

  document.getElementById("invoiceMetadata").innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; padding: 10px; background: var(--bg-panel); border-radius: 8px; border: 1px solid var(--border-light);">
            <div><span data-i18n="inc_supplier" style="color:var(--text-muted);">${t.inc_supplier || "Пост:"}</span> <b ${supplierI18nAttr} style="color:var(--accent-yellow);">${state.supplier || t.inc_not_specified || "Не указан"}</b></div>
            <div><span data-i18n="inc_doc_short" style="color:var(--text-muted);">${t.inc_doc_short || "Док:"}</span> <b style="color:var(--accent-yellow);">${state.docNo}</b></div>
            <div><span data-i18n="inc_pos" style="color:var(--text-muted);">${t.inc_pos || "Поз:"}</span> <b style="color:var(--accent-yellow);">${window.parsedInvoiceData.length}</b></div>
        </div>
    `;

  document.getElementById("invoiceTableBody").innerHTML =
    window.parsedInvoiceData
      .map((item, index) => {
        let attrsHtml = "";
        if (item.attributes) {
          try {
            let parsed = JSON.parse(item.attributes);
            attrsHtml =
              `<div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px;">` +
              Object.keys(parsed)
                .map((k) => {
                  let humanName = window.mapper2State.sysToHumanMap
                    ? window.mapper2State.sysToHumanMap[k]
                    : null;
                  let displayKey =
                    humanName ||
                    k
                      .split("*")
                      .pop()
                      .replace(/tires/gi, "")
                      .replace(/additional/gi, "")
                      .replace(/general/gi, "")
                      .replace(/\./g, "")
                      .trim();
                  if (!displayKey) displayKey = k;

                  let val = parsed[k];
                  if (val.length > 30) val = val.substring(0, 30) + "...";

                  return `<div style="font-size: 11px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); padding: 6px 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; line-height: 1.3;">
                            <span style="color:var(--text-muted); flex: 1;">${displayKey}:</span> 
                            <b style="color:var(--accent-green); text-align: right; max-width: 55%; word-break: break-word;">${val}</b>
                        </div>`;
                })
                .join("") +
              `</div>`;
          } catch (e) {}
        }

        // ИСПРАВЛЕНИЕ: Разбиваем товар на две строки.
        // Первая строка: Название, Код, Количество, Цена.
        // Вторая строка (colspan="2"): Параметры и кнопка, растянутые на всю ширину.
        return `
        <tr>
            <td class="col-main" style="padding:12px 8px 4px 8px; vertical-align: top; border-bottom: none;">
                <div style="font-weight:bold; font-size:13px; line-height:1.2;">${item.item_name}</div>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
                    <span style="color:var(--accent-blue); font-weight:bold; font-size:11px;">Код: ${item.item_id || "AUTO"}</span>
                    ${!item.barcode ? `<span style="font-size:9px; color:var(--accent-green); background: rgba(46, 204, 113, 0.1); padding: 2px 6px; border-radius: 4px; font-weight: bold;">+ EAN-13</span>` : ""}
                </div>
            </td>
            <td class="col-min" style="padding:12px 8px 4px 8px; vertical-align: top; text-align:right; width: 70px; border-bottom: none;">
                <div style="font-size:12px; color:var(--text-muted); margin-bottom: 4px;">${Number(item.qty).toLocaleString("ru-RU")}</div>
                <div style="font-size:13px; font-weight:bold; color:var(--accent-yellow);">${Number(item.cost).toLocaleString("ru-RU")}</div>
            </td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-light);">
            <td colspan="2" style="padding: 0 8px 12px 8px; border-top: none;">
                ${attrsHtml}
                <button onclick="window.openEditorMain(${index})" style="width: 100%; background: rgba(128,128,128,0.05); border: 1px dashed var(--border-light); color: var(--text-muted); cursor: pointer; border-radius: 4px; font-size: 11px; margin-top: 10px; padding: 10px;">
                    ✏️️ <span data-i18n="inc_edit_params">${t.inc_edit_params || "Изменить параметры"}</span>
                </button>
            </td>
        </tr>`;
      })
      .join("");

  // === ЛОГИКА ДЛЯ РЕЖИМА ЭКСПОРТА ===
    if (window.isKaspiExportMode) {
        // 1. Прячем кнопку "Оприходовать"
        const sendBtn = document.getElementById("sendInvoiceBtn");
        if (sendBtn) sendBtn.style.display = "none";
        
        // 2. Ищем белую системную кнопку "Назад / Артқа" ВЕЗДЕ и убиваем её
        const allBtns = document.querySelectorAll('button');
        allBtns.forEach(b => {
            const txt = b.innerText.trim().toUpperCase();
            if (txt === 'НАЗАД' || txt === 'АРТҚА') {
                b.style.display = 'none';
            }
        });

        const step3 = document.getElementById("invoicePreviewArea");
        const exportBtns = document.getElementById("exportActionButtons");
        
        // 3. Настраиваем контейнер с кнопками экспорта
        if (exportBtns && step3) {
            exportBtns.style.display = "flex";
            exportBtns.style.flexDirection = "column"; 
            exportBtns.style.gap = "10px"; 
            step3.appendChild(exportBtns);
            
            // --- СОЗДАЕМ КНОПКУ ПОЛНОГО СБРОСА ---
            let resetBtn = document.getElementById('kaspiResetExportBtn');
            if (!resetBtn) {
                resetBtn = document.createElement('button');
                resetBtn.id = 'kaspiResetExportBtn';
                
                resetBtn.style.background = 'var(--btn-danger-bg, #ef4444)';
                resetBtn.style.color = 'var(--btn-danger-text, #ffffff)';
                resetBtn.style.border = '1px solid var(--btn-danger-border, #dc2626)';
                
                // ИСПРАВЛЕНИЕ 1: Увеличили padding и задали минимальную высоту
                resetBtn.style.padding = '12px 15px'; 
                resetBtn.style.minHeight = '42px';
                
                resetBtn.style.borderRadius = '6px';
                resetBtn.style.fontWeight = 'bold';
                resetBtn.style.cursor = 'pointer';
                resetBtn.style.width = '100%'; 
                resetBtn.style.boxSizing = 'border-box';
                
                resetBtn.setAttribute('data-i18n', 'kaspi_reset_invoice');
                resetBtn.innerText = '🔄 ПЕРЕЗАЛИТЬ НАКЛАДНУЮ (СБРОС)'; 
                
                resetBtn.onclick = function(e) {
                    e.preventDefault();
                    
                    let confirmMsg = 'Очистить таблицу и загрузить накладную заново?';
                    if (typeof window.t === 'function') {
                        confirmMsg = window.t('kaspi_reset_confirm') || confirmMsg;
                    } else {
                        const translatedEl = document.querySelector('[data-i18n="kaspi_reset_confirm"]');
                        if (translatedEl) confirmMsg = translatedEl.innerText;
                    }

                    if (!confirm(confirmMsg)) return;
                    
                    // 1. Стираем из памяти старые/кривые данные маппинга
                    window.parsedInvoiceData = [];
                    window.kaspiExportItems = [];
                    if (window.mapper2State) window.mapper2State.colMap = {};
                    
                    // 2. ИДЕАЛЬНЫЙ СБРОС: 
                    // Просто запускаем функцию открытия заново для этой же партии,
                    // передав isExported = false (как будто это новая синяя карточка)
                    if (window.currentExportHash) {
                        window.handleCardSelectForExport(window.currentExportHash, null, false);
                    }
                };
                
                exportBtns.appendChild(resetBtn);
                
                if (typeof window.applyTranslations === 'function') window.applyTranslations();
                else if (typeof window.updateLanguage === 'function') window.updateLanguage();
            }
        }
    }
};

// === 1. ГЛАВНОЕ ОКНО РЕДАКТИРОВАНИЯ ===
window.openEditorMain = function (index) {
  window.currentEditIndex = index;
  let item = window.parsedInvoiceData[index];
  window.tempAttrs = {};
  window.applyToAllMap = {};
  if (item.attributes) {
    try {
      window.tempAttrs = JSON.parse(item.attributes);
    } catch (e) {}
  }
  renderEditorMainUI(item);
};

window.renderEditorMainUI = function (item) {
  const t = translations[currentLang] || {};

  // 1. СТРОГИЙ СБОР КЛЮЧЕЙ (ТОЛЬКО из шаблона и накладной, без искусственных полей!)
  let allKeys = new Set();

  if (window.mapper2State && window.mapper2State.sysToHumanMap) {
    Object.keys(window.mapper2State.sysToHumanMap).forEach((k) =>
      allKeys.add(k),
    );
  }
  if (window.tempAttrs) {
    Object.keys(window.tempAttrs).forEach((k) => allKeys.add(k));
  }

  let dicts =
    window.kaspiDicts ||
    (window.mapper2State && window.mapper2State.dictionary) ||
    {};

  let mandatoryEmpty = [];
  let mandatoryFilled = [];
  let optionalEmpty = [];
  let optionalFilled = [];

  if (!window.applyToAllMap) window.applyToAllMap = {};

  Array.from(allKeys).forEach((k) => {
    let rawVal = window.tempAttrs ? window.tempAttrs[k] : "";
    if (
      rawVal === "undefined" ||
      rawVal === "null" ||
      rawVal === null ||
      rawVal === undefined
    )
      rawVal = "";
    let val = String(rawVal).trim();

    let humanName =
      window.mapper2State && window.mapper2State.sysToHumanMap
        ? window.mapper2State.sysToHumanMap[k]
        : null;

    let displayKey =
      humanName ||
      k
        .split("*")
        .pop()
        .replace(/tires/gi, "")
        .replace(/additional/gi, "")
        .replace(/general/gi, "")
        .replace(/\./g, "")
        .trim();
    if (!displayKey) displayKey = k;
    let cleanDisplayKey = displayKey.replace("*", "").trim();
    let lowerDisp = cleanDisplayKey.toLowerCase();
    let lowerK = k.toLowerCase();

    // Автозаполнение только для Названия товара (если оно реально есть в шаблоне Каспи)
    if (val === "" && item) {
      if (
        lowerK === "name" ||
        lowerDisp === "название товара" ||
        lowerDisp === "наименование"
      ) {
        val = item.item_name || item.name || item.title || "";
      }
    }

    let isReq = false;
    let prevCard = document.querySelector(`.req-card[onclick*="'${k}'"]`);
    if (prevCard && prevCard.querySelector(".required")) {
      isReq = true;
    }

    // Принудительно обязательные только самые важные
    if (lowerDisp === "бренд" || lowerDisp === "артикул") {
      isReq = true;
    }

    let isSku = lowerK.includes("sku") || lowerDisp === "артикул";
    let isDict = dicts[cleanDisplayKey] && dicts[cleanDisplayKey].length > 0;

    // РОДНАЯ ЛОГИКА POS NOIR: если ключ есть в объекте, значит галочка стоит
    let isGlobal = window.applyToAllMap[k] !== undefined;

    if (isSku && val === "") {
      val = t.inc_auto_fill || "Заполняется автоматически";
    }

    let isEmpty = val === "";
    let fieldObj = {
      k: k,
      cleanDisplayKey: cleanDisplayKey,
      val: val,
      isGlobal: isGlobal,
      isSku: isSku,
      isReq: isReq,
      isDict: isDict,
      previewVal:
        String(val).length > 30 ? String(val).substring(0, 30) + "..." : val,
    };

    if (isReq) {
      if (isEmpty) mandatoryEmpty.push(fieldObj);
      else mandatoryFilled.push(fieldObj);
    } else {
      if (isEmpty) optionalEmpty.push(fieldObj);
      else optionalFilled.push(fieldObj);
    }
  });

  // 2. ФУНКЦИЯ ОТРИСОВКИ СПИСКА
  const renderList = (fields) => {
    let html = "";
    fields.forEach((f) => {
      let reqStar = f.isReq
        ? `<span style="color:#ff4444; margin-left:4px; font-weight:bold; font-size:16px;">*</span>`
        : "";

      let applyAllText = t.inc_apply_all_badge
        ? String(t.inc_apply_all_badge).toUpperCase()
        : "КО ВСЕМ";
      applyAllText = applyAllText.replace(/[✓✔]/g, "").trim();

      let applyAllBadge = f.isGlobal
        ? `<span style="background:rgba(50, 157, 250, 0.15); color:var(--accent-blue); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold; margin-left: 8px; display:inline-flex; align-items:center; gap:3px;">✓ ${applyAllText}</span>`
        : "";

      let rightSideHtml = "";

      if (f.val) {
        let displayVal = f.isSku
          ? t.inc_auto_fill || "Заполняется автоматически"
          : f.previewVal;
        rightSideHtml = `
                  <div style="border: 1px solid #4CAF50; color: #4CAF50; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: ${f.isSku ? "0" : "8px"};">
                      ✓ ${displayVal}
                  </div>
              `;
      } else {
        let actionText = f.isDict
          ? t.inc_dict_badge || "Справочник"
          : t.inc_input_badge || "Ввод";
        rightSideHtml = `
                  <div style="border: 1px solid #ff4444; color: #ff4444; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-right: 8px;">
                      ${actionText}
                  </div>
              `;
      }

      let onclickAttr = f.isSku
        ? ""
        : `onclick="window.openEditorField('${f.k}')"`;
      let rowStyle = f.isSku
        ? "background: rgba(0,0,0,0.1); opacity: 0.6; cursor: not-allowed; pointer-events: none;"
        : "background: transparent; cursor: pointer; transition: background 0.2s;";
      let arrowIcon = f.isSku
        ? ""
        : `<div style="color:var(--text-muted); font-size:18px;">&#10095;</div>`;

      html += `
          <div class="param-row" ${onclickAttr} style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid var(--border-light, rgba(128,128,128,0.2)); ${rowStyle}">
              <div style="flex: 1; min-width: 0; padding-right: 15px; display:flex; align-items:center;">
                  <div style="font-size:14px; color:var(--text-main); font-weight:bold; text-transform:uppercase; display:flex; align-items:center; flex-wrap:wrap;">
                      <span>${f.cleanDisplayKey}${reqStar}</span> ${applyAllBadge}
                  </div>
              </div>
              <div style="flex-shrink: 0; display:flex; align-items:center;">
                  ${rightSideHtml}
                  ${arrowIcon}
              </div>
          </div>`;
    });
    return html;
  };

  // 3. СКЛЕИВАЕМ БЛОКИ
  let finalHtml = "";
  let mandatoryAll = mandatoryEmpty.concat(mandatoryFilled);
  let optionalAll = optionalEmpty.concat(optionalFilled);

  if (mandatoryAll.length > 0) {
    finalHtml +=
      `
      <div style="padding: 24px 16px 8px; font-size: 11px; color: #ff4444; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; text-align: left; display: flex; align-items: center; gap: 6px; background: rgba(255,68,68,0.05);">
        <div style="width:8px; height:8px; border-radius:50%; background:#ff4444;"></div> ${t.inc_mandatory_params || "Обязательные параметры"}
      </div>` + renderList(mandatoryAll);
  }

  if (optionalAll.length > 0) {
    finalHtml +=
      `
      <div style="padding: 24px 16px 8px; font-size: 11px; color: var(--accent-blue); text-transform: uppercase; font-weight: bold; letter-spacing: 1px; text-align: left; display: flex; align-items: center; gap: 6px; background: rgba(50,157,250,0.05);">
        <div style="width:8px; height:8px; border-radius:50%; background:var(--accent-blue);"></div> ${t.inc_optional_params || "Дополнительные параметры"}
      </div>` + renderList(optionalAll);
  }

  let modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modalContainer";
    document.body.appendChild(modalContainer);
  }

  // === ИСПРАВЛЕНИЕ: Добавлен event.stopPropagation() в кнопки Отмена и Готово ===
  modalContainer.innerHTML = `
        <div id="editorMainModal" class="kaspi-modal-overlay">
            <div class="kaspi-modal-header">
                <span onclick="event.stopPropagation(); document.getElementById('modalContainer').innerHTML='';" style="color:var(--text-muted); font-size:16px; cursor:pointer;">${t.inc_cancel || "Отмена"}</span>
                <b style="font-size:16px; color:var(--text-main);">${t.inc_item_params || "Параметры"}</b>
                <span onclick="event.stopPropagation(); window.saveAllEdits();" style="color:var(--accent-green); font-size:16px; font-weight:bold; cursor:pointer;">${t.inc_ready || "Готово"}</span>
            </div>
            <div class="kaspi-modal-subheader">
                <div style="color:var(--accent-blue); font-weight:bold; font-size:14px;">${item.item_name || item.name || ""}</div>
            </div>
            <div style="flex:1; overflow-y:auto; background:var(--bg-body);">
                ${finalHtml || `<div style="padding:20px; text-align:center; color:var(--text-muted);">${t.inc_no_params || "Нет доступных параметров"}</div>`}
            </div>
        </div>
    `;
};

window.saveAllEdits = function () {
  let item = window.parsedInvoiceData[window.currentEditIndex];
  item.attributes =
    Object.keys(window.tempAttrs).length > 0
      ? JSON.stringify(window.tempAttrs)
      : "";

  // ИСПРАВЛЕНИЕ: Пытаемся обновить invoiceGroups ТОЛЬКО если мы не в режиме экспорта
  if (
    !window.isKaspiExportMode &&
    window.invoiceGroups &&
    item.doc_no &&
    window.invoiceGroups[item.doc_no]
  ) {
    window.invoiceGroups[item.doc_no].items[
      window.currentEditIndex
    ].attributes = item.attributes;
  }

  if (Object.keys(window.applyToAllMap).length > 0) {
    window.parsedInvoiceData.forEach((row, rIdx) => {
      if (rIdx === window.currentEditIndex) return;
      let rowAttrs = {};
      try {
        if (row.attributes) rowAttrs = JSON.parse(row.attributes);
      } catch (e) {}
      Object.keys(window.applyToAllMap).forEach((globalKey) => {
        rowAttrs[globalKey] = window.applyToAllMap[globalKey];
      });
      row.attributes = JSON.stringify(rowAttrs);

      // ИСПРАВЛЕНИЕ: Массовое обновление для групп тоже защищаем
      if (
        !window.isKaspiExportMode &&
        window.invoiceGroups &&
        row.doc_no &&
        window.invoiceGroups[row.doc_no]
      ) {
        window.invoiceGroups[row.doc_no].items[rIdx].attributes =
          row.attributes;
      }
    });
  }

  document.getElementById("modalContainer").innerHTML = "";
  window.renderPreviewTable();
};

// === 2. ПОЛНОЭКРАННОЕ ОКНО ПРАВКИ ОДНОГО ПОЛЯ ===
window.openEditorField = function (originalKey) {
  const t = translations[currentLang] || {};
  let val = window.tempAttrs[originalKey] || "";

  let humanName = window.mapper2State.sysToHumanMap
    ? window.mapper2State.sysToHumanMap[originalKey]
    : null;
  let displayKey =
    humanName ||
    originalKey
      .split("*")
      .pop()
      .replace(/tires/gi, "")
      .replace(/additional/gi, "")
      .replace(/general/gi, "")
      .replace(/\./g, "")
      .trim();
  if (!displayKey) displayKey = originalKey;

  // === 1. ПАРСИНГ ЛИМИТОВ ИЗ НАЗВАНИЯ ===
  let minChars = 0;
  let maxChars = 0;

  // Ищем "мин" и забираем цифры (игнорируя пробелы, например "7 000")
  let minMatch = displayKey.match(/мин[^\d]*(\d[\d\s]*)/i);
  if (minMatch) minChars = parseInt(minMatch[1].replace(/\s/g, ""));

  // Ищем "макс" и забираем цифры
  let maxMatch = displayKey.match(/макс[^\d]*(\d[\d\s]*)/i);
  if (maxMatch) maxChars = parseInt(maxMatch[1].replace(/\s/g, ""));

  let dict = null;
  if (window.kaspiDicts) {
    let cleanOrig = originalKey.toLowerCase().trim();
    let cleanDisp = displayKey.toLowerCase().trim();
    let targetDictKey = humanName ? humanName.toLowerCase().trim() : cleanDisp;

    let foundKey = Object.keys(window.kaspiDicts).find((dk) => {
      let cleanDk = dk.toLowerCase().trim();
      return (
        cleanDk === targetDictKey ||
        cleanDk === cleanOrig ||
        cleanDk === cleanDisp
      );
    });

    if (foundKey) dict = window.kaspiDicts[foundKey];
  }

  if (dict && !Array.isArray(dict)) {
    if (typeof dict === "object") dict = Object.values(dict);
  }

  // РОДНАЯ ЛОГИКА POS NOIR: проверяем строго на !== undefined
  if (!window.applyToAllMap) window.applyToAllMap = {};
  let isGlobal = window.applyToAllMap[originalKey] !== undefined;

  let controlHtml = "";
  let listHtml = "";

  let clearBtnHtml = `
      <div onclick="window.clearSingleField('${originalKey}')" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-top:10px; padding:12px; background:rgba(255,68,68,0.1); color:#ff4444; border-radius:8px; border:1px solid rgba(255,68,68,0.3); font-size:14px; font-weight:bold; cursor:pointer; transition:background 0.2s;">
          <span>✖</span> ${t.inc_clear_selection || "Очистить выбор"}
      </div>`;

  window.clearSingleField = function (key) {
    let input = document.getElementById("singleFieldInput");
    if (input) input.value = "";
    let applyAll = document.getElementById("singleFieldApplyAll");
    if (applyAll) applyAll.checked = false;
    window.saveSingleField(key);
  };

  // === 2. ГЛОБАЛЬНАЯ ФУНКЦИЯ ВАЛИДАЦИИ (С ПЕРЕВОДАМИ) ===
  window.validateAndSaveField = function (key, min, max) {
    let input = document.getElementById("singleFieldInput");
    if (!input) return window.saveSingleField(key);

    let len = input.value.trim().length;
    if (len > 0) {
      if (min > 0 && len < min) {
        return alert(
          (t.err_min_chars || "Слишком коротко! Минимум символов: ") + min,
        );
      }
      if (max > 0 && len > max) {
        return alert(
          (t.err_max_chars || "Превышен лимит! Максимум символов: ") + max,
        );
      }
    }
    window.saveSingleField(key);
  };

  // === 3. ЛОГИКА СЧЕТЧИКА ===
  let counterHtml = "";
  let onInputAttr = "";

  window.updateCharCount = function (min, max) {
    let el = document.getElementById("singleFieldInput");
    let counter = document.getElementById("charCounterSpan");
    if (!el || !counter) return;

    let len = el.value.trim().length;
    let color = "var(--text-muted)";

    if (min > 0 && len > 0 && len < min) color = "#ff4444";
    else if (max > 0 && len > max) color = "#ff4444";
    else if (len > 0) color = "var(--accent-green)";

    counter.style.color = color;
    counter.innerText = len + (max > 0 ? " / " + max : "");
  };

  if (minChars > 0 || maxChars > 0) {
    // Счетчик будет размещен в шапке
    counterHtml = `<div id="charCounterSpan" style="font-size: 11px; font-weight: bold; color: var(--text-muted); margin-top: 2px;">0</div>`;
    onInputAttr = `oninput="window.updateCharCount(${minChars}, ${maxChars})"`;
  }

  if (dict && dict.length > 0) {
    window.currentFieldDict = dict;
    controlHtml = `
        <div style="padding:15px 20px 10px 20px; background:var(--bg-body); flex-shrink:0; z-index:2; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            <input type="text" id="singleFieldInput" class="kaspi-input-field" value="${val.replace(/"/g, "&quot;")}" 
                placeholder="${t.inc_search_enter || "Поиск..."}"
                onfocus="this.select()"
                oninput="window.filterDictList(this)">
            
            <label style="display:flex; align-items:center; gap:10px; margin-top:15px; padding:15px; background:var(--bg-panel); border-radius:8px; border:1px solid var(--border-light); cursor:pointer;">
                <input type="checkbox" id="singleFieldApplyAll" ${isGlobal ? "checked" : ""} style="width:20px; height:20px;">
                <span style="font-size:14px; color:var(--text-main);">${t.inc_apply_all || "Применить ко всем товарам"}</span>
            </label>
            ${clearBtnHtml}
        </div>`;

    listHtml = `
        <div style="flex:1; overflow-y:auto; padding: 10px 20px 20px 20px; -webkit-overflow-scrolling: touch;">
            <ul id="dictList" style="list-style:none; padding:0; margin:0; background:var(--bg-panel); border-radius:8px; border:1px solid var(--border-light);">
                ${dict
                  .map(
                    (
                      d,
                    ) => `<li onclick="window.selectPreviewDictValue('${String(d).replace(/'/g, "\\'")}')" class="param-row">
                    <span style="color:var(--text-main);">${d}</span>${d === val ? `<span style="color:var(--accent-blue);">✔</span>` : ""}
                </li>`,
                  )
                  .join("")}
            </ul>
        </div>`;
  } else {
    controlHtml = `
        <div style="padding:15px 20px 10px 20px; background:var(--bg-body); flex-shrink:0; z-index:2;">
            <label style="display:flex; align-items:center; gap:10px; padding:15px; background:var(--bg-panel); border-radius:8px; border:1px solid var(--border-light); cursor:pointer;">
                <input type="checkbox" id="singleFieldApplyAll" ${isGlobal ? "checked" : ""} style="width:20px; height:20px;">
                <span style="font-size:14px; color:var(--text-main);">${t.inc_apply_all || "Применить ко всем товарам"}</span>
            </label>
            ${clearBtnHtml}
        </div>`;

    listHtml = `
        <div style="flex:1; overflow-y:auto; padding: 10px 20px 20px 20px; display:flex; flex-direction:column; -webkit-overflow-scrolling: touch;">
            <textarea id="singleFieldInput" class="kaspi-input-field" placeholder="${displayKey}..." 
                ${onInputAttr}
                style="flex:1; min-height:250px; resize:none; line-height:1.5; font-family:inherit;">${val}</textarea>
        </div>`;
  }

  let fieldModal = document.createElement("div");
  fieldModal.id = "editorFieldModal";
  fieldModal.className = "kaspi-modal-overlay";

  // === 4. ВЫРАВНИВАНИЕ ХЕДЕРА И ВСТРОЙКА СЧЕТЧИКА ===
  fieldModal.innerHTML = `
        <div class="kaspi-modal-header" style="display: flex; align-items: center; justify-content: space-between;">
            <span onclick="document.getElementById('editorFieldModal').remove()" style="color:var(--accent-blue); font-size:16px; cursor:pointer; display:flex; align-items:center; gap:5px; flex-shrink: 0;">
                <span style="font-size:20px; margin-top:-2px;">&#10094;</span> 
            </span>
            <div style="flex: 1; display: flex; flex-direction: column; text-align: left; padding: 0 10px; overflow: hidden;">
                <b style="font-size:14px; color:var(--text-main); text-transform:uppercase; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${displayKey}</b>
                ${counterHtml}
            </div>
            <span onclick="window.validateAndSaveField('${originalKey}', ${minChars}, ${maxChars})" style="color:var(--accent-green); font-size:16px; font-weight:bold; cursor:pointer; flex-shrink: 0;">${t.inc_save || "OK"}</span>
        </div>
        ${controlHtml}
        ${listHtml}
    `;
  document.getElementById("modalContainer").appendChild(fieldModal);

  // Инициализируем счетчик при открытии
  if (minChars > 0 || maxChars > 0) {
    setTimeout(() => {
      if (window.updateCharCount) window.updateCharCount(minChars, maxChars);
    }, 10);
  }
};

// === АЛГОРИТМ УМНОГО ПОИСКА ===
window.filterDictList = function (input) {
  let filter = input.value.toLowerCase().trim();
  let ul = document.getElementById("dictList");
  if (!ul) return;

  let dict = window.currentFieldDict || [];

  if (!filter) {
    ul.innerHTML = dict
      .map(
        (
          d,
        ) => `<li onclick="window.selectPreviewDictValue('${d.replace(/'/g, "\\'")}')" class="param-row">
            <span style="color:var(--text-main);">${d}</span>
        </li>`,
      )
      .join("");
    return;
  }

  let startsWith = [];
  let wordStart = [];
  let includes = [];
  let safeFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let highlightRegex = new RegExp(`(${safeFilter})`, "gi");

  dict.forEach((d) => {
    let lowerD = d.toLowerCase();
    let highlightedD = d.replace(
      highlightRegex,
      '<b style="color:var(--accent-yellow);">$1</b>',
    );

    let liHtml = `<li onclick="window.selectPreviewDictValue('${d.replace(/'/g, "\\'")}')" class="param-row">
            <span style="color:var(--text-main);">${highlightedD}</span>
        </li>`;

    if (lowerD.startsWith(filter)) {
      startsWith.push(liHtml);
    } else if (new RegExp(`(^|[\\s\\/\\-\\_])` + safeFilter).test(lowerD)) {
      wordStart.push(liHtml);
    } else if (lowerD.includes(filter)) {
      includes.push(liHtml);
    }
  });

  ul.innerHTML = [...startsWith, ...wordStart, ...includes].join("");
};

window.selectPreviewDictValue = function (val) {
  document.getElementById("singleFieldInput").value = val;
};

window.saveSingleField = function (originalKey) {
  let newVal = document.getElementById("singleFieldInput").value.trim();
  let applyAll = document.getElementById("singleFieldApplyAll").checked;

  window.tempAttrs[originalKey] = newVal;

  if (applyAll) {
    window.applyToAllMap[originalKey] = newVal;
  } else {
    delete window.applyToAllMap[originalKey];
  }

  document.getElementById("editorFieldModal").remove();
  window.renderEditorMainUI(window.parsedInvoiceData[window.currentEditIndex]);
};

window.openAttributeEditor = function (index) {
  let item = window.parsedInvoiceData[index];
  let currentAttrs = {};

  if (item.attributes) {
    try {
      currentAttrs = JSON.parse(item.attributes);
    } catch (e) {}
  }

  let attrString = Object.keys(currentAttrs)
    .map((k) => `${k}: ${currentAttrs[k]}`)
    .join("\n");

  // Создаем красивую HTML-модалку, если ее еще нет
  let modal = document.getElementById("attrEditModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "attrEditModal";
    modal.style.cssText =
      "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:999999; display:flex; align-items:center; justify-content:center; padding: 20px; box-sizing:border-box; backdrop-filter:blur(3px);";
    modal.innerHTML = `
            <div style="background:var(--bg-panel, #222); width:100%; max-width:400px; border-radius:10px; display:flex; flex-direction:column; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="padding:15px; border-bottom:1px solid var(--border-light, #333); display:flex; justify-content:space-between; align-items:center;">
                    <b style="color:var(--text-main, #fff); font-size: 15px;">Параметры товара</b>
                    <span onclick="document.getElementById('attrEditModal').style.display='none'" style="cursor:pointer; color:#888; font-size:24px; line-height:1;">&times;</span>
                </div>
                <div style="padding:15px;">
                    <div id="attrEditName" style="color:var(--accent-blue); font-weight:bold; font-size:13px; margin-bottom:10px; word-break:break-word;"></div>
                    <p style="color:#aaa; font-size:11px; margin-bottom:10px; line-height: 1.4;">Введите параметры в формате <b>Ключ: Значение</b> (каждый с новой строки).<br>Например:<br>Шипованность: Да<br>Сезонность: Летняя</p>
                    <textarea id="attrEditTextarea" rows="6" style="width:100%; padding:10px; background:#111; color:#fff; border:1px solid #444; border-radius:6px; font-family:monospace; font-size:13px; outline:none; box-sizing:border-box; resize:none;"></textarea>
                </div>
                <div style="padding:15px; border-top:1px solid var(--border-light, #333); display:flex; gap:10px;">
                    <button onclick="document.getElementById('attrEditModal').style.display='none'" style="flex:1; padding:10px; background:#333; color:#fff; border:none; border-radius:6px; cursor:pointer;">Отмена</button>
                    <button id="attrEditSaveBtn" style="flex:1; padding:10px; background:var(--accent-green, #4CAF50); color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Сохранить</button>
                </div>
            </div>
        `;
    document.body.appendChild(modal);
  }

  // Заполняем модалку данными текущего товара
  document.getElementById("attrEditName").innerText = item.item_name;
  document.getElementById("attrEditTextarea").value = attrString;
  modal.style.display = "flex";

  // Обработчик сохранения
  document.getElementById("attrEditSaveBtn").onclick = function () {
    let result = document.getElementById("attrEditTextarea").value;
    let newAttrs = {};

    result.split("\n").forEach((line) => {
      let parts = line.split(":");
      if (parts.length >= 2) {
        let key = parts[0].trim();
        let val = parts.slice(1).join(":").trim();
        if (key && val) newAttrs[key] = val;
      }
    });

    item.attributes =
      Object.keys(newAttrs).length > 0 ? JSON.stringify(newAttrs) : "";
    window.invoiceGroups[item.doc_no].items[index].attributes = item.attributes;

    window.renderPreviewTable();
    modal.style.display = "none";
  };
};

window.editRowAttributes = function (index) {
  let item = window.parsedInvoiceData[index];
  let currentAttrs = {};
  if (item.attributes) {
    try {
      currentAttrs = JSON.parse(item.attributes);
    } catch (e) {}
  }

  // Здесь мы используем стандартный prompt браузера для быстрого редактирования.
  // Если нужно добавить новое поле (например, Шипы), пишем "Шипованность: Да".
  let attrString = Object.keys(currentAttrs)
    .map((k) => `${k}: ${currentAttrs[k]}`)
    .join("\n");

  let result = prompt(
    `Редактирование параметров для:\n${item.item_name}\n\nВведите параметры в формате "Ключ: Значение" (каждый с новой строки). Например:\nШипованность: Да\nRunFlat: Нет`,
    attrString,
  );

  if (result !== null) {
    let newAttrs = {};
    result.split("\n").forEach((line) => {
      let parts = line.split(":");
      if (parts.length >= 2) {
        let key = parts[0].trim();
        let val = parts.slice(1).join(":").trim();
        if (key && val) newAttrs[key] = val;
      }
    });

    // Обновляем данные в массиве и перерисовываем таблицу
    item.attributes =
      Object.keys(newAttrs).length > 0 ? JSON.stringify(newAttrs) : "";
    window.invoiceGroups[item.doc_no].items[index].attributes = item.attributes;

    window.renderPreviewTable();
  }
};

// Функция возврата к настройкам маппера (переопределяем старую)
window.showMapperArea = function () {
  document.getElementById("mapper2Area").style.display = "flex";
  document.getElementById("invoicePreviewArea").style.display = "none";
};

// === ФУНКЦИЯ-СБОРЩИК МЕТАДАННЫХ ДЛЯ KASPI (ИСПРАВЛЕННАЯ) ===
window.buildKaspiExportMetadata = function() {
    let complexParams = window.kaspiComplexParamsState || {};
    
    if (window.mapper2State) {
        complexParams.splitRules = window.mapper2State.splitRules || complexParams.splitRules || {};
        complexParams.dictValues = window.mapper2State.dictValues || complexParams.dictValues || {};
    }

    let finalMapping = {};
    if (window.mapper2State && window.mapper2State.colMap) {
        for (let key in window.mapper2State.colMap) {
            let val = window.mapper2State.colMap[key];
            if (window.isKaspiExportMode && val !== "" && val !== null && !isNaN(val)) {
                finalMapping[key] = key; 
            } else {
                finalMapping[key] = val;
            }
        }
    }

    return JSON.stringify({
        raw_headers: window.rawExcelHeaders || [], 
        saved_mapping: finalMapping,
        saved_complex_params: complexParams 
    });
};

async function sendInvoiceToBackend() {
  if (!window.parsedInvoiceData || window.parsedInvoiceData.length === 0)
    return alert(translations[currentLang].inc_empty_cart);

  const docKeys = Object.keys(window.invoiceGroups);
  const docInput = document.getElementById("ui-doc-no");

  if (docKeys.length === 1 && docInput) {
    const finalDocNo = docInput.value.trim();
    if (!finalDocNo) return alert(translations[currentLang].inc_doc_empty);
    if (finalDocNo !== docKeys[0]) {
      window.invoiceGroups[finalDocNo] = window.invoiceGroups[docKeys[0]];
      delete window.invoiceGroups[docKeys[0]];
      window.invoiceGroups[finalDocNo].items.forEach((i) => (i.doc_no = finalDocNo));
    }
  }

  // ⚡ ПОЛУЧАЕМ ТЕКСТ И ХЭШ ШАБЛОНА ДЛЯ БАЗЫ И МАРКЕТА
const templateDropdown = document.getElementById("kaspiTemplateSelect");
let selectedCategory = "";
let selectedHash = "";

if (templateDropdown && templateDropdown.selectedIndex !== -1) {
  const opt = templateDropdown.options[templateDropdown.selectedIndex];
  selectedCategory = opt.text.trim();
  // Жестко забираем хэш напрямую из атрибутов, чтобы браузер не подсунул текст
  selectedHash = opt.getAttribute("data-hash") || opt.getAttribute("value") || "";
}

  let autoGeneratedMapper = {};
  if (selectedCategory && window.parsedInvoiceData.length > 0) {
    try {
      const sampleItem = window.parsedInvoiceData[0];
      let itemAttrs = {};
      if (sampleItem.attributes) {
        itemAttrs = JSON.parse(sampleItem.attributes);
      }
      Object.keys(itemAttrs).forEach((key) => {
        if (window.applyToAllMap && window.applyToAllMap[key]) {
          autoGeneratedMapper[key] = "static_" + window.applyToAllMap[key];
        } else {
          autoGeneratedMapper[key] = "json_" + key;
        }
      });
    } catch (e) {
      console.error("Ошибка при сборке маппера:", e);
    }
  }

  const btn = document.getElementById("sendInvoiceBtn");
  const statusContainer = document.getElementById("status-container");
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");
  const statusPercent = document.getElementById("status-percent");

  btn.disabled = true;
  btn.style.opacity = "0.5";
  statusContainer.style.display = "block";

  let currentDisplayPct = 5;
  statusBar.style.width = "5%";
  statusPercent.innerText = "5%";

  const totalSteps = Object.keys(window.invoiceGroups).length;
  let currentStep = 0;

  for (let docNo of Object.keys(window.invoiceGroups)) {
    currentStep++;
    let group = window.invoiceGroups[docNo];

    let targetPct = Math.round((currentStep / totalSteps) * 95);
    statusText.innerText = translations[currentLang].inc_status_db;

    let fakeProgress = setInterval(() => {
      let remaining = targetPct - currentDisplayPct;
      if (remaining > 0) {
        let step = Math.max(1, Math.floor(remaining / 10));
        currentDisplayPct += step;
        statusBar.style.width = currentDisplayPct + "%";
        statusPercent.innerText = currentDisplayPct + "%";

        if (currentDisplayPct > 20 && currentDisplayPct < 50)
          statusText.innerText = translations[currentLang].inc_status_write;
        if (currentDisplayPct >= 50 && currentDisplayPct < 85)
          statusText.innerText = translations[currentLang].inc_status_drive;
        if (currentDisplayPct >= 85)
          statusText.innerText = translations[currentLang].inc_status_almost;
      }
    }, 600);

    try {
      let uniqueFileId = window.mapper2State && window.mapper2State.fileHash ? window.mapper2State.fileHash : String(docNo).replace(/\s/g, "_");
      let fp = "FP_" + uniqueFileId + "_" + group.items.length + "шт_" + group.items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0) + "кол";
      group.items.forEach((item) => (item.file_code = fp));

      // ⚡ СОБИРАЕМ ИСТОРИЮ ЭКСПОРТА И КОЛОНОК ДЛЯ БАЗЫ
      const exportMetadataJSON = typeof window.buildKaspiExportMetadata === 'function' ? window.buildKaspiExportMetadata() : "{}";
      const currencyEl = document.getElementById("invoiceCurrency");
      const finalCurrency = currencyEl ? currencyEl.value : "KZT";

      const response = await fetch(GATEWAY_URL, {
        method: "POST",
        body: JSON.stringify({
          master_url: APPS_SCRIPT_URL,
          api_key: CLIENT_API_KEY,
          action: "income",
          data: group.items,
          files: group.originalFiles,
          docNo: docNo,
          currency: finalCurrency,
          fingerprint: fp,
          market_category: selectedCategory, // Идет нормальное имя (Шины)
          template_hash: selectedHash,       // Отдельно идет хэш
          market_status: "pending",
          kaspi_mapper: autoGeneratedMapper,
          export_metadata: exportMetadataJSON // Данные колонок для базы
        }),
      });

      const res = await response.json();
      clearInterval(fakeProgress);

      if (!res.success) {
        throw new Error(res.error);
      }
    } catch (err) {
      clearInterval(fakeProgress);
      statusText.innerText = translations[currentLang].inc_server_err;
      statusText.style.color = "var(--accent-red)";

      let errorMsg = err.message;
      let dupMatch = errorMsg.match(/Накладная с номером (.*?) уже была/i);
      if (dupMatch && dupMatch[1]) {
        errorMsg = translations[currentLang].server_dup.replace("{0}", dupMatch[1].trim());
      } else if (errorMsg.includes("База не привязана")) {
        errorMsg = translations[currentLang].server_no_db;
      } else if (errorMsg.includes("с точно таким же составом")) {
        errorMsg = translations[currentLang].server_dup_fp;
      }

      alert(translations[currentLang].inc_send_err + errorMsg);
      btn.disabled = false;
      btn.style.opacity = "1";
      return;
    }
  }

  statusBar.style.width = "100%";
  statusPercent.innerText = "100%";
  statusText.innerText = translations[currentLang].inc_status_done;
  statusText.style.color = "var(--accent-green)";

  setTimeout(() => {
  alert(translations[currentLang].inc_all_done);

  // ⚡ ФИКС: Жестко прячем блок сопоставления и экраны превью
  const idsToHide = [
    "exportMapperArea", // Тот самый блок со скриншота
    "mapper2Area",      
    "invoicePreviewArea"
  ];
  
  idsToHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  window.parsedInvoiceData = [];
  window.invoiceGroups = {};

    const fileInput = document.getElementById("invoiceFileInput");
    if (fileInput) {
      fileInput.value = "";
      if (typeof updateFileNameCompactUI === "function") updateFileNameCompactUI(fileInput);
    }

    const tbody = document.getElementById("invoiceTableBody");
    if (tbody) tbody.innerHTML = "";
    const metadata = document.getElementById("invoiceMetadata");
    if (metadata) metadata.innerHTML = "";

    statusContainer.style.display = "none";
    statusBar.style.width = "0%";
    statusPercent.innerText = "0%";

    window.mapper2State = window.mapper2State || {};
    window.mapper2State.history = [];

    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(1, true);
    }

    toggleIncomeModule();
    if (typeof load === "function") load();
  }, 800);

  btn.disabled = false;
  btn.style.opacity = "1";
}

// === АВТОМАТИЧЕСКИЙ ПОДБОР ЗНАЧЕНИЙ ИЗ СЛОВАРЯ ===
window.autoCleanInvoiceAttributes = function () {
  if (!window.parsedInvoiceData || !window.kaspiDicts) return;

  window.parsedInvoiceData.forEach((item) => {
    if (!item.attributes) return;

    try {
      let attrs = JSON.parse(item.attributes);
      let changed = false;

      for (let key in attrs) {
        let rawValue = attrs[key];
        if (!rawValue) continue;

        // Находим правильное русское имя словаря через нашу карту
        let humanName = window.mapper2State.sysToHumanMap
          ? window.mapper2State.sysToHumanMap[key]
          : null;
        let targetDictKey = humanName
          ? humanName.toLowerCase().trim()
          : key.toLowerCase().trim();

        let foundKey = Object.keys(window.kaspiDicts).find(
          (dk) => dk.toLowerCase().trim() === targetDictKey,
        );
        let dict = foundKey ? window.kaspiDicts[foundKey] : null;

        if (dict && Array.isArray(dict)) {
          let cleanRaw = String(rawValue).trim().toLowerCase();

          // 1. Сначала ищем точное совпадение (вдруг уже написано правильно)
          let match = dict.find(
            (d) => String(d).trim().toLowerCase() === cleanRaw,
          );

          // 2. Если нет точного, ищем по началу строки (например, "67" для "67 (307 кг)")
          // Ищем так, чтобы после значения шел пробел или скобка, чтобы "6" не сматчилось с "67"
          if (!match) {
            match = dict.find((d) => {
              let cleanD = String(d).trim().toLowerCase();
              return (
                cleanD.startsWith(cleanRaw + " ") ||
                cleanD.startsWith(cleanRaw + "(") ||
                cleanD.startsWith(cleanRaw + " (")
              );
            });
          }

          // Если нашли полное значение и оно отличается от огрызка — заменяем
          if (match && match !== rawValue) {
            attrs[key] = match;
            changed = true;
          }
        }
      }

      // Если что-то поменяли, запаковываем обратно
      if (changed) {
        item.attributes = JSON.stringify(attrs);
      }
    } catch (e) {
      console.error("Ошибка авто-очистки атрибутов:", e);
    }
  });
};

// 1. Открытие модалки экспорта и загрузка списка категорий
window.openExportModal = async function () {
  const modal = document.getElementById("export-modal");
  const container = document.getElementById("exportCardsContainer");
  const btnArea = document.getElementById("exportActionButtons");

  if (modal) modal.style.display = "flex";
  if (btnArea) btnArea.style.display = "none";
  if (container) container.innerHTML = ""; // Очищаем старые плашки

  // === БЕРЕМ ПЕРЕВОДЫ ИЗ СЛОВАРЯ ===
  const t =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["ru"]
      : {};

  const textLoading = t.loading_export_data || "Загрузка партий...";
  const textNoBatches = t.export_no_batches || "Нет партий, ожидающих выгрузки";
  const textNetworkError =
    t.export_network_error || "Ошибка сети (см. консоль)";

  if (typeof window.showLoading === "function") {
    window.showLoading(textLoading, "loading_export_data");
  }

  try {
    const url =
      typeof APPS_SCRIPT_URL !== "undefined"
        ? APPS_SCRIPT_URL
        : window.APPS_SCRIPT_URL;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "getPendingExportsBackend",
        api_key: CLIENT_API_KEY,
      }),
    });
    const res = await response.json();

    if (res?.success && res?.pendingGroups?.length > 0) {
      // Генерируем красивые плашки
      container.innerHTML = res.pendingGroups
        .map((g) => {
          // Если бэкенд скажет, что партия уже выгружена (или у нее уже сохранен конфиг)
          const isExported = g.isExported === true || g.hasConfig === true;

          // Тексты
          const pendingText = t.exp_pending
            ? t.exp_pending.replace("{count}", g.count)
            : `(ожидает: ${g.count} шт.)`;
          const doneText = t.exp_done
            ? t.exp_done.replace("{count}", g.count)
            : `(выгружено: ${g.count} шт.)`;
          const statusText = isExported ? doneText : pendingText;

          const btnText = isExported
            ? t.exp_btn_repeat || "ПРОСМОТР И ВЫГРУЗКА"
            : t.exp_btn_start || "НАСТРОИТЬ ЭКСПОРТ";

          // Цвета и стили
          const btnColor = isExported
            ? "var(--accent-green, #2ecc71)"
            : "var(--accent-blue, #3b82f6)";
          const cardBg = isExported
            ? "var(--bg-body, #f1f5f9)"
            : "var(--bg-panel, #ffffff)";
          const opacity = isExported ? "0.8" : "1";

          // ИСПРАВЛЕНИЕ: Добавляем ${isExported} третьим параметром в onclick!
          return `
                    <div class="export-card" style="background: ${cardBg}; opacity: ${opacity}; border: 1px solid var(--border-light, #ddd); border-radius: 8px; padding: 15px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;">
                        <div style="display: flex; flex-direction: column; gap: 5px;">
                            <b style="font-size: 14px; color: var(--text-main, #000);">${g.name}</b>
                            <span style="font-size: 12px; color: ${isExported ? "var(--accent-green, #2ecc71)" : "var(--text-muted, #888)"}; font-weight: ${isExported ? "bold" : "normal"};">${statusText}</span>
                        </div>
                        <button onclick="window.handleCardSelectForExport('${g.hash}', this, ${isExported})" style="background: ${btnColor}; color: #fff; border: none; padding: 10px 15px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap;">
                            ${btnText}
                        </button>
                    </div>
                `;
        })
        .join("");
    } else {
      if (res && res.error && res.error !== "Нет партий, ожидающих выгрузки") {
        container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-main);">${res.error}</div>`;
      } else {
        container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">${textNoBatches}</div>`;
      }
    }
  } catch (e) {
    console.error("Ошибка загрузки данных для экспорта:", e);
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: red;">${textNetworkError}</div>`;
  } finally {
    if (typeof window.hideLoading === "function") window.hideLoading();
    if (
      typeof applyLanguage === "function" &&
      typeof currentLang !== "undefined"
    )
      applyLanguage(currentLang);
  }
};

window.closeExportModal = function () {
  window.isKaspiExportMode = false;
  const modal = document.getElementById("export-modal");
  const select = document.getElementById("exportCategorySelect");
  const btnArea = document.getElementById("exportActionButtons");
  const mapperArea = document.getElementById("exportMapperArea");

  if (modal) modal.style.display = "none";

  // Сбрасываем селекты и прячем кнопки при закрытии окна
  if (select)
    select.innerHTML = '<option value="">-- Выберите категорию --</option>';
  if (btnArea) btnArea.style.display = "none";
  if (mapperArea) mapperArea.style.display = "none";
};

// 2. Обработка выбора категории из списка
// Новая функция принимает хэш и саму кнопку (чтобы подсветить нужную плашку)
// ДОБАВЛЕН ТРЕТИЙ ПАРАМЕТР: isExported = false
window.handleCardSelectForExport = async function (
  selectedHash,
  btnElement,
  isExported = false,
) {
  window.currentExportHash = selectedHash;
  const btnArea = document.getElementById("exportActionButtons");

  if (!selectedHash) {
    if (btnArea) btnArea.style.display = "none";
    return;
  }

  // Визуально сбрасываем рамки у всех плашек
  const allCards = document.querySelectorAll(".export-card");
  allCards.forEach(
    (card) => (card.style.border = "1px solid var(--border-light, #ddd)"),
  );

  // Подсвечиваем активную плашку синей рамкой
  if (btnElement) {
    const selectedCard = btnElement.closest(".export-card");
    if (selectedCard) {
      selectedCard.style.border = "2px solid var(--accent-blue, #3b82f6)";
    }
  }

  if (typeof window.showLoading === "function")
    window.showLoading(null, "kaspi_loading");

  try {
    const url =
      typeof APPS_SCRIPT_URL !== "undefined"
        ? APPS_SCRIPT_URL
        : window.APPS_SCRIPT_URL;

    // === ПЕРЕДАЕМ СТАТУС НА СЕРВЕР ===
    const payload = {
      action: "getKaspiExportItemsBackend",
      api_key: CLIENT_API_KEY,
      hash: selectedHash,
      status: isExported ? "exported" : "pending",
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const text = await response.text();

    let res;
    try {
      res = JSON.parse(text);
    } catch (e) {
      console.error("Сервер вернул не JSON:", text);
      throw new Error("Сбой на сервере. Ответ: " + text.substring(0, 150));
    }

    if (
      res &&
      res.success &&
      res.templateBase64 &&
      res.items &&
      res.items.length > 0
    ) {
      // 1. Расшифровка Base64
      try {
        let base64Data = res.templateBase64;
        if (base64Data.includes(",")) base64Data = base64Data.split(",")[1];
        base64Data = base64Data.replace(/[^A-Za-z0-9+/=]/g, "");
        while (base64Data.length % 4 !== 0) base64Data += "=";

        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        window.rawKaspiTemplateBuffer = bytes.buffer;
      } catch (decodeErr) {
        console.error("Ошибка очистки Base64:", decodeErr);
        throw new Error("Не удалось расшифровать бланк. Файл поврежден.");
      }

      // 2. === НАШ ЦИКЛ ЭКСПОРТА ===
      window.kaspiExportItems = res.items;
      window.kaspiExportConfig = res.templateConfig;
      window.kaspiExportRowIndexes = res.rowIndexes;
      window.kaspiTargetSheetName = res.templateConfig.targetSheetName || null;

      // Включаем флаг экспорта (отключит оприходование)
      window.isKaspiExportMode = true;

      const exportModal = document.getElementById("export-modal");
      if (exportModal) exportModal.style.display = "none";

      function showParents(elementId) {
        let el = document.getElementById(elementId);
        while (el && el.tagName !== "BODY") {
          if (
            window.getComputedStyle(el).display === "none" ||
            el.style.display === "none"
          ) {
            el.style.display = "block";
          }
          el = el.parentElement;
        }
      }

      // === ВИРТУАЛЬНАЯ РАСПАКОВКА ===
      window.parsedInvoiceData = res.items.map((dbItem) => {
        let attrs = {};
        try {
          let rawAttr =
            dbItem.attributes ||
            dbItem.kaspi_attributes ||
            dbItem.params ||
            "{}";
          attrs = typeof rawAttr === "string" ? JSON.parse(rawAttr) : rawAttr;
        } catch (e) {}

        const flatItem = Object.assign({}, dbItem, {
          item_name:
            dbItem.item_name || dbItem.name || dbItem.title || "Без названия",
          item_id: dbItem.item_id || dbItem.id || dbItem.sku || "AUTO",
          qty:
            Number(dbItem.qty) ||
            Number(dbItem.quantity) ||
            Number(dbItem.available_qty) ||
            0,
          cost:
            Number(dbItem.cost) ||
            Number(dbItem.price) ||
            Number(dbItem.price_in) ||
            Number(dbItem.buy_price) ||
            0,
          barcode: dbItem.barcode || dbItem.ean || "",
        });

        for (const [key, value] of Object.entries(attrs)) {
          if (flatItem[key] === undefined) {
            flatItem[key] = value;
          }
        }

        flatItem.attributes = JSON.stringify(attrs);
        return flatItem;
      });

      // Удаляем системную колонку attributes для Маппера
      const allHeaders = new Set();
      window.parsedInvoiceData.forEach((item) => {
        Object.keys(item).forEach((k) => {
          if (
            k !== "attributes" &&
            k !== "kaspi_attributes" &&
            k !== "params"
          ) {
            allHeaders.add(k);
          }
        });
      });
      const extractedHeaders = Array.from(allHeaders);

      // ПАРСИМ СОХРАНЕННЫЕ МЕТАДАННЫЕ ИЗ БАЗЫ (ТВОЯ ПАМЯТЬ КНОПОК)
      let savedMeta = {};
      if (res.items && res.items.length > 0 && res.items[0].export_metadata) {
         try {
            savedMeta = JSON.parse(res.items[0].export_metadata);
         } catch(e) {
            console.error("Ошибка парсинга export_metadata", e);
         }
      }

      window.mapper2State = Object.assign(
        {
          colMap: {},
          dictValues: {},
          splitRules: {},
          invoiceHeaders: extractedHeaders,
          invoiceRows: window.parsedInvoiceData.map((item) =>
            extractedHeaders.map((h) => item[h]),
          ),
        },
        res.templateConfig || {} 
      );

      // ЖЕСТКО ВОССТАНАВЛИВАЕМ СПЛИТТЕРЫ И СЛОВАРИ ПОВЕРХ ШАБЛОНА
      if (savedMeta.saved_complex_params) {
         if (savedMeta.saved_complex_params.splitRules) {
             window.mapper2State.splitRules = savedMeta.saved_complex_params.splitRules;
         }
         if (savedMeta.saved_complex_params.dictValues) {
             window.mapper2State.dictValues = savedMeta.saved_complex_params.dictValues;
         }
      }
      if (savedMeta.saved_mapping) {
          // Восстанавливаем связки колонок, если они не прилетели из шаблона
          window.mapper2State.colMap = Object.assign({}, savedMeta.saved_mapping, window.mapper2State.colMap);
      }
      
      // Глобальная переменная для Токенатора/Сплиттера
      window.kaspiComplexParamsState = {
         splitRules: window.mapper2State.splitRules || {},
         dictValues: window.mapper2State.dictValues || {}
      };

      // === ВОССТАНОВЛЕНИЕ ЗАГОЛОВКОВ И ПЕРЕВОДА НА РУССКИЙ ===
      window.mapper2State.supplier = "Kaspi (Экспорт)";
      window.mapper2State.docNo = res.templateConfig.templateName || "Партия";

      if (res.templateConfig && res.templateConfig.systemKeys) {
        window.mapper2State.sysToHumanMap = {};
        for (let i = 0; i < res.templateConfig.systemKeys.length; i++) {
          const sKey = res.templateConfig.systemKeys[i];
          const hName = res.templateConfig.humanNames[i];
          if (sKey && hName) window.mapper2State.sysToHumanMap[sKey] = hName;
        }
        // 🔥 Спасаем словарь в глобальную память
    window.GLOBAL_KASPI_DICT = window.mapper2State.sysToHumanMap;
      }
      // =========================================================

      const step1 = document.getElementById("uploadStepArea");
      const step2 = document.getElementById("mapper2Area");
      const step3 = document.getElementById("invoicePreviewArea");

      if (step1) step1.style.display = "none";

      // === АВТОМАТИЧЕСКОЕ ВОССТАНОВЛЕНИЕ СВЯЗЕЙ В РЕЖИМЕ ЭКСПОРТА ===
      if (!res.templateConfig) res.templateConfig = {};
      if (!res.templateConfig.mapping) res.templateConfig.mapping = {};

      // 0. ЖЕСТКАЯ ОЧИСТКА ПАМЯТИ
      res.templateConfig.mapping = {};
      window.mapper2State.colMap = {};

      // 1. Универсальная привязка ВСЕХ параметров
      extractedHeaders.forEach((header, idx) => {
          // ИСПРАВЛЕНИЕ: Генератору нужен текст (header), а мапперу - индекс (idx)
          res.templateConfig.mapping[header] = header; 
          window.mapper2State.colMap[header] = idx;
      });

      // 2. Восстанавливаем сплиттеры чисто для визуала (данные уже готовы)
      if (savedMeta.saved_complex_params) {
          res.templateConfig.splitRules = savedMeta.saved_complex_params.splitRules || {};
          res.templateConfig.dictValues = savedMeta.saved_complex_params.dictValues || {};
          window.mapper2State.splitRules = res.templateConfig.splitRules;
          window.mapper2State.dictValues = res.templateConfig.dictValues;
          window.kaspiComplexParamsState = {
              splitRules: res.templateConfig.splitRules,
              dictValues: res.templateConfig.dictValues
          };
      }

      // 3. Жестко привязываем базовые поля (с правильным ключом "name")
      const baseFieldsMap = {
          "name": ["item_name", "name", "title"], // Исправлено с item_name на name
          "item_id": ["item_id", "id", "sku"],
          "price": ["cost", "price", "price_in"],
          "qty": ["qty", "quantity"],
          "barcode": ["barcode", "ean"],
          "brand": ["brand"]
      };

      Object.keys(baseFieldsMap).forEach(targetKey => {
          let possibleNames = baseFieldsMap[targetKey];
          for (let pName of possibleNames) {
              let idx = extractedHeaders.indexOf(pName);
              if (idx !== -1) {
                  // ИСПРАВЛЕНИЕ: Передаем ключ, а не цифру
                  res.templateConfig.mapping[targetKey] = targetKey; 
                  window.mapper2State.colMap[targetKey] = idx;
                  break; 
              }
          }
      });

      // 4. ОБХОД ПРОВЕРКИ (Глубокая очистка данных в самом ядре)
      let priceIdx = window.mapper2State.colMap["price"];
      let qtyIdx = window.mapper2State.colMap["qty"];
      let priceKey = extractedHeaders[priceIdx];
      let qtyKey = extractedHeaders[qtyIdx];

      // Чистим оригинальный массив товаров
      window.parsedInvoiceData.forEach(item => {
          if (priceKey) {
              let cleanPrice = String(item[priceKey] || "").replace(/\s/g, '').replace(/,/g, '.').replace(/[^\d.-]/g, '');
              item[priceKey] = cleanPrice === "" ? 0 : Number(cleanPrice);
          }
          if (qtyKey) {
              let cleanQty = String(item[qtyKey] || "").replace(/\s/g, '').replace(/,/g, '.').replace(/[^\d.-]/g, '');
              item[qtyKey] = cleanQty === "" ? 0 : Number(cleanQty);
          }
      });

      // Синхронизируем очищенные данные с визуальной таблицей маппера
      window.mapper2State.invoiceRows = window.parsedInvoiceData.map((item) =>
          extractedHeaders.map((h) => item[h])
      );

      // === ВОССТАНОВЛЕНИЕ МАППЕРА ===
      window.renderMapper2Cards(res.templateConfig);

      // === ВОССТАНОВЛЕНИЕ МАППЕРА: Рендерим его с НАШИМИ данными! ===
      window.renderMapper2Cards(res.templateConfig);

      // Умная навигация
      if (isExported) {
        if (step2) step2.style.display = "none";
        if (step3) step3.style.display = "flex";
        showParents("invoicePreviewArea");
        window.renderPreviewTable();
      } else {
        if (step3) step3.style.display = "none";
        if (step2) step2.style.display = "flex";
        showParents("mapper2Area");
      }

      if (step3) {
        const allBtns = step3.querySelectorAll("button");
        allBtns.forEach((b) => {
          if (
            b.innerText.trim().toUpperCase() === "НАЗАД" ||
            b.textContent.includes("НАЗАД")
          ) {
            b.style.display = "";
          }
        });
      }

      const btnArea = document.getElementById("exportActionButtons");
      if (btnArea) {
        btnArea.style.display = "flex";
        if (step3) step3.appendChild(btnArea);
      }
    } else {
      const err =
        res.error ||
        "Не удалось загрузить данные или нет товаров для выгрузки.";
      alert("⚠️ Ошибка сервера: " + err);
      if (btnArea) btnArea.style.display = "none";
    }
  } catch (e) {
    console.error("Полная ошибка загрузки данных партии:", e);
    alert("⚠️ Критическая ошибка: " + e.message);
  } finally {
    if (typeof window.hideLoading === "function") window.hideLoading();
  }
};

window.askCategoryName = function (defaultText) {
  return new Promise((resolve) => {
    const modal = document.getElementById("custom-prompt-modal");
    const input = document.getElementById("custom-prompt-input");
    const btnOk = document.getElementById("custom-prompt-ok");
    const btnCancel = document.getElementById("custom-prompt-cancel");

    // Сбрасываем старые обработчики кликов, чтобы они не дублировались
    btnOk.onclick = null;
    btnCancel.onclick = null;
    input.onkeydown = null;

    // Вставляем дефолтное название (имя файла)
    input.value = defaultText || "";

    modal.style.display = "flex";

    // Задержка 100мс нужна, чтобы iOS Safari успел отрендерить окно перед фокусом
    setTimeout(() => {
      input.focus();
      input.select(); // Тот самый магический метод выделения текста!
    }, 100);

    const closeModal = (result) => {
      modal.style.display = "none";
      resolve(result); // Отдаем результат обратно в код
    };

    btnOk.onclick = () => closeModal(input.value.trim() || null);
    btnCancel.onclick = () => closeModal(null);

    // Позволяем нажать Enter на клавиатуре вместо кнопки ОК
    input.onkeydown = (e) => {
      if (e.key === "Enter") closeModal(input.value.trim() || null);
    };
  });
};

// Функция отправки шаблона Kaspi на сервер
async function saveKaspiTemplateBackend(categoryName, buffer, headersObj) {
  // 1. Конвертируем сырой ArrayBuffer в строку Base64
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = window.btoa(binary);

  // 2. Формируем пакет данных (Ключи строго синхронизированы с Code.gs)
  const payload = {
    action: "saveKaspiTemplate",
    api_key: typeof CLIENT_API_KEY !== "undefined" ? CLIENT_API_KEY : "",
    category: categoryName,
    headersJson: JSON.stringify(headersObj), // <-- ИСПРАВЛЕНО: теперь ключи совпадают
    fileBase64: base64Data,
  };

  // 3. Отправляем через шлюз
  const response = await window.smartFetch(APPS_SCRIPT_URL, payload, null, 1);

  if (!response || !response.success) {
    throw new Error(
      response
        ? response.error || response.message
        : "Сервер не ответил при сохранении шаблона",
    );
  }

  return response;
}

// Обработка загрузки файла шаблона Kaspi
window.handleTemplateUpload = async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileInput = document.getElementById("templateFileInput");
  const fileNameSpan = document.getElementById("templateFileName");
  const modal = document.getElementById("newTemplateModal");
  if (modal) modal.style.display = "none";

  if (typeof window.showLoading === "function") {
    window.showLoading(
      typeof translations !== "undefined" && translations[currentLang]
        ? translations[currentLang].msg_analyze_template
        : "Анализ шаблона...",
    );
  }

  if (fileNameSpan) {
    fileNameSpan.removeAttribute("data-i18n");
    fileNameSpan.innerText = `⏳ Анализ шаблона...`;
    fileNameSpan.style.color = "var(--accent-blue)";
  }
  if (fileInput) fileInput.disabled = true;

  setTimeout(() => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      try {
        window.rawKaspiTemplateBuffer = e.target.result;

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(e.target.result);

        const getSafeText = (cell) => {
          if (!cell || cell.value === null || cell.value === undefined)
            return "";
          if (typeof cell.value === "object") {
            if (cell.value.richText)
              return cell.value.richText
                .map((rt) => rt.text)
                .join("")
                .trim();
            if (cell.value.result !== undefined)
              return String(cell.value.result).trim();
          }
          return String(cell.value).trim();
        };

        let targetSheet = workbook.worksheets.find(
          (s) => s.name.toLowerCase() === "attributes",
        );
        if (!targetSheet)
          targetSheet =
            workbook.worksheets.length > 1
              ? workbook.worksheets[1]
              : workbook.worksheets[0];
        window.kaspiTargetSheetName = targetSheet.name;

        const jsonData = [];
        targetSheet.eachRow((row, rowNumber) => {
          if (rowNumber > 20) return;
          let rowData = [];
          const maxCols =
            targetSheet.columnCount > 0 ? targetSheet.columnCount : 100;
          for (let i = 1; i <= maxCols; i++) {
            rowData.push(getSafeText(row.getCell(i)));
          }
          jsonData.push(rowData);
        });

        let requirements = [],
          systemKeys = [],
          humanNames = [];
        const humMarkers = ["артикул", "модель", "бренд", "цена"];
        const sysMarkers = ["merchant_sku", "model", "brand", "price"];

        for (let i = 0; i < Math.min(jsonData.length, 20); i++) {
          const rowText = jsonData[i].join(" ").toLowerCase();
          if (!rowText.trim()) continue;

          let humMatch = 0;
          humMarkers.forEach((m) => {
            if (rowText.includes(m)) humMatch++;
          });
          if (humMatch >= 2) {
            humanNames = jsonData[i];
            continue;
          }

          let sysMatch = 0;
          sysMarkers.forEach((m) => {
            if (rowText.includes(m)) sysMatch++;
          });
          if (sysMatch >= 2) {
            systemKeys = jsonData[i];
            continue;
          }

          if (rowText.includes("обязательное") || rowText.includes("обязат.")) {
            requirements = jsonData[i];
            continue;
          }
        }

        if (humanNames.length === 0 || systemKeys.length === 0) {
          if (typeof window.hideLoading === "function") window.hideLoading();
          alert("Ошибка: Не удалось распознать структуру шаблона Kaspi.");
          if (fileNameSpan) {
            fileNameSpan.innerText = "📄 Загрузить пустой шаблон (.xml, .xlsx)";
            fileNameSpan.style.color = "var(--text-main)";
          }
          return;
        }

        while (humanNames.length > 0 && !humanNames[humanNames.length - 1])
          humanNames.pop();
        while (systemKeys.length > 0 && !systemKeys[systemKeys.length - 1])
          systemKeys.pop();

        const hashData = new TextEncoder().encode(systemKeys.join("|"));
        const hashBuffer = await crypto.subtle.digest("SHA-256", hashData);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const templateHash =
          "hash_" +
          hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .substring(0, 12);

        let valuesData = [];
        let valuesSheet = workbook.worksheets.find(
          (s) =>
            s.name.toLowerCase() === "values" ||
            s.name.toLowerCase() === "value" ||
            s.name.toLowerCase() === "значения",
        );
        if (valuesSheet) {
          valuesSheet.eachRow((row) => {
            let rData = [];
            const maxCols =
              valuesSheet.columnCount > 0 ? valuesSheet.columnCount : 50;
            for (let i = 1; i <= maxCols; i++) {
              rData.push(getSafeText(row.getCell(i)));
            }
            valuesData.push(rData);
          });
        }

        if (typeof window.hideLoading === "function") window.hideLoading();

        const defaultCategory = file.name
          .replace(".xlsx", "")
          .replace(".xls", "")
          .replace(".xlsm", "")
          .trim();
        let categoryName = await window.askCategoryName(defaultCategory);

        if (!categoryName) {
          if (fileNameSpan) {
            fileNameSpan.innerText = "Загрузка отменена";
            fileNameSpan.style.color = "var(--text-main)";
          }
          return;
        }

        const templateSelect = document.getElementById("kaspiTemplateSelect");
        let isDuplicate = false;

        if (templateSelect) {
          const existingOption = Array.from(templateSelect.options).find(
            (opt) =>
              opt.value.toLowerCase() === categoryName.toLowerCase() ||
              opt.getAttribute("data-hash") === templateHash ||
              opt.value === templateHash,
          );

          if (existingOption) {
            isDuplicate = true;
            const overwrite = confirm(
              "Шаблон с таким именем или структурой уже существует. Перезаписать?",
            );
            if (!overwrite) {
              if (fileNameSpan) {
                fileNameSpan.innerText = "Загрузка отменена";
                fileNameSpan.style.color = "var(--text-main)";
              }
              return;
            }
            categoryName = existingOption.text || existingOption.value;
          }
        }

        if (typeof window.showLoading === "function")
          window.showLoading("Сохранение...");
        if (fileNameSpan) {
          fileNameSpan.innerText = `⏳ Сохранение...`;
          fileNameSpan.style.color = "var(--accent-blue)";
        }

        let dictionary = {};
        if (valuesData.length > 0) {
          const headersRow = valuesData[0];
          headersRow.forEach((header, colIndex) => {
            if (!header) return;
            let colName = String(header).trim();
            let colValues = [];
            for (let i = 1; i < valuesData.length; i++) {
              let cellValue = valuesData[i][colIndex];
              if (
                cellValue !== undefined &&
                cellValue !== null &&
                cellValue !== ""
              ) {
                colValues.push(String(cellValue).trim());
              }
            }
            let uniqueValues = [...new Set(colValues)];
            if (uniqueValues.length > 0) {
              dictionary[colName] = uniqueValues;
            }
          });
        }

        const extractedHeaders = {
          templateHash: templateHash,
          humanNames: humanNames,
          systemKeys: systemKeys,
          requirements: requirements,
          dictionary: dictionary,
        };

        let binary = "";
        const bytes = new Uint8Array(e.target.result);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64String = window.btoa(binary);

        const payload = {
          action: "saveKaspiTemplate",
          api_key:
            typeof CLIENT_API_KEY !== "undefined"
              ? CLIENT_API_KEY
              : window.CLIENT_API_KEY || "",
          category: categoryName,
          headersJson: JSON.stringify(extractedHeaders),
          fileBase64: base64String,
        };

        const res = await window.smartFetch(
          typeof APPS_SCRIPT_URL !== "undefined"
            ? APPS_SCRIPT_URL
            : window.APPS_SCRIPT_URL || "",
          payload,
        );

        if (res && res.success) {
          if (templateSelect) {
            if (!isDuplicate) {
              const newOption = document.createElement("option");
              newOption.value = templateHash;
              newOption.text = categoryName;
              newOption.setAttribute("data-hash", templateHash);
              templateSelect.appendChild(newOption);
            }
            templateSelect.value = templateHash;
          }
        } else {
          if (res && res.error === "kaspi_dup_hash") {
            throw new Error("⚠️ Шаблон уже существует");
          }
          throw new Error(res ? res.error : "Пустой ответ от сервера");
        }

        if (typeof window.showLoading === "function")
          window.showLoading("Подключение БД...");
        if (fileNameSpan) {
          fileNameSpan.innerText = `⏳ Подключение БД...`;
          fileNameSpan.style.color = "var(--accent-blue)";
        }

        const dbResponse = await window.smartFetch(
          typeof APPS_SCRIPT_URL !== "undefined"
            ? APPS_SCRIPT_URL
            : window.APPS_SCRIPT_URL || "",
          {
            action: "getKaspiExportData",
            api_key:
              typeof CLIENT_API_KEY !== "undefined" ? CLIENT_API_KEY : "",
          },
        );

        const dynKeys =
          dbResponse && dbResponse.success ? dbResponse.dynamicKeys : [];

        if (fileNameSpan) {
          fileNameSpan.innerText = `✅ Шаблон готов (${categoryName})`;
          fileNameSpan.style.color = "var(--accent-green)";
        }

        if (typeof renderMapperUI === "function") {
          renderMapperUI(
            systemKeys,
            humanNames,
            valuesData,
            requirements,
            dynKeys,
          );
        }

        if (typeof updateFileNameCompactUI === "function") {
          updateFileNameCompactUI(file.name);
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка чтения файла: " + err.message);
        if (fileNameSpan) {
          fileNameSpan.innerText = "📄 Загрузить пустой шаблон (.xml, .xlsx)";
          fileNameSpan.style.color = "var(--text-main)";
        }
      } finally {
        if (fileInput) fileInput.disabled = false;
        if (typeof window.hideLoading === "function") window.hideLoading();
      }
    };
    reader.readAsArrayBuffer(file);
  }, 50);
}

// 1. ОТРИСОВКА ИНТЕРФЕЙСА (Берет переводы из глобальной базы)
function renderMapperUI(
  systemKeys,
  humanNames,
  valuesData,
  requirements,
  dynamicKeys,
) {
  const mapperArea = document.getElementById("exportMapperArea");
  mapperArea.innerHTML = "";

  // 1. Базовые системные поля (Оставляем как есть, с переводами)
  const internalFields = [
    { id: "", name: t("opt_skip", "-- Не выгружать --") },
    { id: "barcode", name: t("f_barcode", "Штрихкод / SKU") },
    { id: "name", name: t("f_name", "Название") },
    { id: "price", name: t("f_price", "Цена") },
    { id: "qty", name: t("f_qty", "Остаток партии") },
    { id: "weight", name: t("f_weight", "Вес, кг") },
    { id: "volume", name: t("f_volume", "Объем, м3") },
  ];

  // 2. Очищаем атрибуты БД от дубликатов системных полей
  if (dynamicKeys && Array.isArray(dynamicKeys) && dynamicKeys.length > 0) {
    // Черный список ключей из БД, которые мы скрываем, чтобы не дублировать
    const ignoredKeys = [
      "штрихкод",
      "наименование",
      "код товара",
      "кол-во",
      "базовая цена",
      "цена со скидкой",
      "объем (cbm)",
      "вес (кг)",
      "цена",
      "артикул поставщика",
    ];

    dynamicKeys.forEach((key) => {
      if (!ignoredKeys.includes(key.toLowerCase().trim())) {
        internalFields.push({ id: `json_${key}`, name: `${key} (из БД)` });
      }
    });
  }

  // Переменная для отслеживания уже занятых полей (чтобы решить проблему двух колонок "Вес")
  const usedAutoValues = new Set();

  let html = `<h4 style="margin-bottom: 10px; color: var(--text-muted); font-size: 13px;" data-i18n="map_title">${t("map_title", "СОПОСТАВЛЕНИЕ КОЛОНОК:")}</h4>`;

  for (let i = 0; i < humanNames.length; i++) {
    const sysKey = systemKeys[i];
    const humName = humanNames[i];

    if (!humName && !sysKey) continue;

    const safeHumName = humName || "Без названия";
    const cleanColNameForData = safeHumName.replace(/"/g, "&quot;");

    const reqText =
      requirements && requirements[i]
        ? String(requirements[i]).toLowerCase()
        : "";
    const isRequired =
      reqText.includes("обязательн") && !reqText.includes("необязательн");
    const reqAsterisk = isRequired
      ? '<span style="color: #ef4444; margin-left: 4px;">*</span>'
      : "";
    const borderStyle = isRequired
      ? "border-left: 4px solid #ef4444;"
      : "border-left: 4px solid var(--accent-blue, #3b82f6);";

    let allUniqueValues = [];
    if (valuesData && valuesData.length > 0 && humName) {
      for (let row of valuesData) {
        if (row[humName] && !allUniqueValues.includes(row[humName])) {
          allUniqueValues.push(row[humName]);
        }
      }
    }
    window.kaspiDicts[i] = allUniqueValues;

    let examplesHtml = "";
    if (allUniqueValues.length > 0) {
      const examples = allUniqueValues.slice(0, 3);
      let examplesText = examples.join("<br>");
      if (allUniqueValues.length > 3) {
        examplesText += '<br><span style="color:#888;">...</span>';
      }
      examplesHtml = `<div style="font-size: 11px; color: var(--accent-blue); margin-top: 6px; white-space: normal; line-height: 1.4;"><i>${examplesText}</i></div>`;
    }

    // Запрашиваем переводы для групп и кнопок
    let optionsHtml = `<optgroup label="${t("grp_db", "Поля из базы данных")}">`;
    optionsHtml += internalFields
      .map((f) => `<option value="${f.id}">${f.name}</option>`)
      .join("");
    optionsHtml += `</optgroup>`;

    if (allUniqueValues.length > 0) {
      optionsHtml += `<optgroup label="${t("grp_kaspi", "Справочник Каспи")}">`;
      if (allUniqueValues.length <= 50) {
        optionsHtml += allUniqueValues
          .map((val) => `<option value="static_${val}">📌 ${val}</option>`)
          .join("");
      } else {
        optionsHtml += `<option value="open_dict">🔍 ${t("opt_search", "Найти в справочнике")} (${allUniqueValues.length})...</option>`;
      }
      optionsHtml += `</optgroup>`;
    } else {
      optionsHtml += `<optgroup label="${t("grp_custom", "Свое значение")}">`;
      optionsHtml += `<option value="custom_input">✏️ ${t("opt_manual", "Ввести вручную...")}</option>`;
      optionsHtml += `</optgroup>`;
    }

    // === УМНЫЙ АВТОМАППИНГ ===
    const sys = (sysKey || "").toLowerCase();
    const hum = (humName || "").toLowerCase();
    let autoSelectValue = "";

    // 1. Жесткие правила
    if (sys === "merchant_sku" || hum.includes("артикул"))
      autoSelectValue = "barcode";
    else if (sys === "name" || hum.includes("название"))
      autoSelectValue = "name";
    else if (sys === "price" || hum.includes("цена")) autoSelectValue = "price";
    else if (sys === "brand" || hum.includes("бренд"))
      autoSelectValue = "json_Бренд";

    // 2. Мягкий поиск
    if (!autoSelectValue && dynamicKeys && dynamicKeys.length > 0) {
      for (let k of dynamicKeys) {
        const lowerK = k.toLowerCase();
        if (hum.includes(lowerK) || sys.includes(lowerK)) {
          autoSelectValue = `json_${k}`;
          break;
        }
      }
    }

    // 3. ЗАЩИТА: Если мы уже привязали это значение выше, сбрасываем его (решает проблему двух полей "Вес")
    if (autoSelectValue) {
      if (usedAutoValues.has(autoSelectValue)) {
        autoSelectValue = "";
      } else {
        usedAutoValues.add(autoSelectValue);
      }
    }

    // Внедряем автовыбор прямо в HTML
    let finalOptionsHtml = optionsHtml;
    if (autoSelectValue) {
      finalOptionsHtml = finalOptionsHtml.replace(
        `value="${autoSelectValue}"`,
        `value="${autoSelectValue}" selected`,
      );
    }
    // =========================

    html += `
        <div class="mapper-row" style="display: flex; gap: 10px; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; padding: 10px 10px 10px 6px; background: var(--bg-panel); border: 1px solid var(--border-light); ${borderStyle} border-radius: 6px; transition: background 0.2s ease;">
            <div style="flex: 1; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; padding-bottom: 4px; margin-top: 4px;">
                <div style="font-size: 13px; font-weight: bold;">${safeHumName}${reqAsterisk}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${sysKey || "-"}</div>
                ${examplesHtml}
            </div>
            <div style="flex-shrink: 0; width: 140px;">
                <select class="mapper-select" data-col-index="${i}" data-sys-key="${sysKey}" data-col-name="${cleanColNameForData}" onchange="handleSelectChange(this)" style="width: 100%; padding: 6px; background: var(--bg-body); color: var(--text-main); border: 1px solid var(--border-main); border-radius: 4px; font-size: 13px; outline: none;">
                    ${finalOptionsHtml}
                </select>
            </div>
        </div>
        `;
  }

  mapperArea.innerHTML = html;
  mapperArea.style.display = "flex";
  document.getElementById("generateExportBtn").style.display = "block";

  // === ИМИТАЦИЯ КЛИКА ДЛЯ ОБНОВЛЕНИЯ ЦВЕТОВ ===
  setTimeout(() => {
    const selects = mapperArea.querySelectorAll(".mapper-select");
    selects.forEach((select) => {
      // Если поле было выбрано автоматически, прогоняем его через вашу функцию смены цвета
      if (select.value !== "" && typeof handleSelectChange === "function") {
        handleSelectChange(select);
      }
    });
  }, 50); // Небольшая задержка, чтобы DOM успел отрисоваться
}

// 2. ДИСПЕТЧЕР КЛИКОВ (Новая функция для надежной обработки действий)
function handleSelectChange(selectElem) {
  const val = selectElem.value;
  const colIndex = selectElem.getAttribute("data-col-index");
  const colName = selectElem.getAttribute("data-col-name");

  // Если выбрали открытие модалки
  if (val === "open_dict") {
    selectElem.value = ""; // Сбрасываем значение селекта
    openDictionaryModal(colIndex, colName); // Открываем модалку
  }
  // Если выбрали системный ручной ввод
  else if (val === "custom_input") {
    selectElem.value = "";
    const customVal = prompt(`Введите значение для поля "${colName}":`);
    if (customVal && customVal.trim() !== "") {
      const valId = `static_${customVal.trim()}`;
      let opt = document.createElement("option");
      opt.value = valId;
      opt.innerHTML = `✏️ ${customVal.trim()}`;
      opt.style.background = "#fefce8";
      opt.style.color = "#854d0e";
      selectElem.appendChild(opt);
      selectElem.value = valId;
    }
  }

  // В самом конце всегда обновляем цвета и блокировки
  updateSelectStates();
}

// 3. КОНТРОЛЬ ЦВЕТОВ И БЛОКИРОВОК (Очищенная функция)
function updateSelectStates() {
  const selects = document.querySelectorAll(".mapper-select");
  const selectedValues = Array.from(selects)
    .map((s) => s.value)
    .filter((v) => v !== "" && !v.startsWith("static_"));

  selects.forEach((select) => {
    const row = select.closest(".mapper-row");
    row.style.background =
      select.value !== "" ? "rgba(40, 167, 69, 0.15)" : "var(--bg-panel)";

    Array.from(select.options).forEach((opt) => {
      if (
        opt.value === "" ||
        opt.value.startsWith("static_") ||
        opt.value === "open_dict" ||
        opt.value === "custom_input"
      ) {
        opt.disabled = false;
      } else if (
        selectedValues.includes(opt.value) &&
        select.value !== opt.value
      ) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    });
  });
}

function toggleDropdown() {
  const list = document.getElementById("dropdownList");
  const header = document.getElementById("dropdownHeader");
  list.classList.toggle("show");
  header.classList.toggle("active");
}

function selectCurrency(value) {
  document.getElementById("dropdownSelectedCode").innerText = value;
  document.getElementById("invoiceCurrency").value = value;
  const items = document.querySelectorAll(".currency-minimal-item");
  items.forEach((item) => item.classList.remove("selected"));
  event.target.classList.add("selected");
  document.getElementById("dropdownList").classList.remove("show");
  document.getElementById("dropdownHeader").classList.remove("active");

  // НОВОЕ: Меняем валюту в шапке таблицы
  let headerSpan = document.getElementById("dynamicCurrencySpan");
  if (headerSpan) headerSpan.innerText = value;
}

// Глобальный объект для хранения словарей Каспи
window.kaspiDicts = {};

window.checkMapperReadiness = function() {
    const st = window.mapper2State || {};
    const cm = st.colMap || {};
    const dv = st.dictValues || {};

    const hasQty = cm["qty"] !== undefined || dv["qty"] !== undefined;
    const hasPrice = cm["price"] !== undefined || cm["cost"] !== undefined || dv["price"] !== undefined || dv["cost"] !== undefined;
    const hasName = cm["name"] !== undefined || cm["model"] !== undefined || dv["name"] !== undefined || dv["model"] !== undefined;

    const btn = document.getElementById("applyMapper2Btn");
    if (btn) {
        if (hasQty && hasPrice && hasName) {
            btn.style.backgroundColor = "var(--accent-green, #2ecc71)";
            btn.style.color = "#000";
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
        } else {
            btn.style.backgroundColor = "";
            btn.style.opacity = "0.5";
            btn.style.pointerEvents = "none";
        }
    }
};