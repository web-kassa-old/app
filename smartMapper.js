/**
 * Детектор сложных колонок (Smart Hybrid Mapper)
 * @param {Array} headers - Массив названий колонок (шапок), например: ['Бренд', 'Size', 'Цена']
 * @param {Array} rows - Массив массивов с данными, например: [['Nokian', '205/55R16', '25000'], ...]
 * @returns {Array} - Массив объектов с найденными сложными колонками и их максимальными примерами
 */
window.detectComplexColumns = function (headers, rows) {
  if (!headers || !rows || headers.length === 0 || rows.length === 0) return [];

  const dict =
    typeof invoiceSynonyms !== "undefined" &&
    invoiceSynonyms &&
    Object.keys(invoiceSynonyms).length > 0
      ? invoiceSynonyms
      : window.invoiceSynonyms || {};

  // П1: Добавили Модель и Рисунок в список игнора
  const excludeKeys = [
    "Артикул",
    "Штрихкод",
    "Код",
    "Бренд",
    "Цена",
    "Остаток",
    "Количество",
    "Сумма",
    "Модель",
    "Рисунок",
  ];
  let dynamicBlacklist = [];

  excludeKeys.forEach((key) => {
    if (dict[key] && Array.isArray(dict[key])) {
      const synonyms = dict[key].map((s) => String(s).toLowerCase().trim());
      dynamicBlacklist = dynamicBlacklist.concat(synonyms);
    }
  });

  const fallbackBlacklist = [
    "артикул",
    "код",
    "code",
    "barcode",
    "штрихкод",
    "brand",
    "бренд",
    "цена",
    "price",
    "usd",
    "eur",
    "kzt",
    "руб",
    "кол-во",
    "qty",
    "pcs",
    "amount",
    "сумма",
    "total",
    "pattern",
    "модель", // П1: Жесткое исключение для Pattern
  ];

  const blacklist = [...new Set([...dynamicBlacklist, ...fallbackBlacklist])];
  const complexCols = [];

  headers.forEach((colName, colIndex) => {
    if (!colName) return;

    const cleanColName = String(colName).toLowerCase().trim();
    if (blacklist.includes(cleanColName)) return;

    let exampleVal = "";
    let validTokens = [];

    // П2: Сканируем всю колонку (до 1000 строк), чтобы не пропустить "115/110" где-то внизу
    const maxRows = Math.min(1000, rows.length);
    for (let i = 0; i < maxRows; i++) {
      const row = rows[i];
      if (!row) continue;

      const cellVal = row[colIndex];
      if (
        cellVal !== undefined &&
        cellVal !== null &&
        String(cellVal).trim() !== ""
      ) {
        const strVal = String(cellVal).trim();

        // Если ячейка - просто число (например 82), идем к следующей СТРОКЕ, но не бросаем колонку
        const isJustNumber = !isNaN(Number(strVal.replace(/,/g, "")));
        if (isJustNumber) continue;

        // Режем строку по ЛЮБЫМ нечисловым символам (включая буквы и точки)
        const tokens = strVal.split(/[^\d]+/).filter((t) => t.length > 0);

        // Как только нашли сложную структуру - фиксируем и останавливаем поиск по этой колонке
        if (tokens.length >= 2) {
          exampleVal = strVal;
          validTokens = tokens;
          break;
        }
      }
    }

    if (exampleVal && validTokens.length >= 2) {
      const hasNumbers = /\d/.test(exampleVal);
      const isNotTooLong = exampleVal.length < 40;

      if (hasNumbers && isNotTooLong) {
        complexCols.push({
          colName: colName,
          example: exampleVal,
          tokenCount: validTokens.length,
        });
      }
    }
  });
  return complexCols;
};

/**
 * Рендер модалки "Умное сито"
 * @param {Array} detectedColumns - Результат работы detectComplexColumns()
 */
