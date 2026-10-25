/**
 * Детектор сложных колонок (Smart Hybrid Mapper)
 * @param {Array} headers - Массив названий колонок (шапок), например: ['Бренд', 'Size', 'Цена']
 * @param {Array} rows - Массив массивов с данными, например: [['Nokian', '205/55R16', '25000'], ...]
 * @returns {Array} - Массив объектов с найденными сложными колонками и их максимальными примерами
 */
window.detectComplexColumns = function (headers, rows) {
  if (!headers || !rows || headers.length === 0 || rows.length === 0) return [];

  const dict =
    window.mapper2State?.dictValues ||
    (typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : {});

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

    const modal = document.createElement("div");
    modal.className = "smart-modal-content";

    const header = document.createElement("div");
    header.className = "smart-modal-header";
    header.setAttribute("data-i18n", "smart_mapper_title");
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
        const colIdx = headers.findIndex(h => String(h).trim() === col.colName);
        
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

        let initialChips = currentSavedParams.length > 0 
            ? kaspiParams.filter((p) => currentSavedParams.includes(p.id)).map((p) => `<span class="chip">${p.name}</span>`).join("")
            : `<span class="empty-chips" data-i18n="smart_mapper_empty">Не выбрано</span>`;

        card.innerHTML = `
            <div class="smart-col-info">
                <span data-i18n="smart_mapper_col_prefix">Колонка:</span> <span>${translatedName.toUpperCase()}</span>
                <div style="margin-top: 8px; font-size: 14px; color: var(--accent-yellow);">Пример из файла: <strong style="color:var(--text-main); font-family:monospace; font-size:16px;">${bestExample}</strong></div>
            </div>
            <div class="smart-chips-area">
                <div class="chips-title" data-i18n="smart_mapper_you_selected">Вы выбрали:</div>
                <div class="chips-container">${initialChips}</div>
            </div>
            <div class="smart-question" data-i18n="smart_mapper_question">Какие параметры здесь есть?</div>
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
                chipsContainer.innerHTML = selected.length > 0 ? selected.map((name) => `<span class="chip">${name}</span>`).join("") : `<span class="empty-chips" data-i18n="smart_mapper_empty">Не выбрано</span>`;
            });
        });
    });

    modal.appendChild(body);

    let backBtnText = "НАЗАД", confirmBtnText = "ПОДТВЕРДИТЬ";
    if (typeof translations !== "undefined" && typeof currentLang !== "undefined" && translations[currentLang]) {
        backBtnText = translations[currentLang]["smart_mapper_back"] || translations[currentLang]["cancel"] || backBtnText;
        confirmBtnText = translations[currentLang]["smart_mapper_btn"] || confirmBtnText;
    }

    const footer = document.createElement("div");
    footer.className = "smart-modal-footer";
    footer.innerHTML = `
        <div style="display: flex; gap: 10px; width: 100%;">
            <button class="cancel-btn" id="smartBackBtn" style="flex: 1; font-weight: bold; padding: 12px; border-radius: 8px;">${backBtnText}</button>
            <button class="confirm-btn btn-primary green" id="smartConfirmBtn" style="flex: 2; font-weight: bold; padding: 12px; border-radius: 8px;">${confirmBtnText}</button>
        </div>
    `;
    body.appendChild(footer);
    container.appendChild(modal);

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
                            
                            if (tokens.length > 1) {
                                // 🔥 ВОЗВРАЩАЕМ ТРЮК: Игнорируем буквы при создании слепка структуры!
                                // Теперь LT205/70R15W и 175/70R13 получат один и тот же слепок N-S-N-N
                                const sigTokens = tokens.filter(t => !/^[a-zA-Zа-яА-ЯёЁ]+$/.test(t.cleanText));
                                const sig = sigTokens.map(t => /\d/.test(t.cleanText) ? 'N' : 'S').join('-');

                                if (!signatureMap[sig]) {
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

// Вспомогательная функция: Очистка словарей Каспи от приписок в скобках
function getCleanDictValues(sysKey) {
    const dict = window.kaspiDicts || {};
    if (!dict[sysKey]) return [];
    
    return dict[sysKey].map(val => {
        // Берем строку, отрезаем всё после первой скобки, убираем пробелы по краям и переводим в верхний регистр
        return String(val).split('(')[0].trim().toUpperCase();
    });
}

// Главная функция пре-матчинга: режет строку, сверяет с базой
function parseAndMatchTokens(rawString, colName) {
    let cleanString = String(rawString).replace(/\s+/g, (match, offset, string) => {
        const prev = string[offset - 1];
        const next = string[offset + match.length];
        if (prev && next && /\d/.test(prev) && /\d/.test(next)) return ' '; 
        return ''; 
    });

    const regex = /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]|\s/g;
    let rawTokens = cleanString.match(regex) || [];
    let processedTokens = [];
    
    let selectedParams = window.mapper2State.smartRules[colName] || [];
    let validDicts = {};
    selectedParams.forEach(param => {
        validDicts[param] = typeof getCleanDictValues === "function" ? getCleanDictValues(param) : [];
    });

    const findInDicts = (val, isDec = false) => {
        let found = [];
        Object.keys(validDicts).forEach(param => {
            if (validDicts[param].includes(val) || (isDec && validDicts[param].some(v => Number(v) === Number(val)))) {
                found.push(param);
            }
        });
        return found;
    };

    let i = 0;
    while (i < rawTokens.length) {
        let text = rawTokens[i];
        let isDecimal = false;
        let matchedParams = [];
        let skip = 1;
        let mergedDisplay = text;
        let matchValue = text.toUpperCase();

        if (/\d/.test(text) && i + 2 < rawTokens.length) {
            let nextTok = rawTokens[i + 1];
            let nextNextTok = rawTokens[i + 2];
            
            if ((nextTok === '.' || nextTok === ',') && /\d/.test(nextNextTok)) {
                let potentialMatch = (text + '.' + nextNextTok).toUpperCase();
                let found = findInDicts(potentialMatch, true);
                
                if (found.length > 0) {
                    isDecimal = true;
                    matchedParams = found;
                    mergedDisplay = text + nextTok + nextNextTok;
                    matchValue = potentialMatch;
                    skip = 3;
                }
            }
        }

        if (!isDecimal && text.trim() !== "") {
             matchedParams = findInDicts(matchValue);
        }

        // БОЛЬШЕ НИКАКОГО СЛИЯНИЯ МУСОРА! Каждый токен строго на своем месте.
        processedTokens.push({
            text: mergedDisplay,
            cleanText: matchValue,
            isActive: matchedParams.length > 0, // Активен только если найден
            matchedParams: matchedParams
        });
        
        i += skip;
    }

    return processedTokens;
}

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

    // 🔥 ШАГ 4.1: Вызываем наше новое умное ядро! (Никакого дублирования кода)
    let tokens = typeof parseAndMatchTokens === "function" 
        ? parseAndMatchTokens(rawString, colName) 
        : [];

    if (tokens.length === 0) {
        window.mapper2State.quarantine.shift();
        window.startTokenizerQueue();
        return;
    }

    // 🔥 ШАГ 4.2: Индексация "Smart Skeleton" относительно якоря (первого числа)
    let anchorIndex = tokens.findIndex(t => /\d/.test(t.cleanText));
    if (anchorIndex === -1) anchorIndex = 0; // Если чисел вообще нет (редкость), якорем будет первый элемент

    // Присваиваем универсальный индекс (Якорь = 100)
    tokens.forEach((tok, idx) => {
        tok.universalIndex = 100 + (idx - anchorIndex);
    });

    // 🔥 ШАГ 4.3: Применяем трюк Сита — фильтруем буквы, чтобы структуры совпадали
    const sigTokens = tokens.filter(t => !/^[a-zA-Zа-яА-ЯёЁ]+$/.test(t.cleanText));
    const sig = sigTokens.map(t => /\d/.test(t.cleanText) ? 'N' : 'S').join('-');

    // Отрисовываем интерфейс (Твоя верстка, адаптированная под новые индексы)
    const container = document.getElementById("smartMapperContainer");
    if (!container) return;
    container.innerHTML = "";
    container.style.display = "flex";

    const modal = document.createElement("div");
    modal.className = "smart-modal-content tokenizer-modal";

    const header = document.createElement("div");
    header.className = "smart-modal-header";
    header.innerHTML = `Связь данных: <span style="color: var(--accent-blue);">${colName.toUpperCase()}</span>`;
    modal.appendChild(header);

    const body = document.createElement("div");
    body.className = "smart-modal-body";

    const tokensSection = document.createElement("div");
    tokensSection.className = "tokenizer-section";
    tokensSection.innerHTML = `<div class="smart-question">Найдено в накладной: <strong>${rawString}</strong></div>`;
    
    const tokensContainer = document.createElement("div");
    tokensContainer.className = "tokens-visual-container";

    let activeTokensHtml = "";
    tokens.forEach((tok) => {
        if (tok.isActive) {
            let tooltip = tok.matchedParams.length > 0 ? `Подходит для: ${tok.matchedParams.join(', ')}` : "";
            // Используем новый универсальный индекс!
            activeTokensHtml += `<button class="token-btn active-token" data-indices="${tok.universalIndex}" title="${tooltip}">${tok.text}</button>`;
        } else {
            activeTokensHtml += `<span class="token-text passive-token">${tok.text}</span>`;
        }
    });
    
    tokensContainer.innerHTML = activeTokensHtml;
    tokensSection.appendChild(tokensContainer);
    body.appendChild(tokensSection);

    const paramsSection = document.createElement("div");
    paramsSection.className = "tokenizer-section";
    paramsSection.innerHTML = `<div class="smart-question" style="margin-top: 20px;">Распределите активные значения:</div>`;
    
    const paramsGrid = document.createElement("div");
    paramsGrid.className = "params-match-grid";

    targetParams.forEach(paramName => {
        // Ищем токен, который подходит
        let suggestedToken = tokens.find(t => t.isActive && t.matchedParams.includes(paramName) && t.matchedParams.length === 1);
        let defaultVal = suggestedToken ? suggestedToken.text : "";
        let defaultIndices = suggestedToken ? suggestedToken.universalIndex : "";

        paramsGrid.innerHTML += `
            <div class="match-row" data-param="${paramName}">
                <div class="match-label">${paramName}</div>
                <div class="match-dropzone" data-assigned-indices="${defaultIndices}">${defaultVal || "Кликните значение выше..."}</div>
            </div>
        `;
    });

    paramsSection.appendChild(paramsGrid);
    body.appendChild(paramsSection);

    const footer = document.createElement("div");
    footer.className = "smart-modal-footer";
    footer.innerHTML = `
        <button class="confirm-btn btn-primary green" id="btnNextToken" style="width: 100%; padding: 12px; font-weight: bold; border-radius: 8px;">ПОДТВЕРДИТЬ СТРУКТУРУ</button>
    `;
    body.appendChild(footer);
    modal.appendChild(body);
    container.appendChild(modal);

    let selectedTokenBtn = null;
    const tokenBtns = tokensContainer.querySelectorAll('.active-token');
    tokenBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tokenBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedTokenBtn = this;
        });
    });

    const dropzones = paramsGrid.querySelectorAll('.match-dropzone');
    dropzones.forEach(zone => {
        zone.addEventListener('click', function() {
            if (selectedTokenBtn) {
                this.textContent = selectedTokenBtn.textContent;
                this.dataset.assignedIndices = selectedTokenBtn.dataset.indices;
                this.classList.add('filled');
                
                selectedTokenBtn.classList.remove('selected');
                selectedTokenBtn.classList.add('assigned');
                selectedTokenBtn = null;
            } else {
                this.textContent = "Кликните значение выше...";
                this.dataset.assignedIndices = "";
                this.classList.remove('filled');
            }
        });
    });

    document.getElementById("btnNextToken").addEventListener("click", () => {
        let ruleMap = {};
        
        dropzones.forEach(zone => {
            const param = String(zone.closest('.match-row').dataset.param).trim();
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
                
                // Сохраняем универсальный индекс или массив индексов (если мультивыделение)
                ruleMap[sysId] = indicesStr.split(',').map(Number);
            }
        });

        window.mapper2State.splitRules = window.mapper2State.splitRules || {};
        window.mapper2State.splitRules[colName] = window.mapper2State.splitRules[colName] || {};
        window.mapper2State.splitRules[colName][sig] = ruleMap;

        window.mapper2State.quarantine.shift();
        window.startTokenizerQueue();
    });
};