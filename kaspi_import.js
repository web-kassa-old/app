// --- МОДУЛЬ УМНОЙ ПРИЕМКИ (ИНВОЙСЫ) ---selectImportMode
window.parsedInvoiceData = [];
window.invoiceGroups = {};

// Обработчик загрузки нового шаблона Kaspi при выборе "Новый шаблон"
document.addEventListener("change", function (e) {
  if (e.target && e.target.id === "kaspiTemplateSelect") {
    if (e.target.value === "new") {
      const modal = document.getElementById("newTemplateModal");
      if (modal) modal.style.display = "flex";
      e.target.value = ""; // Сбрасываем, чтобы можно было выбрать снова
    }
  }
});

// Принудительный сброс flex-каркаса, инлайн-стилей высоты/overflow и scrollTop у Маппера-2 (для iOS Safari)
window.resetMapper2ModalLayout = function (options = {}) {
  const shouldResetScroll = options.resetScroll !== false;

  const incomeModal = document.getElementById("income-modal");
  const modalCard = document.getElementById("incomeModalCard");
  const tabImport = document.getElementById("tab-import");
  const tabNew = document.getElementById("tab-new-product");
  const mapper2Area = document.getElementById("mapper2Area");
  const cardsContainer = document.getElementById("mapper2CardsContainer");

  const clearTempBoxStyles = (el) => {
    if (!el) return;
    el.style.height = "";
    el.style.maxHeight = "";
    el.style.minHeight = "";
    el.style.overflow = "";
    el.style.overflowY = "";
    el.style.marginTop = "";
  };

  if (incomeModal && incomeModal.style.display && incomeModal.style.display !== "none") {
    incomeModal.style.display = "flex";
  }
  clearTempBoxStyles(modalCard);
  if (modalCard) modalCard.style.display = "flex";

  clearTempBoxStyles(tabImport);
  if (tabImport && (!tabNew || tabNew.style.display === "none" || !tabNew.style.display)) {
    tabImport.style.display = "flex";
  }

  clearTempBoxStyles(mapper2Area);
  clearTempBoxStyles(cardsContainer);

  if (shouldResetScroll && cardsContainer) {
    cardsContainer.scrollTop = 0;
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        if (cardsContainer) cardsContainer.scrollTop = 0;
      });
    }
  }
};

function toggleIncomeModule() {
  const modal = document.getElementById("income-modal");

  // === ОЧИСТКА ПАМЯТИ МАТРЕШКИ И СБРОС РЕЖИМОВ ===
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.history = [];
  window.mapper2State.colMap = {}; // Очищаем маппинг колонок
  window.mapper2State.clearedKeys = {};
  window.mapper2State.smartRulesApplied = false;
  window.mapper2State.memorySplitsLoaded = false;
  window.mapper2State.appliedTemplateHash = null;
  window.mapper2State.logisticsBlock = "";
  window.mapper2State.logisticsBlockTouched = false;

  // 🔥 ЖЕСТКИЙ СБРОС: Включаем режим ОБЫЧНОЙ ПРИЕМКИ
  window.isKaspiExportMode = false;
  window.currentExportHash = null;
  window.kaspiExportItems = [];

  if (modal.style.display === "none" || modal.style.display === "") {
    // Принудительно включаем Шаг 1 перед открытием (true означает, что шаг не пишется в историю дублем)
    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(1, true);
    }
    const intLogSelect = document.getElementById("internalLogisticsSelect");
    if (intLogSelect && typeof window.populateLogisticsSelect === "function") {
      window.populateLogisticsSelect(intLogSelect, "");
    }
    modal.style.display = "flex";
    if (typeof window.resetMapper2ModalLayout === "function") {
      window.resetMapper2ModalLayout({ resetScroll: true });
    }
  } else {
    modal.style.display = "none";
    if (typeof window.closeSheet === "function") {
      window.closeSheet();
    }
  }
}

// 🔥 Универсальная функция получения семантической подсказки для шапки (чистые данные без HTML)
window.getColumnHeaderHint = function (header) {
  if (!header) return null;
  let activeDict = {};

  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const tr =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : typeof translations !== "undefined"
        ? translations["ru"] || {}
        : {};

  // 1. Поиск по таблице синонимов
  if (typeof invoiceSynonyms !== "undefined" && invoiceSynonyms) {
    for (let key in invoiceSynonyms) {
      let val = invoiceSynonyms[key];
      activeDict[key] = Array.isArray(val)
        ? [...val]
        : String(val)
            .split(",")
            .map((s) => s.trim());
    }
  }

  if (window.mapper2State && window.mapper2State.dictValues) {
    for (let key in window.mapper2State.dictValues) {
      let savedVal = window.mapper2State.dictValues[key];
      let savedArr = Array.isArray(savedVal)
        ? savedVal
        : String(savedVal)
            .split(",")
            .map((s) => s.trim());
      activeDict[key] = activeDict[key]
        ? [...new Set([...activeDict[key], ...savedArr])]
        : savedArr;
    }
  }

  if (Object.keys(activeDict).length > 0) {
    let cleanHeader = String(header).toLowerCase().replace(/\s+/g, "");
    let matchedKey = null;

    for (let key in activeDict) {
      let isMatch = activeDict[key].some((syn) => {
        let cleanSyn = String(syn).toLowerCase().replace(/\s+/g, "");
        return cleanSyn && cleanHeader === cleanSyn;
      });

      if (isMatch) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey && matchedKey !== header) {
      const baseHintMeta = {
        barcode: { key: "col_hint_barcode", fallback: "Артикул / Штрихкод" },
        id: { key: "col_hint_id", fallback: "Артикул / Код" },
        code: { key: "col_hint_id", fallback: "Артикул / Код" },
        name: { key: "col_hint_name", fallback: "Наименование" },
        brand: { key: "col_hint_brand", fallback: "Бренд" },
        qty: { key: "col_hint_qty", fallback: "Количество" },
        price: { key: "col_hint_price", fallback: "Цена продажи" },
        cost: { key: "col_hint_cost", fallback: "Цена закупа" },
        category: { key: "col_hint_category", fallback: "Категория" },
        size: { key: "col_hint_size", fallback: "Размер / Габариты" },
      };

      const meta = baseHintMeta[matchedKey];
      if (meta) {
        return {
          i18nKey: meta.key,
          label: tr[meta.key] || meta.fallback,
        };
      }

      const lowerMatched = String(matchedKey).toLowerCase().trim();
      if (tr[lowerMatched]) {
        return {
          i18nKey: lowerMatched,
          label: tr[lowerMatched],
        };
      }

      return {
        i18nKey: null,
        label:
          String(matchedKey).charAt(0).toUpperCase() +
          String(matchedKey).slice(1),
      };
    }
  }

  // 2. РЕЗЕРВНЫЙ ПОИСК по словарю интерфейса
  const rawColName = String(header).toLowerCase().trim();
  if (tr[rawColName]) {
    return {
      i18nKey: rawColName,
      label: tr[rawColName],
    };
  }

  return null;
};

// 🔥 Универсальная функция перевода шапок (возвращает чистую строку без HTML)
window.translateColumnHeader = function (header) {
  if (!header) return "";
  const hint = window.getColumnHeaderHint(header);
  if (hint && hint.label) {
    return `${header} (${hint.label})`;
  }
  return String(header);
};

window.showComplexColumnSelector = function (headers, rows, templateData) {
  const existingOverlay = document.getElementById("complexColsOverlay");
  if (existingOverlay && existingOverlay.parentNode) {
    existingOverlay.parentNode.removeChild(existingOverlay);
  }

  const tr = getSheetPreviewTranslator();

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

  const titleEl = document.createElement("h3");
  titleEl.className = "complex-title";
  titleEl.setAttribute("data-i18n", "complex_title");
  titleEl.textContent = tr("complex_title");

  const descEl = document.createElement("p");
  descEl.className = "complex-desc";
  descEl.setAttribute("data-i18n", "complex_desc");
  descEl.textContent = tr("complex_desc");

  modal.appendChild(titleEl);
  modal.appendChild(descEl);

  // Страховка на случай нестандартных файлов: выбор строки шапки вручную
  const state = window.mapper2State || {};
  if (state.rawSheet && Array.isArray(state.rawRows) && state.rawRows.length > 0) {
    const manualHeaderBtn = document.createElement("button");
    manualHeaderBtn.type = "button";
    manualHeaderBtn.className = "complex-manual-header-btn";

    const iconSpan = document.createElement("span");
    iconSpan.textContent = "🧭";

    const labelSpan = document.createElement("span");
    labelSpan.setAttribute("data-i18n", "complex_manual_header_btn");
    labelSpan.textContent = tr("complex_manual_header_btn");

    manualHeaderBtn.appendChild(iconSpan);
    manualHeaderBtn.appendChild(labelSpan);

    manualHeaderBtn.addEventListener("click", async () => {
      const sheetRowOffset = Number.isInteger(state.sheetRowOffset)
        ? state.sheetRowOffset
        : 0;
      const currentExcelRow = Number.isInteger(state.selectedHeaderRowIdx)
        ? state.selectedHeaderRowIdx + sheetRowOffset
        : sheetRowOffset;

      const pickedExcelRow = await openManualHeaderRowPickerModal(
        state.rawSheet,
        state.rawRows,
        currentExcelRow,
      );
      if (pickedExcelRow === null) return;

      const pickedRowIdx = Math.max(0, pickedExcelRow - sheetRowOffset);
      const ok = applyParsedInvoiceTable(
        state.rawRows,
        state.rawSheet,
        sheetRowOffset,
        state.selectedSheetName || "",
        { forcedHeaderRowIdx: pickedRowIdx },
      );

      if (!ok) return;

      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      window.showComplexColumnSelector(
        window.mapper2State.invoiceHeaders || [],
        window.mapper2State.invoiceRows || [],
        templateData,
      );
    });

    modal.appendChild(manualHeaderBtn);
  }

  const listEl = document.createElement("div");
  listEl.className = "complex-list";

  headers.forEach((header, idx) => {
    const originalName = header || `${tr("col_prefix")} ${idx + 1}`;
    const hint = window.getColumnHeaderHint(originalName);

    const labelEl = document.createElement("label");
    labelEl.className = "complex-label";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "complex-col-cb";
    cb.value = originalName;

    const contentDiv = document.createElement("div");
    contentDiv.style.flex = "1";

    const nameDiv = document.createElement("div");
    nameDiv.className = "complex-name";
    nameDiv.textContent = originalName;

    if (hint && hint.label) {
      const hintWrap = document.createElement("span");
      hintWrap.className = "col-header-hint";
      hintWrap.appendChild(document.createTextNode(" ("));
      const hintInner = document.createElement("span");
      if (hint.i18nKey) {
        hintInner.setAttribute("data-i18n", hint.i18nKey);
      }
      hintInner.textContent = hint.label;
      hintWrap.appendChild(hintInner);
      hintWrap.appendChild(document.createTextNode(")"));
      nameDiv.appendChild(hintWrap);
    }

    contentDiv.appendChild(nameDiv);

    let sampleVal = getComplexExample(idx);
    if (sampleVal.length > 40) sampleVal = sampleVal.substring(0, 40) + "...";

    const exampleDiv = document.createElement("div");
    exampleDiv.className = "complex-example";

    if (sampleVal) {
      const exLabel = document.createElement("span");
      exLabel.setAttribute("data-i18n", "complex_example");
      exLabel.textContent = tr("complex_example");

      const exTag = document.createElement("span");
      exTag.className = "complex-tag";
      exTag.textContent = sampleVal;

      exampleDiv.appendChild(exLabel);
      exampleDiv.appendChild(document.createTextNode(" "));
      exampleDiv.appendChild(exTag);
    } else {
      exampleDiv.style.opacity = "0.5";
      exampleDiv.setAttribute("data-i18n", "complex_empty");
      exampleDiv.textContent = tr("complex_empty");
    }

    contentDiv.appendChild(exampleDiv);
    labelEl.appendChild(cb);
    labelEl.appendChild(contentDiv);
    listEl.appendChild(labelEl);
  });

  modal.appendChild(listEl);

  const actionsDiv = document.createElement("div");
  actionsDiv.style.display = "flex";
  actionsDiv.style.justifyContent = "space-between";
  actionsDiv.style.marginTop = "20px";

  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.id = "btnComplexBack";
  backBtn.className = "complex-btn";
  backBtn.style.background = "var(--bg-card)";
  backBtn.style.color = "var(--text-main)";
  backBtn.style.border = "1px solid var(--border-main)";
  backBtn.setAttribute("data-i18n", "inc_back");
  backBtn.textContent = tr("inc_back");

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.id = "btnComplexNext";
  nextBtn.className = "complex-btn";
  nextBtn.setAttribute("data-i18n", "btn_next");
  nextBtn.textContent = tr("btn_next");

  actionsDiv.appendChild(backBtn);
  actionsDiv.appendChild(nextBtn);
  modal.appendChild(actionsDiv);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  if (typeof window.applyLanguage === "function") {
    window.applyLanguage();
  }

  // Обработчик кнопки НАЗАД
  backBtn.addEventListener("click", () => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (typeof window.navigateIncomeStep === "function")
      window.navigateIncomeStep(1);
  });

  // Обработчик кнопки ДАЛЕЕ
  nextBtn.addEventListener("click", () => {
    const checkboxes = modal.querySelectorAll(".complex-col-cb:checked");
    const selected = Array.from(checkboxes).map((cb) => cb.value);

    window.complexColumnsToTokenize = selected;
    window.mapper2State.lastComplexColumns = selected;

    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);

    if (selected.length > 0) {
      window.navigateIncomeStep("smart");
      if (typeof window.renderSmartMapper === "function")
        window.renderSmartMapper();
      else if (typeof window.initSmartMapper === "function")
        window.initSmartMapper();
    } else {
      window.navigateIncomeStep(2);
      if (typeof window.renderMapper2Cards === "function")
        window.renderMapper2Cards(templateData);
    }
  });
};