window.renderSmartMapperModal = function (complexColumns) {
    const container = document.getElementById("smartMapperContainer");
    if (!container) return;
    container.innerHTML = "";
    container.style.display = "flex";

    let cols = complexColumns || window.complexColumnsToTokenize || [];
    cols = cols.map(c => typeof c === 'string' ? { colName: c, example: "" } : c);

    const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
    const t =
      typeof translations !== "undefined" && translations[lang]
        ? translations[lang]
        : typeof translations !== "undefined"
          ? translations["ru"] || {}
          : {};

    const modal = document.createElement("div");
    modal.className = "smart-modal-content";

    const header = document.createElement("div");
    header.className = "smart-modal-header";
    header.setAttribute("data-i18n", "smart_mapper_title");
    header.textContent = t.smart_mapper_title || "Настройка сложных колонок";
    modal.appendChild(header);

    const body = document.createElement("div");
    body.className = "smart-modal-body";

    let kaspiParams = [];
    const tData = window.currentTemplateData;

    if (tData && tData.humanNames) {
        const excludeFromSmart = [
            "Артикул", "Название товара", "Бренд", "Цена", "Название модели", 
            "Модель", "Рубрика", "category", "Сезонность", "Назначение", 
            "Тип шины", "Комплектация", "Тип рисунка протектора", "Шипы", 
            "Код изображений", "Ссылка на YouTube", "Ссылка на картинку", 
            "Описание (мин. 100 символов, макс. 7 000 символов)", "Описание", 
            "Вес для расчета логистики", "Объединить в одну карточку", "В наличии",
        ];

        for (let i = 0; i < tData.humanNames.length; i++) {
            const paramName = tData.humanNames[i];
            const dictData = tData.dictionary ? tData.dictionary[paramName] : null;

            if (Array.isArray(dictData)) {
                const validExamples = dictData.filter((val) => val && String(val).trim() !== "");
                if (validExamples.length > 0 && !excludeFromSmart.includes(paramName)) {
                    const isCodeOrNumber = validExamples.some((ex) => {
                        const str = String(ex).trim();
                        return (/\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3));
                    });

                    if (isCodeOrNumber) {
                        kaspiParams.push({ id: paramName, name: paramName, examples: validExamples.slice(0, 3) });
                    }
                }
            }
        }
    }

    window.mapper2State = window.mapper2State || {};
    const savedRules = window.mapper2State.smartRules || {};
    const headers = window.mapper2State.invoiceHeaders || [];
    const rows = window.mapper2State.invoiceRows || [];

    cols.forEach((col) => {
        const card = document.createElement("div");
        card.className = "smart-mapper-card";
        card.dataset.colname = col.colName;

        // 🔥 АВТОПОИСК САМОГО СЛОЖНОГО ПРИМЕРА ИЗ ФАЙЛА
        let bestExample = "";
        let maxTokens = 0;
        
        // ⚡ УМНЫЙ ПОИСК КОЛОНКИ: Ищем точное вхождение, игнорируя лишние пробелы и регистр
        const targetName = String(col.colName).trim().toLowerCase();
        let colIdx = headers.findIndex(h => String(h).trim().toLowerCase() === targetName);
        
        // Резервный поиск, если заголовки в Excel склеились иначе (например, "SPECIFICATION\nSize")
        if (colIdx === -1) {
             const parts = targetName.split(' ');
             if (parts.length > 1) {
                 colIdx = headers.findIndex(h => {
                     const hClean = String(h).toLowerCase();
                     return parts.every(part => hClean.includes(part));
                 });
             }
        }
        
        if (colIdx !== -1) {
            for (let i = 0; i < Math.min(1000, rows.length); i++) {
                let val = String(rows[i] ? rows[i][colIdx] || "" : "").trim();
                // Ищем не число, а сложную строку
                if (val && isNaN(Number(val.replace(/,/g, "")))) {
                    let tokenCount = (val.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || []).length;
                    if (tokenCount > maxTokens) {
                        maxTokens = tokenCount;
                        bestExample = val;
                    }
                }
            }
        }

        const rawColName = String(col.colName).toLowerCase().trim();
        let translatedName = col.colName;
        if (typeof translations !== "undefined" && typeof currentLang !== "undefined") {
            if (translations[currentLang] && translations[currentLang][rawColName]) {
                translatedName = `${translations[currentLang][rawColName]} (${col.colName})`;
            }
        }

        const currentSavedParams = savedRules[col.colName] || [];

        let checkboxesHtml = kaspiParams.map((param) => {
            let exampleSpans = param.examples.map((ex) => `<span class="example-tag">${ex}</span>`).join("");
            let isChecked = currentSavedParams.includes(param.id) ? "checked" : "";
            let activeClass = isChecked ? "active" : "";

            return `
                <label class="checkbox-item ${activeClass}">
                    <input type="checkbox" value="${param.id}" data-name="${param.name}" ${isChecked}>
                    <div class="checkbox-details">
                        <div class="checkbox-title">${param.name}</div>
                        <div class="checkbox-examples">${exampleSpans}</div>
                    </div>
                </label>
            `;
        }).join("");

        const emptyChipsLabel = t.smart_mapper_empty || "Не выбрано";
        const colPrefixLabel = t.smart_mapper_col_prefix || "КОЛОНКА:";
        const exampleLabel = t.example_from_file || "Пример из файла:";
        const youSelectedLabel = t.smart_mapper_you_selected || "ВЫ ВЫБРАЛИ:";
        const questionLabel = t.smart_mapper_question || "Какие параметры здесь есть?";

        let colDisplayHtml = col.colName;
        if (typeof window.getColumnHeaderHint === "function") {
            const hint = window.getColumnHeaderHint(col.colName);
            if (hint && hint.label) {
                const i18nAttr = hint.i18nKey ? ` data-i18n="${hint.i18nKey}"` : "";
                colDisplayHtml = `${col.colName} <span class="col-header-hint">(<span${i18nAttr}>${hint.label}</span>)</span>`;
            }
        } else if (typeof window.translateColumnHeader === "function") {
            colDisplayHtml = window.translateColumnHeader(col.colName);
        }

        let initialChips = currentSavedParams.length > 0 
            ? kaspiParams.filter((p) => currentSavedParams.includes(p.id)).map((p) => `<span class="chip">${p.name}</span>`).join("")
            : `<span class="empty-chips" data-i18n="smart_mapper_empty">${emptyChipsLabel}</span>`;

        card.innerHTML = `
            <div class="smart-col-info">
                <span data-i18n="smart_mapper_col_prefix">${colPrefixLabel}</span> <span>${colDisplayHtml}</span>
                <div class="smart-col-example"><span data-i18n="example_from_file">${exampleLabel}</span> <strong class="smart-col-example-val">${bestExample}</strong></div>
            </div>
            <div class="smart-chips-area">
                <div class="chips-title" data-i18n="smart_mapper_you_selected">${youSelectedLabel}</div>
                <div class="chips-container">${initialChips}</div>
            </div>
            <div class="smart-question" data-i18n="smart_mapper_question">${questionLabel}</div>
            <div class="checkbox-grid">
                ${checkboxesHtml}
            </div>
        `;
        body.appendChild(card);

        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        const chipsContainer = card.querySelector(".chips-container");
        checkboxes.forEach((cb) => {
            cb.addEventListener("change", function () {
                const label = this.closest(".checkbox-item");
                if (this.checked) label.classList.add("active"); else label.classList.remove("active");
                const selected = Array.from(checkboxes).filter((box) => box.checked).map((box) => box.dataset.name);
                const curLang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
                const curTr = (typeof translations !== "undefined" && translations[curLang]) || {};
                const curEmptyText = curTr.smart_mapper_empty || emptyChipsLabel;
                chipsContainer.innerHTML = selected.length > 0 ? selected.map((name) => `<span class="chip">${name}</span>`).join("") : `<span class="empty-chips" data-i18n="smart_mapper_empty">${curEmptyText}</span>`;
            });
        });
    });

    modal.appendChild(body);

    const backBtnText = t.smart_mapper_back || t.inc_back || "НАЗАД";
    const confirmBtnText = t.smart_mapper_btn || "ПОДТВЕРДИТЬ ВЫБОР";

    const footer = document.createElement("div");
    footer.className = "smart-modal-footer";
    footer.innerHTML = `
        <div style="display: flex; gap: 10px; width: 100%;">
            <button class="cancel-btn" id="smartBackBtn" data-i18n="smart_mapper_back" style="flex: 1; font-weight: bold; padding: 12px; border-radius: 8px;">${backBtnText}</button>
            <button class="confirm-btn btn-primary green" id="smartConfirmBtn" data-i18n="smart_mapper_btn" style="flex: 2; font-weight: bold; padding: 12px; border-radius: 8px;">${confirmBtnText}</button>
        </div>
    `;
    body.appendChild(footer);
    container.appendChild(modal);

    if (typeof window.applyLanguage === "function") {
        window.applyLanguage(lang);
    }

    document.getElementById("smartBackBtn").addEventListener("click", () => {
        if (typeof window.navigateIncomeStep === "function") window.navigateIncomeStep(1);
    });

    document.getElementById("smartConfirmBtn").addEventListener("click", () => {
        window.mapper2State.smartRules = {};
        body.querySelectorAll(".smart-mapper-card").forEach((card) => {
            const colName = card.dataset.colname;
            const selectedParams = Array.from(card.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            if (selectedParams.length > 0) window.mapper2State.smartRules[colName] = selectedParams;
        });

        window.mapper2State.quarantine = [];
        const tData = window.currentTemplateData || {};
        window.kaspiDicts = tData.dictionary || {};

        Object.keys(window.mapper2State.smartRules).forEach((colName) => {
            const colIndex = headers.findIndex((h) => String(h).trim() === colName);
            if (colIndex !== -1) {
                const signatureMap = {};
                for (let i = 0; i < Math.min(1000, rows.length); i++) {
                    if (rows[i] && rows[i][colIndex]) {
                        // Убрали слепое удаление пробелов, чтобы сохранить исходный вид строки
                        let strVal = String(rows[i][colIndex]).trim();
                        
                        if (strVal && isNaN(Number(strVal.replace(/,/g, "")))) {
                            // 1. Прогоняем строку через НАШУ функцию, чтобы сигнатуры карантина и финала 100% совпадали
                            let tokens = typeof parseAndMatchTokens === "function" 
                                ? parseAndMatchTokens(strVal, colName) 
                                : [];
                            
                            if (tokens.length > 0) {
                                const sig = typeof window.computeSmartTokenSignature === "function"
                                    ? window.computeSmartTokenSignature(tokens)
                                    : tokens
                                        .filter(t => !/^[a-zA-Zа-яА-ЯёЁ]+$/.test(t.cleanText) && t.cleanText.trim() !== "")
                                        .map(t => /\d/.test(t.cleanText) ? 'N' : 'S')
                                        .join('-');

                                if (sig && !signatureMap[sig]) {
                                    signatureMap[sig] = strVal;
                                }
                            }
                        }
                    }
                }
                
                Object.values(signatureMap).forEach((str) => {
                    window.mapper2State.quarantine.push({ rawString: str, excelColumnName: colName });
                });
            }
        });

        if (container) container.style.display = "none";
        if (window.mapper2State.quarantine.length > 0 && typeof window.startTokenizerQueue === "function") {
            window.startTokenizerQueue();
        } else if (typeof window.navigateIncomeStep === "function") {
            window.navigateIncomeStep(2);
        }
    });
};

// Прокси-функция, чтобы кнопка из первого окна находила нужный метод
window.renderSmartMapper = function() {
    window.renderSmartMapperModal(window.complexColumnsToTokenize);
};

/**
 * Вспомогательная функция для генерации чекбоксов с примерами
 */
function generateCheckboxesHtml(cardIndex) {
  // Список параметров (в будущем можно тянуть динамически из шаблона Kaspi)
  const params = [
    { key: "smart_param_width", ex: ["175", "195", "10.50"] },
    { key: "smart_param_height", ex: ["55", "65", "31"] },
    { key: "smart_param_diam", ex: ["15", "16", "17"] },
    { key: "smart_param_load", ex: ["91", "94", "115/110"] },
    { key: "smart_param_speed", ex: ["T", "H", "V"] },
    { key: "smart_param_season", ex: ["Летние", "Зимние"] },
  ];

  return params
    .map(
      (p) => `
        <label class="checkbox-item">
            <input type="checkbox" value="${p.key}" onchange="updateSmartChips(this, ${cardIndex})">
            <div class="checkbox-content">
                <span class="checkbox-title" data-i18n="${p.key}">Параметр</span>
                <div class="example-stack">
                    ${p.ex.map((val) => `<span>${val}</span>`).join("")}
                </div>
            </div>
        </label>
    `,
    )
    .join("");
}

/**
 * Обновление визуальных плашек (чипсов) при клике на чекбокс
 * @param {HTMLElement} checkbox - Нажатый инпут
 * @param {number} cardIndex - Индекс карточки (колонки)
 */
function updateSmartChips(checkbox, cardIndex) {
  const chipsContainer = document.getElementById(`chipsContainer_${cardIndex}`);
  const parentLabel = checkbox.closest(".checkbox-item");

  // Получаем текст для плашки (уже переведенный, если applyLanguage отработал)
  const titleSpan = parentLabel.querySelector(".checkbox-title");
  const labelText = titleSpan ? titleSpan.innerText : checkbox.value;

  if (checkbox.checked) {
    // Подсвечиваем чекбокс
    parentLabel.classList.add("active");

    // Создаем новую зеленую плашку
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.setAttribute("data-value", checkbox.value); // Прячем системный ключ для удобства
    chip.innerHTML = labelText;
    chipsContainer.appendChild(chip);

    // Убираем надпись "Пока ничего не выбрано", если она есть
    const emptyMsg = chipsContainer.querySelector(".empty-chips");
    if (emptyMsg) {
      emptyMsg.remove();
    }
  } else {
    // Снимаем подсветку
    parentLabel.classList.remove("active");

    // Ищем и удаляем плашку, связанную с этим чекбоксом
    const chips = chipsContainer.querySelectorAll(".chip");
    chips.forEach((chip) => {
      if (chip.getAttribute("data-value") === checkbox.value) {
        chip.remove();
      }
    });

    // Возвращаем надпись, если плашек не осталось
    if (chipsContainer.querySelectorAll(".chip").length === 0) {
      chipsContainer.innerHTML =
        '<span class="empty-chips" data-i18n="smart_empty_chips">Пока ничего не выбрано...</span>';
      // Если функция перевода доступна, сразу переводим эту строку
      if (
        typeof applyLanguage === "function" &&
        typeof currentLang !== "undefined"
      ) {
        applyLanguage(currentLang);
      }
    }
  }
}

/**
 * Сохранение выбранных параметров и переход к стандартному маппингу
 */
function saveSmartRules() {
  const cards = document.querySelectorAll(".smart-mapper-card");
  const smartRules = {};

  cards.forEach((card) => {
    const colName = card.getAttribute("data-col-name");
    const checkedBoxes = card.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    if (checkedBoxes.length > 0) {
      // Собираем системные ключи выбранных параметров
      const selectedParams = Array.from(checkedBoxes).map((box) => box.value);
      smartRules[colName] = selectedParams;
    }
  });

  console.log("Сохраненные правила Smart Mapper:", smartRules);

  // Сохраняем правила в глобальный объект, чтобы бэкенд или парсер могли их забрать
  window.posSmartRules = smartRules;

  // Прячем Умное сито (очищаем контейнер)
  const container = document.getElementById("smartMapperContainer");
  if (container) {
    container.innerHTML = "";
  }

  // Запускаем старый интерфейс маппинга, передавая ему сохраненные данные шаблона
  if (typeof window.renderMapper2Cards === "function") {
    window.renderMapper2Cards(window.currentTemplateData);
  } else {
    console.error("Функция renderMapper2Cards не найдена");
  }
}

window.showTokenizer = function (columnName, tokensArray, paramsList) {
  const overlay = document.getElementById("tokenizer-overlay");
  if (!overlay) return;

  // 1. Получаем текущие переводы
  const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
  const tr =
    typeof translations !== "undefined" && translations[lang]
      ? translations[lang]
      : {};

  const tokensHtml = tokensArray
    .map((token, index) => {
      return `<button class="token" data-index="${index}">${token}</button>`;
    })
    .join("");

  const paramsHtml = paramsList
    .map((param) => {
      return `
        <div class="param-row" data-param-name="${param.name}">
          <label class="param-info">
            <input type="radio" name="param_target" value="${param.name}">
            <span>${param.name}</span>
          </label>
          <div class="param-preview"></div>
          <button class="btn-confirm-inline" style="display: none;" data-i18n="tok_ok">✔ ${tr.tok_ok || "ОК"}</button>
        </div>
        `;
    })
    .join("");

  // 2. Внедряем переводы в HTML и заменяем fallback-zone на новый интерфейс
  overlay.innerHTML = `
        <div class="tokenizer-modal">
            <div class="modal-header" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <h2 class="modal-title" data-i18n="tok_pattern">${tr.tok_pattern || "Паттерн"}</h2>
                    <button class="close-btn" style="background: var(--accent-red); color: #fff; font-size: 12px; font-weight: bold; border: none; border-radius: 6px; padding: 6px 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; text-transform: uppercase; box-shadow: 0 4px 10px rgba(231,76,60,0.3);">
                        <span style="font-size: 18px; line-height: 1;">&times;</span> <span data-i18n="tok_close">${tr.tok_close || "Закрыть"}</span>
                    </button>
                </div>
                <div class="modal-subtitle" data-i18n="tok_desc" style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
                    ${tr.tok_desc || "Скрипт не смог однозначно распределить эти данные. Выберите нужные фрагменты и привяжите их к параметрам из справочника."}
                </div>
            </div>
            
            <div class="toolbar">
                <div class="toolbar-label"><span data-i18n="tok_source">${tr.tok_source || "Колонка:"}</span> ${columnName}</div>
                <button class="btn-clear" data-i18n="tok_clear">✕ ${tr.tok_clear || "Сбросить токены"}</button>
            </div>

            <div class="workspace">
                <div class="workspace-label" data-i18n="tok_select_frag">${tr.tok_select_frag || "Выберите фрагменты (можно несколько):"}</div>
                <div class="tokens-container">
                    ${tokensHtml}
                </div>
            </div>

            <div class="params-list" style="max-height: 40vh; overflow-y: auto; padding-right: 5px; margin-bottom: 10px;">
                ${paramsHtml}
            </div>

            <!-- ОБНОВЛЕННАЯ ЗОНА РУЧНОГО ВЫБОРА -->
            <div class="fallback-zone" style="display: none;">
                <div class="fallback-msg" style="padding-bottom: 10px; color: #ff4444; font-size: 13px;"></div>
                
                <div style="background:var(--bg-body); border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden;">
                    <div style="padding:15px; border-bottom: 1px solid var(--border-light);">
                        <input type="text" class="fallback-search-input kaspi-input-field" 
                            placeholder="${tr.inc_search_enter || "Поиск..."}"
                            oninput="window.filterTokenizerDict(this)"
                            style="width: 100%; box-sizing: border-box;">
                        
                        <label style="display:flex; align-items:center; gap:10px; margin-top:15px; padding:15px; background:var(--bg-panel); border-radius:8px; border:1px solid var(--border-light); cursor:pointer;">
                            <input type="checkbox" class="fallback-apply-all" style="width:20px; height:20px;">
                            <span style="font-size:14px; color:var(--text-main);">${tr.inc_apply_all || "Применить ко всем товарам"}</span>
                        </label>
                        
                        <div class="btn-clear-fallback" onclick="window.clearFallbackSelection()" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-top:10px; padding:12px; background:rgba(255,68,68,0.1); color:#ff4444; border-radius:8px; border:1px solid rgba(255,68,68,0.3); font-size:14px; font-weight:bold; cursor:pointer; transition:background 0.2s;">
                            <span>✖</span> ${tr.inc_clear_selection || "Очистить выбор"}
                        </div>
                    </div>
                    
                    <div style="max-height: 200px; overflow-y:auto; padding: 10px;">
                        <ul class="fallback-dict-list" style="list-style:none; padding:0; margin:0; background:var(--bg-panel); border-radius:8px;">
                            <!-- Сюда JS вставит <li> элементы справочника -->
                        </ul>
                    </div>
                </div>
                
                <!-- Скрытая кнопка для совместимости с логикой подтверждения -->
                <button class="btn-fallback" style="display:none;"></button>
            </div>
            
            <div class="modal-footer" style="display: flex; gap: 10px;">
                <button type="button" class="btn-back" data-i18n="inc_back" style="flex: 1; background: var(--bg-panel); border: 1px solid var(--border-light); color: var(--text-main); padding: 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">${tr.inc_back || "НАЗАД"}</button>
                <button type="button" class="btn-done" style="flex: 2; background: var(--accent-green); color: #000; border: none; padding: 14px; border-radius: 6px; font-weight: bold; opacity: 0.5; pointer-events: none; transition: 0.2s;">${tr.tok_next || "ДАЛЕЕ"}</button>
            </div>
        </div>
    `;

  overlay.style.display = "flex";

  // 3. Форсируем применение переводов, если в приложении есть эта функция
  if (typeof window.applyLanguage === "function") {
    window.applyLanguage();
  }

  overlay.querySelector(".close-btn").addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.innerHTML = "";
    // Принудительно возвращаем интерфейс на первый шаг (загрузка файла)
    if (typeof window.navigateIncomeStep === "function") {
      window.navigateIncomeStep(1);
    }
  });
};