// 1. ЧТЕНИЕ ФАЙЛА И ПОИСК ТАБЛИЦЫ
// 🔥 Вспомогательная функция автоопределения номера накладной (Doc_No) из шапки Excel
function extractInvoiceDocNo(rows, dict) {
  if (!Array.isArray(rows) || rows.length === 0) return "";

  const escapeRegex = (str) =>
    String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const isEmptyOrJunk = (raw) => {
    const s = String(raw ?? "").trim();
    if (!s) return true;
    return /^[""'«»`\-—–_.:;#№\/\s]+$/.test(s);
  };

  const DOC_TITLE_REGEX =
    /^(?:COMMERCIAL\s+INVOICE|PROFORMA\s+INVOICE|TAX\s+INVOICE|FINAL\s+INVOICE|SALES\s+INVOICE|INVOICE|PACKING\s+LIST|CONTRACT|SALES\s+CONTRACT|НАКЛАДНАЯ|ТОВАРНАЯ\s+НАКЛАДНАЯ|СЧ[ЕЁ]Т[-\s]?ФАКТУРА|ИНВОЙС|ДОГОВОР|КОНТРАКТ)$/i;

  const SERVICE_LABEL_REGEX =
    /^(?:(?:inv(?:oice)?\.?|doc(?:ument)?\.?|contract|issue|shipment)?\s*date|дата(?:\s+(?:документа|накладной|инвойса))?|(?:our\s+|your\s+)?ref(?:erence)?\.?\s*(?:no\.?|№|#)?|order\s*(?:no\.?|№|#)|p\/?o\s*(?:no\.?|№|#)|b\/?l\s*(?:no\.?|№|#)|awb\s*(?:no\.?|№|#)|container\s*(?:no\.?|№|#)|seal\s*(?:no\.?|№|#)|(?:invoice|inv\.?|doc(?:ument)?\.?|contract)\s*(?:no\.?|number|№|#)|buyer|consignee|seller|shipper|supplier|vendor|notify|messrs|issuer|attn|tel(?:ephone)?|fax|e-?mail|address|bank|swift|iban|account|currency|payment|terms|incoterms|port\s+of\b|loading|discharge|destination|origin|country|page|total|amount|qty|quantity|description|unit\s+price|поставщик|покупатель|грузополучатель|грузоотправитель|получатель|отправитель|договор|контракт|накладная|сч[её]т[-\s]?фактура|инн|бин|иин|кпп|бик|иик|адрес|тел(?:ефон)?|валюта|итого|всего|основание|склад)(?=$|[\s:.№#])/i;

  const isOtherServiceLabel = (raw) => {
    const s = String(raw ?? "").trim().replace(/\s+/g, " ");
    if (!s) return false;
    return SERVICE_LABEL_REGEX.test(s);
  };

  const cleanAndValidateDocNo = (raw, trimDateTail = false) => {
    let val = String(raw ?? "").trim();
    if (!val || isEmptyOrJunk(val)) return null;

    if (trimDateTail) {
      val = val.replace(
        /(?:^|\s+[\(\[]?\s*|[\(\[]\s*)(?:от|дата|date|dated)(?=$|[\s:.,;\-\/0-9]).*$/i,
        "",
      );
    }

    // Убираем внешние кавычки и ведущие/хвостовые разделители
    val = val
      .replace(/^[\s"'«»`]+|[\s"'«»`]+$/g, "")
      .replace(/^[:.#№\-—–\s]+/, "")
      .replace(/^[\s"'«»`]+|[\s"'«»`]+$/g, "")
      .replace(/[,;:\s]+$/, "")
      .trim();

    if (!val || val.length > 80 || isEmptyOrJunk(val)) return null;

    const lower = val.toLowerCase();
    if (
      lower === "unknown" ||
      lower === "n/a" ||
      lower === "none" ||
      lower === "null" ||
      lower === "нет"
    ) {
      return null;
    }

    const normalizedSpaces = val.replace(/\s+/g, " ");
    if (DOC_TITLE_REGEX.test(normalizedSpaces)) return null;

    // Кандидат обязан содержать хотя бы одну цифру
    if (!/\d/.test(val)) return null;

    return val;
  };

  // Приоритет 1: явные метки номера накладной / инвойса / документа
  const primaryPatterns = [
    /(?:^|[\s,;|(\[])(?:invoice|inv\.?)\s*(?:no\.?|number|№|#)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])(?:товарная\s+)?накладная\s*(?:№|#|no\.?)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])сч[её]т[-\s]?фактура\s*(?:№|#|no\.?)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])номер\s+(?:накладной|документа|инвойса)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])(?:№|#)\s*(?:накл(?:адной|\.)?|док(?:умента|\.)?|инвойса)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])инвойс\s*(?:№|#|no\.?)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])(?:doc\.?|document)\s*(?:no\.?|number|№|#)(?=$|[\s:.\-\/№#0-9"'«»])/i,
  ];

  // Добавляем безопасные явные синонимы из пользовательского словаря (исключая широкие слова)
  const unsafeGenericSyns = new Set([
    "invoice",
    "inv",
    "doc",
    "document",
    "инвойс",
    "накладная",
    "счет",
    "счёт",
    "счет-фактура",
    "счёт-фактура",
    "номер",
    "no",
    "№",
    "#",
    "contract",
    "contractno",
    "договор",
    "контракт",
    "ref",
    "refno",
    "date",
    "дата",
  ]);
  const rawDictSyns = []
    .concat(
      (dict && dict["Номер накладной"]) || [],
      (dict && dict["invoice_no"]) || [],
    )
    .flatMap((v) => (Array.isArray(v) ? v : String(v || "").split(",")))
    .map((s) => String(s || "").trim())
    .filter(Boolean);

  for (const syn of rawDictSyns) {
    const compact = syn.toLowerCase().replace(/[\s.:№#\-]+/g, "");
    if (!compact || unsafeGenericSyns.has(compact) || compact.length < 4) {
      continue;
    }
    const patternStr = escapeRegex(syn).replace(/\s+/g, "\\s+");
    try {
      primaryPatterns.push(
        new RegExp(
          `(?:^|[\\s,;|(\\[])` +
            patternStr +
            `(?=$|[\\s:.\\-\\/№#0-9"'«»])`,
          "i",
        ),
      );
    } catch (e) {}
  }

  // Приоритет 2 (fallback): номер контракта / договора
  const fallbackPatterns = [
    /(?:^|[\s,;|(\[])(?:sales\s+)?contract\s*(?:no\.?|number|№|#)(?=$|[\s:.\-\/№#0-9"'«»])/i,
    /(?:^|[\s,;|(\[])(?:договор|контракт)\s*(?:№|#|no\.?)(?=$|[\s:.\-\/№#0-9"'«»])/i,
  ];

  const maxRows = Math.min(20, rows.length);

  const searchByPatterns = (patterns) => {
    for (let i = 0; i < maxRows; i++) {
      const row = rows[i] || [];
      for (let j = 0; j < row.length; j++) {
        const rawCell = String(row[j] ?? "").trim();
        if (!rawCell || isEmptyOrJunk(rawCell)) continue;

        let matched = null;
        for (const rx of patterns) {
          const m = rawCell.match(rx);
          if (m) {
            matched = m;
            break;
          }
        }
        if (!matched) continue;

        // 1. Пробуем извлечь значение из хвоста той же ячейки после метки
        const tail = rawCell.slice(matched.index + matched[0].length);
        const inlineCandidate = cleanAndValidateDocNo(tail, true);
        if (inlineCandidate) return inlineCandidate;

        // 2. Пропускаем все подряд идущие дубликаты самой метки (от распаковки !merges)
        const normLabel = rawCell.toLowerCase().replace(/\s+/g, " ").trim();
        let k = j + 1;
        while (k < row.length) {
          const nextNorm = String(row[k] ?? "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
          if (nextNorm && nextNorm === normLabel) {
            k++;
          } else {
            break;
          }
        }

        // 3. Проверяем до 3 ячеек вправо, останавливаясь на других служебных метках
        let checked = 0;
        while (k < row.length && checked < 3) {
          const rightRaw = String(row[k] ?? "").trim();
          checked++;
          k++;

          if (isEmptyOrJunk(rightRaw)) continue;
          if (isOtherServiceLabel(rightRaw)) break;

          const rightCandidate = cleanAndValidateDocNo(rightRaw, true);
          if (rightCandidate) return rightCandidate;
        }
      }
    }
    return "";
  };

  return (
    searchByPatterns(primaryPatterns) || searchByPatterns(fallbackPatterns) || ""
  );
}

// === ХЕЛПЕРЫ ДЛЯ БЛОКОВ ЛОГИСТИКИ И ШАБЛОНОВ KASPI ===
window.populateLogisticsSelect = function (selectEl, selectedValue = "") {
  if (!selectEl) return;

  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const tr =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : typeof translations !== "undefined"
        ? translations["ru"] || {}
        : {};
  const autoLabel = tr.inc_logistics_auto || "Сборная / Авто";

  let blocks = Array.isArray(window.logisticsBlocks)
    ? window.logisticsBlocks.slice()
    : [];
  if (blocks.length === 0) {
    try {
      const cached = JSON.parse(
        localStorage.getItem("logistics_blocks_cache") || "[]",
      );
      if (Array.isArray(cached) && cached.length > 0) {
        blocks = cached;
        window.logisticsBlocks = cached;
      }
    } catch (e) {}
  }

  const targetVal = String(selectedValue || "").trim();
  if (
    targetVal &&
    !blocks.some((b) => String(b).trim() === targetVal)
  ) {
    blocks.push(targetVal);
  }

  selectEl.innerHTML = "";

  const autoOpt = document.createElement("option");
  autoOpt.value = "";
  autoOpt.setAttribute("data-i18n", "inc_logistics_auto");
  autoOpt.textContent = autoLabel;
  selectEl.appendChild(autoOpt);

  blocks.forEach((blk) => {
    const cleanBlk = String(blk || "").trim();
    if (!cleanBlk) return;
    const opt = document.createElement("option");
    opt.value = cleanBlk; // Строго оригинальное значение из колонки «Главный Блок»
    opt.textContent = cleanBlk;
    selectEl.appendChild(opt);
  });

  selectEl.value = targetVal;
};

window.extractKaspiTemplateCategory = function (valuesData) {
  if (!Array.isArray(valuesData) || valuesData.length < 2) return "";

  const maxHeaderScan = Math.min(3, valuesData.length);
  for (let hRow = 0; hRow < maxHeaderScan; hRow++) {
    const row = valuesData[hRow] || [];
    const catColIdx = row.findIndex(
      (cell) => String(cell || "").trim().toLowerCase() === "category",
    );
    if (catColIdx !== -1) {
      for (let r = hRow + 1; r < valuesData.length; r++) {
        const val = String((valuesData[r] && valuesData[r][catColIdx]) || "").trim();
        if (val) return val;
      }
    }
  }
  return "";
};

window.suggestLogisticsBlock = function (kaspiCategory, templateName = "") {
  const blocks = Array.isArray(window.logisticsBlocks)
    ? window.logisticsBlocks
    : [];
  if (blocks.length === 0) return "";

  const searchText = `${String(kaspiCategory || "")} ${String(templateName || "")}`
    .toLowerCase()
    .trim();
  if (!searchText) return "";

  const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const hasWordMatch = (text, word) => {
    const clean = String(word || "").trim().toLowerCase();
    if (!clean || clean.length <= 2) return false;
    try {
      const rx = new RegExp(
        `(?:^|[^a-zа-яё0-9])${escapeRx(clean)}(?=$|[^a-zа-яё0-9])`,
        "i",
      );
      return rx.test(text);
    } catch (e) {
      return false;
    }
  };

  // 1. Прямое совпадение с названием блока (по границам слов)
  for (let i = 0; i < blocks.length; i++) {
    const blk = String(blocks[i] || "").trim();
    if (blk && hasWordMatch(searchText, blk)) {
      return blk;
    }
  }

  // 2. Базовые англоязычные правила tire/tyre -> Шины, rim/wheel -> Диски
  const findBlockByRu = (ruWord) =>
    blocks.find((b) => String(b || "").trim().toLowerCase() === ruWord) ||
    blocks.find((b) => hasWordMatch(String(b || "").toLowerCase(), ruWord)) ||
    "";

  const tireKeywords = ["tire", "tires", "tyre", "tyres"];
  if (tireKeywords.some((kw) => hasWordMatch(searchText, kw))) {
    const tireBlock = findBlockByRu("шины");
    if (tireBlock) return tireBlock;
  }

  const rimKeywords = ["rim", "rims", "wheel", "wheels"];
  if (rimKeywords.some((kw) => hasWordMatch(searchText, kw))) {
    const rimBlock = findBlockByRu("диски");
    if (rimBlock) return rimBlock;
  }

  // 3. Совпадение по маркерам Logistics (только >2 символов, по границам слов)
  const markersMap =
    window.logisticsBlockMarkers &&
    typeof window.logisticsBlockMarkers === "object"
      ? window.logisticsBlockMarkers
      : {};
  let bestBlock = "";
  let bestScore = 0;

  blocks.forEach((blk) => {
    const cleanBlk = String(blk || "").trim();
    const markers = markersMap[cleanBlk];
    if (!Array.isArray(markers) || markers.length === 0) return;

    let score = 0;
    markers.forEach((m) => {
      const cleanM = String(m || "").trim().toLowerCase();
      if (!cleanM || cleanM === "default" || cleanM === "all" || cleanM.length <= 2) {
        return;
      }
      if (hasWordMatch(searchText, cleanM)) {
        score += cleanM.length;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestBlock = cleanBlk;
    }
  });

  return bestBlock;
};

// 🔥 Вспомогательная функция автоопределения поставщика (Supplier) из шапки Excel
function extractInvoiceSupplier(rows, dict) {
  if (!Array.isArray(rows) || rows.length === 0) return "";

  const escapeRegex = (str) =>
    String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const isEmptyOrJunk = (raw) => {
    const s = String(raw ?? "").trim();
    if (!s) return true;
    return /^[""'«»`\-—–_.:;#№\/\s]+$/.test(s);
  };

  const BUYER_MARKER_RX =
    /(?:^|[\s,;|(\[])(?:buyer|the\s+buyer|consignee|consigne|purchaser|importer|bill\s+to|ship\s+to|notify\s+party|messrs|покупатель|грузополучатель|получатель|плательщик)(?=$|[\s:.\-\/№#"'«»])/i;

  const DOC_TITLE_RX =
    /^(?:COMMERCIAL\s+INVOICE|PROFORMA\s+INVOICE|TAX\s+INVOICE|FINAL\s+INVOICE|SALES\s+INVOICE|INVOICE|PACKING\s+LIST|SALES\s+CONTRACT|CONTRACT|НАКЛАДНАЯ|ТОВАРНАЯ\s+НАКЛАДНАЯ|РАСХОДНАЯ\s+НАКЛАДНАЯ|СЧ[ЕЁ]Т[-\s]?ФАКТУРА|СЧ[ЕЁ]Т\s+НА\s+ОПЛАТУ|ИНВОЙС|ДОГОВОР|КОНТРАКТ|СПЕЦИФИКАЦИЯ)(?:$|[\s#:№.\-0-9])/i;

  const SERVICE_STOP_RX =
    /^(?:(?:invoice|inv\.?|doc(?:ument)?\.?|contract|order|p\/?o|b\/?l|awb|container|seal|ref(?:erence)?)\s*(?:no\.?|number|№|#|date)|date|dated|дата|tel(?:ephone)?|fax|phone|mobile|e-?mail|web|website|www\.|http|add(?:r|ress)?|адрес|тел(?:ефон)?|факс|bank|swift|iban|beneficiary|account|a\/c|бин|иин|инн|кпп|бик|иик|р\/с|к\/с|currency|payment|terms|incoterms|port\s+of|loading|discharge|destination|origin|country|page|total|amount|qty|quantity|description|unit\s+price|валюта|итого|всего)(?=$|[\s:.№#\/\-])/i;

  const ADDRESS_OR_BANK_RX =
    /(?:^|[\s,;|])(?:add(?:r|ress)?\s*:|tel(?:ephone)?\s*:|fax\s*:|phone\s*:|mob(?:ile)?\s*:|e-?mail\s*:|www\.|https?:\/\/|@|bank\s*(?:name|details|address|account)|swift\s*(?:code)?|iban\b|beneficiary\b|a\/c\s*(?:no\.?)?|account\s*(?:no\.?|number)|(?:инн|бин|иин|кпп|бик|иик|р\/с|к\/с|тел\.?|факс|адрес)\s*[:№]?)(?=$|[\s:.\-\/0-9a-zа-яё])/i;

  const LEGAL_ENTITY_RX =
    /(?:^|[\s,.;"'«»(\[])(?:co\.?\s*,?\s*(?:limited|ltd\.?)|limited|ltd\.?|l\.l\.c\.?|llc|llp|inc\.?|corp\.?|corporation|gmbh|s\.a\.?|s\.r\.l\.?|b\.v\.?|pte\.?\s*ltd\.?|plc|тоо|ип|ооо|ао|зао|пао|оао|жшс|қж|кх|чп)(?=$|[\s,.;"'«»)\]])/i;

  const cleanSupplierCandidate = (raw, requireLegalEntity = false) => {
    let val = String(raw ?? "")
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!val || isEmptyOrJunk(val)) return null;

    // Убираем внешние кавычки и ведущие разделители
    val = val
      .replace(/^[:\-—–.\s]+/, "")
      .replace(/^["'«»`]+|["'«»`]+$/g, "")
      .replace(/[,;:\s]+$/, "")
      .trim();

    if (!val || val.length < 2 || val.length > 140 || isEmptyOrJunk(val)) {
      return null;
    }

    const lower = val.toLowerCase();
    if (
      lower === "unknown" ||
      lower === "n/a" ||
      lower === "none" ||
      lower === "null" ||
      lower === "нет"
    ) {
      return null;
    }

    if (BUYER_MARKER_RX.test(val)) return null;
    if (DOC_TITLE_RX.test(val)) return null;
    if (SERVICE_STOP_RX.test(val)) return null;

    // Если строка выглядит как адрес/телефон/банк и не содержит признаков юрлица — отбрасываем
    if (ADDRESS_OR_BANK_RX.test(val) && !LEGAL_ENTITY_RX.test(val)) return null;
    // Чистые числа/даты — не поставщик
    if (/^[\d\s.,\/\-:+()]+$/.test(val)) return null;

    if (requireLegalEntity && !LEGAL_ENTITY_RX.test(val)) return null;

    return val;
  };

  // Шаг 1: Явные метки поставщика + словарь dict
  const baseLabels = [
    "the seller",
    "supplier",
    "vendor",
    "seller",
    "shipper",
    "exporter",
    "поставщик",
    "продавец",
    "грузоотправитель",
  ];

  const dictRaw = []
    .concat(
      (dict && dict["Поиск имени поставщика"]) || [],
      (dict && dict["supplier_keywords"]) || [],
      (dict && dict["supplier"]) || [],
      (dict && dict["поставщик"]) || [],
    )
    .flatMap((v) => (Array.isArray(v) ? v : String(v || "").split(",")))
    .map((s) => String(s || "").trim())
    .filter((s) => s.length >= 3);

  const labelPatterns = [];
  const seenLabels = new Set();
  baseLabels.concat(dictRaw).forEach((lbl) => {
    const cleanLbl = String(lbl || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    if (!cleanLbl || seenLabels.has(cleanLbl)) return;
    if (BUYER_MARKER_RX.test(cleanLbl)) return;
    seenLabels.add(cleanLbl);
    const patternStr = escapeRegex(cleanLbl).replace(/\s+/g, "\\s+");
    try {
      labelPatterns.push(
        new RegExp(
          `(?:^|[\\s,;|(\\[])(?:the\\s+)?${patternStr}(?=$|[\\s:.,;\\-\\/№#"'\u00AB\u00BB])`,
          "i",
        ),
      );
    } catch (e) {}
  });

  const maxLabelRows = Math.min(20, rows.length);
  for (let i = 0; i < maxLabelRows; i++) {
    const row = rows[i] || [];
    for (let j = 0; j < row.length; j++) {
      const rawCell = String(row[j] ?? "")
        .replace(/[\r\n]+/g, " ")
        .trim();
      if (!rawCell || isEmptyOrJunk(rawCell)) continue;
      if (BUYER_MARKER_RX.test(rawCell)) continue;

      let matched = null;
      for (let p = 0; p < labelPatterns.length; p++) {
        const m = rawCell.match(labelPatterns[p]);
        if (m) {
          matched = m;
          break;
        }
      }
      if (!matched) continue;

      // 1а. Пробуем извлечь значение в той же ячейке после метки / двоеточия
      const tail = rawCell.slice(matched.index + matched[0].length);
      if (tail && tail.trim()) {
        // Если после метки идёт текст другой метки (например "Seller / Exporter:"), хвост будет отфильтрован
        const cleanedTail = tail.replace(/^[\s\/\\|]+(?:exporter|shipper|vendor|seller|supplier)?[\s:.\-]*/i, "");
        const inlineCand = cleanSupplierCandidate(cleanedTail, false);
        if (inlineCand) return inlineCand;
      }

      // 1б. Пропускаем подряд идущие дубликаты самой метки от распаковки !merges
      const normLabel = rawCell.toLowerCase().replace(/\s+/g, " ").trim();
      let k = j + 1;
      while (k < row.length) {
        const nextNorm = String(row[k] ?? "")
          .replace(/[\r\n]+/g, " ")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");
        if (nextNorm && nextNorm === normLabel) {
          k++;
        } else {
          break;
        }
      }

      // 1в. Проверяем до 4 ячеек вправо, останавливаясь на BUYER / других служебных метках
      let checked = 0;
      while (k < row.length && checked < 4) {
        const rightRaw = String(row[k] ?? "")
          .replace(/[\r\n]+/g, " ")
          .trim();
        checked++;
        k++;

        if (isEmptyOrJunk(rightRaw)) continue;
        if (BUYER_MARKER_RX.test(rightRaw) || SERVICE_STOP_RX.test(rightRaw)) {
          break;
        }

        const rightCand = cleanSupplierCandidate(rightRaw, false);
        if (rightCand) return rightCand;
      }

      // 1г. Если справа пусто (классический блок "SELLER:\nCOMPANY NAME" в следующей строке того же столбца)
      if (i + 1 < rows.length) {
        const belowRaw = String((rows[i + 1] && rows[i + 1][j]) ?? "")
          .replace(/[\r\n]+/g, " ")
          .trim();
        if (
          belowRaw &&
          belowRaw.toLowerCase().replace(/\s+/g, " ") !== normLabel &&
          !BUYER_MARKER_RX.test(belowRaw) &&
          !SERVICE_STOP_RX.test(belowRaw)
        ) {
          const belowCand = cleanSupplierCandidate(belowRaw, false);
          if (belowCand) return belowCand;
        }
      }
    }
  }

  // Шаг 2 (Fallback для коммерческих инвойсов):
  // Первые 1–3 непустые строки шапки (в пределах первых 5 строк), дедуплицируя объединённые ячейки
  let nonEmptyChecked = 0;
  const maxHeaderRows = Math.min(5, rows.length);

  for (let i = 0; i < maxHeaderRows && nonEmptyChecked < 3; i++) {
    const row = rows[i] || [];
    // Дедуплицируем ячейки строки (защита от распаковки !merges)
    const uniqueCells = [];
    const seenCellNorm = new Set();
    for (let j = 0; j < row.length; j++) {
      const cellText = String(row[j] ?? "")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!cellText || isEmptyOrJunk(cellText)) continue;
      const norm = cellText.toLowerCase();
      if (seenCellNorm.has(norm)) continue;
      seenCellNorm.add(norm);
      uniqueCells.push(cellText);
    }

    if (uniqueCells.length === 0) continue;
    nonEmptyChecked++;

    const fullRowText = uniqueCells.join(" ");
    if (BUYER_MARKER_RX.test(fullRowText)) continue;

    // Сначала проверяем отдельные уникальные ячейки (на случай если в одной строке слева компания, справа мета)
    for (let c = 0; c < uniqueCells.length; c++) {
      const cellCand = cleanSupplierCandidate(uniqueCells[c], true);
      if (cellCand) return cellCand;
    }

    // Затем проверяем склеенную строку целиком
    if (uniqueCells.length > 1) {
      const rowCand = cleanSupplierCandidate(fullRowText, true);
      if (rowCand) return rowCand;
    }
  }

  return "";
}

function getSheetPreviewTranslator() {
  const lang =
    (typeof currentLang !== "undefined" && currentLang) ||
    window.appCurrentLang ||
    "ru";
  const dict =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : typeof translations !== "undefined" && translations.ru
        ? translations.ru
        : {};
  const fallbackDict =
    typeof translations !== "undefined" && translations.ru
      ? translations.ru
      : {};

  return function tr(key, vars) {
    let text =
      dict[key] !== undefined
        ? String(dict[key])
        : fallbackDict[key] !== undefined
          ? String(fallbackDict[key])
          : "";
    if (vars && typeof vars === "object") {
      Object.keys(vars).forEach((k) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(vars[k]));
      });
    }
    return text;
  };
}

function formatSheetCellForPreview(cell) {
  if (!cell) return "";
  let raw = "";
  if (typeof cell.w === "string" && cell.w.length > 0) {
    raw = cell.w;
  } else {
    const v = cell.v;
    if (v === undefined || v === null) {
      if (typeof cell.f === "string" && cell.f.trim() !== "") {
        raw = "=" + cell.f;
      } else {
        return "";
      }
    } else if (v instanceof Date) {
      if (isNaN(v.getTime())) return "";
      const dd = String(v.getDate()).padStart(2, "0");
      const mm = String(v.getMonth() + 1).padStart(2, "0");
      const yyyy = v.getFullYear();
      raw = `${dd}.${mm}.${yyyy}`;
    } else if (typeof v === "object") {
      if (typeof v.text === "string") {
        raw = v.text;
      } else if (
        v.result !== undefined &&
        v.result !== null &&
        typeof v.result !== "object"
      ) {
        raw = String(v.result);
      } else if (Array.isArray(v.richText)) {
        raw = v.richText
          .map((part) => (part && typeof part.text === "string" ? part.text : ""))
          .join("");
      } else if (typeof v.w === "string") {
        raw = v.w;
      } else {
        return "";
      }
    } else if (typeof v === "boolean") {
      raw = v ? "TRUE" : "FALSE";
    } else {
      raw = String(v);
    }
  }
  return raw.replace(/[\r\n]+/g, " ");
}

function buildSheetPreviewTable(rawSheet, totalRows, tr, options = {}) {
  const MAX_PREVIEW_ROWS = 30;
  const MAX_PREVIEW_COLS = 25;
  const interactiveHeaderPick = Boolean(options && options.interactiveHeaderPick);
  const onRowSelect =
    options && typeof options.onRowSelect === "function"
      ? options.onRowSelect
      : null;
  let selectedExcelRow =
    options && Number.isInteger(options.selectedExcelRow)
      ? options.selectedExcelRow
      : -1;

  const makeEmptyResult = () => {
    const emptyEl = document.createElement("div");
    emptyEl.className = "sheet-preview-empty";
    emptyEl.textContent = tr("sheet_preview_empty");
    return { isEmpty: true, element: emptyEl, caption: "" };
  };

  if (!rawSheet || !rawSheet["!ref"]) {
    return makeEmptyResult();
  }

  let range = null;
  try {
    range = XLSX.utils.decode_range(rawSheet["!ref"]);
  } catch (_) {
    return makeEmptyResult();
  }

  const maxScanRow = Math.min(Math.max(range.e.r, 0), MAX_PREVIEW_ROWS - 1);
  const maxScanCol = Math.min(Math.max(range.e.c, 0), MAX_PREVIEW_COLS - 1);

  let lastNonEmptyRow = -1;
  let lastNonEmptyCol = -1;

  for (let r = 0; r <= maxScanRow; r++) {
    for (let c = 0; c <= maxScanCol; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const text = formatSheetCellForPreview(rawSheet[addr]);
      if (text.trim() !== "") {
        if (r > lastNonEmptyRow) lastNonEmptyRow = r;
        if (c > lastNonEmptyCol) lastNonEmptyCol = c;
      }
    }
  }

  const rawMerges = Array.isArray(rawSheet["!merges"]) ? rawSheet["!merges"] : [];
  rawMerges.forEach((m) => {
    if (!m || !m.s || !m.e) return;
    const sr = Math.min(m.s.r, m.e.r);
    const er = Math.max(m.s.r, m.e.r);
    const sc = Math.min(m.s.c, m.e.c);
    const ec = Math.max(m.s.c, m.e.c);
    if (sr > maxScanRow || sc > maxScanCol || er < 0 || ec < 0) return;

    const anchorText = formatSheetCellForPreview(
      rawSheet[XLSX.utils.encode_cell({ r: sr, c: sc })],
    );
    if (anchorText.trim() !== "") {
      const clampedR = Math.min(er, MAX_PREVIEW_ROWS - 1);
      const clampedC = Math.min(ec, MAX_PREVIEW_COLS - 1);
      if (clampedR > lastNonEmptyRow) lastNonEmptyRow = clampedR;
      if (clampedC > lastNonEmptyCol) lastNonEmptyCol = clampedC;
    }
  });

  if (lastNonEmptyRow < 0 || lastNonEmptyCol < 0) {
    return makeEmptyResult();
  }

  const previewCols = Math.min(MAX_PREVIEW_COLS, lastNonEmptyCol + 1);
  const previewRows =
    totalRows > MAX_PREVIEW_ROWS
      ? MAX_PREVIEW_ROWS
      : Math.max(1, Math.min(MAX_PREVIEW_ROWS, lastNonEmptyRow + 1));

  const mergeMap = new Map();
  const covered = new Set();

  rawMerges.forEach((m) => {
    if (!m || !m.s || !m.e) return;
    const sr = Math.min(m.s.r, m.e.r);
    const er = Math.max(m.s.r, m.e.r);
    const sc = Math.min(m.s.c, m.e.c);
    const ec = Math.max(m.s.c, m.e.c);
    if (er < 0 || sr >= previewRows || ec < 0 || sc >= previewCols) return;

    const r1 = Math.max(0, sr);
    const c1 = Math.max(0, sc);
    const r2 = Math.min(previewRows - 1, er);
    const c2 = Math.min(previewCols - 1, ec);
    const rowspan = r2 - r1 + 1;
    const colspan = c2 - c1 + 1;
    if (rowspan <= 1 && colspan <= 1) return;

    let conflict = false;
    for (let r = r1; r <= r2 && !conflict; r++) {
      for (let c = c1; c <= c2; c++) {
        const key = `${r}:${c}`;
        if (covered.has(key) || mergeMap.has(key)) {
          conflict = true;
          break;
        }
      }
    }
    if (conflict) return;

    mergeMap.set(`${r1}:${c1}`, { rowspan, colspan });
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        if (r === r1 && c === c1) continue;
        covered.add(`${r}:${c}`);
      }
    }
  });

  const table = document.createElement("table");
  table.className = interactiveHeaderPick
    ? "sheet-preview-table sheet-preview-table--pickable"
    : "sheet-preview-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const cornerTh = document.createElement("th");
  cornerTh.className = "sheet-preview-corner";
  headRow.appendChild(cornerTh);

  for (let c = 0; c < previewCols; c++) {
    const colTh = document.createElement("th");
    colTh.className = "sheet-preview-col-hdr";
    colTh.textContent = XLSX.utils.encode_col(c);
    headRow.appendChild(colTh);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  const bodyFrag = document.createDocumentFragment();
  const rowElements = [];

  for (let r = 0; r < previewRows; r++) {
    const trEl = document.createElement("tr");
    trEl.dataset.excelRow = String(r);
    if (interactiveHeaderPick && r === selectedExcelRow) {
      trEl.classList.add("is-selected-header-row");
    }

    const rowTh = document.createElement("th");
    rowTh.className = "sheet-preview-row-hdr";
    rowTh.textContent = String(r + 1);
    trEl.appendChild(rowTh);

    for (let c = 0; c < previewCols; c++) {
      const key = `${r}:${c}`;
      if (covered.has(key)) continue;

      const td = document.createElement("td");
      const mergeInfo = mergeMap.get(key);
      if (mergeInfo) {
        if (mergeInfo.rowspan > 1) td.rowSpan = mergeInfo.rowspan;
        if (mergeInfo.colspan > 1) {
          td.colSpan = mergeInfo.colspan;
          td.classList.add("sheet-preview-merged-col");
        }
        td.classList.add("sheet-preview-merged");
      }

      const cell = rawSheet[XLSX.utils.encode_cell({ r, c })];
      const text = formatSheetCellForPreview(cell);
      td.textContent = text;
      if (text) td.title = text;
      if (cell && cell.t === "n") {
        td.classList.add("sheet-preview-num");
      }

      trEl.appendChild(td);
    }

    rowElements.push(trEl);
    bodyFrag.appendChild(trEl);
  }

  if (interactiveHeaderPick) {
    tbody.addEventListener("click", (e) => {
      const clickedRow = e.target && e.target.closest ? e.target.closest("tr") : null;
      if (!clickedRow || clickedRow.parentNode !== tbody) return;
      const rowIdx = parseInt(clickedRow.dataset.excelRow, 10);
      if (isNaN(rowIdx)) return;

      selectedExcelRow = rowIdx;
      rowElements.forEach((el) => {
        el.classList.toggle("is-selected-header-row", el === clickedRow);
      });
      if (onRowSelect) onRowSelect(rowIdx);
    });
  }

  tbody.appendChild(bodyFrag);
  table.appendChild(tbody);

  const caption =
    totalRows > previewRows
      ? tr("sheet_preview_rows_shown", { shown: previewRows, total: totalRows })
      : tr("sheet_preview_all_rows", { total: totalRows });

  return { isEmpty: false, element: table, caption };
}

function openManualHeaderRowPickerModal(rawSheet, rawRows, initialExcelRow) {
  return new Promise((resolve) => {
    const tr = getSheetPreviewTranslator();

    const existing = document.getElementById("header-row-picker-overlay");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    let pickedExcelRow = Number.isInteger(initialExcelRow) && initialExcelRow >= 0
      ? initialExcelRow
      : 0;

    const overlay = document.createElement("div");
    overlay.id = "header-row-picker-overlay";
    overlay.className = "sheet-selector-overlay is-header-picker";

    const cleanup = () => {
      document.removeEventListener("keydown", onKeyDown);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };

    const cancel = () => {
      cleanup();
      resolve(null);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const modal = document.createElement("div");
    modal.className = "sheet-preview-modal";

    const header = document.createElement("div");
    header.className = "sheet-preview-header";

    const titleEl = document.createElement("div");
    titleEl.className = "sheet-preview-title";
    titleEl.textContent = tr("header_picker_title");

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "sheet-preview-icon-btn";
    closeBtn.setAttribute("aria-label", tr("btn_cancel"));
    closeBtn.title = tr("btn_cancel");
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", cancel);

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const hintBar = document.createElement("div");
    hintBar.className = "sheet-preview-hint-bar";
    hintBar.textContent = tr("header_picker_hint");

    const viewport = document.createElement("div");
    viewport.className = "sheet-preview-viewport";

    const metaEl = document.createElement("div");
    metaEl.className = "sheet-preview-meta";

    const updateMeta = (baseCaption) => {
      const selectedPart = tr("header_picker_selected", {
        row: pickedExcelRow + 1,
      });
      metaEl.textContent = baseCaption
        ? `${selectedPart} • ${baseCaption}`
        : selectedPart;
    };

    const preview = buildSheetPreviewTable(
      rawSheet,
      Array.isArray(rawRows) ? rawRows.length : 0,
      tr,
      {
        interactiveHeaderPick: true,
        selectedExcelRow: pickedExcelRow,
        onRowSelect: (rowIdx) => {
          pickedExcelRow = rowIdx;
          updateMeta(preview.caption);
        },
      },
    );

    viewport.appendChild(preview.element);
    updateMeta(preview.caption);

    const actionsBar = document.createElement("div");
    actionsBar.className = "sheet-preview-actions";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "sheet-preview-btn sheet-preview-btn--secondary";
    cancelBtn.textContent = tr("btn_cancel");
    cancelBtn.addEventListener("click", cancel);

    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "sheet-preview-btn sheet-preview-btn--primary";
    applyBtn.textContent = tr("header_picker_apply");
    applyBtn.disabled = preview.isEmpty;
    applyBtn.addEventListener("click", () => {
      cleanup();
      resolve(pickedExcelRow);
    });

    actionsBar.appendChild(cancelBtn);
    actionsBar.appendChild(applyBtn);

    modal.appendChild(header);
    modal.appendChild(hintBar);
    modal.appendChild(viewport);
    modal.appendChild(metaEl);
    modal.appendChild(actionsBar);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
}

// === УМНОЕ ОПРЕДЕЛЕНИЕ ШАПКИ, СКЛЕЙКА 2-ЭТАЖНОЙ ШАПКИ И ОТСЕЧЕНИЕ ПОДВАЛА ===

function cleanInvoiceCellText(val) {
  return String(val === undefined || val === null ? "" : val)
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseInvoiceNumber(val) {
  if (typeof val === "number") {
    return Number.isFinite(val) ? val : NaN;
  }
  const raw = cleanInvoiceCellText(val);
  if (!raw || raw.includes("%")) return NaN;

  // Убираем распространённые обозначения валют в начале/конце (вкл. US$, $, €, ₸, ₽, ¥, £, USD, KZT, тг.)
  let s = raw
    .replace(/^(?:US\$|USD|EUR|KZT|RUB|CNY|RMB|GBP|₸|\$|€|₽|¥|£|тг\.?|тенге|руб\.?)\s*/i, "")
    .replace(/\s*(?:US\$|USD|EUR|KZT|RUB|CNY|RMB|GBP|₸|\$|€|₽|¥|£|тг\.?|тенге|руб\.?)$/i, "")
    .replace(/[\s\u00A0\u202F]+/g, "");

  if (!s || /[a-zA-Zа-яА-ЯёЁ]/.test(s)) return NaN;

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");

  if (hasComma && hasDot) {
    if (s.lastIndexOf(",") > s.lastIndexOf(".")) {
      // Формат 1.250,50
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      // Формат 1,250.50
      s = s.replace(/,/g, "");
    }
  } else if (hasComma) {
    const parts = s.split(",");
    if (parts.length === 2 && parts[1].length <= 2) {
      // Десятичная запятая: 7,50 / 120,00
      s = parts[0] + "." + parts[1];
    } else {
      // Разделитель тысяч: 1,250
      s = s.replace(/,/g, "");
    }
  }

  if (!/^-?\d+(?:\.\d+)?$/.test(s)) return NaN;
  const num = Number(s);
  return Number.isFinite(num) ? num : NaN;
}

window.parseInvoiceNumber = parseInvoiceNumber;

// Штатная стилизованная модалка уведомлений (вместо системного browser alert, XSS-safe, dark/light, ru/kz)
window.showKaspiNotice = function (message, options = {}) {
  return new Promise((resolve) => {
    const tr = getSheetPreviewTranslator();
    const type = (options && options.type) || "warning";
    const existing = document.getElementById("kaspi-notice-overlay");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    const overlay = document.createElement("div");
    overlay.id = "kaspi-notice-overlay";
    overlay.className = "kaspi-notice-overlay";

    const close = () => {
      document.removeEventListener("keydown", onKeyDown);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      resolve();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const modal = document.createElement("div");
    modal.className = `kaspi-notice-modal kaspi-notice-modal--${type}`;

    const iconMap = { error: "❌", warning: "⚠️", success: "✅", info: "ℹ️" };
    const titleKeyMap = {
      error: "notice_title_error",
      warning: "notice_title_warning",
      success: "notice_title_success",
      info: "notice_title_warning",
    };

    const headerEl = document.createElement("div");
    headerEl.className = "kaspi-notice-header";
    const iconSpan = document.createElement("span");
    iconSpan.textContent = iconMap[type] || "⚠️";
    const titleSpan = document.createElement("span");
    titleSpan.textContent =
      (options && options.title) || tr(titleKeyMap[type] || "notice_title_warning");
    headerEl.appendChild(iconSpan);
    headerEl.appendChild(titleSpan);

    const bodyEl = document.createElement("div");
    bodyEl.className = "kaspi-notice-body";
    bodyEl.textContent = String(message === undefined || message === null ? "" : message);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "kaspi-notice-btn";
    closeBtn.textContent = tr("btn_close");
    closeBtn.addEventListener("click", close);

    modal.appendChild(headerEl);
    modal.appendChild(bodyEl);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
};

function isNumericLikeCell(val) {
  return !isNaN(parseInvoiceNumber(val));
}

function isUnitOrCurrencyLabel(val) {
  const s = cleanInvoiceCellText(val).replace(/^[\(\[]+|[\)\]]+$/g, "").trim();
  if (!s || s.length > 14) return false;
  return /^(?:USD|US\$|EUR|KZT|RUB|CNY|RMB|GBP|₸|\$|€|₽|¥|SETS?|PCS?|PC|EA|EACH|UNIT|UNITS|NOS?\.?|BOX(?:ES)?|CTNS?|CARTONS?|PKGS?|PACKS?|BAGS?|PAIRS?|ROLLS?|KG|KGS|G|GR|MT|TONS?|LBS?|CBM|M3|M2|M|CM|MM|L|ML|ШТ\.?|КГ|ГР|ТГ|УП\.?|КОР\.?|КОМПЛ\.?|ПАР|М2|М3|М)$/i.test(
    s,
  );
}

const INVOICE_FOOTER_PHRASE_RE =
  /\b(?:TOTAL\s+AMOUNT\s+SAY|AMOUNT\s+SAY|SAY\s*:|SAY\s+U\.?S\.?|GRAND\s+TOTAL|SUB[-\s]?TOTAL|SUBTOTAL|NET\s+TOTAL|GROSS\s+TOTAL|INVOICE\s+TOTAL|TOTAL\s+VALUE|TOTAL\s+QTY|TOTAL\s+QUANTITY|TOTAL\s+PACKAGES|TOTAL\s+CARTONS|TOTAL\s+WEIGHT|TOTAL\s+CBM|ИТОГО|ВСЕГО\s+К\s+ОПЛАТЕ|ВСЕГО\s+НА\s+СУММУ|PAYMENT\s+TERMS?|REMARKS?|ARBITRATION|BENEFICIARY|BANK\s+DETAILS?|SWIFT\s+CODE|ACCOUNT\s+NO|SHIPPING\s+MARKS?|COUNTRY\s+OF\s+ORIGIN|PORT\s+OF\s+(?:LOADING|DISCHARGE)|SIGNED\s+BY|AUTHORIZED\s+SIGNATURE)\b/i;

const INVOICE_STANDALONE_TOTAL_RE =
  /^(?:TOTAL|GRAND\s+TOTAL|SUB[-\s]?TOTAL|SUBTOTAL|ИТОГО|ВСЕГО)\s*[:：]?$/i;

const INVOICE_CONTAINER_RE =
  /(?:\b\d+\s*[xх×*]\s*(?:20|40|45)\s*(?:GP|HC|HQ|FT|OT|RF)?'?|\b(?:20GP|40GP|40HC|40HQ|45HC|45HQ)\b)/i;

const INVOICE_INCOTERM_CELL_RE =
  /^(?:FOB|CIF|CFR|C&F|EXW|FCA|CPT|CIP|DAP|DPU|DDP)(?:\s+[A-ZА-Я0-9.,\-\s]{1,30})?$/i;

function isFooterOrServiceCell(val) {
  const s = cleanInvoiceCellText(val);
  if (!s) return false;
  if (INVOICE_FOOTER_PHRASE_RE.test(s)) return true;
  if (INVOICE_STANDALONE_TOTAL_RE.test(s)) return true;
  if (INVOICE_CONTAINER_RE.test(s)) return true;
  if (INVOICE_INCOTERM_CELL_RE.test(s)) return true;
  return false;
}

function getRowHorizontalMergeMeta(row, rawSheet, excelRowIdx) {
  const spansByCol = new Map();
  let maxSpan = 1;

  if (rawSheet && Array.isArray(rawSheet["!merges"]) && Number.isInteger(excelRowIdx)) {
    rawSheet["!merges"].forEach((m) => {
      if (!m || !m.s || !m.e) return;
      const sr = Math.min(m.s.r, m.e.r);
      const er = Math.max(m.s.r, m.e.r);
      const sc = Math.min(m.s.c, m.e.c);
      const ec = Math.max(m.s.c, m.e.c);
      if (excelRowIdx < sr || excelRowIdx > er) return;
      const span = ec - sc + 1;
      if (span >= 2) {
        if (span > maxSpan) maxSpan = span;
        for (let c = sc; c <= ec; c++) {
          spansByCol.set(c, { sc, ec, span });
        }
      }
    });
  }

  // Фоллбэк: если rawSheet нет, определяем горизонтальные дубли по подряд идущим одинаковым непустым ячейкам
  if (spansByCol.size === 0 && Array.isArray(row)) {
    let c = 0;
    while (c < row.length) {
      const val = cleanInvoiceCellText(row[c]);
      if (!val) {
        c++;
        continue;
      }
      let end = c;
      while (end + 1 < row.length && cleanInvoiceCellText(row[end + 1]) === val) {
        end++;
      }
      const span = end - c + 1;
      if (span >= 2) {
        if (span > maxSpan) maxSpan = span;
        for (let k = c; k <= end; k++) {
          spansByCol.set(k, { sc: c, ec: end, span });
        }
      }
      c = end + 1;
    }
  }

  return { maxSpan, spansByCol };
}

function getUniqueRowTexts(row) {
  const seen = new Set();
  const list = [];
  if (!Array.isArray(row)) return list;
  for (let c = 0; c < row.length; c++) {
    const txt = cleanInvoiceCellText(row[c]);
    if (!txt) continue;
    const norm = txt.toLowerCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      list.push(txt);
    }
  }
  return list;
}

function isFooterInvoiceRow(row, rawSheet, excelRowIdx, expectedColCount) {
  const uniqueTexts = getUniqueRowTexts(row);
  if (uniqueTexts.length === 0) return false;

  // А) Явные фразы итогов / контейнеров / инкотермс / реквизитов в любой ячейке строки
  if (uniqueTexts.some((txt) => isFooterOrServiceCell(txt))) {
    return true;
  }

  // Б) Нумерованные пункты договора ("1. The seller...", "2. Shipment...")
  const startText = uniqueTexts.slice(0, 3).join(" ");
  if (/^[1-9]\s*\.\s*[A-Za-zА-Яа-я]/.test(startText) && startText.length > 15) {
    return true;
  }

  // В) Структурная аномалия контракта: мало уникальных колонок, но есть длинный текст (> 45 символов)
  const hasLongText = uniqueTexts.some((txt) => txt.length > 45);
  if (hasLongText && uniqueTexts.length <= 3) {
    return true;
  }

  // Г) Широкое горизонтальное объединение (например, A17:F17 или A18:I18) при малом числе уникальных колонок
  const mergeMeta = getRowHorizontalMergeMeta(row, rawSheet, excelRowIdx);
  const colThreshold = expectedColCount
    ? Math.max(4, Math.floor(expectedColCount * 0.6))
    : 4;
  if (mergeMeta.maxSpan >= 3 && uniqueTexts.length <= colThreshold) {
    return true;
  }

  return false;
}

function isRealisticDataRow(row, rawSheet, excelRowIdx, expectedColCount) {
  if (!Array.isArray(row)) return false;
  const filledCount = row.filter((c) => cleanInvoiceCellText(c) !== "").length;
  if (filledCount === 0) return false;
  if (isFooterInvoiceRow(row, rawSheet, excelRowIdx, expectedColCount)) {
    return false;
  }

  const uniqueTexts = getUniqueRowTexts(row);
  const numCount = row.filter((c) => isNumericLikeCell(c)).length;
  const minUnique = expectedColCount && expectedColCount <= 2 ? 2 : 3;

  return filledCount >= minUnique && uniqueTexts.length >= minUnique && numCount >= 1;
}

function buildHeaderKeywordMatchers(globalSyns) {
  const rawKeys = [];
  ["price", "barcode", "name", "qty"].forEach((k) => {
    if (globalSyns && Array.isArray(globalSyns[k])) {
      rawKeys.push(...globalSyns[k]);
    }
  });

  rawKeys.push(
    "code",
    "brand",
    "size",
    "pattern",
    "pr",
    "li/ss",
    "model",
    "spec",
    "specification",
    "description",
    "item",
    "product",
    "sku",
    "article",
    "quantity",
    "qty",
    "unit price",
    "price",
    "total amount",
    "amount",
    "sets",
    "pcs",
    "usd",
    "weight",
    "cbm",
    "штрихкод",
    "артикул",
    "наименование",
    "товар",
    "бренд",
    "размер",
    "модель",
    "кол-во",
    "количество",
    "цена",
    "сумма",
    "ед",
  );

  const exactSet = new Set();
  const substrList = [];

  rawKeys.forEach((raw) => {
    const clean = String(raw || "")
      .toLowerCase()
      .replace(/\s+/g, "");
    if (!clean) return;
    exactSet.add(clean);
    if (clean.length >= 4 && !substrList.includes(clean)) {
      substrList.push(clean);
    }
  });

  return function matchesHeaderKeyword(cellText) {
    const trimmed = cleanInvoiceCellText(cellText);
    // Слишком длинные предложения (> 45 символов) почти никогда не являются названием колонки
    if (!trimmed || trimmed.length > 45) return false;
    const norm = trimmed.toLowerCase().replace(/\s+/g, "");
    if (exactSet.has(norm)) return true;
    return substrList.some((key) => norm.includes(key));
  };
}

function isSubHeaderInvoiceRow(
  nextRow,
  upperRow,
  rawSheet,
  nextExcelRowIdx,
  upperExcelRowIdx,
  matchesHeaderKeyword,
) {
  if (!Array.isArray(nextRow)) return false;
  const uniqueNext = getUniqueRowTexts(nextRow);
  if (uniqueNext.length < 2) return false;
  if (isFooterInvoiceRow(nextRow, rawSheet, nextExcelRowIdx, uniqueNext.length)) {
    return false;
  }

  // Подшапка не должна содержать товарных чисел/цен
  const numCount = uniqueNext.filter((txt) => isNumericLikeCell(txt)).length;
  if (numCount > 0) return false;

  const longCount = uniqueNext.filter((txt) => txt.length > 35).length;
  if (longCount > 0) return false;

  const unitCount = uniqueNext.filter((txt) => isUnitOrCurrencyLabel(txt)).length;
  const keywordCount = uniqueNext.filter((txt) => matchesHeaderKeyword(txt)).length;
  const upperMerge = getRowHorizontalMergeMeta(upperRow, rawSheet, upperExcelRowIdx);

  return unitCount >= 1 || keywordCount >= 2 || (upperMerge.maxSpan >= 2 && uniqueNext.length > getUniqueRowTexts(upperRow).length);
}

function isValidUpperHeaderRow(upperRow, rawSheet, upperExcelRowIdx) {
  if (!Array.isArray(upperRow)) return false;
  const uniqueUpper = getUniqueRowTexts(upperRow);
  if (uniqueUpper.length < 2) return false;

  // Верхняя строка шапки может иметь широкий групповой заголовок (например, SPECIFICATION на A9:F9),
  // поэтому проверяем именно служебные/подвальные фразы, реквизиты и числа, а не ширину merge
  if (uniqueUpper.some((txt) => isFooterOrServiceCell(txt))) {
    return false;
  }

  const startText = uniqueUpper.slice(0, 3).join(" ");
  if (/^[1-9]\s*\.\s*[A-Za-zА-Яа-я]/.test(startText) && startText.length > 15) {
    return false;
  }

  // Если в строке есть реквизиты документа вида "Invoice No: 123" или "Buyer: ABC" — это не верхняя шапка таблицы
  const colonMetaCount = uniqueUpper.filter(
    (txt) => /:\s*\S/.test(txt) && txt.length > 10,
  ).length;
  if (colonMetaCount >= 1) return false;

  const numCount = uniqueUpper.filter((txt) => isNumericLikeCell(txt)).length;
  if (numCount > 0 && numCount >= uniqueUpper.length / 2) return false;

  const tooLongCount = uniqueUpper.filter((txt) => txt.length > 45).length;
  if (tooLongCount >= uniqueUpper.length / 2) return false;

  return true;
}

function buildMergedInvoiceHeaders(rows, headerIdx, rawSheet, sheetRowOffset) {
  const bottomRow = rows[headerIdx] || [];
  const upperIdx = headerIdx - 1;
  const upperRow = upperIdx >= 0 ? rows[upperIdx] || [] : [];
  const upperExcelRowIdx = upperIdx + sheetRowOffset;
  const hasValidUpper =
    upperIdx >= 0 && isValidUpperHeaderRow(upperRow, rawSheet, upperExcelRowIdx);

  const upperMergeMeta = hasValidUpper
    ? getRowHorizontalMergeMeta(upperRow, rawSheet, upperExcelRowIdx)
    : { maxSpan: 1, spansByCol: new Map() };

  let colCount = Math.max(bottomRow.length, hasValidUpper ? upperRow.length : 0);
  while (colCount > 0) {
    const b = cleanInvoiceCellText(bottomRow[colCount - 1]);
    const u = hasValidUpper ? cleanInvoiceCellText(upperRow[colCount - 1]) : "";
    if (b || u) break;
    colCount--;
  }

  const headers = [];
  for (let idx = 0; idx < colCount; idx++) {
    let topText = hasValidUpper ? cleanInvoiceCellText(upperRow[idx]) : "";
    let botText = cleanInvoiceCellText(bottomRow[idx]);

    // Длинные фразы (> 35 символов) из верхней строки не приклеиваем к заголовкам
    if (topText.length > 35) topText = "";

    if (!topText && !botText) {
      headers.push("");
      continue;
    }
    if (!topText) {
      headers.push(botText);
      continue;
    }
    if (!botText) {
      headers.push(topText);
      continue;
    }
    if (topText.toLowerCase() === botText.toLowerCase()) {
      headers.push(botText);
      continue;
    }

    // Нижняя строка — единица измерения или валюта (SETS, USD, PCS, KG...): "QUANTITY (SETS)", "UNIT PRICE (USD)"
    if (isUnitOrCurrencyLabel(botText)) {
      headers.push(`${topText} (${botText})`);
      continue;
    }

    // Проверяем, является ли верхняя ячейка общим групповым заголовком (как SPECIFICATION на A9:F9)
    // над конкретными разными названиями колонок (Code, Brand, Size, PR, LI/SS, Pattern)
    const spanInfo = upperMergeMeta.spansByCol.get(idx);
    if (spanInfo && spanInfo.span >= 2) {
      const subLabels = new Set();
      for (let c = spanInfo.sc; c <= spanInfo.ec; c++) {
        const sub = cleanInvoiceCellText(bottomRow[c]);
        if (sub && !isUnitOrCurrencyLabel(sub)) {
          subLabels.add(sub.toLowerCase());
        }
      }
      if (subLabels.size >= 2) {
        headers.push(botText);
        continue;
      }
    }

    headers.push(`${topText} ${botText}`);
  }

  return headers;
}

function parseInvoiceTableFromSheet(
  rows,
  rawSheet,
  sheetRowOffset,
  globalSyns,
  options = {},
) {
  const offset = Number.isInteger(sheetRowOffset) ? sheetRowOffset : 0;
  const matchesHeaderKeyword = buildHeaderKeywordMatchers(globalSyns);
  let headerIdx = -1;

  if (
    options &&
    Number.isInteger(options.forcedHeaderRowIdx) &&
    options.forcedHeaderRowIdx >= 0 &&
    options.forcedHeaderRowIdx < rows.length
  ) {
    headerIdx = options.forcedHeaderRowIdx;

    // Если пользователь кликнул верхнюю строку 2-этажной шапки (например, строку 9),
    // а строка 10 является текстовой подшапкой перед данными — объединяем их автоматически
    if (
      headerIdx + 1 < rows.length &&
      isSubHeaderInvoiceRow(
        rows[headerIdx + 1],
        rows[headerIdx],
        rawSheet,
        headerIdx + 1 + offset,
        headerIdx + offset,
        matchesHeaderKeyword,
      )
    ) {
      headerIdx = headerIdx + 1;
    }
  } else {
    const scanLimit = Math.min(40, rows.length);
    let bestScore = -Infinity;
    let fallbackTwoColIdx = -1;
    let fallbackTwoColScore = -Infinity;

    for (let i = 0; i < scanLimit; i++) {
      const row = rows[i] || [];
      const excelRowIdx = i + offset;
      const uniqueTexts = getUniqueRowTexts(row);

      if (uniqueTexts.length < 2) continue;

      // Дисквалифицируем строки итогов/подвала/контейнеров/инкотермс
      if (uniqueTexts.some((txt) => isFooterOrServiceCell(txt))) continue;

      // Дисквалифицируем строки, где доминируют длинные предложения (> 45 символов)
      const longTexts = uniqueTexts.filter((txt) => txt.length > 45);
      if (longTexts.length >= Math.ceil(uniqueTexts.length / 2)) continue;
      if (uniqueTexts.some((txt) => txt.length > 60) && uniqueTexts.length <= 3) {
        continue;
      }

      // Дисквалифицируем числовые строки (товары / итоги)
      const numericUniqueCount = uniqueTexts.filter((txt) =>
        isNumericLikeCell(txt),
      ).length;
      if (
        numericUniqueCount >= 2 ||
        numericUniqueCount / uniqueTexts.length >= 0.4
      ) {
        continue;
      }

      // Считаем совпадения маркеров шапки строго по УНИКАЛЬНЫМ коротким значениям (<= 45 симв.)
      let uniqueKeywordMatches = 0;
      let shortNonNumCount = 0;
      uniqueTexts.forEach((txt) => {
        if (txt.length <= 45 && !isNumericLikeCell(txt)) {
          shortNonNumCount++;
          if (matchesHeaderKeyword(txt)) {
            uniqueKeywordMatches++;
          }
        }
      });

      if (uniqueKeywordMatches < 2) continue;

      // Проверяем наличие реальных товарных строк НИЖЕ строки-кандидата
      // (учитывая возможную 2-ю строку подшапки сразу на i+1)
      let dataStartCheck = i + 1;
      if (
        dataStartCheck < rows.length &&
        isSubHeaderInvoiceRow(
          rows[dataStartCheck],
          row,
          rawSheet,
          dataStartCheck + offset,
          excelRowIdx,
          matchesHeaderKeyword,
        )
      ) {
        dataStartCheck++;
      }

      let dataRowsBelow = 0;
      let emptyRun = 0;
      for (
        let k = dataStartCheck;
        k < Math.min(rows.length, dataStartCheck + 25);
        k++
      ) {
        const candRow = rows[k] || [];
        const candFilled = candRow.filter(
          (c) => cleanInvoiceCellText(c) !== "",
        ).length;
        if (candFilled === 0) {
          emptyRun++;
          if (emptyRun >= 2) break;
          continue;
        }
        emptyRun = 0;
        if (
          isFooterInvoiceRow(
            candRow,
            rawSheet,
            k + offset,
            Math.max(uniqueTexts.length, row.length),
          )
        ) {
          break;
        }
        if (
          isRealisticDataRow(
            candRow,
            rawSheet,
            k + offset,
            Math.max(uniqueTexts.length, row.length),
          )
        ) {
          dataRowsBelow++;
        }
      }

      // Строка без товарных данных под ней не может быть шапкой таблицы
      if (dataRowsBelow === 0) continue;

      const mergeMeta = getRowHorizontalMergeMeta(row, rawSheet, excelRowIdx);
      const wideMergePenalty = mergeMeta.maxSpan >= 3 ? 4 : 0;
      const longCellPenalty = longTexts.length * 8;

      const score =
        uniqueKeywordMatches * 10 +
        shortNonNumCount * 1.5 +
        Math.min(dataRowsBelow, 10) * 2 -
        wideMergePenalty -
        longCellPenalty;

      if (uniqueTexts.length >= 3) {
        if (score > bestScore) {
          bestScore = score;
          headerIdx = i;
        }
      } else if (uniqueTexts.length === 2 && uniqueKeywordMatches === 2) {
        if (score > fallbackTwoColScore) {
          fallbackTwoColScore = score;
          fallbackTwoColIdx = i;
        }
      }
    }

    if (headerIdx === -1 && fallbackTwoColIdx !== -1) {
      headerIdx = fallbackTwoColIdx;
    }

    // Если победила верхняя строка 2-этажной шапки — сдвигаем на нижнюю строку подшапки
    if (
      headerIdx >= 0 &&
      headerIdx + 1 < rows.length &&
      isSubHeaderInvoiceRow(
        rows[headerIdx + 1],
        rows[headerIdx],
        rawSheet,
        headerIdx + 1 + offset,
        headerIdx + offset,
        matchesHeaderKeyword,
      )
    ) {
      headerIdx = headerIdx + 1;
    }

    // Фоллбэк (если шапка нестандартная и без известных маркеров): ищем первую товарную строку
    if (headerIdx === -1) {
      for (let i = 0; i < Math.min(50, rows.length); i++) {
        const row = rows[i] || [];
        if (isRealisticDataRow(row, rawSheet, i + offset, row.length)) {
          headerIdx = i > 0 ? i - 1 : 0;
          break;
        }
      }
    }
  }

  if (headerIdx < 0) {
    return { headerIdx: -1, headers: [], dataRows: [] };
  }

  const headers = buildMergedInvoiceHeaders(rows, headerIdx, rawSheet, offset);
  const firstDataRowIdx = headerIdx + 1;

  // Извлекаем полезные строки товаров и жёстко обрубаем подвал
  const validRows = [];
  let strikes = 0;

  for (let i = firstDataRowIdx; i < rows.length; i++) {
    const row = rows[i] || [];
    const excelRowIdx = i + offset;
    const filledCellsCount = row.filter(
      (c) => cleanInvoiceCellText(c) !== "",
    ).length;

    if (filledCellsCount === 0) {
      strikes++;
      if (strikes >= 2) break;
      continue;
    }

    // Жёсткая остановка на подвале (1x40HC', FOB, TOTAL AMOUNT SAY, итоги, пункты договора, широкие merge-баннеры)
    if (isFooterInvoiceRow(row, rawSheet, excelRowIdx, headers.length)) {
      break;
    }

    const uniqueCount = getUniqueRowTexts(row).length;
    const numCount = row.filter((c) => isNumericLikeCell(c)).length;
    const minCols = headers.length <= 2 ? 2 : 3;

    if (filledCellsCount >= minCols && uniqueCount >= minCols && numCount >= 1) {
      validRows.push(row);
      strikes = 0;
    } else {
      strikes++;
      if (strikes >= 2) break;
    }
  }

  // Вторичный фильтр по цене и идентификатору товара
  const headersToSearch = headers.map((h) =>
    String(h).toLowerCase().replace(/\s+/g, ""),
  );

  const findCol = (keys, fallbacks) => {
    let syns = [];
    keys.forEach((k) => {
      if (globalSyns && globalSyns[k]) syns = syns.concat(globalSyns[k]);
    });
    syns = syns
      .concat(fallbacks)
      .map((s) => String(s).toLowerCase().replace(/\s+/g, ""))
      .filter(Boolean);
    return headersToSearch.findIndex((h) =>
      syns.some((syn) => h && h.includes(syn)),
    );
  };

  const priceIdx = findCol(
    ["price", "Розничная цена", "Закупочная цена"],
    ["unitprice", "usd", "цена", "стоимость", "amount"],
  );
  const idIdx = findCol(
    ["barcode", "Артикул / Код товара", "id", "code"],
    ["артикул", "штрихкод"],
  );
  const nameIdx = findCol(
    ["name", "Бренд / Производитель", "Наименование товара"],
    ["brand", "бренд", "наименование", "товар", "size", "pattern"],
  );

  let finalRows = validRows;
  if (priceIdx !== -1 && (idIdx !== -1 || nameIdx !== -1)) {
    finalRows = validRows.filter((row) => {
      if (!row || row.length === 0) return false;

      const price = parseInvoiceNumber(row[priceIdx]);
      if (isNaN(price) || price <= 0) return false;

      const rawId = idIdx !== -1 ? cleanInvoiceCellText(row[idIdx]) : "";
      const rawName = nameIdx !== -1 ? cleanInvoiceCellText(row[nameIdx]) : "";
      if (!rawId && !rawName) return false;

      if (isFooterOrServiceCell(rawId) || isFooterOrServiceCell(rawName)) {
        return false;
      }

      return true;
    });
  }

  return { headerIdx, headers, dataRows: finalRows };
}

function applyParsedInvoiceTable(
  rows,
  rawSheet,
  sheetRowOffset,
  selectedSheetName,
  options = {},
) {
  const globalSyns =
    typeof invoiceSynonyms !== "undefined" && invoiceSynonyms
      ? invoiceSynonyms
      : window.invoiceSynonyms || {};

  const parsed = parseInvoiceTableFromSheet(
    rows,
    rawSheet,
    sheetRowOffset,
    globalSyns,
    options,
  );

  if (parsed.headerIdx < 0) return false;

  window.mapper2State.selectedHeaderRowIdx = parsed.headerIdx;
  window.mapper2State.invoiceHeaders = parsed.headers;
  window.mapper2State.invoiceRows = parsed.dataRows;

  const fileContentStr =
    window.mapper2State.docNo +
    "_" +
    window.mapper2State.supplier +
    "_" +
    selectedSheetName +
    "_" +
    JSON.stringify(window.mapper2State.invoiceRows.slice(0, 5));
  let hashNum = 0;
  for (let i = 0; i < fileContentStr.length; i++) {
    hashNum = (hashNum << 5) - hashNum + fileContentStr.charCodeAt(i);
    hashNum |= 0;
  }
  window.mapper2State.fileHash = "hash_" + Math.abs(hashNum).toString(16);

  return true;
}

function openExcelSheetSelectorModal(validSheets, processedSheets, fileRegistryKey) {
  return new Promise((resolve) => {
    const tr = getSheetPreviewTranslator();

    const existingOverlay = document.getElementById("sheet-selector-overlay");
    if (existingOverlay && existingOverlay.parentNode) {
      existingOverlay.parentNode.removeChild(existingOverlay);
    }

    const overlay = document.createElement("div");
    overlay.id = "sheet-selector-overlay";
    overlay.className = "sheet-selector-overlay";

    const cleanup = () => {
      document.removeEventListener("keydown", onKeyDown);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };

    const cancelSelection = () => {
      cleanup();
      resolve(null);
    };

    const confirmSheet = (idx) => {
      const sheetData = validSheets[idx];
      if (!sheetData) return cancelSelection();

      if (!processedSheets.includes(sheetData.name)) {
        processedSheets.push(sheetData.name);
        sessionStorage.setItem(fileRegistryKey, JSON.stringify(processedSheets));
      }

      cleanup();
      window.showLoading(tr("inc_preparing_data"));
      resolve({
        name: sheetData.name,
        rows: sheetData.rows,
        rawSheet: sheetData.rawSheet,
        sheetRowOffset: sheetData.sheetRowOffset || 0,
      });
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancelSelection();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const renderListView = () => {
      overlay.textContent = "";

      const modal = document.createElement("div");
      modal.className = "sheet-selector-modal";

      const titleEl = document.createElement("div");
      titleEl.className = "sheet-selector-title";
      titleEl.textContent = tr("select_sheet_title");

      const descEl = document.createElement("div");
      descEl.className = "sheet-selector-desc";
      descEl.textContent = tr("select_sheet_desc");

      const hintEl = document.createElement("div");
      hintEl.className = "sheet-selector-hint";
      hintEl.textContent = tr("sheet_preview_tap_hint");

      const listEl = document.createElement("div");
      listEl.className = "sheet-selector-list";

      const rowsLabel = tr("inc_sheet_rows");

      validSheets.forEach((sheetData, idx) => {
        const isProcessed = processedSheets.includes(sheetData.name);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = isProcessed
          ? "sheet-select-btn is-processed"
          : "sheet-select-btn";

        const nameSpan = document.createElement("span");
        nameSpan.className = "sheet-select-name";
        nameSpan.textContent = `${isProcessed ? "✅" : "📄"} ${sheetData.name}`;

        const countSpan = document.createElement("span");
        countSpan.className = "sheet-select-count";
        countSpan.textContent = `${rowsLabel} ${sheetData.rows.length}`;

        btn.appendChild(nameSpan);
        btn.appendChild(countSpan);

        btn.addEventListener("click", () => {
          renderPreviewView(idx);
        });

        listEl.appendChild(btn);
      });

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.id = "cancel-sheet-select";
      cancelBtn.className = "sheet-selector-cancel-btn";
      cancelBtn.textContent = tr("btn_cancel");
      cancelBtn.addEventListener("click", cancelSelection);

      modal.appendChild(titleEl);
      modal.appendChild(descEl);
      modal.appendChild(hintEl);
      modal.appendChild(listEl);
      modal.appendChild(cancelBtn);
      overlay.appendChild(modal);
    };

    const renderPreviewView = (initialIdx) => {
      overlay.textContent = "";
      let activeIdx = initialIdx;

      const modal = document.createElement("div");
      modal.className = "sheet-preview-modal";

      const header = document.createElement("div");
      header.className = "sheet-preview-header";

      const headerLeft = document.createElement("div");
      headerLeft.className = "sheet-preview-header-left";

      const backIconBtn = document.createElement("button");
      backIconBtn.type = "button";
      backIconBtn.className = "sheet-preview-icon-btn";
      backIconBtn.setAttribute("aria-label", tr("sheet_preview_back"));
      backIconBtn.title = tr("sheet_preview_back");
      backIconBtn.textContent = "←";
      backIconBtn.addEventListener("click", renderListView);

      const titleEl = document.createElement("div");
      titleEl.className = "sheet-preview-title";
      titleEl.textContent = tr("sheet_preview_title");

      headerLeft.appendChild(backIconBtn);
      headerLeft.appendChild(titleEl);

      const closeIconBtn = document.createElement("button");
      closeIconBtn.type = "button";
      closeIconBtn.className = "sheet-preview-icon-btn";
      closeIconBtn.setAttribute("aria-label", tr("btn_cancel"));
      closeIconBtn.title = tr("btn_cancel");
      closeIconBtn.textContent = "✕";
      closeIconBtn.addEventListener("click", cancelSelection);

      header.appendChild(headerLeft);
      header.appendChild(closeIconBtn);

      const tabsBar = document.createElement("div");
      tabsBar.className = "sheet-preview-tabs";

      const tabButtons = [];

      const viewport = document.createElement("div");
      viewport.className = "sheet-preview-viewport";

      const metaEl = document.createElement("div");
      metaEl.className = "sheet-preview-meta";

      const renderActiveSheet = (idx) => {
        activeIdx = idx;
        tabButtons.forEach((tabBtn, i) => {
          tabBtn.classList.toggle("is-active", i === activeIdx);
        });

        const activeTab = tabButtons[activeIdx];
        if (activeTab && typeof activeTab.scrollIntoView === "function") {
          activeTab.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: "nearest",
          });
        }

        const sheetData = validSheets[activeIdx];
        viewport.textContent = "";
        viewport.scrollTop = 0;
        viewport.scrollLeft = 0;

        const preview = buildSheetPreviewTable(
          sheetData.rawSheet,
          sheetData.rows.length,
          tr,
        );
        viewport.appendChild(preview.element);

        if (preview.caption) {
          metaEl.textContent = preview.caption;
          metaEl.style.display = "block";
        } else {
          metaEl.textContent = "";
          metaEl.style.display = "none";
        }
      };

      validSheets.forEach((sheetData, idx) => {
        const isProcessed = processedSheets.includes(sheetData.name);
        const tabBtn = document.createElement("button");
        tabBtn.type = "button";
        tabBtn.className = isProcessed
          ? "sheet-preview-tab is-processed"
          : "sheet-preview-tab";

        const labelSpan = document.createElement("span");
        labelSpan.textContent = isProcessed
          ? `✅ ${sheetData.name}`
          : sheetData.name;

        const countSpan = document.createElement("span");
        countSpan.className = "sheet-preview-tab-count";
        countSpan.textContent = `(${sheetData.rows.length})`;

        tabBtn.appendChild(labelSpan);
        tabBtn.appendChild(countSpan);

        tabBtn.addEventListener("click", () => {
          if (activeIdx !== idx) {
            renderActiveSheet(idx);
          }
        });

        tabButtons.push(tabBtn);
        tabsBar.appendChild(tabBtn);
      });

      const actionsBar = document.createElement("div");
      actionsBar.className = "sheet-preview-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "sheet-preview-btn sheet-preview-btn--secondary";
      cancelBtn.textContent = tr("btn_cancel");
      cancelBtn.addEventListener("click", cancelSelection);

      const confirmBtn = document.createElement("button");
      confirmBtn.type = "button";
      confirmBtn.className = "sheet-preview-btn sheet-preview-btn--primary";
      confirmBtn.textContent = tr("sheet_preview_confirm");
      confirmBtn.addEventListener("click", () => confirmSheet(activeIdx));

      actionsBar.appendChild(cancelBtn);
      actionsBar.appendChild(confirmBtn);

      modal.appendChild(header);
      modal.appendChild(tabsBar);
      modal.appendChild(viewport);
      modal.appendChild(metaEl);
      modal.appendChild(actionsBar);
      overlay.appendChild(modal);

      renderActiveSheet(initialIdx);
    };

    renderListView();
    document.body.appendChild(overlay);
  });
}

window.processInvoiceFile = async function () {
  const tr = getSheetPreviewTranslator();
  const fileInput = document.getElementById("invoiceFileInput");
  if (!fileInput || !fileInput.files.length)
    return window.showKaspiNotice(tr("inc_no_file"), { type: "warning" });

  // ⚡ 1. ЖЕСТКИЙ СБРОС СОСТОЯНИЯ (ВЕТКА ПРИЕМКИ — ЭКСПОРТ ВЫКЛЮЧЕН)
  window.isKaspiExportMode = false;
  window.currentExportHash = null;
  window.kaspiExportItems = [];

  // Не подмешиваем словарь invoiceSynonyms в mapper2State.dictValues (dictValues хранит только константы/справочники Маппера-2)
  window.mapper2State = {
    dictValues: {},
    colMap: {},
    splitRules: {},
    clearedKeys: {},
    smartRulesApplied: false,
    memorySplitsLoaded: false,
    appliedTemplateHash: null,
  };

  // 🔥 ИСПРАВЛЕНИЕ: Загружаем словарь синонимов ДО того, как начнем искать шапку!
  if (typeof invoiceSynonyms === "undefined" || Object.keys(invoiceSynonyms).length === 0) {
    const dictText = typeof translations !== "undefined" && translations[currentLang]
      ? translations[currentLang].inc_loading_dict : "Загрузка словаря переводов...";
    window.showLoading(dictText);
    try {
      const sessTok = typeof window.getSessionToken === "function" ? window.getSessionToken() : (localStorage.getItem("session_token") || "");
      const fetchUrl = `${typeof APPS_SCRIPT_URL !== "undefined" ? APPS_SCRIPT_URL : ""}?action=getInitialData&api_key=${encodeURIComponent(typeof CLIENT_API_KEY !== "undefined" ? CLIENT_API_KEY : "")}&session_token=${encodeURIComponent(sessTok)}&t=${Date.now()}&last_sync=0`;
      const res = await fetch(fetchUrl);
      const text = await res.text();
      if (!text.trim().startsWith("<")) {
        const data = JSON.parse(text);
        if (data && data.error === "AUTH_EXPIRED") {
          if (typeof window.handleAuthExpired === "function") window.handleAuthExpired(data.message);
          window.hideLoading();
          return;
        }
        if (data.synonyms && Object.keys(data.synonyms).length > 0) {
          if (typeof invoiceSynonyms !== "undefined") Object.assign(invoiceSynonyms, data.synonyms);
          window.invoiceSynonyms = typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : data.synonyms;
        }
        if (Array.isArray(data.logisticsBlocks)) {
          window.logisticsBlocks = data.logisticsBlocks;
          localStorage.setItem(
            "logistics_blocks_cache",
            JSON.stringify(data.logisticsBlocks),
          );
        }
        if (
          data.logisticsBlockMarkers &&
          typeof data.logisticsBlockMarkers === "object"
        ) {
          window.logisticsBlockMarkers = data.logisticsBlockMarkers;
          localStorage.setItem(
            "logistics_markers_cache",
            JSON.stringify(data.logisticsBlockMarkers),
          );
        }
      }
    } catch (err) {
      console.error("Ошибка загрузки словаря:", err);
    }
    window.hideLoading();
  }

  let templateData = null;

  if (window.currentImportMode === "kaspi") {
    const templateSelect = document.getElementById("kaspiTemplateSelect");
    const templateName = templateSelect ? templateSelect.value : "";
    if (!templateName)
      return window.showKaspiNotice(tr("inc_select_kaspi_tpl"), { type: "warning" });

    window.kaspiTemplateCache = window.kaspiTemplateCache || {};

    if (window.kaspiTemplateCache[templateName]) {
      templateData = window.kaspiTemplateCache[templateName];
      window.showLoading(tr("inc_reading_invoice"));
    } else {
      let tText = tr("kaspi_download_tpl");
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
          
          // ⚡ ВАЖНО: Засасываем куски файла из ответа бэкенда в память фронтенда
          let i = 1;
          while (res[`base64_part_${i}`]) {
            templateData[`base64_part_${i}`] = res[`base64_part_${i}`];
            i++;
          }

          window.kaspiTemplateCache[templateName] = templateData;
        } else {
          throw new Error(tr("kaspi_tpl_parse_err"));
        }
      } catch (err) {
        window.hideLoading();
        return window.showKaspiNotice(tr("inc_tpl_load_err") + err.message, {
          type: "error",
        });
      }
    }
  } else {
    window.showLoading(tr("inc_reading_invoice"));
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

    // 🔥 ПРЕПРОЦЕССИНГ ОБЪЕДИНЕННЫХ ЯЧЕЕК И ПОИСК ЛИСТОВ (SheetJS)
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    let validSheets = [];

    for (let sName of workbook.SheetNames) {
      let sheet = workbook.Sheets[sName];
      if (!sheet) continue;

      // Клонируем лист для распаковки !merges под парсер, чтобы оригинал остался «как есть» для предпросмотра
      let unpackedSheet = Object.assign({}, sheet);

      // 1. Распаковываем объединенные ячейки (!merges) в копии листа
      if (unpackedSheet["!merges"]) {
        unpackedSheet["!merges"].forEach((merge) => {
          let startCellAddress = XLSX.utils.encode_cell({
            c: merge.s.c,
            r: merge.s.r,
          });
          let mainVal = unpackedSheet[startCellAddress]
            ? unpackedSheet[startCellAddress].v
            : undefined;

          if (mainVal !== undefined) {
            for (let r = merge.s.r; r <= merge.e.r; r++) {
              for (let c = merge.s.c; c <= merge.e.c; c++) {
                if (r === merge.s.r && c === merge.s.c) continue;
                let targetCell = XLSX.utils.encode_cell({ c: c, r: r });
                unpackedSheet[targetCell] = { t: "s", v: mainVal };
              }
            }
          }
        });
      }

      let sheetRowOffset = 0;
      if (sheet["!ref"]) {
        try {
          sheetRowOffset = Math.max(0, XLSX.utils.decode_range(sheet["!ref"]).s.r);
        } catch (_) {
          sheetRowOffset = 0;
        }
      }

      let sRows = XLSX.utils.sheet_to_json(unpackedSheet, { header: 1 });
      if (sRows && sRows.length > 0) {
        // Проверяем, есть ли на листе реальные данные, а не просто пустые строки
        let hasContent = sRows.some((row) =>
          row.some((cell) => String(cell || "").trim() !== ""),
        );
        if (hasContent) {
          validSheets.push({
            name: sName,
            rows: sRows,
            rawSheet: sheet,
            sheetRowOffset: sheetRowOffset,
          });
        }
      }
    }

    const tLang =
      typeof translations !== "undefined" && translations[currentLang]
        ? translations[currentLang]
        : {};
    if (validSheets.length === 0)
      throw new Error(tLang.inc_empty_file || "Пустой файл");

    // ⚡ ВЫБОР ЛИСТА С ПРЕДПРОСМОТРОМ «КАК ЕСТЬ» (СТАВИМ КОД НА ПАУЗУ)
    let selectedSheetInfo = null;
    if (validSheets.length === 1) {
      selectedSheetInfo = {
        name: validSheets[0].name,
        rows: validSheets[0].rows,
        rawSheet: validSheets[0].rawSheet,
        sheetRowOffset: validSheets[0].sheetRowOffset || 0,
      };
    } else {
      // Инициализируем реестр обработанных листов для этого файла
      const fileRegistryKey = `processed_${window.mapper2State.fileName}`;
      const processedSheets = JSON.parse(
        sessionStorage.getItem(fileRegistryKey) || "[]",
      );

      // Если листов несколько — прячем системный лоадер и открываем выбор/предпросмотр
      window.hideLoading();
      selectedSheetInfo = await openExcelSheetSelectorModal(
        validSheets,
        processedSheets,
        fileRegistryKey,
      );
    }

    if (!selectedSheetInfo) return; // Если пользователь нажал "Отмена", прерываем весь импорт

    let rows = selectedSheetInfo.rows;
    let selectedSheetName = selectedSheetInfo.name;
    let selectedRawSheet = selectedSheetInfo.rawSheet || null;
    let selectedSheetRowOffset = selectedSheetInfo.sheetRowOffset || 0;

    window.mapper2State.rawSheet = selectedRawSheet;
    window.mapper2State.rawRows = rows;
    window.mapper2State.sheetRowOffset = selectedSheetRowOffset;
    window.mapper2State.selectedSheetName = selectedSheetName;

    let file_doc_no = "UNKNOWN";
    let file_supplier = "UNKNOWN";
    let dict =
      typeof invoiceSynonyms !== "undefined" && invoiceSynonyms
        ? invoiceSynonyms
        : window.invoiceSynonyms || {};

    const detectedSupplier = extractInvoiceSupplier(rows, dict);
    if (detectedSupplier) {
      file_supplier = detectedSupplier;
    }

    const detectedDocNo = extractInvoiceDocNo(rows, dict);
    if (detectedDocNo) {
      file_doc_no = detectedDocNo;
    }

    window.mapper2State.supplier =
      file_supplier !== "UNKNOWN" ? file_supplier : "Не указан";
    if (file_doc_no !== "UNKNOWN" && file_doc_no !== "") {
      window.mapper2State.docNo = file_doc_no;
    } else {
      let now = new Date();
      window.mapper2State.docNo = `IN-${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    }

    // 🔥 УМНОЕ АВТО-ОПРЕДЕЛЕНИЕ ШАПКИ, СКЛЕЙКА 2-ЭТАЖНОЙ ШАПКИ И ОТСЕЧЕНИЕ ПОДВАЛА
    const parsedOk = applyParsedInvoiceTable(
      rows,
      selectedRawSheet,
      selectedSheetRowOffset,
      selectedSheetName,
    );

    if (parsedOk) {
      // ⚡ ИСПРАВЛЕНИЕ: Принудительно прячем системный лоадер, чтобы он не перекрывал Сито!
      if (typeof window.hideLoading === "function") window.hideLoading();

      window.currentTemplateData = templateData;

      let smartHeaders = window.mapper2State.invoiceHeaders || [];
      let smartRows = window.mapper2State.invoiceRows || [];  

      // 🔥 МАРШРУТИЗАТОР РЕЖИМОВ
      if (window.currentImportMode === "kaspi") {
        // Режим "База + Kaspi": запускаем умное Сито
        window.showComplexColumnSelector(smartHeaders, smartRows, templateData);
      } else {
        // Режим "Только в базу": пропускаем Сито и сразу открываем простой Маппер
        window.renderMapper2Cards(templateData);
      }
    } else {
      throw new Error(tr("inc_no_table_found"));
    }
  } catch (err) {
    window.hideLoading();
    console.error(err);
    window.showKaspiNotice(tr("inc_process_err") + err.message, {
      type: "error",
    });
  }
};

// === РОУТЕР ШАГОВ ПРИЕМКИ (ОБНОВЛЕННЫЙ) ===
window.navigateIncomeStep = function (stepNumber, isBack = false) {
  // 1. Ведем запись в историю (если идем вперед)
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.history = window.mapper2State.history || [];

  if (!isBack) {
    const lastStep =
      window.mapper2State.history[window.mapper2State.history.length - 1];
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
    // Возврат на Шаг 1 сбрасывает флаги применения правил текущей сессии Маппера-2
    window.mapper2State.clearedKeys = {};
    window.mapper2State.smartRulesApplied = false;
    window.mapper2State.memorySplitsLoaded = false;

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
    // При входе/возврате в «Сито» разрешаем повторно применить обновлённые smartRules при выходе на Шаг 2
    window.mapper2State.smartRulesApplied = false;

    // Включаем Умное сито (Токенизатор)
    if (tabs) tabs.style.display = "none";
    if (currency) currency.style.display = "none";

    if (smartContainer) {
      smartContainer.style.display = "flex"; // ⚡ Принудительно делаем видимым!
      smartContainer.className = "smart-mapper-overlay";

      // Вызываем отрисовку
      if (
        window.renderSmartMapperModal &&
        window.mapper2State.lastComplexColumns
      ) {
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

    // ⚡ ОТРИСОВКА ЕДИНОГО УНИВЕРСАЛЬНОГО МАППЕРА (НЕ трогаем флаг isKaspiExportMode!)
    if (typeof window.renderMapper2Cards === "function") {
      window.renderMapper2Cards(window.currentTemplateData || window.lastTemplateData || null);
    }
    if (typeof window.resetMapper2ModalLayout === "function") {
      window.resetMapper2ModalLayout({ resetScroll: true });
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
  window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};

  // Разделяем: показ Kaspi-полей в маппере нужен и при приемке «База + Маркет», и при выгрузке из базы
  const useKaspiTemplate =
    window.isKaspiExportMode === true || window.currentImportMode === "kaspi";

  // При смене шаблона корректно сбрасываем сессионные флаги Маппера-2
  const currentTplIdentity = useKaspiTemplate
    ? String(
        (templateData &&
          (templateData.templateHash ||
            templateData.kaspiCategory ||
            templateData.templateName)) ||
          "__kaspi__",
      )
    : "__base__";
  if (
    window.mapper2State.appliedTemplateHash &&
    window.mapper2State.appliedTemplateHash !== currentTplIdentity
  ) {
    window.mapper2State.clearedKeys = {};
    window.mapper2State.smartRulesApplied = false;
    window.mapper2State.memorySplitsLoaded = false;
  }
  window.mapper2State.appliedTemplateHash = currentTplIdentity;

  // Применяем умные правила «Сита» однократно за проход (не перетираем ручные правки в Маппере-2 при возврате «НАЗАД»)
  if (
    !window.mapper2State.smartRulesApplied &&
    window.mapper2State.smartRules &&
    templateData &&
    templateData.humanNames &&
    templateData.systemKeys &&
    useKaspiTemplate
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
            delete window.mapper2State.clearedKeys[sysKey];
          }
        });
      }
    });
    window.mapper2State.smartRulesApplied = true;
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
      if (learnedSynonyms._splitRules && !window.mapper2State.memorySplitsLoaded) {
        // ⚡ Загружаем сохранённые правила из памяти один раз на сессию, чтобы не воскрешать удалённые при возврате «НАЗАД»
        const memorySplits = JSON.parse(
          JSON.stringify(learnedSynonyms._splitRules),
        );
        window.mapper2State.splitRules = {
          ...memorySplits,
          ...window.mapper2State.splitRules,
        };
        window.mapper2State.memorySplitsLoaded = true;
      }
    } catch (e) {
      console.error("Ошибка парсинга памяти", e);
    }
  }

  // === УПРАВЛЕНИЕ ГРУППОЙ ЛОГИСТИКИ В МАППЕРЕ-2 (ТОЛЬКО ВЕТКА ПРИЕМКИ «БАЗА + KASPI») ===
  const mapperLogBlock = document.getElementById("mapperLogisticsBlock");
  const mapperLogSelect = document.getElementById("mapperLogisticsSelect");
  const isKaspiIntake =
    window.isKaspiExportMode !== true && window.currentImportMode === "kaspi";

  if (mapperLogBlock && mapperLogSelect) {
    if (isKaspiIntake) {
      const savedLogBlock = String(learnedSynonyms._logisticsBlock || "").trim();
      let effectiveBlock = "";

      if (window.mapper2State.logisticsBlockTouched) {
        effectiveBlock = String(window.mapper2State.logisticsBlock || "").trim();
      } else if (savedLogBlock) {
        // На всех последующих приёмках по шаблону подставляем _logisticsBlock автоматически
        effectiveBlock = savedLogBlock;
      } else {
        const tplSelectEl = document.getElementById("kaspiTemplateSelect");
        const selOpt =
          tplSelectEl && tplSelectEl.selectedIndex !== -1
            ? tplSelectEl.options[tplSelectEl.selectedIndex]
            : null;
        const tplDisplayName = selOpt
          ? selOpt.getAttribute("data-name") || selOpt.text.trim()
          : "";
        effectiveBlock =
          typeof window.suggestLogisticsBlock === "function"
            ? window.suggestLogisticsBlock(
                (templateData && templateData.kaspiCategory) || "",
                tplDisplayName,
              )
            : "";
      }

      window.mapper2State.logisticsBlock = effectiveBlock;
      if (typeof window.populateLogisticsSelect === "function") {
        window.populateLogisticsSelect(mapperLogSelect, effectiveBlock);
      }
      mapperLogSelect.onchange = function () {
        window.mapper2State.logisticsBlock = this.value;
        window.mapper2State.logisticsBlockTouched = true;
      };
      mapperLogBlock.style.display = "flex";
    } else {
      mapperLogBlock.style.display = "none";
    }
  }

  // Выводим Kaspi-требования если активен шаблон Kaspi (приемка «База + Маркет» или выгрузка)
  if (templateData && templateData.systemKeys && useKaspiTemplate) {
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
  const rawHeaders = window.mapper2State.invoiceHeaders || [];
  const headersLower = rawHeaders.map((h) =>
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

    let rawDictValue =
      window.mapper2State.dictValues &&
      window.mapper2State.dictValues[req.sysKey];
    let dictValue =
      typeof rawDictValue === "string" && rawDictValue.trim() !== ""
        ? rawDictValue
        : "";

    const isExplicitlyCleared = Boolean(
      window.mapper2State.clearedKeys &&
        window.mapper2State.clearedKeys[req.sysKey],
    );

    if (
      window.mapper2State.colMap[req.sysKey] === undefined &&
      !dictValue &&
      !isExplicitlyCleared &&
      foundIndex !== -1
    ) {
      window.mapper2State.colMap[req.sysKey] = foundIndex;
    }

    let mappedIndex = window.mapper2State.colMap[req.sysKey];

    let statusClass = "status-empty";
    let statusText = t.inc_select || "ВЫБРАТЬ";
    let statusI18n = `data-i18n="inc_select"`;
    let statusStyle = "";
    let extraPreviewHtml = "";

    if (dictValue) {
      statusClass = "status-filled";
      let shortVal =
        dictValue.length > 15 ? dictValue.substring(0, 15) + "..." : dictValue;
      statusText = `✓ ${shortVal}`;
      statusI18n = "";
      statusStyle =
        "border: 1px solid var(--accent-green, #2ecc71); color: var(--accent-green, #2ecc71); background: var(--bg-success-dim, rgba(46, 204, 113, 0.15)); font-weight: bold;";
    } else if (
      mappedIndex !== undefined &&
      mappedIndex >= 0 &&
      mappedIndex < rawHeaders.length
    ) {
      statusClass = "status-filled";

      // ИСПРАВЛЕНИЕ: Берем правильный заголовок по индексу
      let rawHeaderName = rawHeaders[mappedIndex];
      let displayName = rawHeaderName;

      // 🛡️ НАДЕЖНЫЙ ПЕРЕВОД: Заставляем браузер вытащить чистый текст из HTML
      if (typeof window.translateColumnHeader === "function") {
        let translatedHtml = window.translateColumnHeader(rawHeaderName); // В openColumnSelector тут переменная colName
        if (typeof translatedHtml === "string") {
          // 1. Создаем виртуальный элемент
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = translatedHtml;
          // 2. Достаем 100% чистый текст без единого тега или стиля
          let cleanText =
            tempDiv.textContent || tempDiv.innerText || rawHeaderName;

          // 3. Форматируем для красоты
          if (cleanText.includes("(") && cleanText.includes(")")) {
            let match = cleanText.match(/\(([^)]+)\)/);
            if (match && match[1]) {
              displayName = match[1] + " (" + rawHeaderName + ")";
            } else {
              displayName = cleanText;
            }
          } else {
            displayName = cleanText;
          }
        }
      }

      let splitData =
        window.mapper2State.splitRules &&
        (window.mapper2State.splitRules[req.name] ||
          window.mapper2State.splitRules[req.sysKey]);

      if (splitData) {
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
          const regex = /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g;
          let tokens = sampleText.match(regex) || [];

          const sig = tokens
            .map((t) => {
              if (/\d/.test(t)) return "D";
              if (/[a-zA-Zа-яА-ЯёЁ]/.test(t)) return "L";
              return ".";
            })
            .join("-");

          let rawIndices = [];
          if (Array.isArray(splitData)) {
            rawIndices = splitData;
          } else if (splitData[sig]) {
            rawIndices = splitData[sig];
          } else if (Object.keys(splitData).length > 0) {
            let firstKey = Object.keys(splitData)[0];
            rawIndices = Array.isArray(splitData[firstKey])
              ? splitData[firstKey]
              : [];
          }

          let validIndices = rawIndices
            .map((idx) => {
              if (typeof idx === "object" && idx !== null) {
                return idx.index !== undefined
                  ? parseInt(idx.index)
                  : parseInt(idx.i);
              }
              return parseInt(idx);
            })
            .filter((n) => !isNaN(n));

          validIndices = [...new Set(validIndices)]
            .filter((n) => n >= 0 && n < tokens.length)
            .sort((a, b) => a - b);

          validIndices.forEach((i) => {
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

        statusText = `✂ ${gluedText || displayName}`;
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
        // Отображаем переведенное имя!
        statusText = `✓ ${displayName}`;
        statusI18n = "";
        statusStyle =
          "border: 1px solid var(--accent-green, #2ecc71); color: var(--accent-green, #2ecc71); background: var(--bg-success-dim, rgba(46, 204, 113, 0.15)); font-weight: bold;";
      }
    }

    let nameI18nAttr = req.nameKey ? `data-i18n="${req.nameKey}"` : "";
    let descI18nAttr = req.descKey ? `data-i18n="${req.descKey}"` : "";
    const escAttr = (v) =>
      String(v === undefined || v === null ? "" : v)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    let cardHtml = `
        <div class="req-card" data-syskey="${escAttr(req.sysKey)}" data-reqname="${escAttr(req.name)}" data-iskaspi="${req.isKaspi === true ? "1" : "0"}">
            <div class="req-info">
                <span class="req-title ${req.req ? "required" : ""}" ${nameI18nAttr}>${escAttr(req.name)}</span>
                <span class="req-subtitle" id="subtitle-${escAttr(req.sysKey)}" ${descI18nAttr}>${escAttr(req.desc)}</span>
                ${extraPreviewHtml}
            </div>
            <div class="req-status ${statusClass}" id="status-${escAttr(req.sysKey)}" style="${statusStyle}" ${statusI18n}>${escAttr(statusText)}</div>
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
      `<div class="section-header" data-i18n="req_fill_title" style="color: var(--accent-red); padding: 12px 6px 6px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">🔴 ${t.req_fill_title || "Обязательные для заполнения"}</div>` +
      htmlRequired;
  }
  if (htmlOptional) {
    finalHtml +=
      `<div class="section-header" data-i18n="add_params_title" style="color: var(--accent-blue); padding: 12px 6px 6px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">🔵 ${t.add_params_title || "Дополнительные параметры"}</div>` +
      htmlOptional;
  }
  if (htmlFilled) {
    finalHtml +=
      `<div class="section-header" data-i18n="desc_invoice_sys" style="color: var(--accent-green); padding: 12px 6px 6px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">✅ ${t.desc_invoice_sys || "Из накладной и системы"}</div>` +
      htmlFilled;
  }

  const mapper2AreaEl = document.getElementById("mapper2Area");
  const isFreshMapperOpen =
    arguments.length > 0 ||
    !mapper2AreaEl ||
    mapper2AreaEl.style.display === "none";

  container.innerHTML = finalHtml;

  // Делегированный клик по карточкам (устойчив к кавычкам в названиях атрибутов и без inline-onclick)
  if (!container.dataset.cardClickBound) {
    container.dataset.cardClickBound = "1";
    container.addEventListener("click", (e) => {
      const card = e.target && e.target.closest ? e.target.closest(".req-card[data-syskey]") : null;
      if (!card) return;
      const sKey = card.getAttribute("data-syskey");
      const rName = card.getAttribute("data-reqname") || sKey;
      const isK = card.getAttribute("data-iskaspi") === "1";
      if (typeof window.openColumnSelector === "function") {
        window.openColumnSelector(sKey, rName, isK);
      }
    });
  }

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

  if (mapper2AreaEl) mapper2AreaEl.style.display = "flex";
  if (typeof window.resetMapper2ModalLayout === "function") {
    window.resetMapper2ModalLayout({ resetScroll: isFreshMapperOpen });
  }

  // 🔥 ЛОГИКА ДЛЯ РЕЖИМА ЭКСПОРТА И ПЕРЕВОДОВ (КНОПКИ ВНИЗУ МАППЕРА)
  const applyBtn = document.getElementById("applyMapper2Btn");

  if (applyBtn) {
    applyBtn.style.display = "block";

    const isExportBranch = window.isKaspiExportMode === true;

    if (!window.originalCheckMapperReadiness) {
      window.originalCheckMapperReadiness = window.checkMapperReadiness;

      window.checkMapperReadiness = function () {
        if (window.originalCheckMapperReadiness)
          window.originalCheckMapperReadiness();

        const btn = document.getElementById("applyMapper2Btn");
        if (!btn) return;
        const btnContainer = btn.parentElement;
        const currentIsExport = window.isKaspiExportMode === true;

        if (currentIsExport) {
          const btnSpan = btn.querySelector("span");
          const target = btnSpan || btn;
          target.setAttribute("data-i18n", "kaspi_confirm_template");

          if (
            !btn.classList.contains("disabled") &&
            !btn.classList.contains("btn-disabled")
          ) {
            btn.style.setProperty(
              "background",
              "var(--accent-blue, #2196f3)",
              "important",
            );
            btn.style.setProperty(
              "border-color",
              "var(--accent-blue, #2196f3)",
              "important",
            );
          } else {
            btn.style.background = "";
            btn.style.borderColor = "";
          }

          if (btnContainer) {
            const allOldBtns = btnContainer.querySelectorAll("button");
            allOldBtns.forEach((b) => {
              if (
                b.id !== "applyMapper2Btn" &&
                b.id !== "kaspiMapperBackBtn"
              ) {
                b.style.display = "none";
              }
            });

            let backBtn = document.getElementById("kaspiMapperBackBtn");
            if (!backBtn) {
              backBtn = document.createElement("button");
              backBtn.id = "kaspiMapperBackBtn";
              backBtn.setAttribute("data-i18n", "kaspi_mapper_back");

              backBtn.style.background = "transparent";
              backBtn.style.color = "var(--text-main)";
              backBtn.style.border = "1px solid var(--border-light)";
              backBtn.style.padding = "12px 15px";
              backBtn.style.borderRadius = "6px";
              backBtn.style.fontWeight = "bold";
              backBtn.style.cursor = "pointer";
              backBtn.onclick = function () {
                document.getElementById("mapper2Area").style.display = "none";
                const incomeModal = document.getElementById("income-modal");
                if (incomeModal) incomeModal.style.display = "none";
                const exportModal = document.getElementById("export-modal");
                if (exportModal) exportModal.style.display = "flex";
              };
              btnContainer.insertBefore(backBtn, btn);
            }

            btnContainer.style.display = "flex";
            btnContainer.style.gap = "10px";
            backBtn.style.display = "block";
            backBtn.style.flex = "1";
            btn.style.flex = "2";
          }

          if (typeof window.applyLanguage === "function") {
            window.applyLanguage(
              typeof currentLang !== "undefined" ? currentLang : "ru",
            );
          }
        } else {
          // Ветка ПРИЕМКИ (и «Только База», и «База + Маркет»)
          const backBtn = document.getElementById("kaspiMapperBackBtn");
          if (backBtn) backBtn.remove();

          btn.style.flex = "2";
          btn.style.background = "";
          btn.style.borderColor = "";

          const btnSpan = btn.querySelector("span");
          const target = btnSpan || btn;
          target.setAttribute("data-i18n", "inc_build_invoice");

          if (btnContainer) {
            const allOldBtns = btnContainer.querySelectorAll("button");
            allOldBtns.forEach((b) => {
              if (b.id !== "applyMapper2Btn" && b.id !== "kaspiMapperBackBtn") {
                b.style.display = "";
              }
            });
          }

          if (typeof window.applyLanguage === "function") {
            window.applyLanguage(
              typeof currentLang !== "undefined" ? currentLang : "ru",
            );
          }
        }
      };
    }

    if (typeof window.checkMapperReadiness === "function") {
      window.checkMapperReadiness();
    }

    if (!isExportBranch) {
      const backBtn = document.getElementById("kaspiMapperBackBtn");
      if (backBtn) backBtn.remove();
    }
  }
};

// 3. ОТКРЫТИЕ ШТОРКИ И ОТРИСОВКА КОЛОНОК
window.openColumnSelector = function (sysKey, reqName, isKaspi) {
  window.mapper2State.currentSysKey = sysKey;
  window.mapper2State.currentReqName = reqName;

  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const t =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : typeof translations !== "undefined"
        ? translations["ru"] || {}
        : {};

  document.getElementById("sheet-title").innerText =
    (t.mapper_source || "Источник: ") + reqName;

  const colList = document.getElementById("sheet-col-list");

  // 🔥 УМНАЯ ПРОВЕРКА: Есть ли у этого поля реальный справочник в Kaspi?
  const resolvedDict =
    typeof window.resolveKaspiDictForAttr === "function"
      ? window.resolveKaspiDictForAttr(reqName, sysKey)
      : window.kaspiDicts && window.kaspiDicts[reqName];
  let hasDict = Boolean(resolvedDict && resolvedDict.length > 0);

  let dictBtnHtml = "";
  if (isKaspi) {
    if (hasDict) {
      // Если справочник есть — показываем стандартную кнопку поиска
      dictBtnHtml = `<button onclick="window.openKaspiDictSearch()" style="background: var(--accent-green, #4CAF50); border: none; color: #000; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer; margin-right: 8px;">
          🔍 <span data-i18n="mapper_btn_dict">${t.mapper_btn_dict || "Справочник"}</span></button>`;
    } else {
      // Если справочника НЕТ — даем кнопку ручного ввода константы!
      const encSys = encodeURIComponent(String(sysKey));
      const encReq = encodeURIComponent(String(reqName));
      dictBtnHtml = `<button onclick="window.setManualConstantValue(decodeURIComponent('${encSys}'), decodeURIComponent('${encReq}'))" style="background: var(--accent-blue, #3498db); border: none; color: #fff; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer; margin-right: 8px;">
          ✍️ <span data-i18n="mapper_btn_manual">${t.mapper_btn_manual || "Ввести вручную"}</span></button>`;
    }
  }

  colList.innerHTML = `
    <div style="position: sticky; top: 0; background: var(--bg-panel, #1e1e1e); z-index: 10; padding: 15px 20px; margin: -20px 0 15px 0; border-bottom: 1px solid var(--border-light, #333); display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: bold;" data-i18n="mapper_invoice_cols">
            ${t.mapper_invoice_cols || "Колонки из накладной"}
        </div>
        <div style="display: flex; align-items: center;">
            ${dictBtnHtml}
            <button onclick="clearMapper2Col('${sysKey}')" style="background: rgba(255, 68, 68, 0.1); border: 1px solid #ff4444; color: #ff4444; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer;">
                ❌ <span data-i18n="mapper_clear">${t.mapper_clear || "Очистить"}</span>
            </button>
        </div>
    </div>
`;

  let currentlyMappedIndex = window.mapper2State.colMap
    ? window.mapper2State.colMap[sysKey]
    : undefined;
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

  const safeHeaders = Array.isArray(window.mapper2State.invoiceHeaders)
    ? window.mapper2State.invoiceHeaders
    : [];
  const safeRows = Array.isArray(window.mapper2State.invoiceRows)
    ? window.mapper2State.invoiceRows
    : [];

  safeHeaders.forEach((rawColName, index) => {
    let colName = String(rawColName || "").trim();
    if (!colName) colName = `[Колонка ${index + 1} Пустой заголовок]`;

    // Локализованная семантическая подсказка колонки с безопасным data-i18n на DOM-элементе
    const cleanColNameForDisplay = colName.replace(/[\r\n]+/g, " ");
    let displayColName = cleanColNameForDisplay;
    if (typeof window.getColumnHeaderHint === "function") {
      const hint = window.getColumnHeaderHint(colName);
      if (hint && hint.label) {
        const i18nAttr = hint.i18nKey ? ` data-i18n="${hint.i18nKey}"` : "";
        displayColName = `${cleanColNameForDisplay} <span class="col-header-hint">(<span${i18nAttr}>${hint.label}</span>)</span>`;
      }
    } else if (typeof window.translateColumnHeader === "function") {
      displayColName = window
        .translateColumnHeader(colName)
        .replace(/[\r\n]+/g, " ")
        .replace(/\(([^)]+)\)/g, '<span class="col-header-hint">($1)</span>');
    }

    // В безопасное имя всегда отдаем ОРИГИНАЛ
    let safeColName = colName
      .replace(/[\r\n]+/g, " ")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');

    let previews = [];
    for (
      let i = 0;
      i < Math.min(10, safeRows.length);
      i++
    ) {
      let val = String((safeRows[i] && safeRows[i][index]) || "").trim();
      // Убрана проверка на дубликаты, теперь всегда берем первые 3 заполненные строки
      if (val && previews.length < 3) {
        previews.push({ orig: val });
      }
    }

    if (rawColName === "" && previews.length === 0) return;

    let isSelected = currentlyMappedIndex === index;
    let isUsedByOther =
      usedByOthers[index] !== undefined && usedByOthers[index].length > 0;

    let previewHtmlArr = [];
    previews.forEach((p) => {
      let text = p.orig;
      let highlightedHtml = text;
      if (isSelected) {
        highlightedHtml = `<b style="color:var(--accent-green, #4CAF50);">${text}</b>`;
      } else if (isUsedByOther) {
        highlightedHtml = `<span style="color:#555; text-decoration:line-through; background:rgba(255,255,255,0.05); padding:0 2px; border-radius:2px;" title="Уже занято">${text}</span>`;
      }
      previewHtmlArr.push("- " + highlightedHtml);
    });

    let previewText =
      previewHtmlArr.length > 0
        ? previewHtmlArr.join("<br>")
        : `<span data-i18n="mapper_empty_col_no_data">${t.mapper_empty_col_no_data || "Пустая колонка (нет данных)"}</span>`;

    let itemStyle =
      "background: var(--bg-card, #252525); border: 1px solid var(--border-light, #333); border-radius: 6px; padding: 10px; margin-bottom: 10px; transition: 0.2s;";
    let badgeHtml = "";

    if (isSelected) {
      itemStyle =
        "border: 2px solid var(--accent-green, #4CAF50); background: rgba(76, 175, 80, 0.05); border-radius: 6px; padding: 10px; margin-bottom: 10px;";
      badgeHtml = `<div style="font-size: 10px; margin-bottom: 8px;"><span style="background: var(--accent-green, #4CAF50); color: #000; padding: 3px 8px; border-radius: 4px; font-weight: bold;">📌 ВЫБРАНО (ЦЕЛИКОМ)</span></div>`;
    } else if (isUsedByOther) {
      itemStyle =
        "background: #151515; border: 1px solid #222; border-radius: 6px; padding: 10px; margin-bottom: 10px; opacity: 0.9;";
      let usedLabel = `⚠️ ${translations[currentLang].mapper_busy_full}`;
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
            </div>
        </div>`;
  });

  colList.scrollTop = 0;
  document.getElementById("sheet-overlay").style.display = "block";
  setTimeout(
    () => (document.getElementById("sheet-overlay").style.opacity = "1"),
    10,
  );
  document.getElementById("bottom-sheet").style.transform = "translateY(0)";
};

// Вспомогательная очистка дублирующего humanName-алиаса при изменении/сбросе поля в Маппере-2
window.clearMapper2FieldAliases = function (sysKey) {
  if (!window.mapper2State || !sysKey) return;
  const humanAlias =
    window.mapper2State.sysToHumanMap &&
    window.mapper2State.sysToHumanMap[sysKey];
  if (!humanAlias || humanAlias === sysKey) return;

  if (window.mapper2State.colMap) delete window.mapper2State.colMap[humanAlias];
  if (
    window.mapper2State.dictValues &&
    typeof window.mapper2State.dictValues[humanAlias] === "string"
  ) {
    delete window.mapper2State.dictValues[humanAlias];
  }
  if (window.mapper2State.splitRules)
    delete window.mapper2State.splitRules[humanAlias];
};

window.setManualConstantValue = function (sysKey, reqName) {
  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const t =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  // Прячем нижнюю шторку выбора колонок
  const bottomSheet = document.getElementById("bottom-sheet");
  if (bottomSheet) bottomSheet.style.transform = "translateY(100%)";
  setTimeout(() => {
    const overlay = document.getElementById("sheet-overlay");
    if (overlay) overlay.style.display = "none";
  }, 300);

  const existingVal =
    window.mapper2State &&
    window.mapper2State.dictValues &&
    typeof window.mapper2State.dictValues[sysKey] === "string"
      ? window.mapper2State.dictValues[sysKey].trim()
      : "";

  const prevModal = document.getElementById("kaspiManualConstModal");
  if (prevModal) prevModal.remove();
  if (window._manualConstEscHandler) {
    document.removeEventListener("keydown", window._manualConstEscHandler);
    window._manualConstEscHandler = null;
  }

  const modal = document.createElement("div");
  modal.id = "kaspiManualConstModal";
  modal.className = "kaspi-dict-backdrop";

  const closeManualModal = () => {
    if (window._manualConstEscHandler) {
      document.removeEventListener("keydown", window._manualConstEscHandler);
      window._manualConstEscHandler = null;
    }
    const m = document.getElementById("kaspiManualConstModal");
    if (m) m.remove();
  };

  const confirmManualValue = () => {
    const inputEl = document.getElementById("manualConstInput");
    const val = inputEl ? inputEl.value.trim() : "";

    window.mapper2State = window.mapper2State || {};
    window.mapper2State.colMap = window.mapper2State.colMap || {};
    window.mapper2State.splitRules = window.mapper2State.splitRules || {};
    window.mapper2State.dictValues = window.mapper2State.dictValues || {};
    window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};

    if (val !== "") {
      delete window.mapper2State.colMap[sysKey];
      delete window.mapper2State.splitRules[sysKey];
      delete window.mapper2State.clearedKeys[sysKey];
      window.clearMapper2FieldAliases(sysKey);
      window.mapper2State.dictValues[sysKey] = val;
    } else {
      delete window.mapper2State.colMap[sysKey];
      delete window.mapper2State.splitRules[sysKey];
      if (typeof window.mapper2State.dictValues[sysKey] === "string") {
        delete window.mapper2State.dictValues[sysKey];
      }
      window.clearMapper2FieldAliases(sysKey);
      window.mapper2State.clearedKeys[sysKey] = true;
    }

    closeManualModal();

    if (typeof window.renderMapper2Cards === "function") {
      window.renderMapper2Cards();
    }
  };

  const hintText =
    t.inc_dict_mapper_hint ||
    "Значение применится ко всем товарам. Отдельные позиции можно поправить на следующем шаге через «Изменить параметры».";
  const subtitleText = t.inc_manual_const_title || "Постоянное значение";
  const placeholderText =
    t.inc_manual_const_placeholder || "Введите значение...";
  const clearText = t.inc_clear_selection || "Очистить выбор";
  const cancelText = t.inc_cancel || "ОТМЕНА";
  const saveText = t.inc_save || "ОК";

  modal.innerHTML = `
      <div class="kaspi-manual-card" role="dialog" aria-modal="true">
          <div class="kaspi-manual-body">
              <div class="kaspi-manual-head">
                  <span class="kaspi-manual-subtitle" data-i18n="inc_manual_const_title">${subtitleText}</span>
                  <b class="kaspi-dict-title">${reqName}</b>
              </div>

              <div class="dict-scope-hint" role="note">
                  <span class="dict-scope-hint-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                  </span>
                  <span class="dict-scope-hint-text" data-i18n="inc_dict_mapper_hint">${hintText}</span>
              </div>

              <input type="text" id="manualConstInput" class="kaspi-dict-search"
                  value="${existingVal.replace(/"/g, "&quot;")}"
                  data-i18n-placeholder="inc_manual_const_placeholder"
                  placeholder="${placeholderText}">

              <div id="manualConstClearBtn" class="kaspi-dict-clear-btn">
                  <span>✖</span> <span data-i18n="inc_clear_selection">${clearText}</span>
              </div>

              <div class="kaspi-manual-actions">
                  <button type="button" id="manualConstCancelBtn" class="kaspi-manual-btn kaspi-manual-btn--cancel" data-i18n="inc_cancel">${cancelText}</button>
                  <button type="button" id="manualConstOkBtn" class="kaspi-manual-btn kaspi-manual-btn--ok" data-i18n="inc_save">${saveText}</button>
              </div>
          </div>
      </div>
  `;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeManualModal();
  });

  document.body.appendChild(modal);

  const inputEl = document.getElementById("manualConstInput");
  const clearBtn = document.getElementById("manualConstClearBtn");
  const cancelBtn = document.getElementById("manualConstCancelBtn");
  const okBtn = document.getElementById("manualConstOkBtn");

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (inputEl) {
        inputEl.value = "";
        inputEl.focus();
      }
    });
  }

  if (cancelBtn) cancelBtn.addEventListener("click", closeManualModal);
  if (okBtn) okBtn.addEventListener("click", confirmManualValue);

  if (inputEl) {
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmManualValue();
      }
    });
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 30);
  }

  window._manualConstEscHandler = function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeManualModal();
    }
  };
  document.addEventListener("keydown", window._manualConstEscHandler);
};

window.selectMapper2Col = function (colIndex, colName) {
  const sysKey = window.mapper2State.currentSysKey;
  window.mapper2State.colMap = window.mapper2State.colMap || {};
  window.mapper2State.splitRules = window.mapper2State.splitRules || {};
  window.mapper2State.dictValues = window.mapper2State.dictValues || {};
  window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};

  delete window.mapper2State.splitRules[sysKey];
  if (typeof window.mapper2State.dictValues[sysKey] === "string") {
    delete window.mapper2State.dictValues[sysKey];
  }
  delete window.mapper2State.clearedKeys[sysKey];
  window.clearMapper2FieldAliases(sysKey);

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
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};
  window.mapper2State.clearedKeys[sysKey] = true;

  if (window.mapper2State.colMap) {
    delete window.mapper2State.colMap[sysKey];
  }
  if (
    window.mapper2State.dictValues &&
    typeof window.mapper2State.dictValues[sysKey] === "string"
  ) {
    delete window.mapper2State.dictValues[sysKey];
  }
  if (window.mapper2State.splitRules) {
    delete window.mapper2State.splitRules[sysKey];
  }
  window.clearMapper2FieldAliases(sysKey);

  if (typeof window.closeSheet === "function") {
    window.closeSheet();
  }

  if (typeof window.renderMapper2Cards === "function") {
    window.renderMapper2Cards();
  } else if (typeof window.checkMapperReadiness === "function") {
    window.checkMapperReadiness();
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

window.openKaspiDictSearch = function () {
  let sysKey = window.mapper2State.currentSysKey;
  let reqName = window.mapper2State.currentReqName;
  let dict =
    (typeof window.resolveKaspiDictForAttr === "function"
      ? window.resolveKaspiDictForAttr(reqName, sysKey)
      : null) ||
    (window.kaspiDicts && window.kaspiDicts[reqName]) ||
    [];

  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const t =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  if (dict.length === 0) {
    return window.showKaspiNotice(
      (t.msg_dict_empty_1 || "") + reqName + (t.msg_dict_empty_2 || ""),
      { type: "warning" },
    );
  }

  // Прячем нижнюю шторку
  const bottomSheet = document.getElementById("bottom-sheet");
  if (bottomSheet) bottomSheet.style.transform = "translateY(100%)";
  setTimeout(() => {
    let overlay = document.getElementById("sheet-overlay");
    if (overlay) overlay.style.display = "none";
  }, 300);

  const existingDictVal =
    window.mapper2State &&
    window.mapper2State.dictValues &&
    typeof window.mapper2State.dictValues[sysKey] === "string"
      ? window.mapper2State.dictValues[sysKey].trim()
      : "";

  window.tempSelectedDictValue =
    existingDictVal && dict.includes(existingDictVal) ? existingDictVal : "";
  window.tempDictHadInitialValue = Boolean(existingDictVal);
  window.tempDictWasCleared = false;
  window.currentModalSysKey = sysKey;
  window.currentModalDict = dict;

  let modal = document.getElementById("kaspiDictModal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "kaspiDictModal";
  modal.className = "kaspi-dict-backdrop";

  modal.onclick = (e) => {
    if (e.target.id === "kaspiDictModal") {
      const m = document.getElementById("kaspiDictModal");
      if (m) m.remove();
    }
  };

  const hintText =
    t.inc_dict_mapper_hint ||
    "Значение применится ко всем товарам. Отдельные позиции можно поправить на следующем шаге через «Изменить параметры».";

  const clearBtnHtml = `
      <div onclick="window.clearKaspiDictSelection()" class="kaspi-dict-clear-btn">
          <span>✖</span> <span data-i18n="inc_clear_selection">${t.inc_clear_selection || "Очистить выбор"}</span>
      </div>`;

  const hintHtml = `
      <div class="dict-scope-hint" role="note">
          <span class="dict-scope-hint-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
          </span>
          <span class="dict-scope-hint-text" data-i18n="inc_dict_mapper_hint">${hintText}</span>
      </div>`;

  modal.innerHTML = `
      <div id="dictModalContent" class="kaspi-dict-card">
          <div class="kaspi-dict-inner">
              <div class="kaspi-dict-header">
                  <span onclick="document.getElementById('kaspiDictModal').remove()" class="kaspi-dict-back">
                      <span>&#10094;</span>
                  </span>
                  <div class="kaspi-dict-title-wrap">
                      <b id="dictModalTitle" class="kaspi-dict-title">${reqName}</b>
                      <div id="dictModalCountInfo" class="kaspi-dict-count">
                          <span id="dictModalCountText" data-i18n="dict_total">${t.dict_total || "Всего:"}</span> <span id="dictTotalCount">${dict.length}</span>
                      </div>
                  </div>
                  <span onclick="window.confirmKaspiDictSelection()" class="kaspi-dict-save" data-i18n="inc_save">${t.inc_save || "ОК"}</span>
              </div>

              <input type="text" id="dictModalSearch" class="kaspi-dict-search" value="${window.tempSelectedDictValue ? String(window.tempSelectedDictValue).replace(/"/g, "&quot;") : ""}"
                  data-i18n-placeholder="inc_search_enter"
                  placeholder="${t.inc_search_enter || "Поиск..."}"
                  oninput="window.filterDictionary(this.value)">

              ${hintHtml}
              ${clearBtnHtml}

              <ul id="dictModalList" class="kaspi-dict-list"></ul>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  // Автовыделение текста при фокусе/клике, если в поле подставлено текущее выбранное значение
  const searchElem = document.getElementById("dictModalSearch");
  if (searchElem) {
    const selectIfMatchesCurrent = () => {
      const curSel = String(window.tempSelectedDictValue || "").trim();
      if (curSel && searchElem.value.trim() === curSel) {
        searchElem.select();
      }
    };
    searchElem.addEventListener("focus", selectIfMatchesCurrent);
    searchElem.addEventListener("click", () => {
      if (searchElem.selectionStart === searchElem.selectionEnd) {
        selectIfMatchesCurrent();
      }
    });
  }

  // Делегирование клика по пунктам списка и скрытие клавиатуры при скролле
  const listElem = document.getElementById("dictModalList");
  if (listElem) {
    listElem.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-dict-idx]");
      if (!li) return;
      const idx = parseInt(li.getAttribute("data-dict-idx"), 10);
      const dictArr = window.currentModalDict || [];
      if (!isNaN(idx) && idx >= 0 && idx < dictArr.length) {
        window.selectKaspiDictItem(String(dictArr[idx]));
      }
    });

    listElem.addEventListener(
      "touchstart",
      () => {
        const searchEl = document.getElementById("dictModalSearch");
        if (searchEl) searchEl.blur();
      },
      { passive: true },
    );
  }

  // При открытии показываем весь список без фильтрации и прокручиваем выбранный пункт в видимую область
  window.filterDictionary("");

  setTimeout(() => {
    const activeLi = document.querySelector("#dictModalList .kaspi-dict-item.is-selected");
    if (activeLi && typeof activeLi.scrollIntoView === "function") {
      activeLi.scrollIntoView({ block: "nearest" });
    }
  }, 20);
};

// Функция завершения выбора (вызывается по кнопке ОК)
window.confirmKaspiDictSelection = function () {
  const selectedVal = String(window.tempSelectedDictValue || "").trim();

  if (!selectedVal) {
    if (window.tempDictWasCleared || window.tempDictHadInitialValue) {
      const sysKey = window.currentModalSysKey;
      window.mapper2State = window.mapper2State || {};
      window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};
      if (window.mapper2State.colMap) delete window.mapper2State.colMap[sysKey];
      if (window.mapper2State.splitRules)
        delete window.mapper2State.splitRules[sysKey];
      if (
        window.mapper2State.dictValues &&
        typeof window.mapper2State.dictValues[sysKey] === "string"
      ) {
        delete window.mapper2State.dictValues[sysKey];
      }
      window.clearMapper2FieldAliases(sysKey);
      window.mapper2State.clearedKeys[sysKey] = true;

      const modal = document.getElementById("kaspiDictModal");
      if (modal) modal.remove();

      if (typeof window.renderMapper2Cards === "function") {
        window.renderMapper2Cards();
      }
      return;
    }

    const tr = getSheetPreviewTranslator();
    return window.showKaspiNotice(tr("err_select_val"), { type: "warning" });
  }

  if (typeof window.selectDictionaryValue === "function") {
    window.selectDictionaryValue(selectedVal, false);
  }

  const modal = document.getElementById("kaspiDictModal");
  if (modal) modal.remove();
};

// Функция очистки выбора (меняет только локальное состояние окна до нажатия «ОК»)
window.clearKaspiDictSelection = function () {
  window.tempSelectedDictValue = "";
  window.tempDictWasCleared = true;
  const searchEl = document.getElementById("dictModalSearch");
  if (searchEl) {
    searchEl.value = "";
    searchEl.focus();
  }
  window.filterDictionary("");
};

// Полностью обновленная функция фильтрации и рендера списка
// Если передан явный аргумент queryOverride (например, "" при открытии или клике по пункту), фильтрация не применяется
window.filterDictionary = function (queryOverride) {
  let searchEl = document.getElementById("dictModalSearch");
  let listEl = document.getElementById("dictModalList");
  let countText = document.getElementById("dictModalCountText");
  let totalCount = document.getElementById("dictTotalCount");

  // Защита от ошибок, если окно еще не открыто
  if (!searchEl || !listEl) return;

  let rawQuery =
    queryOverride !== undefined ? String(queryOverride) : searchEl.value;
  let query = rawQuery.toLowerCase().trim();
  let dict = window.currentModalDict || [];
  let selectedVal = String(window.tempSelectedDictValue || "").trim();

  // Сохраняем исходный индекс в словаре для безопасного выбора через data-dict-idx
  let filtered = [];
  dict.forEach((item, idx) => {
    const strItem = String(item);
    if (!query || strItem.toLowerCase().includes(query)) {
      filtered.push({ val: strItem, idx: idx });
    }
  });

  // Локализация счетчика (с обновлением data-i18n для переключения языка на лету)
  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const tr =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  if (countText && totalCount) {
    const countKey = query === "" ? "dict_total" : "dict_found";
    countText.setAttribute("data-i18n", countKey);
    countText.innerText =
      query === "" ? tr.dict_total || "Всего:" : tr.dict_found || "Найдено:";
    totalCount.innerText = filtered.length;
  }

  // Если ничего не нашли
  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="kaspi-dict-empty" data-i18n="dict_not_found">${tr.dict_not_found || "В справочнике не найдено."}</div>`;
    return;
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlightRegex = query ? new RegExp(`(${safeQuery})`, "gi") : null;

  // Рендерим пункты меню
  listEl.innerHTML = filtered
    .map(({ val, idx }) => {
      let displayVal = highlightRegex
        ? val.replace(highlightRegex, '<mark class="kaspi-dict-mark">$1</mark>')
        : val;

      let isSelected = selectedVal !== "" && val === selectedVal;
      let itemClass = isSelected
        ? "kaspi-dict-item is-selected"
        : "kaspi-dict-item";
      let check = isSelected
        ? '<span class="kaspi-dict-check">✔</span>'
        : "";

      return `<li data-dict-idx="${idx}" class="${itemClass}">
            <span>${displayVal}</span>${check}
        </li>`;
    })
    .join("");
};

// Функция клика по элементу списка: отображает выбранное значение в верхнем поле, не фильтруя список
window.selectKaspiDictItem = function (val) {
  const cleanVal = String(val || "").trim();
  window.tempSelectedDictValue = cleanVal;
  window.tempDictWasCleared = false;

  const searchEl = document.getElementById("dictModalSearch");
  if (searchEl) {
    searchEl.value = cleanVal;
  }

  window.filterDictionary("");
};

window.selectDictionaryValue = function (value, isCustom) {
  let sysKey = window.currentModalSysKey;
  window.mapper2State = window.mapper2State || {};
  window.mapper2State.clearedKeys = window.mapper2State.clearedKeys || {};

  // 1. Очищаем старые привязки (если были), включая возможный humanName-алиас
  if (window.mapper2State.colMap) delete window.mapper2State.colMap[sysKey];
  if (window.mapper2State.splitRules)
    delete window.mapper2State.splitRules[sysKey];
  delete window.mapper2State.clearedKeys[sysKey];
  window.clearMapper2FieldAliases(sysKey);
  if (!window.mapper2State.dictValues) window.mapper2State.dictValues = {};

  // 2. Записываем новое значение (применится ко всем товарам при переходе вперёд)
  window.mapper2State.dictValues[sysKey] = value;

  // 3. Закрываем модалку справочника
  const modal = document.getElementById("kaspiDictModal");
  if (modal) modal.style.display = "none";

  // 4. Перерисовываем карточки (Маппер-2)
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

  // Строгое разделение веток: isExportBranch === true ТОЛЬКО в ветке выгрузки из базы!
  const isExportBranch = window.isKaspiExportMode === true;

  const hasStrDict = (k) =>
    typeof dict[k] === "string" && dict[k].trim() !== "";

  const hasQty = colMap["qty"] !== undefined || hasStrDict("qty");
  const hasPrice =
    colMap["price"] !== undefined ||
    colMap["cost"] !== undefined ||
    hasStrDict("price") ||
    hasStrDict("cost");
  const hasName =
    colMap["name"] !== undefined ||
    colMap["model"] !== undefined ||
    hasStrDict("name") ||
    hasStrDict("model");

  if (!isExportBranch) {
    if (!hasQty || !hasPrice || !hasName) {
      const tr = getSheetPreviewTranslator();
      return window.showKaspiNotice(tr("mapper_err_missing_cols"), {
        type: "warning",
      });
    }
  }

  // Фиксируем выбранный Главный Блок логистики для текущей накладной
  let finalLogisticsBlock = "";
  if (!isExportBranch) {
    if (window.currentImportMode === "kaspi") {
      const mapperLogSelect = document.getElementById("mapperLogisticsSelect");
      finalLogisticsBlock = String(
        (mapperLogSelect ? mapperLogSelect.value : state.logisticsBlock) || "",
      ).trim();
    } else {
      const internalLogSelect = document.getElementById(
        "internalLogisticsSelect",
      );
      finalLogisticsBlock = String(
        (internalLogSelect ? internalLogSelect.value : state.logisticsBlock) ||
          "",
      ).trim();
    }
    window.mapper2State.logisticsBlock = finalLogisticsBlock;
  }

  if (!isExportBranch && window.currentImportMode === "kaspi") {
    const templateSelect = document.getElementById("kaspiTemplateSelect");
    const selectedOpt =
      templateSelect && templateSelect.selectedIndex !== -1
        ? templateSelect.options[templateSelect.selectedIndex]
        : null;
    const templateHash = selectedOpt
      ? selectedOpt.getAttribute("data-hash") || selectedOpt.value || ""
      : "";
    const templateName = selectedOpt
      ? selectedOpt.getAttribute("data-name") || selectedOpt.text.trim() || templateHash
      : "";
    if (templateHash || templateName) {
      let currentMemory = {};
      try {
        currentMemory = JSON.parse(window.mapper2State.rawMemoryJson || "{}");
      } catch (e) {}
      if (!currentMemory || typeof currentMemory !== "object" || Array.isArray(currentMemory)) {
        currentMemory = {};
      }
      let memoryUpdated = false;

      Object.keys(state.colMap).forEach((sysKey) => {
        // Не запоминаем merchant_sku — он всегда заполняется штрихкодом БД
        if (String(sysKey).toLowerCase() === "merchant_sku") return;
        let colIndex = state.colMap[sysKey];
        let headerText = state.invoiceHeaders[colIndex];
        if (headerText) {
          let cleanWord = String(headerText).trim().toLowerCase();
          if (!Array.isArray(currentMemory[sysKey])) {
            currentMemory[sysKey] = [];
          }
          if (!currentMemory[sysKey]?.includes(cleanWord)) {
            currentMemory[sysKey].push(cleanWord);
            memoryUpdated = true;
          }
        }
      });

      // Безопасный merge _splitRules (не затираем ранее сохранённые правила)
      if (state.splitRules && Object.keys(state.splitRules).length > 0) {
        currentMemory._splitRules = Object.assign(
          {},
          currentMemory._splitRules || {},
          state.splitRules,
        );
        memoryUpdated = true;
      }

      // Безопасное сохранение _logisticsBlock внутри mapper_memory
      const prevSavedBlock = String(currentMemory._logisticsBlock || "").trim();
      if (finalLogisticsBlock && finalLogisticsBlock !== prevSavedBlock) {
        currentMemory._logisticsBlock = finalLogisticsBlock;
        memoryUpdated = true;
      } else if (
        !finalLogisticsBlock &&
        state.logisticsBlockTouched &&
        prevSavedBlock
      ) {
        currentMemory._logisticsBlock = "";
        memoryUpdated = true;
      }

      if (memoryUpdated) {
        const serializedMemory = JSON.stringify(currentMemory);
        window.mapper2State.rawMemoryJson = serializedMemory;
        if (window.currentTemplateData) {
          window.currentTemplateData.memoryJson = serializedMemory;
        }
        if (window.kaspiTemplateCache) {
          if (templateHash && window.kaspiTemplateCache[templateHash]) {
            window.kaspiTemplateCache[templateHash].memoryJson =
              serializedMemory;
          }
          if (templateName && window.kaspiTemplateCache[templateName]) {
            window.kaspiTemplateCache[templateName].memoryJson =
              serializedMemory;
          }
        }

        const payload = {
          action: "updateKaspiMemory",
          api_key: CLIENT_API_KEY,
          category: templateName,
          templateHash: templateHash,
          memoryJson: serializedMemory,
        };
        window
          .smartFetch(GATEWAY_URL, payload)
          .catch((e) => console.error("Ошибка обновления словаря", e));
      }
    }
  }

  window.parsedInvoiceData = [];
  window.invoiceGroups = {};
  window.invoiceGroups[state.docNo] = {
    supplier: state.supplier,
    logistics_block: finalLogisticsBlock,
    items: [],
    originalFiles: [
      { fileName: state.fileName, fileBase64: state.originalBase64 },
    ],
  };

  let mappedIndices = Object.values(state.colMap).filter(
    (v) => v !== undefined,
  );

  // Системные ключи, которые строго исключаются при сборе raw_logistics
  const SYSTEM_LOGISTICS_KEYS = new Set([
    "item_id",
    "id",
    "code",
    "sku",
    "barcode",
    "merchant_sku",
    "qty",
    "quantity",
    "price",
    "cost",
    "total",
    "amount",
    "sum",
    "cbm",
    "weight",
  ]);
  const SYSTEM_HEADER_EXCLUDE_RX =
    /^(?:no\.?|№|#|item\s*id|code|sku|article|art\.?|barcode|ean|qty|quantity|pcs|unit\s*price|price|cost|total|amount|sum|cbm|volume|weight|g\.?w\.?|n\.?w\.?|артикул|код|штрихкод|кол-?во|количество|цена|стоимость|сумма|итого|объ[её]м|вес)$/i;
  const PURE_NUMBER_OR_SUM_RX =
    /^(?:[$€¥₽₸£]\s*)?[+-]?\d[\d\s.,]*\s*(?:[$€¥₽₸£%]|usd|kzt|cny|eur|rub)?$/i;

  const systemMappedIndices = new Set();
  const attributeMappedIndices = new Set();
  Object.keys(state.colMap).forEach((k) => {
    const idx = state.colMap[k];
    if (idx === undefined || idx === null || idx < 0) return;
    const lk = String(k || "").trim().toLowerCase();
    if (SYSTEM_LOGISTICS_KEYS.has(lk)) {
      systemMappedIndices.add(idx);
    } else if (lk !== "name" && lk !== "model") {
      attributeMappedIndices.add(idx);
    }
  });

  window.mapper2State.quarantine = [];

  state.invoiceRows.forEach((row, index) => {
    if (!row || row.length === 0) return;

    const getValue = (primaryKey, kaspiKey) => {
      if (
        state.dictValues &&
        typeof state.dictValues[primaryKey] === "string" &&
        state.dictValues[primaryKey].trim() !== ""
      )
        return state.dictValues[primaryKey];
      if (
        kaspiKey &&
        state.dictValues &&
        typeof state.dictValues[kaspiKey] === "string" &&
        state.dictValues[kaspiKey].trim() !== ""
      )
        return state.dictValues[kaspiKey];

      let colIdx = state.colMap[primaryKey];
      if (colIdx === undefined && kaspiKey) colIdx = state.colMap[kaspiKey];
      if (colIdx === undefined) return "";

      let rawVal = String(row[colIdx] || "").trim();
      let excelHeader = state.invoiceHeaders
        ? state.invoiceHeaders[colIdx]
        : "";

      if (state.splitRules && typeof parseAndMatchTokens === "function") {
        let tokenObjects = parseAndMatchTokens(
          rawVal,
          excelHeader || primaryKey,
        );

        if (tokenObjects.length > 0) {
          let anchorIndex = tokenObjects.findIndex(
            (t) => /\d/.test(t.cleanText) || t.isPhrase,
          );
          if (anchorIndex === -1) anchorIndex = 0;

          tokenObjects.forEach((tok, idx) => {
            tok.universalIndex = 100 + (idx - anchorIndex);
          });

          const sig =
            typeof window.computeSmartTokenSignature === "function"
              ? window.computeSmartTokenSignature(tokenObjects)
              : tokenObjects
                  .filter(
                    (t) =>
                      !t.isPhrase && !/^[a-zA-Zа-яА-ЯёЁ]+$/.test(t.cleanText),
                  )
                  .map((t) => (/\d/.test(t.cleanText) ? "N" : "S"))
                  .join("-");

          const targetDict =
            typeof window.resolveKaspiDictForAttr === "function"
              ? window.resolveKaspiDictForAttr(primaryKey, kaspiKey)
              : null;

          if (
            state.splitRules[excelHeader] &&
            typeof window.extractTokenByRuleOrAnchor === "function"
          ) {
            const extracted = window.extractTokenByRuleOrAnchor(
              tokenObjects,
              state.splitRules[excelHeader],
              sig,
              primaryKey,
              targetDict,
            );
            if (extracted && extracted.matched) {
              return extracted.value;
            }
          }

          if (
            state.splitRules[primaryKey] &&
            state.splitRules[primaryKey][sig] !== undefined
          ) {
            const targetIndices = state.splitRules[primaryKey][sig];
            if (targetIndices !== undefined && targetIndices !== null) {
              let resultArr = [];
              let indicesArray = Array.isArray(targetIndices)
                ? targetIndices
                : [targetIndices];

              indicesArray.forEach((targetIdx) => {
                let matchedTok = tokenObjects.find(
                  (t) => t.universalIndex === targetIdx,
                );
                if (matchedTok) resultArr.push(matchedTok.text);
              });
              return resultArr.join("");
            }
            return "";
          }
        }
      }
      return rawVal;
    };

    let rawQty = getValue("qty");
    let rawPrice = getValue("price", "cost");
    let rawId = getValue("item_id") || getValue("barcode", "merchant_sku");
    // Для наименования товара в POS сначала берём колонку/значение name, а model используем только как фоллбэк
    let rawName = getValue("name") || getValue("model");

    let parsedQty = parseInvoiceNumber(rawQty);
    let qty = !isNaN(parsedQty) && parsedQty >= 0 ? parsedQty : 0;
    let price = parseInvoiceNumber(rawPrice);

    if (!isExportBranch && (isNaN(price) || price <= 0)) {
      return;
    }

    // Не копируем заводской артикул в barcode; сохраняем barcode только если явно замаплена колонка barcode и там ровно 13 цифр
    const explicitBarcodeVal =
      state.colMap && state.colMap["barcode"] !== undefined
        ? String(getValue("barcode") || "").trim()
        : "";
    let barcode = /^\d{13}$/.test(explicitBarcodeVal) ? explicitBarcodeVal : "";

    // === ЧИСТЫЙ СБОР raw_logistics (включая неразобранные атрибутные колонки, без системных полей/артикулов/сумм) ===
    const rawIdNorm = String(rawId || "").trim().toLowerCase();
    const barcodeNorm = String(barcode || "").trim().toLowerCase();
    const rawLogisticsParts = [];
    const seenLogisticsVals = new Set();

    const pushLogisticsToken = (rawVal, maxLen, rejectPureNumber) => {
      const val = String(rawVal || "")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!val || val.length >= maxLen) return;
      const lowerVal = val.toLowerCase();
      if (rawIdNorm && lowerVal === rawIdNorm) return;
      if (barcodeNorm && lowerVal === barcodeNorm) return;
      if (/^\d{8,15}$/.test(val)) return;
      if (rejectPureNumber && PURE_NUMBER_OR_SUM_RX.test(val)) return;
      if (seenLogisticsVals.has(lowerVal)) return;
      seenLogisticsVals.add(lowerVal);
      rawLogisticsParts.push(val);
    };

    // 1. Исходные неразобранные значения замапленных атрибутных колонок (в т.ч. Size / Размер: 155R12C, 175/65R14, 385/65R22.5)
    attributeMappedIndices.forEach((colIdx) => {
      if (systemMappedIndices.has(colIdx)) return;
      const hdr = String(
        (state.invoiceHeaders && state.invoiceHeaders[colIdx]) || "",
      ).trim();
      if (hdr && SYSTEM_HEADER_EXCLUDE_RX.test(hdr)) return;
      pushLogisticsToken(row[colIdx], 60, false);
    });

    // 2. Незамапленные колонки — строго исключаем системные шапки, артикулы (item_id), штрихкоды и чистые числа/суммы
    row.forEach((cellVal, idx) => {
      if (mappedIndices?.includes(idx)) return;
      const hdr = String(
        (state.invoiceHeaders && state.invoiceHeaders[idx]) || "",
      ).trim();
      if (hdr && SYSTEM_HEADER_EXCLUDE_RX.test(hdr)) return;
      pushLogisticsToken(cellVal, 40, true);
    });

    let rawLogisticsStr = rawLogisticsParts.join(" ");

    // Пустые текстовые колонки (например, Brand / Pattern) не должны отбрасывать валидную строку с ценой и количеством
    const cleanRawName = String(rawName || "").trim();
    const cleanRawId = String(rawId || "").trim();
    const trLocal = getSheetPreviewTranslator();
    let hasIdentifier =
      cleanRawName !== "" ||
      cleanRawId !== "" ||
      rawLogisticsStr.trim() !== "" ||
      qty > 0;
    if (!isExportBranch && !hasIdentifier) {
      return;
    }

    let name =
      cleanRawName ||
      cleanRawId ||
      rawLogisticsStr.trim() ||
      `${trLocal("inc_unnamed_item")} #${index + 1}`;

    let rawCbm = getValue("cbm");
    let parsedCbm = rawCbm ? parseInvoiceNumber(rawCbm) : NaN;
    let cbm = !isNaN(parsedCbm) ? parsedCbm : "";
    let rawWeight = getValue("weight");
    let parsedWeight = rawWeight ? parseInvoiceNumber(rawWeight) : NaN;
    let weight = !isNaN(parsedWeight) ? parsedWeight : "";

    let attributesObj = {};
    let itemHasCollisions = false;
    let itemCollisionsList = [];

    const FORBIDDEN_ATTR_KEYS = new Set([
      "merchant_sku",
      "sku",
      "артикул",
      "qty",
      "quantity",
      "price",
      "cost",
      "name",
      "item_name",
      "barcode",
      "item_id",
      "id",
      "code",
      "hash",
      "item_hash",
      "doc_no",
      "export_metadata",
      "supplier",
      "raw_logistics",
      "staff_id",
      "category",
      "title",
      "desc",
      "description",
      "cbm",
      "weight",
      "file_code",
      "market_category",
      "market_status",
      "template_hash",
      "logistics_block",
      "attributes",
      "kaspi_attributes",
      "params",
      "sourcerowindexes",
      "_sourcerowindexes",
      "_attributesobj",
      "_clearedattrs",
      "_hascollisions",
      "_collisionslist",
    ]);

    const processAttribute = (key) => {
      let cleanKey = String(key || "").trim();
      let lowerKey = cleanKey.toLowerCase();
      if (!cleanKey || cleanKey.startsWith("_") || FORBIDDEN_ATTR_KEYS.has(lowerKey))
        return;

      let rawValue = getValue(key);
      if (rawValue === null || rawValue === undefined || typeof rawValue === "object")
        return;
      if (String(rawValue).trim() === "") return;

      let humanName =
        state.sysToHumanMap && state.sysToHumanMap[key]
          ? state.sysToHumanMap[key]
          : key;
      let cleanHuman = String(humanName || "").trim();
      let lowerHuman = cleanHuman.toLowerCase();
      if (!cleanHuman || cleanHuman.startsWith("_") || FORBIDDEN_ATTR_KEYS.has(lowerHuman))
        return;

      let searchString = rawValue;

      let dict =
        typeof window.resolveKaspiDictForAttr === "function"
          ? window.resolveKaspiDictForAttr(humanName, key)
          : window.kaspiDicts && window.kaspiDicts[humanName];
      let hasDictionary = Boolean(dict && Array.isArray(dict) && dict.length > 0);
      let matchResult =
        typeof window.matchValueInKaspiDict === "function"
          ? window.matchValueInKaspiDict(searchString, dict)
          : {
              matched: !hasDictionary,
              value: String(searchString).trim(),
              normalized: String(searchString).trim(),
              isDictField: hasDictionary,
            };
      let foundMatch = matchResult.matched;
      let matchedDictValue = matchResult.value;

      if (
        window.currentImportMode === "kaspi" &&
        hasDictionary &&
        !foundMatch
      ) {
        let colIdx = state.colMap[key];
        let excelHeader =
          colIdx !== undefined && state.invoiceHeaders
            ? state.invoiceHeaders[colIdx]
            : "";

        let isComplex = window.complexColumnsToTokenize?.includes(excelHeader);

        let isAlreadyProcessed = false;
        if (state.splitRules) {
          if (state.splitRules[key]) isAlreadyProcessed = true;
          if (humanName && state.splitRules[humanName])
            isAlreadyProcessed = true;
          if (excelHeader && state.splitRules[excelHeader])
            isAlreadyProcessed = true;
        }

        if (isComplex && !isAlreadyProcessed) {
          itemHasCollisions = true;
          itemCollisionsList.push({
            sysKey: key,
            humanName: humanName,
            rawString: rawValue,
            excelColumnName: excelHeader || "ДАННЫЕ ИЗ НАКЛАДНОЙ",
          });
        } else {
          // Значения нет в values — НЕ обнуляем и НЕ обрезаем, сохраняем нормализованное значение
          attributesObj[cleanHuman] = String(matchedDictValue).trim();
        }
        return;
      }

      attributesObj[cleanHuman] = String(matchedDictValue).trim();
    };

    let allKeys = new Set(Object.keys(state.colMap));
    if (state.dictValues) {
      Object.keys(state.dictValues).forEach((k) => {
        if (
          typeof state.dictValues[k] === "string" &&
          state.dictValues[k].trim() !== ""
        ) {
          allKeys.add(k);
        }
      });
    }
    if (state.splitRules)
      Object.keys(state.splitRules).forEach((k) => allKeys.add(k));

    allKeys.forEach((key) => processAttribute(key));

    let cleanAttributesObj = {};
    Object.keys(attributesObj).forEach((k) => {
      const ck = String(k || "").trim();
      if (!ck || ck.startsWith("_") || FORBIDDEN_ATTR_KEYS.has(ck.toLowerCase())) {
        return;
      }
      const v = attributesObj[k];
      if (v !== null && v !== undefined && typeof v !== "object" && String(v).trim() !== "") {
        cleanAttributesObj[ck] = String(v).trim();
      }
    });
    attributesObj = cleanAttributesObj;

    let finalAttributes =
      Object.keys(cleanAttributesObj).length > 0
        ? JSON.stringify(cleanAttributesObj)
        : "";

    let activeCategoryText = "Без категории";
    if (!isExportBranch && window.currentImportMode === "kaspi") {
      const templateDropdown = document.getElementById("kaspiTemplateSelect");
      const opt =
        templateDropdown && templateDropdown.selectedIndex !== -1
          ? templateDropdown.options[templateDropdown.selectedIndex]
          : null;
      if (opt && opt.value && opt.value !== "new" && opt.value !== "new_template") {
        activeCategoryText = opt.getAttribute("data-name") || opt.text.trim();
      }
    }

    let origItem =
      isExportBranch &&
      window.kaspiExportItems &&
      window.kaspiExportItems[index]
        ? window.kaspiExportItems[index]
        : {};
    let realDocNo =
      origItem.doc_no ||
      origItem.invoice_no ||
      origItem.document_id ||
      origItem.docId ||
      state.docNo;
    let realItemId = origItem.item_id || origItem.sku || rawId;
    let preservedRowIndexes =
      isExportBranch && Array.isArray(origItem.sourceRowIndexes)
        ? origItem.sourceRowIndexes.slice()
        : isExportBranch && Array.isArray(origItem._sourceRowIndexes)
          ? origItem._sourceRowIndexes.slice()
          : [];

    const itemData = {
      doc_no: realDocNo,
      supplier: state.supplier,
      item_id: realItemId,
      item_name: name,
      qty: qty,
      cost: isNaN(price) ? 0 : price,
      cbm: cbm,
      weight: weight,
      raw_logistics: rawLogisticsStr.trim(),
      staff_id:
        typeof currentUser !== "undefined" && currentUser
          ? currentUser.uid
          : "Auto-Import",
      id: realItemId,
      name: name,
      desc: name,
      description: name,
      barcode: isExportBranch ? String(origItem.barcode || barcode || "").trim() : barcode,
      hash: origItem.hash || "",
      category: origItem.category || activeCategoryText,
      sku: realItemId,
      title: name,
      attributes: finalAttributes,
      sourceRowIndexes: preservedRowIndexes,
      _hasCollisions: itemHasCollisions,
      _collisionsList: itemCollisionsList,
      _attributesObj: attributesObj,
    };

    window.parsedInvoiceData.push(itemData);

    if (!window.invoiceGroups[realDocNo]) {
      window.invoiceGroups[realDocNo] = {
        supplier: state.supplier,
        logistics_block: finalLogisticsBlock,
        items: [],
      };
    }
    window.invoiceGroups[realDocNo].items.push(itemData);

    if (itemHasCollisions) {
      itemCollisionsList.forEach((collision) => {
        const exists = window.mapper2State.quarantine.find(
          (q) =>
            q.rawString === collision.rawString &&
            q.sysKey === collision.sysKey,
        );
        if (!exists) {
          window.mapper2State.quarantine.push(collision);
        }
      });
    }
  });

  if (window.parsedInvoiceData.length === 0 && !isExportBranch) {
    const tr = getSheetPreviewTranslator();
    return window.showKaspiNotice(tr("inc_build_empty_err"), {
      type: "warning",
    });
  }

  if (
    window.mapper2State.quarantine &&
    window.mapper2State.quarantine.length > 0
  ) {
    if (typeof window.startTokenizerQueue === "function") {
      window.startTokenizerQueue();
    } else {
      const tr = getSheetPreviewTranslator();
      window.showKaspiNotice(tr("inc_tokenizer_not_loaded"), {
        type: "warning",
      });
    }
    return;
  }

  window.renderPreviewTable();
  document.getElementById("mapper2Area").style.display = "none";
  document.getElementById("invoicePreviewArea").style.display = "flex";

  // Кнопки на экране сверки зависят СТРОГО от ветки (isExportBranch):
  // Ветка приемки («Только База» и «База + Маркет») -> видна ТОЛЬКО sendInvoiceBtn.
  // Ветка выгрузки из базы (isExportBranch === true) -> видна ТОЛЬКО generateExportBtn.
  if (isExportBranch) {
    const sendBtn = document.getElementById("sendInvoiceBtn");
    if (sendBtn) sendBtn.style.setProperty("display", "none", "important");

    const exportBtns = document.getElementById("exportActionButtons");
    if (exportBtns) exportBtns.style.display = "flex";

    const previewArea = document.getElementById("invoicePreviewArea");
    if (previewArea) {
      const allBtns = previewArea.querySelectorAll("button");
      allBtns.forEach((b) => {
        const text = b.innerText.toUpperCase();
        if (
          text?.includes("ДИСК") ||
          text?.includes("СБРОС") ||
          text?.includes("ПЕРЕЗАЛИТЬ")
        ) {
          b.style.display = "none";
        }
      });
    }
  } else {
    const sendBtn = document.getElementById("sendInvoiceBtn");
    if (sendBtn) sendBtn.style.setProperty("display", "flex", "important");

    const exportBtns = document.getElementById("exportActionButtons");
    if (exportBtns) exportBtns.style.setProperty("display", "none", "important");

    const genBtn = document.getElementById("generateExportBtn");
    if (genBtn) genBtn.style.setProperty("display", "none", "important");
  }
};

// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ РЕДАКТОРА ===
window.currentEditIndex = null;
window.tempAttrs = {};
window.tempClearedKeys = new Set();
window.currentFieldDict = [];

// === ВАЛИДАЦИЯ АТРИБУТОВ ПО СПРАВОЧНИКУ VALUES И ПРЕДУПРЕЖДЕНИЕ ПЕРЕД ЭКСПОРТОМ ===

window.formatAttrDisplayKey = function (rawKey) {
  const sysToHuman =
    (window.mapper2State && window.mapper2State.sysToHumanMap) || {};
  const humanName = sysToHuman[rawKey];
  if (humanName) return String(humanName).replace(/\*/g, "").trim();
  const cleaned = String(rawKey || "")
    .split("*")
    .pop()
    .replace(/tires/gi, "")
    .replace(/additional/gi, "")
    .replace(/general/gi, "")
    .replace(/\./g, "")
    .trim();
  return cleaned || String(rawKey || "");
};

window.collectOutOfDictIssues = function (itemsList) {
  const items = Array.isArray(itemsList)
    ? itemsList
    : Array.isArray(window.parsedInvoiceData)
      ? window.parsedInvoiceData
      : [];

  const result = {
    totalCells: 0,
    affectedItemIndices: new Set(),
    issuesByItem: new Map(),
    aggregated: [],
  };

  const isKaspiContext =
    window.isKaspiExportMode === true || window.currentImportMode === "kaspi";
  if (!isKaspiContext || items.length === 0) return result;

  const SERVICE_ATTRS = new Set([
    "doc_no",
    "invoice_no",
    "document_id",
    "merchant_sku",
    "sku",
    "артикул",
  ]);
  const aggMap = new Map();

  items.forEach((item, idx) => {
    if (!item || !item.attributes) return;
    let parsed = null;
    try {
      parsed =
        typeof item.attributes === "string"
          ? JSON.parse(item.attributes)
          : item.attributes;
    } catch (_) {
      return;
    }
    if (!parsed || typeof parsed !== "object") return;

    Object.keys(parsed).forEach((k) => {
      const lowerK = String(k || "").trim().toLowerCase();
      if (!lowerK || SERVICE_ATTRS.has(lowerK)) return;
      const val = String(parsed[k] === undefined || parsed[k] === null ? "" : parsed[k]).trim();
      if (!val) return;

      const displayKey = window.formatAttrDisplayKey(k);
      const dict =
        typeof window.resolveKaspiDictForAttr === "function"
          ? window.resolveKaspiDictForAttr(displayKey, k)
          : null;
      if (!dict || dict.length === 0) return;

      const check =
        typeof window.matchValueInKaspiDict === "function"
          ? window.matchValueInKaspiDict(val, dict)
          : { matched: true };

      if (!check.matched) {
        result.totalCells++;
        result.affectedItemIndices.add(idx);
        if (!result.issuesByItem.has(idx)) {
          result.issuesByItem.set(idx, new Set());
        }
        result.issuesByItem.get(idx).add(k);

        const aggKey = `${displayKey}:::${val}`;
        if (!aggMap.has(aggKey)) {
          aggMap.set(aggKey, { displayKey, value: val, count: 0 });
        }
        aggMap.get(aggKey).count++;
      }
    });
  });

  result.aggregated = Array.from(aggMap.values()).sort(
    (a, b) => b.count - a.count || a.displayKey.localeCompare(b.displayKey),
  );
  return result;
};

window.confirmExportWithOutOfDictWarning = function (itemsList) {
  const issues = window.collectOutOfDictIssues(itemsList);
  if (!issues || issues.totalCells === 0) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const tr = getSheetPreviewTranslator();
    const existing = document.getElementById("kaspi-export-warn-overlay");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    const overlay = document.createElement("div");
    overlay.id = "kaspi-export-warn-overlay";
    overlay.className = "kaspi-export-warn-overlay";

    const cleanup = () => {
      document.removeEventListener("keydown", onKeyDown);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    };

    const goFix = () => {
      cleanup();
      window._previewOnlyOutOfDict = true;
      if (typeof window.renderPreviewTable === "function") {
        window.renderPreviewTable();
      }
      resolve(false);
    };

    const forceExport = () => {
      cleanup();
      resolve(true);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        goFix();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const modal = document.createElement("div");
    modal.className = "kaspi-export-warn-modal";

    const titleEl = document.createElement("div");
    titleEl.className = "kaspi-export-warn-title";
    const warnIcon = document.createElement("span");
    warnIcon.textContent = "⚠️";
    const titleSpan = document.createElement("span");
    titleSpan.textContent = tr("export_warn_title");
    titleEl.appendChild(warnIcon);
    titleEl.appendChild(titleSpan);

    const descEl = document.createElement("div");
    descEl.className = "kaspi-export-warn-desc";
    descEl.textContent = tr("export_warn_desc");

    const listEl = document.createElement("ul");
    listEl.className = "kaspi-export-warn-list";

    const MAX_SHOWN = 8;
    const shownItems = issues.aggregated.slice(0, MAX_SHOWN);
    shownItems.forEach((g) => {
      const li = document.createElement("li");
      li.className = "kaspi-export-warn-item";
      li.textContent = tr("export_warn_item_fmt", {
        col: g.displayKey,
        val: g.value,
        count: g.count,
      });
      listEl.appendChild(li);
    });

    if (issues.aggregated.length > MAX_SHOWN) {
      const moreLi = document.createElement("li");
      moreLi.className = "kaspi-export-warn-more";
      moreLi.textContent = tr("export_warn_more", {
        count: issues.aggregated.length - MAX_SHOWN,
      });
      listEl.appendChild(moreLi);
    }

    const actionsEl = document.createElement("div");
    actionsEl.className = "kaspi-export-warn-actions";

    const fixBtn = document.createElement("button");
    fixBtn.type = "button";
    fixBtn.className = "kaspi-export-warn-btn kaspi-export-warn-btn--fix";
    fixBtn.textContent = tr("export_warn_btn_fix");
    fixBtn.addEventListener("click", goFix);

    const forceBtn = document.createElement("button");
    forceBtn.type = "button";
    forceBtn.className = "kaspi-export-warn-btn kaspi-export-warn-btn--force";
    forceBtn.textContent = tr("export_warn_btn_force");
    forceBtn.addEventListener("click", forceExport);

    actionsEl.appendChild(fixBtn);
    actionsEl.appendChild(forceBtn);

    modal.appendChild(titleEl);
    modal.appendChild(descEl);
    modal.appendChild(listEl);
    modal.appendChild(actionsEl);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
};

window.openDirectCellEditor = function (itemIndex, attrKey) {
  if (!window.parsedInvoiceData || !window.parsedInvoiceData[itemIndex]) return;

  window.currentEditIndex = itemIndex;
  const item = window.parsedInvoiceData[itemIndex];
  window.tempAttrs = {};
  window.tempClearedKeys = new Set(
    item && Array.isArray(item._clearedAttrs) ? item._clearedAttrs : [],
  );

  let rawAttrs = {};
  if (item && item.attributes) {
    try {
      rawAttrs =
        typeof item.attributes === "string"
          ? JSON.parse(item.attributes)
          : item.attributes;
    } catch (_) {}
  }

  const catalog = window.buildEditorFieldCatalog();
  const SERVICE_ATTR_KEYS = new Set(["doc_no", "invoice_no", "document_id"]);

  if (rawAttrs && typeof rawAttrs === "object") {
    Object.keys(rawAttrs).forEach((k) => {
      const rawVal = rawAttrs[k];
      if (
        rawVal === undefined ||
        rawVal === null ||
        rawVal === "undefined" ||
        rawVal === "null"
      ) {
        return;
      }
      const val = String(rawVal).trim();
      if (!val) return;
      if (SERVICE_ATTR_KEYS.has(String(k).toLowerCase())) return;

      const normK = window.normalizeParamLabel(k);
      const entry =
        catalog.byHumanExact[k] ||
        catalog.bySysKey[k] ||
        (normK && catalog.byNormLabel[normK]);

      if (entry) {
        if (entry.isSku) return;
        const targetKey = entry.canonicalKey;
        if (!window.tempAttrs[targetKey] || k === entry.canonicalKey) {
          window.tempAttrs[targetKey] = val;
        }
      } else {
        window.tempAttrs[k] = val;
      }
    });
  }

  let modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modalContainer";
    document.body.appendChild(modalContainer);
  }
  modalContainer.textContent = "";

  window.openEditorField(attrKey, { directSave: true });
};

// === ОТРИСОВКА ГЛАВНОЙ ТАБЛИЦЫ ===
window.renderPreviewTable = function () {
  const state = window.mapper2State;
  const t = translations[currentLang] || translations["ru"];
  const tr = getSheetPreviewTranslator();

  if (typeof window.autoCleanInvoiceAttributes === "function") {
    window.autoCleanInvoiceAttributes();
  }

  const tabs = document.getElementById("mapperTabsContainer");
  if (tabs) tabs.style.display = "none";

  const currency = document.getElementById("mapperCurrencyBlock");
  if (currency) currency.style.display = "none";

  let realDocNo = state.docNo;
  let sourceItems =
    window.isKaspiExportMode === true &&
    window.kaspiExportItems &&
    window.kaspiExportItems.length > 0
      ? window.kaspiExportItems
      : window.parsedInvoiceData;

  if (sourceItems && sourceItems.length > 0) {
    let firstItem = sourceItems[0];
    realDocNo =
      firstItem.doc_no ||
      firstItem.invoice_no ||
      firstItem.document_id ||
      firstItem.docId ||
      state.docNo;
  }

  const metaContainer = document.getElementById("invoiceMetadata");
  if (metaContainer) {
    metaContainer.textContent = "";
    const metaBox = document.createElement("div");
    metaBox.style.cssText =
      "display: flex; justify-content: space-between; align-items: center; font-size: 11px; padding: 10px; background: var(--bg-panel); border-radius: 8px; border: 1px solid var(--border-light);";

    const addMetaItem = (labelKey, fallbackLabel, valText, valI18nKey) => {
      const wrap = document.createElement("div");
      const lbl = document.createElement("span");
      lbl.setAttribute("data-i18n", labelKey);
      lbl.style.color = "var(--text-muted)";
      lbl.textContent = t[labelKey] || fallbackLabel;
      const b = document.createElement("b");
      b.style.color = "var(--accent-yellow)";
      if (valI18nKey) b.setAttribute("data-i18n", valI18nKey);
      b.textContent = String(valText);
      wrap.appendChild(lbl);
      wrap.appendChild(document.createTextNode(" "));
      wrap.appendChild(b);
      metaBox.appendChild(wrap);
    };

    addMetaItem(
      "inc_supplier",
      "Пост:",
      state.supplier || tr("inc_not_specified"),
      !state.supplier ? "inc_not_specified" : "",
    );
    addMetaItem("inc_doc_short", "Док:", realDocNo || "");
    addMetaItem("inc_pos", "Поз:", (window.parsedInvoiceData || []).length);
    metaContainer.appendChild(metaBox);
  }

  // Сканируем значения вне справочника values и рендерим предупреждающую плашку над таблицей
  const dictIssues = window.collectOutOfDictIssues(window.parsedInvoiceData);
  if (dictIssues.totalCells === 0) {
    window._previewOnlyOutOfDict = false;
  }

  const previewAreaEl = document.getElementById("invoicePreviewArea");
  const tableContainerEl = document.getElementById("invoiceTableContainer");
  let warnBanner = document.getElementById("kaspiDictWarnBanner");
  if (!warnBanner && previewAreaEl && tableContainerEl) {
    warnBanner = document.createElement("div");
    warnBanner.id = "kaspiDictWarnBanner";
    previewAreaEl.insertBefore(warnBanner, tableContainerEl);
  }

  if (warnBanner) {
    warnBanner.textContent = "";
    if (dictIssues.totalCells > 0) {
      warnBanner.className = "kaspi-dict-warn-banner";
      warnBanner.style.display = "flex";

      const topRow = document.createElement("div");
      topRow.className = "kaspi-dict-warn-banner-top";

      const titleDiv = document.createElement("div");
      titleDiv.className = "kaspi-dict-warn-banner-title";
      const iconSp = document.createElement("span");
      iconSp.textContent = "⚠️";
      const titleSp = document.createElement("span");
      titleSp.textContent = tr("dict_warn_banner_title", {
        count: dictIssues.totalCells,
      });
      titleDiv.appendChild(iconSp);
      titleDiv.appendChild(titleSp);

      const filterBtn = document.createElement("button");
      filterBtn.type = "button";
      filterBtn.className = window._previewOnlyOutOfDict
        ? "kaspi-dict-warn-filter-btn is-active"
        : "kaspi-dict-warn-filter-btn";
      filterBtn.textContent = window._previewOnlyOutOfDict
        ? tr("dict_warn_filter_all", {
            count: (window.parsedInvoiceData || []).length,
          })
        : tr("dict_warn_filter_problem", {
            count: dictIssues.affectedItemIndices.size,
          });
      filterBtn.addEventListener("click", () => {
        window._previewOnlyOutOfDict = !window._previewOnlyOutOfDict;
        window.renderPreviewTable();
        if (tableContainerEl) tableContainerEl.scrollTop = 0;
      });

      topRow.appendChild(titleDiv);
      topRow.appendChild(filterBtn);

      const descDiv = document.createElement("div");
      descDiv.className = "kaspi-dict-warn-banner-desc";
      descDiv.textContent = tr("dict_warn_banner_desc");

      warnBanner.appendChild(topRow);
      warnBanner.appendChild(descDiv);
    } else {
      warnBanner.style.display = "none";
    }
  }

  const tbody = document.getElementById("invoiceTableBody");
  if (tbody) {
    tbody.textContent = "";
    const frag = document.createDocumentFragment();
    const editBtnLabel = tr("inc_edit_params");
    const cellWarnHint = tr("dict_warn_cell_hint");

    (window.parsedInvoiceData || []).forEach((item, index) => {
      if (
        window._previewOnlyOutOfDict &&
        !dictIssues.affectedItemIndices.has(index)
      ) {
        return;
      }

      let displayCode = null;
      let parsedAttrs = null;

      if (item.attributes) {
        try {
          parsedAttrs =
            typeof item.attributes === "string"
              ? JSON.parse(item.attributes)
              : item.attributes;
          if (parsedAttrs && parsedAttrs.item_id && isNaN(Number(parsedAttrs.item_id))) {
            displayCode = parsedAttrs.item_id;
          }
        } catch (_) {
          parsedAttrs = null;
        }
      }

      if (!displayCode) {
        displayCode =
          item.item_id || item.sku || item.barcode || item.id || "AUTO";
        if (
          /^\d{12,13}$/.test(displayCode) &&
          item.sku &&
          !/^\d{12,13}$/.test(item.sku)
        ) {
          displayCode = item.sku;
        }
      }

      // Строка 1: Название, код, кол-во, цена
      const trTop = document.createElement("tr");

      const tdMain = document.createElement("td");
      tdMain.className = "col-main";
      tdMain.style.cssText =
        "padding:12px 8px 4px 8px; vertical-align: top; border-bottom: none;";

      const nameDiv = document.createElement("div");
      nameDiv.style.cssText = "font-weight:bold; font-size:13px; line-height:1.2;";
      nameDiv.textContent = String(item.item_name || item.name || "");

      const metaSub = document.createElement("div");
      metaSub.style.cssText =
        "display: flex; align-items: center; gap: 8px; margin-top: 6px;";

      const codeSpan = document.createElement("span");
      codeSpan.style.cssText =
        "color:var(--accent-blue); font-weight:bold; font-size:11px;";
      codeSpan.textContent = `${tr("col_hint_id") || "Код"}: ${displayCode}`;
      metaSub.appendChild(codeSpan);

      if (!item.barcode) {
        const eanSpan = document.createElement("span");
        eanSpan.style.cssText =
          "font-size:9px; color:var(--accent-green); background: var(--bg-success-dim); padding: 2px 6px; border-radius: 4px; font-weight: bold;";
        eanSpan.textContent = "+ EAN-13";
        metaSub.appendChild(eanSpan);
      }

      tdMain.appendChild(nameDiv);
      tdMain.appendChild(metaSub);

      const tdMin = document.createElement("td");
      tdMin.className = "col-min";
      tdMin.style.cssText =
        "padding:12px 8px 4px 8px; vertical-align: top; text-align:right; width: 70px; border-bottom: none;";

      const qtyDiv = document.createElement("div");
      qtyDiv.style.cssText =
        "font-size:12px; color:var(--text-muted); margin-bottom: 4px;";
      qtyDiv.textContent = Number(item.qty || 0).toLocaleString("ru-RU");

      const costDiv = document.createElement("div");
      costDiv.style.cssText =
        "font-size:13px; font-weight:bold; color:var(--accent-yellow);";
      costDiv.textContent = Number(item.cost || 0).toLocaleString("ru-RU");

      tdMin.appendChild(qtyDiv);
      tdMin.appendChild(costDiv);

      trTop.appendChild(tdMain);
      trTop.appendChild(tdMin);
      frag.appendChild(trTop);

      // Строка 2: Кликабельные ячейки атрибутов + кнопка "Изменить параметры"
      const trAttrs = document.createElement("tr");
      trAttrs.style.borderBottom = "1px solid var(--border-light)";

      const tdAttrs = document.createElement("td");
      tdAttrs.colSpan = 2;
      tdAttrs.style.cssText = "padding: 0 8px 12px 8px; border-top: none;";

      const itemIssuesSet = dictIssues.issuesByItem.get(index) || new Set();

      if (parsedAttrs && typeof parsedAttrs === "object") {
        const attrKeys = Object.keys(parsedAttrs).filter(
          (k) =>
            !["doc_no", "invoice_no", "document_id"].includes(
              String(k).toLowerCase(),
            ),
        );

        if (attrKeys.length > 0) {
          const attrsList = document.createElement("div");
          attrsList.className = "preview-attrs-list";

          attrKeys.forEach((k) => {
            const displayKey = window.formatAttrDisplayKey(k);
            const fullVal = String(parsedAttrs[k] || "");
            const shortVal =
              fullVal.length > 36 ? fullVal.substring(0, 36) + "..." : fullVal;
            const isWarn = itemIssuesSet.has(k);

            const attrBtn = document.createElement("button");
            attrBtn.type = "button";
            attrBtn.className = isWarn
              ? "preview-attr-row preview-attr-row--warn"
              : "preview-attr-row preview-attr-row--ok";
            if (isWarn) attrBtn.title = cellWarnHint;

            const mainLine = document.createElement("div");
            mainLine.className = "preview-attr-row-main";

            const keySpan = document.createElement("span");
            keySpan.className = "preview-attr-key";
            keySpan.textContent = `${displayKey}:`;

            const valSpan = document.createElement("span");
            valSpan.className = "preview-attr-val";
            valSpan.textContent = isWarn ? `⚠️ ${shortVal}` : shortVal;

            mainLine.appendChild(keySpan);
            mainLine.appendChild(valSpan);
            attrBtn.appendChild(mainLine);

            if (isWarn) {
              const hintDiv = document.createElement("div");
              hintDiv.className = "preview-attr-hint";
              hintDiv.textContent = cellWarnHint;
              attrBtn.appendChild(hintDiv);
            }

            attrBtn.addEventListener("click", () => {
              window.openDirectCellEditor(index, k);
            });

            attrsList.appendChild(attrBtn);
          });

          tdAttrs.appendChild(attrsList);
        }
      }

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.style.cssText =
        "width: 100%; background: var(--bg-card); border: 1px dashed var(--border-light); color: var(--text-muted); cursor: pointer; border-radius: 4px; font-size: 11px; margin-top: 10px; padding: 10px;";
      editBtn.appendChild(document.createTextNode("✏ "));
      const editSpan = document.createElement("span");
      editSpan.setAttribute("data-i18n", "inc_edit_params");
      editSpan.textContent = editBtnLabel;
      editBtn.appendChild(editSpan);
      editBtn.addEventListener("click", () => {
        window.openEditorMain(index);
      });

      tdAttrs.appendChild(editBtn);
      trAttrs.appendChild(tdAttrs);
      frag.appendChild(trAttrs);
    });

    tbody.appendChild(frag);
  }

  const isExportBranch = window.isKaspiExportMode === true;
  const step3 = document.getElementById("invoicePreviewArea");

  if (isExportBranch) {
    const sendBtn = document.getElementById("sendInvoiceBtn");
    if (sendBtn) sendBtn.style.setProperty("display", "none", "important");

    if (step3) {
      const allBtns = step3.querySelectorAll("button");
      allBtns.forEach((b) => {
        const txt = b.innerText.trim().toUpperCase();
        if (
          (txt?.includes("НАЗАД") || txt?.includes("АРТҚА")) &&
          b.id !== "kaspiMapperBackBtn" &&
          b.id !== "kaspiBackToMapperBtn"
        ) {
          b.style.setProperty("display", "none", "important");
        }
      });
    }

    const exportBtns = document.getElementById("exportActionButtons");

    if (exportBtns && step3) {
      exportBtns.style.display = "flex";
      exportBtns.style.flexDirection = "row";
      exportBtns.style.flexWrap = "wrap";
      exportBtns.style.gap = "10px";
      step3.appendChild(exportBtns);

      let backBtn = document.getElementById("kaspiBackToMapperBtn");
      if (!backBtn) {
        backBtn = document.createElement("button");
        backBtn.id = "kaspiBackToMapperBtn";
        backBtn.style.background = "transparent";
        backBtn.style.color = "var(--text-main)";
        backBtn.style.border = "1px solid var(--border-light)";
        backBtn.style.padding = "12px 15px";
        backBtn.style.minHeight = "42px";
        backBtn.style.borderRadius = "6px";
        backBtn.style.fontWeight = "bold";
        backBtn.style.cursor = "pointer";
        backBtn.style.boxSizing = "border-box";
        backBtn.setAttribute("data-i18n", "kaspi_mapper_back");
        backBtn.innerText = "НАЗАД";

        backBtn.onclick = function (e) {
          e.preventDefault();
          document.getElementById("invoicePreviewArea").style.display = "none";
          document.getElementById("mapper2Area").style.display = "flex";

          const mapperBackBtn = document.getElementById("kaspiMapperBackBtn");
          if (mapperBackBtn) {
            mapperBackBtn.style.display = "block";
          }
        };

        exportBtns.insertBefore(backBtn, exportBtns.firstChild);
      }

      let resetBtn = document.getElementById("kaspiResetExportBtn");
      if (!resetBtn) {
        resetBtn = document.createElement("button");
        resetBtn.id = "kaspiResetExportBtn";
        resetBtn.style.background = "var(--btn-danger-bg, #ef4444)";
        resetBtn.style.color = "var(--btn-danger-text, #ffffff)";
        resetBtn.style.border = "1px solid var(--btn-danger-border, #dc2626)";
        resetBtn.style.padding = "12px 15px";
        resetBtn.style.minHeight = "42px";
        resetBtn.style.borderRadius = "6px";
        resetBtn.style.fontWeight = "bold";
        resetBtn.style.cursor = "pointer";
        resetBtn.style.boxSizing = "border-box";
        resetBtn.setAttribute("data-i18n", "kaspi_reset_invoice");
        resetBtn.innerText = "🔄 ПЕРЕЗАЛИТЬ НАКЛАДНУЮ (СБРОС)";

        resetBtn.onclick = function (e) {
          e.preventDefault();
          let confirmMsg = "Очистить таблицу и загрузить накладную заново?";
          if (typeof window.t === "function") {
            confirmMsg = window.t("kaspi_reset_confirm") || confirmMsg;
          } else {
            const translatedEl = document.querySelector(
              '[data-i18n="kaspi_reset_confirm"]',
            );
            if (translatedEl) confirmMsg = translatedEl.innerText;
          }

          if (!confirm(confirmMsg)) return;

          window.parsedInvoiceData = [];
          window.kaspiExportItems = [];
          if (window.mapper2State) window.mapper2State.colMap = {};

          if (window.currentExportHash) {
            window.handleCardSelectForExport(
              window.currentExportHash,
              null,
              false,
            );
          }
        };

        exportBtns.appendChild(resetBtn);
      }

      let downloadBtnFound = false;

      Array.from(exportBtns.children).forEach((child) => {
        if (child.id === "kaspiBackToMapperBtn") {
          child.style.flex = "1";
          child.style.display = "block";
        } else if (child.id === "kaspiResetExportBtn") {
          child.style.flex = "0 0 100%";
          child.style.marginTop = "5px";
          child.style.display = "block";
        } else if (child.id === "generateExportBtn") {
          child.style.flex = "2";
          child.setAttribute("data-i18n", "kaspi_download_file");
          child.style.setProperty("display", "block", "important");
          downloadBtnFound = true;
        } else if (child.tagName.toUpperCase() === "BUTTON") {
          if (!downloadBtnFound) {
            child.style.flex = "2";
            child.setAttribute("data-i18n", "kaspi_download_file");
            child.style.setProperty("display", "block", "important");
            downloadBtnFound = true;
          } else {
            child.style.display = "none";
            child.style.setProperty("display", "none", "important");
          }
        }
      });

      if (typeof window.applyLanguage === "function") {
        window.applyLanguage(
          typeof currentLang !== "undefined" ? currentLang : "ru",
        );
      }
    }
  } else {
    // ВЕТКА ПРИЕМКИ (и «Только База», и «База + Маркет»): всегда показываем sendInvoiceBtn, скрываем exportActionButtons и generateExportBtn
    const exportBtns = document.getElementById("exportActionButtons");
    if (exportBtns) {
      exportBtns.style.setProperty("display", "none", "important");
    }
    const genBtn = document.getElementById("generateExportBtn");
    if (genBtn) {
      genBtn.style.setProperty("display", "none", "important");
    }
    const expBackBtn = document.getElementById("kaspiBackToMapperBtn");
    if (expBackBtn) expBackBtn.style.display = "none";
    const expResetBtn = document.getElementById("kaspiResetExportBtn");
    if (expResetBtn) expResetBtn.style.display = "none";

    const showIncomeControls = () => {
      const sendBtn = document.getElementById("sendInvoiceBtn");
      if (sendBtn) {
        sendBtn.style.setProperty("display", "block", "important");
        sendBtn.style.visibility = "visible";
        sendBtn.removeAttribute("hidden");

        const parent = sendBtn.parentElement;
        if (parent && parent.id !== "invoicePreviewArea") {
          parent.style.setProperty("display", "flex", "important");
          parent.style.width = "100%";
        }
      }

      if (step3) {
        const allBtns = step3.querySelectorAll("button");
        allBtns.forEach((b) => {
          const txt = b.innerText.trim().toUpperCase();
          if (txt?.includes("НАЗАД") || txt?.includes("АРТҚА")) {
            if (b.id !== "kaspiBackToMapperBtn") {
              b.style.setProperty("display", "block", "important");
            }
          }
        });
      }
    };

    showIncomeControls();
    setTimeout(showIncomeControls, 100);
  }
};

// === 1. ГЛАВНОЕ ОКНО РЕДАКТИРОВАНИЯ ===
window.normalizeParamLabel = function (label) {
  return String(label || "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

window.buildEditorFieldCatalog = function () {
  const tpl = window.currentTemplateData || window.lastTemplateData || null;
  const sysToHuman =
    (window.mapper2State && window.mapper2State.sysToHumanMap) || {};
  const dicts =
    window.kaspiDicts ||
    (window.mapper2State && window.mapper2State.dictionary) ||
    {};

  const fields = [];
  const bySysKey = {};
  const byHumanExact = {};
  const byNormLabel = {};

  const resolveDictFor = (humanName, sysKey) => {
    const cleanHum = String(humanName || "").replace(/\*/g, "").trim();
    const candidates = [
      String(humanName || "").trim().toLowerCase(),
      cleanHum.toLowerCase(),
      String(sysKey || "").trim().toLowerCase(),
    ].filter(Boolean);

    const foundKey = Object.keys(dicts).find((dk) => {
      const c = String(dk || "").trim().toLowerCase();
      return candidates.includes(c);
    });
    if (!foundKey) return null;

    let d = dicts[foundKey];
    if (d && !Array.isArray(d) && typeof d === "object") {
      d = Object.values(d);
    }
    return Array.isArray(d) && d.length > 0 ? d : null;
  };

  const registerField = (sysKey, humanName, isReq) => {
    const rawSys = String(sysKey || "").trim();
    const rawHum = String(humanName || "").trim();
    const canonicalKey = rawHum || rawSys;
    if (!canonicalKey) return;

    const cleanDisplayKey = canonicalKey.replace(/\*/g, "").trim();
    const normLabel = window.normalizeParamLabel(cleanDisplayKey);
    const lowerSys = rawSys.toLowerCase();

    const existing =
      (rawSys && bySysKey[rawSys]) ||
      byHumanExact[canonicalKey] ||
      (normLabel && byNormLabel[normLabel]);
    if (existing) {
      if (rawSys && !bySysKey[rawSys]) bySysKey[rawSys] = existing;
      if (isReq) existing.isReq = true;
      return;
    }

    const isSku =
      lowerSys === "merchant_sku" ||
      lowerSys.includes("sku") ||
      normLabel === "артикул";
    const forcedReq =
      Boolean(isReq) || normLabel === "бренд" || normLabel === "артикул";
    const dictArr = resolveDictFor(canonicalKey, rawSys);

    const entry = {
      canonicalKey,
      sysKey: rawSys,
      cleanDisplayKey,
      normLabel,
      isReq: forcedReq,
      isSku,
      isDict: Boolean(dictArr && dictArr.length > 0),
      dict: dictArr,
    };

    fields.push(entry);
    if (rawSys) bySysKey[rawSys] = entry;
    byHumanExact[canonicalKey] = entry;
    if (normLabel) byNormLabel[normLabel] = entry;
  };

  const useKaspiTemplate =
    window.isKaspiExportMode === true || window.currentImportMode === "kaspi";

  if (
    useKaspiTemplate &&
    tpl &&
    Array.isArray(tpl.systemKeys) &&
    Array.isArray(tpl.humanNames)
  ) {
    const reqs = Array.isArray(tpl.requirements) ? tpl.requirements : [];
    for (let i = 0; i < tpl.systemKeys.length; i++) {
      const sKey = tpl.systemKeys[i];
      const hName = tpl.humanNames[i];
      if (!sKey && !hName) continue;
      const reqText = String(reqs[i] || "").toLowerCase();
      const isReq =
        reqText.includes("обязательн") && !reqText.includes("необязательн");
      registerField(sKey, hName, isReq);
    }
  } else if (useKaspiTemplate && Object.keys(sysToHuman).length > 0) {
    Object.keys(sysToHuman).forEach((sKey) => {
      registerField(sKey, sysToHuman[sKey], false);
    });
  }

  return { fields, bySysKey, byHumanExact, byNormLabel, resolveDictFor };
};

window.openEditorMain = function (index) {
  window.currentEditIndex = index;
  const item = window.parsedInvoiceData[index];
  window.tempAttrs = {};
  window.tempClearedKeys = new Set(
    item && Array.isArray(item._clearedAttrs) ? item._clearedAttrs : [],
  );

  let rawAttrs = {};
  if (item && item.attributes) {
    try {
      rawAttrs =
        typeof item.attributes === "string"
          ? JSON.parse(item.attributes)
          : item.attributes;
    } catch (e) {}
  }

  const catalog = window.buildEditorFieldCatalog();
  const SERVICE_ATTR_KEYS = new Set(["doc_no", "invoice_no", "document_id"]);

  if (rawAttrs && typeof rawAttrs === "object") {
    Object.keys(rawAttrs).forEach((k) => {
      const rawVal = rawAttrs[k];
      if (
        rawVal === undefined ||
        rawVal === null ||
        rawVal === "undefined" ||
        rawVal === "null"
      ) {
        return;
      }
      const val = String(rawVal).trim();
      if (!val) return;
      if (SERVICE_ATTR_KEYS.has(String(k).toLowerCase())) return;

      const normK = window.normalizeParamLabel(k);
      const entry =
        catalog.byHumanExact[k] ||
        catalog.bySysKey[k] ||
        (normK && catalog.byNormLabel[normK]);

      if (entry) {
        if (entry.isSku) return;
        const targetKey = entry.canonicalKey;
        if (!window.tempAttrs[targetKey] || k === entry.canonicalKey) {
          window.tempAttrs[targetKey] = val;
        }
      } else {
        window.tempAttrs[k] = val;
      }
    });
  }

  renderEditorMainUI(item);
};

window.renderEditorMainUI = function (item) {
  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const t =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  const catalog = window.buildEditorFieldCatalog();
  const clearedSet = window.tempClearedKeys || new Set();

  let mandatoryEmpty = [];
  let mandatoryFilled = [];
  let mandatorySku = [];
  let optionalEmpty = [];
  let optionalFilled = [];

  const seenCanonical = new Set();

  const getCleanAttrVal = (key) => {
    let rawVal = window.tempAttrs ? window.tempAttrs[key] : "";
    if (
      rawVal === "undefined" ||
      rawVal === "null" ||
      rawVal === null ||
      rawVal === undefined
    ) {
      rawVal = "";
    }
    return String(rawVal).trim();
  };

  // 1. Все параметры активного шаблона — строго по 1 разу на параметр (канонический ключ = humanName)
  catalog.fields.forEach((entry) => {
    seenCanonical.add(entry.canonicalKey);

    let val = getCleanAttrVal(entry.canonicalKey);
    const lowerSys = entry.sysKey.toLowerCase();

    if (
      val === "" &&
      item &&
      !entry.isSku &&
      !clearedSet.has(entry.canonicalKey) &&
      !clearedSet.has(entry.sysKey)
    ) {
      if (
        lowerSys === "name" ||
        lowerSys === "model" ||
        entry.normLabel === "название товара" ||
        entry.normLabel === "название модели" ||
        entry.normLabel === "наименование"
      ) {
        val = String(item.item_name || item.name || item.title || "").trim();
      }
    }

    if (entry.isSku) {
      val = t.inc_auto_fill || "Заполняется автоматически";
    }

    const isOutOfDict =
      !entry.isSku &&
      entry.isDict &&
      val !== "" &&
      typeof window.matchValueInKaspiDict === "function" &&
      !window.matchValueInKaspiDict(val, entry.dict).matched;

    const fieldObj = {
      canonicalKey: entry.canonicalKey,
      cleanDisplayKey: entry.cleanDisplayKey,
      val: val,
      isSku: entry.isSku,
      isReq: entry.isReq,
      isDict: entry.isDict,
      isOutOfDict: isOutOfDict,
      previewVal: val.length > 30 ? val.substring(0, 30) + "..." : val,
    };

    if (entry.isSku) {
      mandatorySku.push(fieldObj);
    } else if (entry.isReq) {
      if (!val) mandatoryEmpty.push(fieldObj);
      else mandatoryFilled.push(fieldObj);
    } else {
      if (!val) optionalEmpty.push(fieldObj);
      else optionalFilled.push(fieldObj);
    }
  });

  // 2. Возможные дополнительные атрибуты вне шаблона (без дублирования параметров шаблона)
  if (window.tempAttrs) {
    Object.keys(window.tempAttrs).forEach((k) => {
      if (seenCanonical.has(k)) return;
      const val = getCleanAttrVal(k);
      if (!val) return;

      let displayKey = k
        .split("*")
        .pop()
        .replace(/tires/gi, "")
        .replace(/additional/gi, "")
        .replace(/general/gi, "")
        .replace(/\./g, "")
        .trim();
      if (!displayKey) displayKey = k;
      const cleanDisplayKey = displayKey.replace(/\*/g, "").trim();
      const normLabel = window.normalizeParamLabel(cleanDisplayKey);

      if (normLabel === "артикул" || k.toLowerCase().includes("sku")) return;

      const isReq = normLabel === "бренд";
      const dictArr = catalog.resolveDictFor(cleanDisplayKey, k);
      const fieldObj = {
        canonicalKey: k,
        cleanDisplayKey: cleanDisplayKey,
        val: val,
        isSku: false,
        isReq: isReq,
        isDict: Boolean(dictArr && dictArr.length > 0),
        previewVal: val.length > 30 ? val.substring(0, 30) + "..." : val,
      };

      if (isReq) mandatoryFilled.push(fieldObj);
      else optionalFilled.push(fieldObj);
    });
  }

  // 3. Отрисовка строк параметров (через CSS-классы и переменные темы)
  const renderList = (fields) => {
    let html = "";
    fields.forEach((f) => {
      const reqStar = f.isReq
        ? '<span class="editor-req-star">*</span>'
        : "";

      let rightSideHtml = "";
      if (f.isSku) {
        rightSideHtml = `<div class="editor-badge editor-badge--locked" data-i18n="inc_auto_fill">${t.inc_auto_fill || "Заполняется автоматически"}</div>`;
      } else if (f.val) {
        const safePreview = String(f.previewVal)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        rightSideHtml = f.isOutOfDict
          ? `<div class="editor-badge editor-badge--warn">⚠️ ${safePreview}</div>`
          : `<div class="editor-badge editor-badge--filled">✓ ${safePreview}</div>`;
      } else {
        const badgeKey = f.isDict ? "inc_dict_badge" : "inc_input_badge";
        const actionText = f.isDict
          ? t.inc_dict_badge || "Справочник"
          : t.inc_input_badge || "Ввод";
        rightSideHtml = `<div class="editor-badge editor-badge--empty" data-i18n="${badgeKey}">${actionText}</div>`;
      }

      const encodedKey = encodeURIComponent(f.canonicalKey);
      const onclickAttr = f.isSku
        ? ""
        : `onclick="window.openEditorField(decodeURIComponent('${encodedKey}'))"`;
      const rowClass = f.isSku
        ? "editor-param-row editor-param-row--locked"
        : "editor-param-row";
      const arrowIcon = f.isSku
        ? ""
        : '<div class="editor-row-arrow">&#10095;</div>';

      html += `
          <div class="${rowClass}" ${onclickAttr}>
              <div class="editor-param-left">
                  <div class="editor-param-name">
                      <span>${f.cleanDisplayKey}${reqStar}</span>
                  </div>
              </div>
              <div class="editor-param-right">
                  ${rightSideHtml}
                  ${arrowIcon}
              </div>
          </div>`;
    });
    return html;
  };

  // 4. Вариант А: сначала незаполненные красные, затем заполненные зелёные, системный «Артикул» в конце обязательных
  let finalHtml = "";
  const mandatoryAll = mandatoryEmpty.concat(mandatoryFilled, mandatorySku);
  const optionalAll = optionalEmpty.concat(optionalFilled);

  if (mandatoryAll.length > 0) {
    finalHtml +=
      `<div class="editor-section-header editor-section-header--required">
        <span class="editor-section-dot"></span>
        <span data-i18n="inc_mandatory_params">${t.inc_mandatory_params || "Обязательные параметры"}</span>
      </div>` + renderList(mandatoryAll);
  }

  if (optionalAll.length > 0) {
    finalHtml +=
      `<div class="editor-section-header editor-section-header--optional">
        <span class="editor-section-dot"></span>
        <span data-i18n="inc_optional_params">${t.inc_optional_params || "Дополнительные параметры"}</span>
      </div>` + renderList(optionalAll);
  }

  let modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modalContainer";
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
        <div id="editorMainModal" class="kaspi-modal-overlay">
            <div class="kaspi-modal-header">
                <span onclick="event.stopPropagation(); document.getElementById('modalContainer').innerHTML='';" class="editor-action-cancel" data-i18n="inc_cancel">${t.inc_cancel || "ОТМЕНА"}</span>
                <b class="editor-modal-title" data-i18n="inc_item_params">${t.inc_item_params || "Товар и параметры"}</b>
                <span onclick="event.stopPropagation(); window.saveAllEdits();" class="editor-action-save" data-i18n="inc_ready">${t.inc_ready || "ГОТОВО"}</span>
            </div>
            <div class="kaspi-modal-subheader">
                <div class="editor-subheader-name">${(item && (item.item_name || item.name)) || ""}</div>
            </div>
            <div class="editor-modal-body">
                ${finalHtml || `<div class="editor-empty-state" data-i18n="inc_no_params">${t.inc_no_params || "Нет доступных параметров"}</div>`}
            </div>
        </div>
    `;
};

window.saveAllEdits = function () {
  const item = window.parsedInvoiceData[window.currentEditIndex];
  if (!item) {
    const mc = document.getElementById("modalContainer");
    if (mc) mc.innerHTML = "";
    return;
  }

  const catalog = window.buildEditorFieldCatalog();
  const cleanAttrs = {};
  const clearedSet = window.tempClearedKeys || new Set();

  if (window.tempAttrs && typeof window.tempAttrs === "object") {
    Object.keys(window.tempAttrs).forEach((k) => {
      const rawVal = window.tempAttrs[k];
      if (rawVal === undefined || rawVal === null) return;
      const val = String(rawVal).trim();
      if (!val) return;

      const normK = window.normalizeParamLabel(k);
      const entry =
        catalog.byHumanExact[k] ||
        catalog.bySysKey[k] ||
        (normK && catalog.byNormLabel[normK]);

      if (entry) {
        if (entry.isSku) return;
        cleanAttrs[entry.canonicalKey] = val;
      } else {
        if (normK === "артикул" || k.toLowerCase().includes("sku")) return;
        cleanAttrs[k] = val;
      }
    });
  }

  // Сохраняем правки строго для текущего одного товара (без массового перетирания остальных позиций)
  item.attributes =
    Object.keys(cleanAttrs).length > 0 ? JSON.stringify(cleanAttrs) : "";
  item._attributesObj = Object.assign({}, cleanAttrs);
  item._clearedAttrs = Array.from(clearedSet);

  // Синхронизируем плоские поля объекта (важно для ветки выгрузки и silentUpdateAttributesBackend)
  const PROTECTED_ITEM_FIELDS = new Set([
    "doc_no",
    "supplier",
    "item_id",
    "item_name",
    "qty",
    "quantity",
    "cost",
    "price",
    "cbm",
    "weight",
    "raw_logistics",
    "staff_id",
    "id",
    "name",
    "desc",
    "description",
    "barcode",
    "hash",
    "category",
    "sku",
    "merchant_sku",
    "title",
    "attributes",
    "kaspi_attributes",
    "params",
    "export_metadata",
    "sourceRowIndexes",
    "_sourceRowIndexes",
    "_hasCollisions",
    "_collisionsList",
    "_attributesObj",
    "_clearedAttrs",
  ]);

  catalog.fields.forEach((entry) => {
    if (entry.isSku) return;
    const canKey = entry.canonicalKey;
    const sysKey = entry.sysKey;
    const val = cleanAttrs[canKey];

    if (sysKey && sysKey !== canKey && !PROTECTED_ITEM_FIELDS.has(sysKey)) {
      delete item[sysKey];
    }

    if (!PROTECTED_ITEM_FIELDS.has(canKey)) {
      if (val !== undefined && val !== "") {
        if (window.isKaspiExportMode || item[canKey] !== undefined) {
          item[canKey] = val;
        }
      } else if (clearedSet.has(canKey) || (sysKey && clearedSet.has(sysKey))) {
        delete item[canKey];
      }
    }
  });

  // Синхронизируем invoiceGroups в ветке приёмки
  if (
    !window.isKaspiExportMode &&
    window.invoiceGroups &&
    item.doc_no &&
    window.invoiceGroups[item.doc_no] &&
    Array.isArray(window.invoiceGroups[item.doc_no].items)
  ) {
    const grpItems = window.invoiceGroups[item.doc_no].items;
    const grpItem =
      grpItems.find((gi) => gi === item) || grpItems[window.currentEditIndex];
    if (grpItem) {
      grpItem.attributes = item.attributes;
      grpItem._attributesObj = Object.assign({}, cleanAttrs);
      grpItem._clearedAttrs = item._clearedAttrs.slice();
    }
  }

  document.getElementById("modalContainer").innerHTML = "";
  window.renderPreviewTable();
};

// === 2. ПОЛНОЭКРАННОЕ ОКНО ПРАВКИ ОДНОГО ПОЛЯ ===
window.openEditorField = function (canonicalKey, options = {}) {
  const tr = getSheetPreviewTranslator();
  const directSave = Boolean(options && options.directSave);
  window.currentFieldDirectSave = directSave;

  const catalog = window.buildEditorFieldCatalog();
  const normK = window.normalizeParamLabel(canonicalKey);
  const entry =
    catalog.byHumanExact[canonicalKey] ||
    catalog.bySysKey[canonicalKey] ||
    (normK && catalog.byNormLabel[normK]);

  const resolvedKey = entry ? entry.canonicalKey : canonicalKey;
  const sysKey = entry ? entry.sysKey : "";
  const displayKey = entry
    ? entry.cleanDisplayKey
    : window.formatAttrDisplayKey(canonicalKey);

  let val =
    (window.tempAttrs && window.tempAttrs[resolvedKey]) ||
    (sysKey && window.tempAttrs && window.tempAttrs[sysKey]) ||
    "";
  val = String(val || "").trim();

  // Если это Название товара/модели и значение ещё не переопределено вручную — подставляем текущее имя товара
  if (val === "" && window.parsedInvoiceData && window.currentEditIndex !== null) {
    const curItem = window.parsedInvoiceData[window.currentEditIndex];
    const clearedSet = window.tempClearedKeys || new Set();
    const lowerSys = String(sysKey || "").toLowerCase();
    const lowerDisp = window.normalizeParamLabel(displayKey);
    if (
      curItem &&
      !clearedSet.has(resolvedKey) &&
      (lowerSys === "name" ||
        lowerSys === "model" ||
        lowerDisp === "название товара" ||
        lowerDisp === "название модели" ||
        lowerDisp === "наименование")
    ) {
      val = String(curItem.item_name || curItem.name || curItem.title || "").trim();
    }
  }

  // === 1. ПАРСИНГ ЛИМИТОВ ИЗ НАЗВАНИЯ ===
  let minChars = 0;
  let maxChars = 0;

  let minMatch = displayKey.match(/мин[^\d]*(\d[\d\s]*)/i);
  if (minMatch) minChars = parseInt(minMatch[1].replace(/\s/g, ""), 10);

  let maxMatch = displayKey.match(/макс[^\d]*(\d[\d\s]*)/i);
  if (maxMatch) maxChars = parseInt(maxMatch[1].replace(/\s/g, ""), 10);

  let dict =
    (entry && entry.dict) ||
    catalog.resolveDictFor(resolvedKey, sysKey) ||
    (typeof window.resolveKaspiDictForAttr === "function"
      ? window.resolveKaspiDictForAttr(resolvedKey, sysKey)
      : null);

  const isDictField = Boolean(dict && dict.length > 0);
  window.currentFieldIsDict = isDictField;
  window.currentFieldSelectedVal = val;
  window.currentFieldDict = isDictField ? dict : [];

  window.clearSingleField = function (min, max) {
    if (window.currentFieldIsDict) {
      window.currentFieldSelectedVal = "";
      const searchInput = document.getElementById("singleFieldSearchInput");
      if (searchInput) {
        searchInput.value = "";
        window.filterDictList(searchInput);
        searchInput.focus();
      } else {
        window.renderEditorDictList("");
      }
      return;
    }

    const input = document.getElementById("singleFieldInput");
    if (input) {
      input.value = "";
      if (typeof window.updateCharCount === "function") {
        window.updateCharCount(min || 0, max || 0);
      }
      input.focus();
    }
  };

  window.validateAndSaveField = function (key, min, max) {
    if (window.currentFieldIsDict) {
      return window.saveSingleField(key);
    }

    const input = document.getElementById("singleFieldInput");
    if (!input) return window.saveSingleField(key);

    const len = input.value.trim().length;
    if (len > 0) {
      if (min > 0 && len < min) {
        return window.showKaspiNotice(tr("err_min_chars") + min, {
          type: "warning",
        });
      }
      if (max > 0 && len > max) {
        return window.showKaspiNotice(tr("err_max_chars") + max, {
          type: "warning",
        });
      }
    }
    window.saveSingleField(key);
  };

  window.updateCharCount = function (min, max) {
    const el = document.getElementById("singleFieldInput");
    const counter = document.getElementById("charCounterSpan");
    if (!el || !counter) return;

    const len = el.value.trim().length;
    counter.classList.remove(
      "editor-char-counter--error",
      "editor-char-counter--ok",
    );

    if ((min > 0 && len > 0 && len < min) || (max > 0 && len > max)) {
      counter.classList.add("editor-char-counter--error");
    } else if (len > 0) {
      counter.classList.add("editor-char-counter--ok");
    }

    counter.textContent = len + (max > 0 ? " / " + max : "");
  };

  const oldFieldModal = document.getElementById("editorFieldModal");
  if (oldFieldModal) oldFieldModal.remove();

  const fieldModal = document.createElement("div");
  fieldModal.id = "editorFieldModal";
  fieldModal.className = "kaspi-modal-overlay";

  // Header (DOM API / textContent — XSS-safe)
  const headerDiv = document.createElement("div");
  headerDiv.className = "kaspi-modal-header";

  const backSpan = document.createElement("span");
  backSpan.className = "kaspi-dict-back";
  const backArrow = document.createElement("span");
  backArrow.textContent = "❮";
  backSpan.appendChild(backArrow);
  backSpan.addEventListener("click", () => {
    fieldModal.remove();
    if (directSave) {
      const mc = document.getElementById("modalContainer");
      if (mc) mc.textContent = "";
    }
  });

  const titleWrap = document.createElement("div");
  titleWrap.className = "editor-field-header-title";

  const titleB = document.createElement("b");
  titleB.className = "editor-field-title-text";
  titleB.textContent = displayKey;
  titleWrap.appendChild(titleB);

  if (isDictField) {
    const countDiv = document.createElement("div");
    countDiv.id = "editorDictCountInfo";
    countDiv.className = "kaspi-dict-count";
    const countLbl = document.createElement("span");
    countLbl.id = "editorDictCountText";
    countLbl.setAttribute("data-i18n", "dict_total");
    countLbl.textContent = tr("dict_total");
    const countNum = document.createElement("span");
    countNum.id = "editorDictTotalCount";
    countNum.textContent = String(dict.length);
    countDiv.appendChild(countLbl);
    countDiv.appendChild(document.createTextNode(" "));
    countDiv.appendChild(countNum);
    titleWrap.appendChild(countDiv);
  } else if (minChars > 0 || maxChars > 0) {
    const charCounter = document.createElement("div");
    charCounter.id = "charCounterSpan";
    charCounter.className = "editor-char-counter";
    charCounter.textContent = "0";
    titleWrap.appendChild(charCounter);
  }

  const saveSpan = document.createElement("span");
  saveSpan.className = "editor-action-save";
  saveSpan.setAttribute("data-i18n", "inc_save");
  saveSpan.textContent = tr("inc_save");
  saveSpan.addEventListener("click", () => {
    window.validateAndSaveField(resolvedKey, minChars, maxChars);
  });

  headerDiv.appendChild(backSpan);
  headerDiv.appendChild(titleWrap);
  headerDiv.appendChild(saveSpan);
  fieldModal.appendChild(headerDiv);

  // Controls
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "editor-field-controls";

  let searchInput = null;
  if (isDictField) {
    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "singleFieldSearchInput";
    searchInput.className = "kaspi-input-field";
    searchInput.value = val;
    searchInput.setAttribute("data-i18n-placeholder", "inc_search_enter");
    searchInput.placeholder = tr("inc_search_enter");
    searchInput.addEventListener("input", () => {
      window.filterDictList(searchInput);
    });
    controlsDiv.appendChild(searchInput);
  }

  const clearBtn = document.createElement("div");
  clearBtn.className = "kaspi-dict-clear-btn";
  const clearX = document.createElement("span");
  clearX.textContent = "✖";
  const clearLbl = document.createElement("span");
  clearLbl.setAttribute("data-i18n", "inc_clear_selection");
  clearLbl.textContent = tr("inc_clear_selection");
  clearBtn.appendChild(clearX);
  clearBtn.appendChild(document.createTextNode(" "));
  clearBtn.appendChild(clearLbl);
  clearBtn.addEventListener("click", () => {
    window.clearSingleField(minChars, maxChars);
  });
  controlsDiv.appendChild(clearBtn);
  fieldModal.appendChild(controlsDiv);

  if (isDictField) {
    // Зона произвольного значения (позволяет ввести любой текст, даже если его нет в values)
    const customWrap = document.createElement("div");
    customWrap.id = "editorCustomValWrap";
    customWrap.className = "editor-custom-val-wrap";
    customWrap.style.display = "none";
    fieldModal.appendChild(customWrap);

    const listWrap = document.createElement("div");
    listWrap.className = "editor-field-list-wrap";
    const ul = document.createElement("ul");
    ul.id = "dictList";
    ul.className = "editor-field-list";
    listWrap.appendChild(ul);
    fieldModal.appendChild(listWrap);

    let mc = document.getElementById("modalContainer");
    if (!mc) {
      mc = document.createElement("div");
      mc.id = "modalContainer";
      document.body.appendChild(mc);
    }
    mc.appendChild(fieldModal);

    if (searchInput) {
      const selectIfMatchesCurrent = () => {
        const curSel = String(window.currentFieldSelectedVal || "").trim();
        if (curSel && searchInput.value.trim() === curSel) {
          searchInput.select();
        }
      };
      searchInput.addEventListener("focus", selectIfMatchesCurrent);
      searchInput.addEventListener("click", () => {
        if (searchInput.selectionStart === searchInput.selectionEnd) {
          selectIfMatchesCurrent();
        }
      });
    }

    ul.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-dict-idx]");
      if (!li) return;
      const idx = parseInt(li.getAttribute("data-dict-idx"), 10);
      const dictArr = window.currentFieldDict || [];
      if (!isNaN(idx) && idx >= 0 && idx < dictArr.length) {
        window.selectPreviewDictValue(String(dictArr[idx]));
      }
    });

    ul.addEventListener(
      "touchstart",
      () => {
        if (searchInput) searchInput.blur();
      },
      { passive: true },
    );

    window.renderEditorDictList("");
    window.updateEditorCustomValueBox(val);

    setTimeout(() => {
      const activeLi = document.querySelector("#dictList .kaspi-dict-item.is-selected");
      if (activeLi && typeof activeLi.scrollIntoView === "function") {
        activeLi.scrollIntoView({ block: "nearest" });
      }
    }, 20);
  } else {
    const taWrap = document.createElement("div");
    taWrap.className = "editor-field-textarea-wrap";
    const ta = document.createElement("textarea");
    ta.id = "singleFieldInput";
    ta.className = "kaspi-input-field editor-field-textarea";
    ta.setAttribute("data-i18n-placeholder", "inc_enter_text");
    ta.placeholder = tr("inc_enter_text");
    ta.value = val;
    if (minChars > 0 || maxChars > 0) {
      ta.addEventListener("input", () => {
        window.updateCharCount(minChars, maxChars);
      });
    }
    taWrap.appendChild(ta);
    fieldModal.appendChild(taWrap);

    let mc = document.getElementById("modalContainer");
    if (!mc) {
      mc = document.createElement("div");
      mc.id = "modalContainer";
      document.body.appendChild(mc);
    }
    mc.appendChild(fieldModal);

    if (minChars > 0 || maxChars > 0) {
      setTimeout(() => {
        if (window.updateCharCount) window.updateCharCount(minChars, maxChars);
      }, 10);
    }
  }
};

window.updateEditorCustomValueBox = function (typedStr) {
  const wrap = document.getElementById("editorCustomValWrap");
  if (!wrap) return;

  const tr = getSheetPreviewTranslator();
  const cleanTyped = String(typedStr || "").trim();
  const dict = window.currentFieldDict || [];

  wrap.textContent = "";
  if (!cleanTyped) {
    wrap.style.display = "none";
    return;
  }

  const matchCheck =
    typeof window.matchValueInKaspiDict === "function"
      ? window.matchValueInKaspiDict(cleanTyped, dict)
      : { matched: dict.some((d) => String(d).trim().toLowerCase() === cleanTyped.toLowerCase()) };

  if (matchCheck.matched) {
    wrap.style.display = "none";
    return;
  }

  wrap.style.display = "flex";
  const isAlreadySelected =
    String(window.currentFieldSelectedVal || "").trim() === cleanTyped;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = isAlreadySelected
    ? "editor-custom-val-btn is-selected"
    : "editor-custom-val-btn";
  btn.textContent = `✍️ ${tr("dict_use_custom_value", { val: cleanTyped })}`;
  btn.addEventListener("click", () => {
    window.currentFieldSelectedVal = cleanTyped;
    const searchInput = document.getElementById("singleFieldSearchInput");
    if (searchInput) searchInput.value = cleanTyped;
    window.updateEditorCustomValueBox(cleanTyped);
    window.renderEditorDictList("");
  });

  const warnNote = document.createElement("div");
  warnNote.className = "editor-custom-val-warn";
  warnNote.textContent = tr("dict_custom_value_warn");

  wrap.appendChild(btn);
  wrap.appendChild(warnNote);
};

// === ЕДИНЫЙ РЕНДЕР И УМНЫЙ ПОИСК СПРАВОЧНИКА В «ТОВАР И ПАРАМЕТРЫ» (XSS-safe) ===
window.renderEditorDictList = function (queryStr) {
  const ul = document.getElementById("dictList");
  if (!ul) return;

  const filter = String(queryStr || "").toLowerCase().trim();
  const dict = window.currentFieldDict || [];
  const selectedVal = String(window.currentFieldSelectedVal || "").trim();
  const tr = getSheetPreviewTranslator();

  const updateEditorDictCounter = (count) => {
    const countText = document.getElementById("editorDictCountText");
    const totalCount = document.getElementById("editorDictTotalCount");
    if (countText && totalCount) {
      const countKey = filter === "" ? "dict_total" : "dict_found";
      countText.setAttribute("data-i18n", countKey);
      countText.textContent = filter === "" ? tr("dict_total") : tr("dict_found");
      totalCount.textContent = String(count);
    }
  };

  const buildItemNode = (idx, rawStr, matchQuery) => {
    const isSelected = selectedVal !== "" && rawStr === selectedVal;
    const li = document.createElement("li");
    li.setAttribute("data-dict-idx", String(idx));
    li.className = isSelected ? "kaspi-dict-item is-selected" : "kaspi-dict-item";

    const labelSpan = document.createElement("span");
    if (matchQuery) {
      const lowerRaw = rawStr.toLowerCase();
      let pos = 0;
      let hit = lowerRaw.indexOf(matchQuery, pos);
      while (hit !== -1) {
        if (hit > pos) {
          labelSpan.appendChild(document.createTextNode(rawStr.slice(pos, hit)));
        }
        const b = document.createElement("b");
        b.className = "editor-dict-match";
        b.textContent = rawStr.slice(hit, hit + matchQuery.length);
        labelSpan.appendChild(b);
        pos = hit + matchQuery.length;
        hit = lowerRaw.indexOf(matchQuery, pos);
      }
      if (pos < rawStr.length) {
        labelSpan.appendChild(document.createTextNode(rawStr.slice(pos)));
      }
    } else {
      labelSpan.textContent = rawStr;
    }

    li.appendChild(labelSpan);

    if (isSelected) {
      const chk = document.createElement("span");
      chk.className = "kaspi-dict-check";
      chk.textContent = "✔";
      li.appendChild(chk);
    }
    return li;
  };

  ul.textContent = "";
  const frag = document.createDocumentFragment();

  if (!filter) {
    updateEditorDictCounter(dict.length);
    dict.forEach((d, idx) => {
      frag.appendChild(buildItemNode(idx, String(d), ""));
    });
    ul.appendChild(frag);
    return;
  }

  let startsWith = [];
  let wordStart = [];
  let includes = [];
  const safeFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wordStartRegex = new RegExp(`(^|[\\s\\/\\-\\_])` + safeFilter);

  dict.forEach((d, idx) => {
    const strD = String(d);
    const lowerD = strD.toLowerCase();
    if (lowerD.startsWith(filter)) {
      startsWith.push({ idx, strD });
    } else if (wordStartRegex.test(lowerD)) {
      wordStart.push({ idx, strD });
    } else if (lowerD.includes(filter)) {
      includes.push({ idx, strD });
    }
  });

  const combined = [...startsWith, ...wordStart, ...includes];
  updateEditorDictCounter(combined.length);

  if (combined.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "kaspi-dict-empty";
    emptyDiv.setAttribute("data-i18n", "dict_not_found");
    emptyDiv.textContent = tr("dict_not_found");
    ul.appendChild(emptyDiv);
    return;
  }

  combined.forEach((item) => {
    frag.appendChild(buildItemNode(item.idx, item.strD, filter));
  });
  ul.appendChild(frag);
};

window.filterDictList = function (input) {
  const val = input ? input.value : "";
  window.renderEditorDictList(val);
  window.updateEditorCustomValueBox(val);
};

window.selectPreviewDictValue = function (val) {
  const cleanVal = String(val || "").trim();
  window.currentFieldSelectedVal = cleanVal;
  const searchInput = document.getElementById("singleFieldSearchInput");
  if (searchInput) {
    searchInput.value = cleanVal;
  }
  window.updateEditorCustomValueBox(cleanVal);
  // Не фильтруем список при выборе пункта — весь список остаётся доступен для смены выбора
  window.renderEditorDictList("");
};

window.saveSingleField = function (canonicalKey) {
  let newVal = "";
  if (window.currentFieldIsDict) {
    const searchInput = document.getElementById("singleFieldSearchInput");
    const typedVal = searchInput ? searchInput.value.trim() : "";
    const selectedVal = String(window.currentFieldSelectedVal || "").trim();
    const rawCandidate = typedVal !== "" ? typedVal : selectedVal;

    if (rawCandidate !== "") {
      const dict = window.currentFieldDict || [];
      const matchRes =
        typeof window.matchValueInKaspiDict === "function"
          ? window.matchValueInKaspiDict(rawCandidate, dict)
          : { matched: false, value: rawCandidate };
      // Если введённое значение канонично совпадает со справочником — берём каноничную строку из values,
      // иначе сохраняем ровно введённый пользователем произвольный текст
      newVal = matchRes.matched ? matchRes.value : rawCandidate;
    } else {
      newVal = "";
    }
  } else {
    const input = document.getElementById("singleFieldInput");
    newVal = input ? input.value.trim() : "";
  }

  const catalog = window.buildEditorFieldCatalog();
  const normK = window.normalizeParamLabel(canonicalKey);
  const entry =
    catalog.byHumanExact[canonicalKey] ||
    catalog.bySysKey[canonicalKey] ||
    (normK && catalog.byNormLabel[normK]);

  const resolvedKey = entry ? entry.canonicalKey : canonicalKey;
  const sysKey = entry ? entry.sysKey : "";

  if (!window.tempAttrs) window.tempAttrs = {};
  if (!window.tempClearedKeys) window.tempClearedKeys = new Set();

  // Удаляем возможный устаревший технический ключ-дубль
  if (sysKey && sysKey !== resolvedKey) {
    delete window.tempAttrs[sysKey];
  }

  if (newVal !== "") {
    window.tempAttrs[resolvedKey] = newVal;
    window.tempClearedKeys.delete(resolvedKey);
    if (sysKey) window.tempClearedKeys.delete(sysKey);
  } else {
    delete window.tempAttrs[resolvedKey];
    window.tempClearedKeys.add(resolvedKey);
    if (sysKey) window.tempClearedKeys.add(sysKey);
  }

  const isDirectSave = Boolean(window.currentFieldDirectSave);
  window.currentFieldDirectSave = false;

  const fieldModal = document.getElementById("editorFieldModal");
  if (fieldModal) fieldModal.remove();

  if (isDirectSave) {
    window.saveAllEdits();
  } else {
    window.renderEditorMainUI(window.parsedInvoiceData[window.currentEditIndex]);
  }
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
window.buildKaspiExportMetadata = function () {
  let complexParams = Object.assign({}, window.kaspiComplexParamsState || {});

  const rawDictSource =
    (window.mapper2State && window.mapper2State.dictValues) ||
    complexParams.dictValues ||
    {};
  const cleanDictValues = {};
  Object.keys(rawDictSource).forEach((k) => {
    const v = rawDictSource[k];
    // В export_metadata пишем только реальные строковые константы/справочники Маппера-2 (без массивов Synonyms)
    if (typeof v === "string" && v.trim() !== "") {
      cleanDictValues[k] = v.trim();
    }
  });

  if (window.mapper2State) {
    complexParams.splitRules =
      window.mapper2State.splitRules || complexParams.splitRules || {};
  }
  complexParams.dictValues = cleanDictValues;

  let finalMapping = {};
  if (window.mapper2State && window.mapper2State.colMap) {
    for (let key in window.mapper2State.colMap) {
      let val = window.mapper2State.colMap[key];
      if (
        window.isKaspiExportMode &&
        val !== "" &&
        val !== null &&
        !isNaN(val)
      ) {
        finalMapping[key] = key;
      } else {
        finalMapping[key] = val;
      }
    }
  }

  return JSON.stringify({
    raw_headers:
      (window.mapper2State && window.mapper2State.invoiceHeaders) ||
      window.rawExcelHeaders ||
      [],
    saved_mapping: finalMapping,
    saved_complex_params: complexParams,
  });
};

async function sendInvoiceToBackend() {
  // Жесткая защита: в ветке выгрузки из базы повторное оприходование запрещено
  if (window.isKaspiExportMode === true) {
    console.warn("sendInvoiceToBackend заблокирован в режиме выгрузки Kaspi");
    return;
  }

  const trSend = getSheetPreviewTranslator();
  if (!window.parsedInvoiceData || window.parsedInvoiceData.length === 0)
    return window.showKaspiNotice(trSend("inc_empty_cart"), { type: "warning" });

  const docKeys = Object.keys(window.invoiceGroups);
  const docInput = document.getElementById("ui-doc-no");

  if (docKeys.length === 1 && docInput) {
    const finalDocNo = docInput.value.trim();
    if (!finalDocNo)
      return window.showKaspiNotice(trSend("inc_doc_empty"), { type: "warning" });
    if (finalDocNo !== docKeys[0]) {
      window.invoiceGroups[finalDocNo] = window.invoiceGroups[docKeys[0]];
      delete window.invoiceGroups[docKeys[0]];
      window.invoiceGroups[finalDocNo].items.forEach(
        (i) => (i.doc_no = finalDocNo),
      );
    }
  }

  // ⚡ ПОЛУЧАЕМ ТЕКСТ И ХЭШ ШАБЛОНА ТОЛЬКО ДЛЯ РЕЖИМА «БАЗА + МАРКЕТ»
  const isKaspiIncome = window.currentImportMode === "kaspi";
  let selectedCategory = "";
  let selectedHash = "";
  let marketStatusToSend = "";
  let autoGeneratedMapper = {};

  if (isKaspiIncome) {
    const templateDropdown = document.getElementById("kaspiTemplateSelect");
    if (templateDropdown && templateDropdown.selectedIndex !== -1) {
      const opt = templateDropdown.options[templateDropdown.selectedIndex];
      if (opt && opt.value && opt.value !== "new" && opt.value !== "new_template") {
        selectedCategory = opt.getAttribute("data-name") || opt.text.trim();
        selectedHash =
          opt.getAttribute("data-hash") || opt.getAttribute("value") || "";
      }
    }
    if (!selectedHash && window.currentTemplateData && window.currentTemplateData.templateHash) {
      selectedHash = window.currentTemplateData.templateHash;
    }
    marketStatusToSend = selectedHash ? "pending" : "";

    if (selectedCategory && window.parsedInvoiceData.length > 0) {
      try {
        const sampleItem = window.parsedInvoiceData[0];
        let itemAttrs = {};
        if (sampleItem.attributes) {
          itemAttrs = JSON.parse(sampleItem.attributes);
        }
        Object.keys(itemAttrs).forEach((key) => {
          autoGeneratedMapper[key] = "json_" + key;
        });
      } catch (e) {
        console.error("Ошибка при сборке маппера:", e);
      }
    }
  }

  // Работаем строго с кнопкой проведения прихода (sendInvoiceBtn)
  const btn = document.getElementById("sendInvoiceBtn");
  const statusContainer = document.getElementById("status-container");
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");
  const statusPercent = document.getElementById("status-percent");

  if (btn) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
  }
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
      let uniqueFileId =
        window.mapper2State && window.mapper2State.fileHash
          ? window.mapper2State.fileHash
          : String(docNo).replace(/\s/g, "_");
      let fp =
        "FP_" +
        uniqueFileId +
        "_" +
        group.items.length +
        "шт_" +
        group.items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0) +
        "кол";
      group.items.forEach((item) => (item.file_code = fp));

      // ⚡ СОБИРАЕМ ИСТОРИЮ ЭКСПОРТА И КОЛОНОК ДЛЯ БАЗЫ (ТОЛЬКО В РЕЖИМЕ «БАЗА + МАРКЕТ»)
      const exportMetadataJSON =
        isKaspiIncome && typeof window.buildKaspiExportMetadata === "function"
          ? window.buildKaspiExportMetadata()
          : "";
      const currencyEl = document.getElementById("invoiceCurrency");
      const finalCurrency = currencyEl ? currencyEl.value : "KZT";

      const response = await fetch(GATEWAY_URL, {
        method: "POST",
        body: JSON.stringify({
          master_url: APPS_SCRIPT_URL,
          api_key: CLIENT_API_KEY,
          session_token: typeof window.getSessionToken === "function" ? window.getSessionToken() : (localStorage.getItem("session_token") || ""),
          action: "income",
          data: group.items,
          files: group.originalFiles,
          docNo: docNo,
          currency: finalCurrency,
          fingerprint: fp,
          logistics_block: group.logistics_block || "",
          market_category: selectedCategory, // Имя категории (только для «База + Маркет»)
          template_hash: selectedHash, // Хэш шаблона (только для «База + Маркет»)
          market_status: marketStatusToSend, // "pending" для «База + Маркет», "" для «Только База»
          kaspi_mapper: autoGeneratedMapper,
          export_metadata: exportMetadataJSON, // Данные колонок и сплиттеров для базы
        }),
      });

      const res = await response.json();
      clearInterval(fakeProgress);

      if (res && res.error === "AUTH_EXPIRED") {
        if (typeof window.handleAuthExpired === "function") window.handleAuthExpired(res.message);
        throw new Error(res.message || "Сессия истекла");
      }
      if (res && res.error === "BUFFER_QUOTA_EXCEEDED") {
        const quotaMsg =
          (translations[currentLang] && translations[currentLang].buffer_quota_exceeded) ||
          res.message ||
          res.error;
        throw new Error(quotaMsg);
      }
      if (!res.success) {
        throw new Error(res.message || res.error);
      }
      if (res.sync_warning && typeof window.maybeShowPullSyncWarning === "function") {
        window.maybeShowPullSyncWarning(res.sync_warning);
      }
    } catch (err) {
      clearInterval(fakeProgress);
      statusText.innerText = translations[currentLang].inc_server_err;
      statusText.style.color = "var(--accent-red)";

      let errorMsg = err.message;
      let dupMatch = errorMsg.match(/Накладная с номером (.*?) уже была/i);
      if (dupMatch && dupMatch[1]) {
        errorMsg = translations[currentLang].server_dup.replace(
          "{0}",
          dupMatch[1].trim(),
        );
      } else if (errorMsg.includes("База не привязана")) {
        errorMsg = translations[currentLang].server_no_db;
      } else if (errorMsg.includes("с точно таким же составом")) {
        errorMsg = translations[currentLang].server_dup_fp;
      }

      await window.showKaspiNotice(trSend("inc_send_err") + errorMsg, {
        type: "error",
      });
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
      }
      return;
    }
  }

  statusBar.style.width = "100%";
  statusPercent.innerText = "100%";
  statusText.innerText = translations[currentLang].inc_status_done;
  statusText.style.color = "var(--accent-green)";

  setTimeout(async () => {
    await window.showKaspiNotice(trSend("inc_all_done"), { type: "success" });

    // ⚡ ФИКС: Жестко прячем блок сопоставления и экраны превью
    const idsToHide = [
      "exportMapperArea",
      "mapper2Area",
      "invoicePreviewArea",
    ];

    idsToHide.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    window.parsedInvoiceData = [];
    window.invoiceGroups = {};

    const fileInput = document.getElementById("invoiceFileInput");
    if (fileInput) {
      fileInput.value = "";
      if (typeof updateFileNameCompactUI === "function")
        updateFileNameCompactUI(fileInput);
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

  if (btn) {
    btn.disabled = false;
    btn.style.opacity = "1";
  }
}

// === АВТОМАТИЧЕСКИЙ ПОДБОР ЗНАЧЕНИЙ ИЗ СЛОВАРЯ ===
window.autoCleanInvoiceAttributes = function () {
  if (!window.parsedInvoiceData || !window.kaspiDicts) return;

  window.parsedInvoiceData.forEach((item) => {
    if (!item.attributes) return;

    try {
      let attrs =
        typeof item.attributes === "string"
          ? JSON.parse(item.attributes)
          : Object.assign({}, item.attributes);
      let changed = false;

      for (let key in attrs) {
        let rawValue = attrs[key];
        if (!rawValue) continue;

        let displayKey =
          typeof window.formatAttrDisplayKey === "function"
            ? window.formatAttrDisplayKey(key)
            : key;
        let dict =
          typeof window.resolveKaspiDictForAttr === "function"
            ? window.resolveKaspiDictForAttr(displayKey, key)
            : null;

        if (dict && Array.isArray(dict) && typeof window.matchValueInKaspiDict === "function") {
          const res = window.matchValueInKaspiDict(rawValue, dict);
          if (res.matched && res.value && res.value !== rawValue) {
            attrs[key] = res.value;
            changed = true;
          }
        }
      }

      if (changed) {
        item.attributes = JSON.stringify(attrs);
        item._attributesObj = attrs;
      }
    } catch (e) {
      console.error("Ошибка авто-очистки атрибутов:", e);
    }
  });
};

// 1. Открытие модалки экспорта и загрузка списка категорий
window.openExportModal = async function () {
  // 🔥 ЖЕСТКИЙ СБРОС СТЕЙТА: Включаем режим ЭКСПОРТА KASPI 🔥
  window.isKaspiExportMode = true;
  window.parsedInvoiceData = []; // Очищаем память от данных обычной приемки
  window.kaspiExportItems = [];

  window.mapper2State = window.mapper2State || {};
  window.mapper2State.colMap = {}; // Очищаем старый маппинг колонок
  window.mapper2State.clearedKeys = {};
  window.mapper2State.smartRulesApplied = false;
  window.mapper2State.memorySplitsLoaded = false;
  window.mapper2State.appliedTemplateHash = null;

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
        session_token: typeof window.getSessionToken === "function" ? window.getSessionToken() : (localStorage.getItem("session_token") || ""),
      }),
    });
    const res = await response.json();
    if (res && res.error === "AUTH_EXPIRED") {
      if (typeof window.handleAuthExpired === "function") window.handleAuthExpired(res.message);
      return;
    }

    if (res?.success && res?.pendingGroups?.length > 0) {
      // Генерируем красивые плашки
      container.innerHTML = res.pendingGroups
        .map((g) => {
          // Статус плашки зависит СТРОГО от g.isExported (pending-партии всегда открываются как pending)
          const isExported = g.isExported === true;

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

// Вспомогательная строгая дедупликация очереди выгрузки Kaspi по непустому barcode
// Отдает предпочтение наиболее полной и свежей записи по атрибутам, объединяя sourceRowIndexes всех дублей.
window.deduplicateKaspiExportItems = function (items, fallbackRowIndexes = []) {
  const safeItems = Array.isArray(items) ? items : [];
  const safeFallbackRows = Array.isArray(fallbackRowIndexes)
    ? fallbackRowIndexes
    : [];

  const parseAttrs = (item) => {
    let base = {};
    try {
      const raw =
        item.attributes || item.kaspi_attributes || item.params || "{}";
      const parsed = typeof raw === "string" ? JSON.parse(raw || "{}") : raw;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        base = Object.assign({}, parsed);
      }
    } catch (e) {}
    if (
      item._attributesObj &&
      typeof item._attributesObj === "object" &&
      !Array.isArray(item._attributesObj)
    ) {
      Object.keys(item._attributesObj).forEach((k) => {
        const v = item._attributesObj[k];
        if (v !== null && v !== undefined && String(v).trim() !== "") {
          base[k] = v;
        }
      });
    }
    return base;
  };

  const countNonEmpty = (obj) => {
    let cnt = 0;
    Object.keys(obj || {}).forEach((k) => {
      const v = obj[k];
      if (v !== null && v !== undefined && String(v).trim() !== "") cnt++;
    });
    return cnt;
  };

  const mergeAttrs = (baseObj, priorityObj) => {
    const out = {};
    Object.keys(baseObj || {}).forEach((k) => {
      const v = baseObj[k];
      if (v !== null && v !== undefined && String(v).trim() !== "") out[k] = v;
    });
    Object.keys(priorityObj || {}).forEach((k) => {
      const v = priorityObj[k];
      if (v !== null && v !== undefined && String(v).trim() !== "") out[k] = v;
    });
    return out;
  };

  const extractRowIndexes = (item, idx) => {
    const set = new Set();
    const sources = []
      .concat(
        Array.isArray(item.sourceRowIndexes) ? item.sourceRowIndexes : [],
        Array.isArray(item._sourceRowIndexes) ? item._sourceRowIndexes : [],
      );
    if (sources.length === 0 && safeFallbackRows[idx] !== undefined) {
      sources.push(safeFallbackRows[idx]);
    }
    sources.forEach((r) => {
      const n = parseInt(r, 10);
      if (!isNaN(n) && n >= 3) set.add(n);
    });
    return Array.from(set);
  };

  const result = [];
  const byBarcode = {};
  const allRowsSet = new Set();
  let mergedCount = 0;

  safeItems.forEach((rawItem, idx) => {
    if (!rawItem || typeof rawItem !== "object") return;

    const item = Object.assign({}, rawItem);
    const bc = String(item.barcode || item.ean || "").trim();
    const upperBc = bc.toUpperCase();
    const cleanBc =
      bc && upperBc !== "AUTO" && upperBc !== "UNKNOWN" ? bc : "";
    item.barcode = cleanBc;

    const rowIdxList = extractRowIndexes(item, idx);
    item.sourceRowIndexes = rowIdxList.slice();
    rowIdxList.forEach((r) => allRowsSet.add(r));

    const attrs = parseAttrs(item);
    const attrCount = countNonEmpty(attrs);

    // Строки с пустым barcode не склеиваем между собой
    if (!cleanBc) {
      result.push(item);
      return;
    }

    if (!byBarcode[cleanBc]) {
      byBarcode[cleanBc] = {
        item: item,
        attrs: attrs,
        attrCount: attrCount,
      };
      result.push(item);
      return;
    }

    mergedCount++;
    const existingRef = byBarcode[cleanBc];
    const existingItem = existingRef.item;

    // Объединяем все исходные номера строк Incomes (включая дубли)
    const combinedRows = new Set(existingItem.sourceRowIndexes || []);
    rowIdxList.forEach((r) => combinedRows.add(r));
    existingItem.sourceRowIndexes = Array.from(combinedRows).sort(
      (a, b) => a - b,
    );

    // Более поздняя запись свежее; при >= числе непустых атрибутов она имеет приоритет
    const incomingWins = attrCount >= existingRef.attrCount;
    const mergedAttrObj = incomingWins
      ? mergeAttrs(existingRef.attrs, attrs)
      : mergeAttrs(attrs, existingRef.attrs);

    existingRef.attrs = mergedAttrObj;
    existingRef.attrCount = countNonEmpty(mergedAttrObj);
    existingItem.attributes = JSON.stringify(mergedAttrObj);
    if (existingItem._attributesObj || item._attributesObj) {
      existingItem._attributesObj = Object.assign({}, mergedAttrObj);
    }

    // Синхронизируем распакованные плоские поля-атрибуты на объекте, если они есть
    Object.keys(mergedAttrObj).forEach((k) => {
      if (
        incomingWins ||
        existingItem[k] === undefined ||
        existingItem[k] === "" ||
        existingItem[k] === null
      ) {
        if (
          ![
            "barcode",
            "sourceRowIndexes",
            "_sourceRowIndexes",
            "attributes",
            "_attributesObj",
          ].includes(k)
        ) {
          existingItem[k] = mergedAttrObj[k];
        }
      }
    });

    const incPrice = Number(item.price || item.cost || 0);
    const curPrice = Number(existingItem.price || existingItem.cost || 0);

    if (incomingWins) {
      if (item.doc_no) existingItem.doc_no = item.doc_no;
      if (item.item_id) existingItem.item_id = item.item_id;
      if (item.id) existingItem.id = item.id;
      if (item.hash) existingItem.hash = item.hash;
      if (item.name) existingItem.name = item.name;
      if (item.item_name) existingItem.item_name = item.item_name;
      if (incPrice > 0) {
        if (item.price !== undefined) existingItem.price = item.price;
        if (item.cost !== undefined) existingItem.cost = item.cost;
      }
      if (item.export_metadata) {
        existingItem.export_metadata = item.export_metadata;
      }
    } else {
      if (!existingItem.doc_no && item.doc_no) existingItem.doc_no = item.doc_no;
      if (!existingItem.hash && item.hash) existingItem.hash = item.hash;
      if (!existingItem.name && item.name) existingItem.name = item.name;
      if (!existingItem.item_name && item.item_name) {
        existingItem.item_name = item.item_name;
      }
      if (!(curPrice > 0) && incPrice > 0) {
        if (item.price !== undefined) existingItem.price = item.price;
        if (item.cost !== undefined) existingItem.cost = item.cost;
      }
      if (!existingItem.export_metadata && item.export_metadata) {
        existingItem.export_metadata = item.export_metadata;
      }
    }
  });

  return {
    items: result,
    mergedCount: mergedCount,
    allRowIndexes: Array.from(allRowsSet).sort((a, b) => a - b),
  };
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
      session_token: typeof window.getSessionToken === "function" ? window.getSessionToken() : (localStorage.getItem("session_token") || ""),
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
    if (res && res.error === "AUTH_EXPIRED") {
      if (typeof window.handleAuthExpired === "function") window.handleAuthExpired(res.message);
      return;
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

      // 2. === НАШ ЦИКЛ ЭКСПОРТА (С ЗАЩИТНОЙ ДЕДУПЛИКАЦИЕЙ ПО BARCODE) ===
      const dedupedExport = window.deduplicateKaspiExportItems(
        res.items,
        res.rowIndexes,
      );
      window.kaspiExportItems = dedupedExport.items;
      window.kaspiExportConfig = res.templateConfig;
      window.currentTemplateData = res.templateConfig;
      window.kaspiExportRowIndexes =
        dedupedExport.allRowIndexes.length > 0
          ? dedupedExport.allRowIndexes
          : Array.isArray(res.rowIndexes)
            ? res.rowIndexes
            : [];
      window.kaspiTargetSheetName = res.templateConfig.targetSheetName || null;

      // Включаем флаг экспорта (отключит оприходование)
      window.isKaspiExportMode = true;

      const exportModal = document.getElementById("export-modal");
      if (exportModal) exportModal.style.display = "none";

      function showParents(elementId) {
        const FLEX_IDS = new Set([
          "income-modal",
          "incomeModalCard",
          "tab-import",
          "mapper2Area",
          "invoicePreviewArea",
        ]);
        const tabNew = document.getElementById("tab-new-product");
        if (tabNew) tabNew.style.display = "none";

        let el = document.getElementById(elementId);
        while (el && el.tagName !== "BODY") {
          const isFlexTarget =
            FLEX_IDS.has(el.id) ||
            el.classList.contains("income-modal-card") ||
            el.classList.contains("income-modal-overlay");
          if (
            window.getComputedStyle(el).display === "none" ||
            el.style.display === "none" ||
            (isFlexTarget && el.style.display !== "flex")
          ) {
            el.style.display = isFlexTarget ? "flex" : "block";
          }
          el = el.parentElement;
        }
      }

      // === ВИРТУАЛЬНАЯ РАСПАКОВКА ===
      window.parsedInvoiceData = window.kaspiExportItems.map((dbItem) => {
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
          barcode: String(dbItem.barcode || dbItem.ean || "").trim(),
          sourceRowIndexes: Array.isArray(dbItem.sourceRowIndexes)
            ? dbItem.sourceRowIndexes.slice()
            : [],
        });

        for (const [key, value] of Object.entries(attrs)) {
          if (flatItem[key] === undefined) {
            flatItem[key] = value;
          }
        }

        flatItem.attributes = JSON.stringify(attrs);
        return flatItem;
      });

      // Удаляем системную колонку attributes и служебные поля для Маппера
      const EXCLUDED_EXPORT_HEADERS = new Set([
        "attributes",
        "kaspi_attributes",
        "params",
        "sourcerowindexes",
        "_sourcerowindexes",
        "doc_no",
        "export_metadata",
        "hash",
        "item_hash",
        "supplier",
        "raw_logistics",
        "staff_id",
        "category",
        "title",
        "file_code",
      ]);
      const allHeaders = new Set();
      window.parsedInvoiceData.forEach((item) => {
        Object.keys(item).forEach((k) => {
          if (!EXCLUDED_EXPORT_HEADERS.has(String(k || "").trim().toLowerCase())) {
            allHeaders.add(k);
          }
        });
      });
      const extractedHeaders = Array.from(allHeaders);

      // ПАРСИМ СОХРАНЕННЫЕ МЕТАДАННЫЕ ИЗ БАЗЫ (ТВОЯ ПАМЯТЬ КНОПОК)
      let savedMeta = {};
      const itemWithMeta = window.kaspiExportItems.find(
        (it) => it && it.export_metadata,
      );
      if (itemWithMeta && itemWithMeta.export_metadata) {
        try {
          savedMeta = JSON.parse(itemWithMeta.export_metadata);
        } catch (e) {
          console.error("Ошибка парсинга export_metadata", e);
        }
      }

      window.mapper2State = Object.assign(
        {
          colMap: {},
          dictValues: {},
          splitRules: {},
          clearedKeys: {},
          smartRulesApplied: false,
          memorySplitsLoaded: false,
          appliedTemplateHash: null,
          invoiceHeaders: extractedHeaders,
          invoiceRows: window.parsedInvoiceData.map((item) =>
            extractedHeaders.map((h) => item[h]),
          ),
        },
        res.templateConfig || {},
      );

      // ЖЕСТКО ВОССТАНАВЛИВАЕМ СПЛИТТЕРЫ И СЛОВАРИ ПОВЕРХ ШАБЛОНА
      if (savedMeta.saved_complex_params) {
        if (savedMeta.saved_complex_params.splitRules) {
          window.mapper2State.splitRules =
            savedMeta.saved_complex_params.splitRules;
        }
        if (savedMeta.saved_complex_params.dictValues) {
          window.mapper2State.dictValues =
            savedMeta.saved_complex_params.dictValues;
        }
      }
      if (savedMeta.saved_mapping) {
        window.mapper2State.colMap = Object.assign(
          {},
          savedMeta.saved_mapping,
          window.mapper2State.colMap,
        );
      }

      window.kaspiComplexParamsState = {
        splitRules: window.mapper2State.splitRules || {},
        dictValues: window.mapper2State.dictValues || {},
      };

      // === ВОССТАНОВЛЕНИЕ ЗАГОЛОВКОВ И ПЕРЕВОДА НА РУССКИЙ ===
      window.mapper2State.supplier = "Kaspi (Экспорт)";
      let origDoc = "Партия";
      if (res.items && res.items.length > 0) {
        // Ищем оригинальный номер накладной, под которым товар был оприходован
        origDoc =
          res.items[0].doc_no ||
          res.items[0].invoice_no ||
          res.items[0].document_id ||
          res.templateConfig.templateName ||
          "Партия";
      }
      window.mapper2State.docNo = origDoc;

      if (res.templateConfig && res.templateConfig.systemKeys) {
        window.mapper2State.sysToHumanMap = {};
        for (let i = 0; i < res.templateConfig.systemKeys.length; i++) {
          const sKey = res.templateConfig.systemKeys[i];
          const hName = res.templateConfig.humanNames[i];
          if (sKey && hName) window.mapper2State.sysToHumanMap[sKey] = hName;
        }
        window.GLOBAL_KASPI_DICT = window.mapper2State.sysToHumanMap;
      }
      // =========================================================

      const step1 = document.getElementById("uploadStepArea");
      const step2 = document.getElementById("mapper2Area");
      const step3 = document.getElementById("invoicePreviewArea");

      if (step1) step1.style.display = "none";

      if (!res.templateConfig) res.templateConfig = {};
      if (!res.templateConfig.mapping) res.templateConfig.mapping = {};

      // 0. Очищаем colMap перед пересборкой по распакованным колонкам из БД
      window.mapper2State.colMap = {};
      res.templateConfig.mapping = {};

      // 1. Универсальная привязка ВСЕХ параметров по extractedHeaders (не дублируем humanName и sysKey в colMap)
      extractedHeaders.forEach((header, idx) => {
        res.templateConfig.mapping[header] = header;

        let mappedToSysKey = false;
        if (res.templateConfig.humanNames && res.templateConfig.systemKeys) {
          let humanIdx = res.templateConfig.humanNames.indexOf(header);
          if (humanIdx !== -1) {
            let sysKey = res.templateConfig.systemKeys[humanIdx];
            if (sysKey && sysKey !== "merchant_sku") {
              window.mapper2State.colMap[sysKey] = idx; // Маппер увидит это и зажжет зеленую галочку!
              mappedToSysKey = true;
            }
          }
        }

        if (!mappedToSysKey) {
          window.mapper2State.colMap[header] = idx;
        }
      });

      // 2. Восстанавливаем сплиттеры и dictValues; не затираем сохранённые индивидуальные значения из БД старым глобальным dictValues
      if (savedMeta.saved_complex_params) {
        const restoredSplitRules =
          savedMeta.saved_complex_params.splitRules || {};
        const rawRestoredDict = savedMeta.saved_complex_params.dictValues || {};
        const restoredDictValues = {};
        Object.keys(rawRestoredDict).forEach((dKey) => {
          const val = rawRestoredDict[dKey];
          if (typeof val === "string" && val.trim() !== "") {
            restoredDictValues[dKey] = val.trim();
          }
        });

        Object.keys(restoredDictValues).forEach((dKey) => {
          const mappedIdx = window.mapper2State.colMap[dKey];
          if (mappedIdx !== undefined && mappedIdx >= 0) {
            const headerName = extractedHeaders[mappedIdx];
            const hasDbValues = window.parsedInvoiceData.some(
              (it) =>
                it &&
                it[headerName] !== undefined &&
                it[headerName] !== null &&
                String(it[headerName]).trim() !== "",
            );
            if (hasDbValues) {
              delete restoredDictValues[dKey];
            }
          }
        });

        res.templateConfig.splitRules = restoredSplitRules;
        res.templateConfig.dictValues = restoredDictValues;
        window.mapper2State.splitRules = restoredSplitRules;
        window.mapper2State.dictValues = restoredDictValues;
        window.kaspiComplexParamsState = {
          splitRules: restoredSplitRules,
          dictValues: restoredDictValues,
        };
      }

      // 3. Жестко привязываем базовые поля (расширен словарь на всякий случай)
      const baseFieldsMap = {
        name: ["item_name", "name", "title", "Наименование", "Название"],
        item_id: ["item_id", "id", "sku"],
        price: ["cost", "price", "price_in", "Цена"],
        qty: ["qty", "quantity", "Количество"],
        barcode: ["barcode", "ean", "Штрихкод"],
        brand: ["brand", "Бренд"],
      };

      Object.keys(baseFieldsMap).forEach((targetKey) => {
        let possibleNames = baseFieldsMap[targetKey];
        for (let pName of possibleNames) {
          let idx = extractedHeaders.indexOf(pName);
          if (idx !== -1) {
            res.templateConfig.mapping[targetKey] = targetKey;
            window.mapper2State.colMap[targetKey] = idx;
            break;
          }
        }
      });

      // 4. Глубокая очистка цен и количества
      let priceIdx = window.mapper2State.colMap["price"];
      let qtyIdx = window.mapper2State.colMap["qty"];
      let priceKey = extractedHeaders[priceIdx];
      let qtyKey = extractedHeaders[qtyIdx];

      window.parsedInvoiceData.forEach((item) => {
        if (priceKey) {
          let cleanPrice = String(item[priceKey] || "")
            .replace(/\s/g, "")
            .replace(/,/g, ".")
            .replace(/[^\d.-]/g, "");
          item[priceKey] = cleanPrice === "" ? 0 : Number(cleanPrice);
        }
        if (qtyKey) {
          let cleanQty = String(item[qtyKey] || "")
            .replace(/\s/g, "")
            .replace(/,/g, ".")
            .replace(/[^\d.-]/g, "");
          item[qtyKey] = cleanQty === "" ? 0 : Number(cleanQty);
        }
      });

      window.mapper2State.invoiceRows = window.parsedInvoiceData.map((item) =>
        extractedHeaders.map((h) => item[h]),
      );

      // === Рендерим маппер с готовыми данными ===
      window.renderMapper2Cards(res.templateConfig);

      const exportBtnArea = document.getElementById("exportActionButtons");

      if (isExported) {
        if (step2) step2.style.display = "none";
        if (step3) step3.style.display = "flex";
        showParents("invoicePreviewArea");
        if (typeof window.resetMapper2ModalLayout === "function") {
          window.resetMapper2ModalLayout({ resetScroll: true });
        }
        window.renderPreviewTable();
      } else {
        if (step3) step3.style.display = "none";
        if (exportBtnArea) exportBtnArea.style.display = "none";
        if (step2) step2.style.display = "flex";
        showParents("mapper2Area");
        if (typeof window.resetMapper2ModalLayout === "function") {
          window.resetMapper2ModalLayout({ resetScroll: true });
        }
      }
    } else {
      const trExp = getSheetPreviewTranslator();
      const err = res.error || trExp("kaspi_export_no_items");
      window.showKaspiNotice(trExp("kaspi_export_server_err") + err, {
        type: "error",
      });
      if (btnArea) btnArea.style.display = "none";
    }
  } catch (e) {
    console.error("Полная ошибка загрузки данных партии:", e);
    const trExp = getSheetPreviewTranslator();
    window.showKaspiNotice(trExp("kaspi_export_critical_err") + e.message, {
      type: "error",
    });
  } finally {
    if (typeof window.hideLoading === "function") window.hideLoading();
  }
};

window.askCategoryName = function (defaultText, options = {}) {
  return new Promise((resolve) => {
    const modal = document.getElementById("custom-prompt-modal");
    const input = document.getElementById("custom-prompt-input");
    const btnOk = document.getElementById("custom-prompt-ok");
    const btnCancel = document.getElementById("custom-prompt-cancel");
    const logBlock = document.getElementById("custom-prompt-logistics-block");
    const logSelect = document.getElementById("custom-prompt-logistics-select");
    const logHint = document.getElementById("custom-prompt-logistics-hint");

    const showLogistics = Boolean(options && options.showLogistics);
    const suggestedBlock = String((options && options.suggestedBlock) || "").trim();

    // Сбрасываем старые обработчики кликов, чтобы они не дублировались
    btnOk.onclick = null;
    btnCancel.onclick = null;
    input.onkeydown = null;

    // Вставляем дефолтное название (имя файла)
    input.value = defaultText || "";

    // Блок группы логистики показывается ТОЛЬКО в сценарии загрузки/настройки шаблона Kaspi
    if (logBlock) {
      if (showLogistics) {
        logBlock.style.display = "block";
        if (logSelect && typeof window.populateLogisticsSelect === "function") {
          window.populateLogisticsSelect(logSelect, suggestedBlock);
        }
        if (logHint) {
          logHint.style.display = suggestedBlock ? "block" : "none";
        }
      } else {
        logBlock.style.display = "none";
        if (logHint) logHint.style.display = "none";
      }
    }

    if (typeof window.applyLanguage === "function") {
      window.applyLanguage(
        typeof currentLang !== "undefined" ? currentLang : "ru",
      );
    }

    modal.style.display = "flex";

    // Задержка 100мс нужна, чтобы iOS Safari успел отрендерить окно перед фокусом
    setTimeout(() => {
      input.focus();
      input.select(); // Тот самый магический метод выделения текста!
    }, 100);

    const closeModal = (confirmed) => {
      modal.style.display = "none";
      // Обязательно скрываем блок логистики при закрытии модалки
      if (logBlock) logBlock.style.display = "none";
      if (logHint) logHint.style.display = "none";

      if (!confirmed) {
        resolve(null);
        return;
      }

      const cleanName = input.value.trim();
      if (!cleanName) {
        resolve(null);
        return;
      }

      if (showLogistics) {
        resolve({
          categoryName: cleanName,
          logisticsBlock: logSelect ? String(logSelect.value || "").trim() : "",
        });
      } else {
        resolve(cleanName);
      }
    };

    btnOk.onclick = () => closeModal(true);
    btnCancel.onclick = () => closeModal(false);

    // Позволяем нажать Enter на клавиатуре вместо кнопки ОК
    input.onkeydown = (e) => {
      if (e.key === "Enter") closeModal(true);
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
window.handleTemplateUpload = async function (event) {
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
          const trTpl = getSheetPreviewTranslator();
          window.showKaspiNotice(trTpl("kaspi_tpl_parse_err"), {
            type: "error",
          });
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

        const kaspiTemplateCategory =
          typeof window.extractKaspiTemplateCategory === "function"
            ? window.extractKaspiTemplateCategory(valuesData)
            : "";
        const suggestedLogisticsBlock =
          typeof window.suggestLogisticsBlock === "function"
            ? window.suggestLogisticsBlock(
                kaspiTemplateCategory,
                defaultCategory,
              )
            : "";

        const promptResult = await window.askCategoryName(defaultCategory, {
          showLogistics: true,
          suggestedBlock: suggestedLogisticsBlock,
        });

        let categoryName =
          promptResult && typeof promptResult === "object"
            ? promptResult.categoryName
            : promptResult;
        const chosenLogisticsBlock =
          promptResult && typeof promptResult === "object"
            ? String(promptResult.logisticsBlock || "").trim()
            : suggestedLogisticsBlock;

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
          kaspiCategory: kaspiTemplateCategory,
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
          logisticsBlock: chosenLogisticsBlock,
        };

        const res = await window.smartFetch(
          typeof APPS_SCRIPT_URL !== "undefined"
            ? APPS_SCRIPT_URL
            : window.APPS_SCRIPT_URL || "",
          payload,
        );

        if (res && res.success) {
          window.kaspiTemplateCache = window.kaspiTemplateCache || {};
          const cachedObj = Object.assign({}, extractedHeaders);
          if (res.memoryJson) {
            cachedObj.memoryJson = res.memoryJson;
          } else if (chosenLogisticsBlock) {
            cachedObj.memoryJson = JSON.stringify({
              _logisticsBlock: chosenLogisticsBlock,
            });
          }
          window.kaspiTemplateCache[templateHash] = cachedObj;

          if (templateSelect) {
            if (!isDuplicate) {
              const newOption = document.createElement("option");
              newOption.value = templateHash;
              newOption.text = categoryName;
              newOption.setAttribute("data-hash", templateHash);
              newOption.setAttribute("data-name", categoryName);
              templateSelect.appendChild(newOption);
            }
            templateSelect.value = templateHash;
          }

          // Разблокируем загрузку накладной Excel в ветке приемки (не открывая кнопки экспорта)
          if (typeof window.setUploadButtonState === "function") {
            window.setUploadButtonState(
              true,
              "inc_upload_excel",
              "Загрузите файл Excel",
              "📁",
            );
          }
        } else {
          if (res && res.error === "kaspi_dup_hash") {
            throw new Error("⚠️ Шаблон уже существует");
          }
          throw new Error(res ? res.error : "Пустой ответ от сервера");
        }

        if (fileNameSpan) {
          fileNameSpan.innerText = `✅ Шаблон готов (${categoryName})`;
          fileNameSpan.style.color = "var(--accent-green)";
        }
      } catch (err) {
        console.error(err);
        const trTpl = getSheetPreviewTranslator();
        window.showKaspiNotice(trTpl("kaspi_file_read_err") + err.message, {
          type: "error",
        });
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
};

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

window.checkMapperReadiness = function () {
  const st = window.mapper2State || {};
  const cm = st.colMap || {};
  const dv = st.dictValues || {};
  const hasStrDv = (k) => typeof dv[k] === "string" && dv[k].trim() !== "";

  const hasQty = cm["qty"] !== undefined || hasStrDv("qty");
  const hasPrice =
    cm["price"] !== undefined ||
    cm["cost"] !== undefined ||
    hasStrDv("price") ||
    hasStrDv("cost");
  const hasName =
    cm["name"] !== undefined ||
    cm["model"] !== undefined ||
    hasStrDv("name") ||
    hasStrDv("model");

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