// Функция очистки для кнопки "Очистить выбор"
window.clearFallbackSelection = function () {
  const overlay = document.getElementById("tokenizer-overlay");
  if (!overlay) return;

  const searchInput = overlay.querySelector(".fallback-search-input");
  if (searchInput) searchInput.value = "";

  const applyAllCheckbox = overlay.querySelector(".fallback-apply-all");
  if (applyAllCheckbox) applyAllCheckbox.checked = false;

  // Сбрасываем список к изначальному состоянию
  if (typeof window.filterTokenizerDict === "function") {
    window.filterTokenizerDict({ value: "" });
  }
};

window.filterTokenizerDict = function (inputEl) {
  const query = inputEl.value.toLowerCase().trim();
  const ul = document.querySelector("#tokenizer-overlay .fallback-dict-list");
  if (!ul || !window.currentTokenizerDict) return;

  const filtered = window.currentTokenizerDict.filter((val) =>
    String(val).toLowerCase().includes(query),
  );

  ul.innerHTML = filtered
    .map((val) => {
      const regex = new RegExp(`(${query})`, "gi");
      const highlighted = query
        ? String(val).replace(
            regex,
            "<mark style='background:#fef08a; color:#854d0e;'>$1</mark>",
          )
        : val;
      return `<li onclick="window.selectTokenizerDictValue('${String(val).replace(/'/g, "\\'")}', this)" class="param-row" style="padding:15px; border-bottom:1px solid var(--border-light); cursor:pointer; font-size:14px;"><span style="color:var(--text-main);">${highlighted}</span></li>`;
    })
    .join("");
};

window.selectTokenizerDictValue = function (val, liElement) {
  // Подсвечиваем выбранный элемент
  const ul = document.querySelector("#tokenizer-overlay .fallback-dict-list");
  ul.querySelectorAll("li").forEach((li) => {
    li.style.background = "transparent";
    li.querySelector("span.check-mark")?.remove();
  });
  liElement.style.background = "rgba(59, 130, 246, 0.15)";
  liElement.insertAdjacentHTML(
    "beforeend",
    '<span class="check-mark" style="color:var(--accent-blue); float:right;">✔</span>',
  );

  // Находим активную строку, забираем значение чекбокса и завершаем выбор
  const overlay = document.getElementById("tokenizer-overlay");
  const activeRow = overlay.querySelector(".param-row.active-target");
  const paramName = activeRow.querySelector('input[type="radio"]').value;
  const gluedText = activeRow.querySelector(".param-preview").textContent;

  const applyToAll = overlay.querySelector(".fallback-apply-all").checked;

  // Вызываем оригинальную функцию завершения Токенизатора
  // (функцию lockParameter нужно вынести из локальной области или сымитировать клик.
  // Проще всего сохранить значения в глобальные переменные и сымитировать клик по старой кнопке btn-fallback)

  window.tempFallbackVal = val;
  window.tempFallbackApplyAll = applyToAll;

  const btnFallback = overlay.querySelector(".btn-fallback");
  if (btnFallback) btnFallback.click();
};

// === УНИВЕРСАЛЬНАЯ НОРМАЛИЗАЦИЯ, КАНОНИЧНОЕ СОПОСТАВЛЕНИЕ С VALUES И МАСОЧНАЯ СКЛЕЙКА ===

window.normalizeKaspiNumericTokens = function (rawValue) {
    const str = String(rawValue === undefined || rawValue === null ? "" : rawValue)
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (!str) return "";

    return str.replace(/(\d+)([.,])(\d+)/g, function (_m, intPart, sep, fracPart) {
        const trimmed = fracPart.replace(/0+$/, "");
        if (!trimmed) return intPart;
        return intPart + "." + trimmed;
    });
};

window.canonicalizeForDictCompare = function (rawValue) {
    let s = String(rawValue === undefined || rawValue === null ? "" : rawValue)
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    if (!s) return "";

    // Унификация знаков умножения: ×, * и кириллическая «х» рядом с цифрами -> латинская x
    s = s.replace(/[×*]/g, "x");
    s = s.replace(/(\d)\s*[хx]\s*(\d)/gi, "$1x$2");
    s = s.replace(/(\d)\s*\/\s*(\d)/g, "$1/$2");

    // Унификация десятичного разделителя и удаление хвостовых нулей
    s = s.replace(/(\d+),(\d+)/g, "$1.$2");
    s = s.replace(/(\d+)\.(\d+)/g, function (_m, intPart, fracPart) {
        const trimmed = fracPart.replace(/0+$/, "");
        return trimmed ? intPart + "." + trimmed : intPart;
    });

    return s.trim();
};

window.resolveKaspiDictForAttr = function (attrKey, sysKey) {
    const dicts =
        window.kaspiDicts ||
        (window.currentTemplateData && window.currentTemplateData.dictionary) ||
        (window.mapper2State && window.mapper2State.dictionary) ||
        {};
    const sysToHuman =
        (window.mapper2State && window.mapper2State.sysToHumanMap) || {};

    const candidates = new Set();
    const addCandidate = (k) => {
        const raw = String(k || "").trim();
        if (!raw) return;
        candidates.add(raw.toLowerCase());
        const noStar = raw.replace(/\*/g, "").replace(/\s+/g, " ").trim().toLowerCase();
        if (noStar) candidates.add(noStar);
    };

    addCandidate(attrKey);
    addCandidate(sysKey);
    if (attrKey && sysToHuman[attrKey]) addCandidate(sysToHuman[attrKey]);
    if (sysKey && sysToHuman[sysKey]) addCandidate(sysToHuman[sysKey]);

    if (window.currentTemplateData && Array.isArray(window.currentTemplateData.systemKeys) && Array.isArray(window.currentTemplateData.humanNames)) {
        const sKeys = window.currentTemplateData.systemKeys;
        const hNames = window.currentTemplateData.humanNames;
        for (let i = 0; i < sKeys.length; i++) {
            const sk = String(sKeys[i] || "").trim().toLowerCase();
            const hn = String(hNames[i] || "").replace(/\*/g, "").trim().toLowerCase();
            if ((sk && candidates.has(sk)) || (hn && candidates.has(hn))) {
                addCandidate(sKeys[i]);
                addCandidate(hNames[i]);
            }
        }
    }

    const foundKey = Object.keys(dicts).find((dk) => {
        const c1 = String(dk || "").trim().toLowerCase();
        const c2 = c1.replace(/\*/g, "").replace(/\s+/g, " ").trim();
        return candidates.has(c1) || candidates.has(c2);
    });
    if (!foundKey) return null;

    let d = dicts[foundKey];
    if (d && !Array.isArray(d) && typeof d === "object") {
        d = Object.values(d);
    }
    return Array.isArray(d) && d.length > 0 ? d : null;
};

window.matchValueInKaspiDict = function (rawValue, dictArray) {
    const cleanRaw = String(rawValue === undefined || rawValue === null ? "" : rawValue)
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const normalized = window.normalizeKaspiNumericTokens(cleanRaw);

    if (!cleanRaw) {
        return { matched: true, value: "", normalized: "", isDictField: Boolean(Array.isArray(dictArray) && dictArray.length > 0) };
    }

    if (!Array.isArray(dictArray) || dictArray.length === 0) {
        return { matched: true, value: normalized || cleanRaw, normalized: normalized || cleanRaw, isDictField: false };
    }

    const lowerRaw = cleanRaw.toLowerCase();
    const cmpTarget = window.canonicalizeForDictCompare(cleanRaw);

    // 1. Точное совпадение (без учёта регистра/краевых пробелов)
    for (let i = 0; i < dictArray.length; i++) {
        const dv = String(dictArray[i] || "").trim();
        if (!dv) continue;
        if (dv.toLowerCase() === lowerRaw) {
            return { matched: true, value: dv, normalized, isDictField: true };
        }
    }

    // 2. Каноничное сравнение полной строки (учитывает ,/. , ×/х/x , хвостовые нули)
    for (let i = 0; i < dictArray.length; i++) {
        const dv = String(dictArray[i] || "").trim();
        if (!dv) continue;
        if (window.canonicalizeForDictCompare(dv) === cmpTarget) {
            return { matched: true, value: dv, normalized, isDictField: true };
        }
    }

    // 3. Каноничное сравнение базы до скобки (например, "67" -> "67 (307 кг)", "149/146" -> "149/146 (3250 кг)")
    for (let i = 0; i < dictArray.length; i++) {
        const dv = String(dictArray[i] || "").trim();
        if (!dv || !dv.includes("(")) continue;
        const baseDv = dv.split("(")[0].trim();
        if (baseDv && window.canonicalizeForDictCompare(baseDv) === cmpTarget) {
            return { matched: true, value: dv, normalized, isDictField: true };
        }
    }

    // Не найдено в values — НЕ обнуляем и НЕ обрезаем, возвращаем нормализованное значение
    return { matched: false, value: normalized || cleanRaw, normalized: normalized || cleanRaw, isDictField: true };
};

// Атомарная разбивка строки на числа (включая дробные 8.5 / 114,3), слова, разделители и пробелы
function tokenizeAtomStream(inputStr) {
    const s = String(inputStr || "").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    if (!s) return [];

    const rawMatches = s.match(/\d+(?:[.,]\d+)?|[a-zA-Zа-яА-ЯёЁ]+|\s+|[^\s\wа-яА-ЯёЁ]/g) || [];
    const atoms = rawMatches.map((text) => {
        if (/^\s+$/.test(text)) {
            return { text: " ", type: "SPACE", norm: " " };
        }
        if (/^\d+(?:[.,]\d+)?$/.test(text)) {
            return { text, type: "N", norm: window.canonicalizeForDictCompare(text) };
        }
        if (/^[a-zA-Zа-яА-ЯёЁ]+$/.test(text)) {
            return { text, type: "W", norm: text.toLowerCase() };
        }
        const normSep = text === "×" || text === "*" ? "x" : text;
        return { text, type: "S", norm: normSep };
    });

    // Одиночная буква x / х между двумя числами (5x100, 5х114,3) — структурный разделитель "x"
    for (let i = 1; i < atoms.length - 1; i++) {
        if (atoms[i].type === "W" && (atoms[i].norm === "x" || atoms[i].norm === "х")) {
            let prevIdx = i - 1;
            while (prevIdx >= 0 && atoms[prevIdx].type === "SPACE") prevIdx--;
            let nextIdx = i + 1;
            while (nextIdx < atoms.length && atoms[nextIdx].type === "SPACE") nextIdx++;
            if (prevIdx >= 0 && nextIdx < atoms.length && atoms[prevIdx].type === "N" && atoms[nextIdx].type === "N") {
                atoms[i].type = "S";
                atoms[i].norm = "x";
            }
        }
    }

    return atoms;
}

// Извлечение структурных масок (N/N, NxN/N, NxN/NxN...) и многословных фраз строго из выбранных колонок values
function buildMaskAndPhraseIndex(selectedParams) {
    const maskToParams = new Map();       // mask string (e.g. "N/N", "NxN/N") -> Set<param>
    const maskLengths = new Set();        // длины масок в атомах без пробелов (>= 3)
    const phraseList = [];                // [{ normPhrase, words, param }] отсортированы от самых длинных
    const phraseSeen = new Set();
    const paramDicts = {};                // param -> raw dict array
    const paramCanonicalSets = {};        // param -> Set<canonical>
    let numericParamCount = 0;

    (selectedParams || []).forEach((param) => {
        const dict = window.resolveKaspiDictForAttr(param);
        if (!dict || dict.length === 0) return;

        paramDicts[param] = dict;
        const canonSet = new Set();
        let hasNumeric = false;

        dict.forEach((rawVal) => {
            const fullStr = String(rawVal || "").trim();
            if (!fullStr) return;

            const baseStr = fullStr.includes("(") ? fullStr.split("(")[0].trim() : fullStr;
            if (!baseStr) return;

            canonSet.add(window.canonicalizeForDictCompare(fullStr));
            canonSet.add(window.canonicalizeForDictCompare(baseStr));

            if (/\d/.test(baseStr)) hasNumeric = true;

            // 1. Многословные текстовые фразы из values (например, "под клин")
            if (/\s/.test(baseStr) && /[a-zA-Zа-яА-ЯёЁ]/.test(baseStr)) {
                const normPhrase = baseStr.replace(/\s+/g, " ").trim().toLowerCase();
                const words = normPhrase.split(" ").filter(Boolean);
                if (words.length >= 2) {
                    const pKey = normPhrase + "||" + param;
                    if (!phraseSeen.has(pKey)) {
                        phraseSeen.add(pKey);
                        phraseList.push({ normPhrase, words, param, len: normPhrase.length });
                    }
                }
            }

            // 2. Структурные маски с заменой чисел на N (например, 8/9 -> N/N, 5x100/114.3 -> NxN/N, 4x100/5x100 -> NxN/NxN)
            const atoms = tokenizeAtomStream(baseStr).filter((a) => a.type !== "SPACE");
            if (atoms.length >= 3) {
                const hasN = atoms.some((a) => a.type === "N");
                const hasS = atoms.some((a) => a.type === "S");
                const allValidMaskAtoms = atoms.every((a) => a.type === "N" || a.type === "S");
                if (hasN && hasS && allValidMaskAtoms) {
                    const mask = atoms.map((a) => (a.type === "N" ? "N" : a.norm)).join("");
                    if (!maskToParams.has(mask)) maskToParams.set(mask, new Set());
                    maskToParams.get(mask).add(param);
                    maskLengths.add(atoms.length);
                }
            }
        });

        paramCanonicalSets[param] = canonSet;
        if (hasNumeric) numericParamCount++;
    });

    // Сортируем фразы и длины масок по убыванию (Longest-Match)
    phraseList.sort((a, b) => b.words.length - a.words.length || b.len - a.len);
    const sortedMaskLengths = Array.from(maskLengths).sort((a, b) => b - a);

    return {
        maskToParams,
        sortedMaskLengths,
        phraseList,
        paramDicts,
        paramCanonicalSets,
        numericParamCount,
    };
}

// Вспомогательная функция: Очистка словарей Каспи от приписок в скобках
function getCleanDictValues(sysKey) {
    const dict = window.resolveKaspiDictForAttr(sysKey);
    if (!dict) return [];

    return dict.map((val) => {
        return String(val).split("(")[0].trim().toUpperCase();
    });
}

// Единый расчёт сигнатуры структуры токенов (для карантина, Токенизатора и applyMapper2Logic)
window.computeSmartTokenSignature = function (tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) return "";
    const sigTokens = tokens.filter((t) => {
        const clean = String(t.cleanText || "").trim();
        if (!clean) return false;
        // Одиночные/буквенные разделители (например, "R", "LT", "PR") не меняют структурную сигнатуру,
        // но многословные/активные фразы из словаря ("под клин") учитываем как токен значения
        if (!t.isPhrase && /^[a-zA-Zа-яА-ЯёЁ]+$/.test(clean)) return false;
        return true;
    });
    return sigTokens
        .map((t) => (/\d/.test(t.cleanText) || t.isPhrase ? "N" : "S"))
        .join("-");
};

// Главная функция пре-матчинга: Longest-Match масочная и фразовая склейка + сверка с values выбранных колонок
function parseAndMatchTokens(rawString, colName, explicitParams) {
    const selectedParams = Array.isArray(explicitParams)
        ? explicitParams
        : (window.mapper2State && window.mapper2State.smartRules
            ? window.mapper2State.smartRules[colName] || []
            : []);

    const index = buildMaskAndPhraseIndex(selectedParams);
    const atoms = tokenizeAtomStream(rawString);
    if (atoms.length === 0) return [];

    const findDictMatches = (candidateStr) => {
        const cmp = window.canonicalizeForDictCompare(candidateStr);
        if (!cmp) return [];
        const matched = [];
        Object.keys(index.paramCanonicalSets).forEach((param) => {
            if (index.paramCanonicalSets[param].has(cmp)) {
                matched.push(param);
            }
        });
        return matched;
    };

    const totalNumericAtoms = atoms.filter((a) => a.type === "N").length;
    const processedTokens = [];
    let i = 0;

    while (i < atoms.length) {
        if (atoms[i].type === "SPACE") {
            i++;
            continue;
        }

        // 1. Жадная склейка многословных текстовых фраз из values (Longest-Match, например "под клин")
        let phraseMatched = null;
        if (index.phraseList.length > 0 && atoms[i].type === "W") {
            for (let p = 0; p < index.phraseList.length; p++) {
                const ph = index.phraseList[p];
                let cursor = i;
                let wordIdx = 0;
                const collected = [];
                while (cursor < atoms.length && wordIdx < ph.words.length) {
                    if (atoms[cursor].type === "SPACE") {
                        collected.push(" ");
                        cursor++;
                        continue;
                    }
                    if (atoms[cursor].norm === ph.words[wordIdx]) {
                        collected.push(atoms[cursor].text);
                        wordIdx++;
                        cursor++;
                    } else {
                        break;
                    }
                }
                if (wordIdx === ph.words.length) {
                    const phraseText = collected.join("").replace(/\s+/g, " ").trim();
                    const matchedParams = findDictMatches(phraseText);
                    if (!matchedParams.includes(ph.param)) matchedParams.push(ph.param);
                    phraseMatched = {
                        endCursor: cursor,
                        token: {
                            text: phraseText,
                            cleanText: phraseText.toUpperCase(),
                            normalizedText: phraseText,
                            isActive: true,
                            isPhrase: true,
                            isOutOfDict: false,
                            matchedParams: matchedParams,
                        },
                    };
                    break;
                }
            }
        }

        if (phraseMatched) {
            processedTokens.push(phraseMatched.token);
            i = phraseMatched.endCursor;
            continue;
        }

        // 2. Жадная склейка по структурным маскам из values выбранных колонок (Longest-Match: NxN/NxN -> NxN/N -> N/N)
        let maskMatched = null;
        if (atoms[i].type === "N" && index.sortedMaskLengths.length > 0) {
            for (let li = 0; li < index.sortedMaskLengths.length; li++) {
                const targetLen = index.sortedMaskLengths[li];

                // Собираем targetLen не-пробельных атомов (без разрыва через пробелы, кроме опциональных пробелов вокруг / и x)
                const sliceAtoms = [];
                let cursor = i;
                let validSlice = true;
                while (cursor < atoms.length && sliceAtoms.length < targetLen) {
                    const a = atoms[cursor];
                    if (a.type === "SPACE") {
                        // Пробел допустим только между числом и оператором / или x
                        const prevA = sliceAtoms[sliceAtoms.length - 1];
                        const nextA = atoms[cursor + 1];
                        if (
                            prevA &&
                            nextA &&
                            ((prevA.type === "N" && nextA.type === "S") ||
                                (prevA.type === "S" && nextA.type === "N"))
                        ) {
                            cursor++;
                            continue;
                        }
                        validSlice = false;
                        break;
                    }
                    if (a.type !== "N" && a.type !== "S") {
                        validSlice = false;
                        break;
                    }
                    sliceAtoms.push(a);
                    cursor++;
                }

                if (!validSlice || sliceAtoms.length !== targetLen) continue;
                if (sliceAtoms[sliceAtoms.length - 1].type !== "N") continue;

                const mask = sliceAtoms
                    .map((a) => (a.type === "N" ? "N" : a.norm))
                    .join("");
                if (!index.maskToParams.has(mask)) continue;

                const gluedRaw = sliceAtoms.map((a) => a.text).join("");
                const exactParams = findDictMatches(gluedRaw);
                const maskParams = Array.from(index.maskToParams.get(mask));

                // Защита от пересклейки (например, 205/55R16 при 3 выбранных числовых параметрах Ширина+Высота+Диаметр):
                // если точного совпадения в values нет, проверяем, не "съедает" ли склейка раздельные валидные параметры
                if (exactParams.length === 0 && index.numericParamCount >= 3) {
                    const gluedNumericCount = sliceAtoms.filter((a) => a.type === "N").length;
                    const projectedTotalNumeric = totalNumericAtoms - gluedNumericCount + 1;
                    if (projectedTotalNumeric < index.numericParamCount) {
                        const subNums = sliceAtoms.filter((a) => a.type === "N");
                        const distinctSubParamSets = subNums.map((sn) => findDictMatches(sn.text));
                        const allSubMatchSomeParam = distinctSubParamSets.every((arr) => arr.length > 0);
                        const unionParams = new Set(distinctSubParamSets.flat());
                        if (allSubMatchSomeParam && unionParams.size >= subNums.length) {
                            continue; // Оставляем раздельными (205 и 55 для разных колонок)
                        }
                    }
                }

                const normalizedText = window.normalizeKaspiNumericTokens(gluedRaw);
                const finalParams = exactParams.length > 0 ? exactParams : maskParams;

                maskMatched = {
                    endCursor: cursor,
                    token: {
                        text: gluedRaw,
                        cleanText: normalizedText.toUpperCase(),
                        normalizedText: normalizedText,
                        isActive: true,
                        isMaskMatch: true,
                        matchedMask: mask,
                        isOutOfDict: exactParams.length === 0,
                        matchedParams: finalParams,
                    },
                };
                break;
            }
        }

        if (maskMatched) {
            processedTokens.push(maskMatched.token);
            i = maskMatched.endCursor;
            continue;
        }

        // 3. Одиночный токен (число включая дробное 10.00 / 22.5, слово или разделитель)
        const atom = atoms[i];
        const normalizedText =
            atom.type === "N"
                ? window.normalizeKaspiNumericTokens(atom.text)
                : atom.text;
        const matchedParams =
            atom.type === "N" || atom.type === "W"
                ? findDictMatches(atom.text)
                : [];
        const isNumberFallbackActive = atom.type === "N" && index.numericParamCount > 0;

        processedTokens.push({
            text: atom.text,
            cleanText: normalizedText.toUpperCase(),
            normalizedText: normalizedText,
            isActive: matchedParams.length > 0 || isNumberFallbackActive,
            isOutOfDict: matchedParams.length === 0 && isNumberFallbackActive,
            matchedParams: matchedParams,
        });

        i++;
    }

    return processedTokens;
}

// Расчёт якорных метаданных слота (якорь-разделитель вроде R, позиция с конца / с начала среди числовых токенов)
window.computeSlotAnchorMeta = function (tokens, selectedUniversalIndices) {
    if (!Array.isArray(tokens) || tokens.length === 0 || !Array.isArray(selectedUniversalIndices) || selectedUniversalIndices.length === 0) {
        return null;
    }

    const valueTokens = tokens.filter((t) => /\d/.test(t.cleanText) || t.isPhrase);
    const targetUni = selectedUniversalIndices[0];
    const tokIdx = tokens.findIndex((t) => t.universalIndex === targetUni);
    if (tokIdx === -1) return null;

    const tok = tokens[tokIdx];
    const prevTok = tokIdx > 0 ? tokens[tokIdx - 1] : null;
    let afterDelimiter = "";
    if (prevTok && !/\d/.test(prevTok.cleanText) && !prevTok.isPhrase) {
        const cleanPrev = String(prevTok.cleanText || "").trim().toUpperCase();
        if (cleanPrev && cleanPrev.length <= 4) {
            afterDelimiter = cleanPrev;
        }
    }

    const valPos = valueTokens.indexOf(tok);
    return {
        afterDelimiter: afterDelimiter,
        fromStartValueIdx: valPos >= 0 ? valPos : -1,
        fromEndValueIdx: valPos >= 0 ? valueTokens.length - 1 - valPos : -1,
        matchedMask: tok.matchedMask || "",
    };
};

// Извлечение значения токена по точному правилу сигнатуры или по якорю-разделителю / позиции с конца
window.extractTokenByRuleOrAnchor = function (tokenObjects, colSplitRules, sig, primaryKey, dictArray) {
    if (!Array.isArray(tokenObjects) || tokenObjects.length === 0 || !colSplitRules) {
        return { matched: false, value: "" };
    }

    // 1. Точное совпадение по структурной сигнатуре
    if (sig && colSplitRules[sig] && Object.prototype.hasOwnProperty.call(colSplitRules[sig], primaryKey)) {
        const targetIndices = colSplitRules[sig][primaryKey];
        if (targetIndices !== undefined && targetIndices !== null) {
            const indicesArray = Array.isArray(targetIndices) ? targetIndices : [targetIndices];
            const resultArr = [];
            indicesArray.forEach((targetIdx) => {
                const matchedTok = tokenObjects.find((t) => t.universalIndex === targetIdx);
                if (matchedTok) resultArr.push(matchedTok.text);
            });
            return { matched: true, value: resultArr.join("") };
        }
        return { matched: true, value: "" };
    }

    // 2. Якорная привязка для смешанных строк с другим числом токенов
    const anchorsMap = colSplitRules.__anchors__;
    const anchor = anchorsMap && anchorsMap[primaryKey];
    if (!anchor) {
        return { matched: false, value: "" };
    }

    const valueTokens = tokenObjects.filter((t) => /\d/.test(t.cleanText) || t.isPhrase);

    // 2а. Привязка по якорю-разделителю (например, число сразу после R, /, ET, DIA)
    if (anchor.afterDelimiter) {
        for (let i = 1; i < tokenObjects.length; i++) {
            const prevClean = String(tokenObjects[i - 1].cleanText || "").trim().toUpperCase();
            if (prevClean === anchor.afterDelimiter && (/\d/.test(tokenObjects[i].cleanText) || tokenObjects[i].isPhrase)) {
                return { matched: true, value: tokenObjects[i].text };
            }
        }
    }

    // 2б. Если токен имел конкретную структурную маску (например, N/N или NxN/N)
    if (anchor.matchedMask) {
        const byMask = tokenObjects.find((t) => t.matchedMask === anchor.matchedMask);
        if (byMask) return { matched: true, value: byMask.text };
    }

    // 2в. Позиция с конца (последний токен, например диаметр) или с начала (первый токен)
    if (anchor.fromEndValueIdx === 0 && valueTokens.length > 0) {
        return { matched: true, value: valueTokens[valueTokens.length - 1].text };
    }
    if (anchor.fromStartValueIdx === 0 && valueTokens.length > 0) {
        return { matched: true, value: valueTokens[0].text };
    }
    if (anchor.fromEndValueIdx > 0 && valueTokens.length > anchor.fromEndValueIdx) {
        return { matched: true, value: valueTokens[valueTokens.length - 1 - anchor.fromEndValueIdx].text };
    }

    // 2г. Уникальное совпадение со справочником values этой колонки
    if (Array.isArray(dictArray) && dictArray.length > 0) {
        const dictHits = valueTokens.filter((t) => window.matchValueInKaspiDict(t.text, dictArray).matched);
        if (dictHits.length === 1) {
            return { matched: true, value: dictHits[0].text };
        }
    }

    return { matched: false, value: "" };
};

window.startTokenizerQueue = function() {
    // Если карантин пуст, идем дальше
    if (!window.mapper2State.quarantine || window.mapper2State.quarantine.length === 0) {
        const container = document.getElementById("smartMapperContainer");
        if (container) container.style.display = "none";
        
        if (typeof window.navigateIncomeStep === "function") {
            window.navigateIncomeStep(2);
        }
        return;
    }

    // Берем первую проблемную строку
    const currentItem = window.mapper2State.quarantine[0];
    const colName = currentItem.excelColumnName;
    const rawString = currentItem.rawString;
    const targetParams = window.mapper2State.smartRules[colName] || [];

    // 🔥 ШАГ 4.1: Вызываем умное ядро с масочной и фразовой склейкой
    let tokens = typeof parseAndMatchTokens === "function" 
        ? parseAndMatchTokens(rawString, colName) 
        : [];

    if (tokens.length === 0) {
        window.mapper2State.quarantine.shift();
        window.startTokenizerQueue();
        return;
    }

    // 🔥 ШАГ 4.2: Индексация "Smart Skeleton" относительно якоря (первого числа)
    let anchorIndex = tokens.findIndex(t => /\d/.test(t.cleanText) || t.isPhrase);
    if (anchorIndex === -1) anchorIndex = 0;

    // Присваиваем универсальный индекс (Якорь = 100)
    tokens.forEach((tok, idx) => {
        tok.universalIndex = 100 + (idx - anchorIndex);
    });

    // 🔥 ШАГ 4.3: Единый расчёт сигнатуры структуры
    const sig = window.computeSmartTokenSignature(tokens);

    // Получаем все переводы для текущего языка
    const lang = (typeof currentLang !== "undefined" && currentLang) || window.appCurrentLang || "ru";
    const tDict = (typeof translations !== "undefined" && (translations[lang] || translations.ru)) || {};
    const tDataLink = tDict.split_data_link || "";
    const tFound = tDict.split_found_in_invoice || "";
    const tDistribute = tDict.split_distribute_values || "";
    const tMatchesFor = tDict.split_matches_for || "";
    const placeholderText = tDict.split_click_above || "";
    const confirmBtnText = tDict.split_confirm_structure || "";

    // Отрисовываем интерфейс строго через DOM API / textContent (XSS-safe)
    const container = document.getElementById("smartMapperContainer");
    if (!container) return;
    container.textContent = "";
    container.style.display = "flex";

    const modal = document.createElement("div");
    modal.className = "smart-modal-content tokenizer-modal";

    const header = document.createElement("div");
    header.className = "smart-modal-header";
    header.appendChild(document.createTextNode(tDataLink + " "));
    const colSpan = document.createElement("span");
    colSpan.style.color = "var(--accent-blue)";
    colSpan.textContent = String(colName || "").toUpperCase();
    header.appendChild(colSpan);
    modal.appendChild(header);

    const body = document.createElement("div");
    body.className = "smart-modal-body";

    const tokensSection = document.createElement("div");
    tokensSection.className = "tokenizer-section";
    const foundDiv = document.createElement("div");
    foundDiv.className = "smart-question";
    foundDiv.appendChild(document.createTextNode(tFound + " "));
    const foundStrong = document.createElement("strong");
    foundStrong.textContent = String(rawString || "");
    foundDiv.appendChild(foundStrong);
    tokensSection.appendChild(foundDiv);

    const tokensContainer = document.createElement("div");
    tokensContainer.className = "tokens-visual-container";

    tokens.forEach((tok) => {
        if (tok.isActive) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "token-btn active-token";
            btn.dataset.indices = String(tok.universalIndex);
            if (tok.matchedParams && tok.matchedParams.length > 0) {
                btn.title = `${tMatchesFor} ${tok.matchedParams.join(", ")}`;
            }
            btn.textContent = tok.text;
            tokensContainer.appendChild(btn);
        } else {
            const span = document.createElement("span");
            span.className = "token-text passive-token";
            span.textContent = tok.text;
            tokensContainer.appendChild(span);
        }
    });

    tokensSection.appendChild(tokensContainer);
    body.appendChild(tokensSection);

    const paramsSection = document.createElement("div");
    paramsSection.className = "tokenizer-section";
    const distDiv = document.createElement("div");
    distDiv.className = "smart-question";
    distDiv.style.marginTop = "20px";
    distDiv.textContent = tDistribute;
    paramsSection.appendChild(distDiv);

    const paramsGrid = document.createElement("div");
    paramsGrid.className = "params-match-grid";

    targetParams.forEach((paramName) => {
        const suggestedToken = tokens.find(
            (t) => t.isActive && t.matchedParams.includes(paramName) && t.matchedParams.length === 1,
        );
        const defaultVal = suggestedToken ? suggestedToken.text : "";
        const defaultIndices = suggestedToken ? String(suggestedToken.universalIndex) : "";

        const rowEl = document.createElement("div");
        rowEl.className = "match-row";
        rowEl.dataset.param = paramName;

        const labelEl = document.createElement("div");
        labelEl.className = "match-label";
        labelEl.textContent = paramName;

        const zoneEl = document.createElement("div");
        zoneEl.className = defaultVal ? "match-dropzone filled" : "match-dropzone";
        zoneEl.dataset.assignedIndices = defaultIndices;
        zoneEl.textContent = defaultVal || placeholderText;

        rowEl.appendChild(labelEl);
        rowEl.appendChild(zoneEl);
        paramsGrid.appendChild(rowEl);
    });

    paramsSection.appendChild(paramsGrid);
    body.appendChild(paramsSection);

    const footer = document.createElement("div");
    footer.className = "smart-modal-footer";
    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "confirm-btn btn-primary green";
    confirmBtn.id = "btnNextToken";
    confirmBtn.setAttribute("data-i18n", "split_confirm_structure");
    confirmBtn.style.cssText = "width: 100%; padding: 12px; font-weight: bold; border-radius: 8px;";
    confirmBtn.textContent = confirmBtnText;
    footer.appendChild(confirmBtn);

    body.appendChild(footer);
    modal.appendChild(body);
    container.appendChild(modal);

    let selectedTokenBtn = null;
    const tokenBtns = tokensContainer.querySelectorAll(".active-token");
    tokenBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            tokenBtns.forEach((b) => b.classList.remove("selected"));
            this.classList.add("selected");
            selectedTokenBtn = this;
        });
    });

    const dropzones = paramsGrid.querySelectorAll(".match-dropzone");
    dropzones.forEach((zone) => {
        zone.addEventListener("click", function () {
            if (selectedTokenBtn) {
                this.textContent = selectedTokenBtn.textContent;
                this.dataset.assignedIndices = selectedTokenBtn.dataset.indices;
                this.classList.add("filled");

                selectedTokenBtn.classList.remove("selected");
                selectedTokenBtn.classList.add("assigned");
                selectedTokenBtn = null;
            } else {
                this.textContent = placeholderText;
                this.dataset.assignedIndices = "";
                this.classList.remove("filled");
            }
        });
    });

    confirmBtn.addEventListener("click", () => {
        let ruleMap = {};
        let anchorMap = {};

        dropzones.forEach((zone) => {
            const param = String(zone.closest(".match-row").dataset.param).trim();
            const indicesStr = zone.dataset.assignedIndices;

            if (indicesStr !== "") {
                let sysId = param;

                if (window.currentTemplateData && window.currentTemplateData.humanNames && window.currentTemplateData.systemKeys) {
                    const hNames = window.currentTemplateData.humanNames;
                    const sKeys = window.currentTemplateData.systemKeys;

                    for (let i = 0; i < hNames.length; i++) {
                        if (String(hNames[i]).trim() === param) {
                            sysId = sKeys[i];
                            break;
                        }
                    }
                }

                const parsedIndices = indicesStr.split(",").map(Number);
                ruleMap[sysId] = parsedIndices;

                const meta = window.computeSlotAnchorMeta(tokens, parsedIndices);
                if (meta) {
                    anchorMap[sysId] = meta;
                }
            }
        });

        window.mapper2State.splitRules = window.mapper2State.splitRules || {};
        window.mapper2State.splitRules[colName] = window.mapper2State.splitRules[colName] || {};
        window.mapper2State.splitRules[colName][sig] = ruleMap;
        window.mapper2State.splitRules[colName].__anchors__ = Object.assign(
            {},
            window.mapper2State.splitRules[colName].__anchors__ || {},
            anchorMap,
        );

        window.mapper2State.quarantine.shift();
        window.startTokenizerQueue();
    });
};