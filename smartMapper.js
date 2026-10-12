/**
 * Детектор сложных колонок (Smart Hybrid Mapper)
 * @param {Array} headers - Массив названий колонок (шапок), например: ['Бренд', 'Size', 'Цена']
 * @param {Array} rows - Массив массивов с данными, например: [['Nokian', '205/55R16', '25000'], ...]
 * @returns {Array} - Массив объектов с найденными сложными колонками и их максимальными примерами
 */
window.detectComplexColumns = function (headers, rows) {
  if (!headers || !rows || headers.length === 0 || rows.length === 0) return [];

  const tData = window.currentTemplateData;
  let allowedHeadersLower = [];

  // 1. Смотрим в структуру шаблона Каспи: разрешаем сканировать только те поля, 
  // где в словаре встречаются цифры или короткие буквенные коды (например, размеры)
  if (tData && tData.humanNames && tData.dictionary) {
    for (let i = 0; i < tData.humanNames.length; i++) {
      const paramName = tData.humanNames[i];
      const dictData = tData.dictionary[paramName];
      
      if (Array.isArray(dictData)) {
          const isCodeOrNumber = dictData.some((ex) => {
              const str = String(ex).trim();
              return /\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3);
          });
          
          if (isCodeOrNumber) {
              allowedHeadersLower.push(String(paramName).toLowerCase().trim());
          }
      }
    }
  }

  // 2. Достаем синонимы из базы
  const dict = window.mapper2State?.dictValues || (typeof invoiceSynonyms !== "undefined" ? invoiceSynonyms : {});
  const compositeMarkers = dict["composite_column"] || dict["составная_колонка"] || ["размер", "specs", "параметры", "характеристики"];
  const compositeLower = compositeMarkers.map(s => String(s).toLowerCase().trim());

  const complexCols = [];

  headers.forEach((colName, colIndex) => {
    if (!colName) return;

    const cleanColName = String(colName).toLowerCase().trim();
    
    // ПРОПУСКАЕМ колонку, если она не похожа на сложный параметр Каспи 
    const isAllowed = allowedHeadersLower.some(h => cleanColName.includes(h)) || 
                      compositeLower.some(h => cleanColName.includes(h));
                      
    if (!isAllowed) return; // Игнорируем Артикулы, Бренды, Цены и другой мусор
    
    // ⚡ ХРАНИЛИЩЕ ДЛЯ ВСЕХ УНИКАЛЬНЫХ МАСОК (вместо одного рекорда)
    const uniqueMasks = new Map();
    const maxRows = Math.min(1000, rows.length);

    for (let i = 0; i < maxRows; i++) {
      const row = rows[i];
      if (!row) continue;

      const cellVal = row[colIndex];
      if (cellVal !== undefined && cellVal !== null && String(cellVal).trim() !== "") {
        const strVal = String(cellVal).trim();
        const isJustNumber = !isNaN(Number(strVal.replace(/,/g, "")));
        if (isJustNumber) continue;

        // ⚡ НОВАЯ РЕГУЛЯРКА (с честным отделением точки)
        const tokens = strVal.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [];
        
        // Если есть хотя бы 2 токена и строка содержит цифры
        if (tokens.length >= 2 && /\d/.test(strVal) && strVal.length < 40) {
          // Вычисляем структуру: N-A-N-S-N (Цифра-Буква-Цифра-Знак-Цифра)
          const mask = tokens.map(t => /^\d+$/.test(t) ? "N" : /^[a-zA-Zа-яА-ЯёЁ]+$/.test(t) ? "A" : "S").join("-");
          
          // Если такой маски еще не было ИЛИ текущая строка длиннее предыдущей с такой же маской
          if (!uniqueMasks.has(mask) || uniqueMasks.get(mask).length < strVal.length) {
            uniqueMasks.set(mask, strVal);
          }
        }
      }
    }

    // Превращаем карту масок в массив примеров (от длинных к коротким)
    const examples = Array.from(uniqueMasks.values()).sort((a, b) => b.length - a.length);

    if (examples.length > 0) {
      complexCols.push({ 
          colName: colName, 
          example: examples[0], // Первый элемент оставляем для совместимости со старым кодом
          examples: examples    // ⚡ ВЕСЬ массив уникальных паттернов для Токенизатора!
      });
    }
  });

  console.log("Детектор проверил файл. Найдено сложных колонок:", complexCols);
  return complexCols;
};

/**
 * Рендер модалки "Умное сито"
 * @param {Array} complexColumns - Результат работы detectComplexColumns()
 */
window.renderSmartMapperModal = function (complexColumns) {
  const container = document.getElementById("smartMapperContainer");
  if (!container) return;
  container.innerHTML = "";

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

  if (tData && tData.humanNames && tData.systemKeys) {
    // УНИВЕРСАЛЬНЫЙ ФИЛЬТР: Исключаем только железобетонные базовые параметры, 
    // которые никогда не бывают зашиты в сложные составные строки.
    const baseWords = ["sku", "brand", "price", "cost", "qty", "name", "model", "barcode", "артикул", "бренд", "цена", "количество", "название", "описание", "ссылка", "youtube", "вес"];

    for (let i = 0; i < tData.humanNames.length; i++) {
      const paramName = tData.humanNames[i];
      const sysKey = String(tData.systemKeys[i] || "").toLowerCase();
      const dictData = tData.dictionary ? tData.dictionary[paramName] : null;

      // Динамическая проверка: если системный ключ или имя содержат базовое слово - пропускаем
      const isBaseField = baseWords.some(w => sysKey.includes(w) || String(paramName).toLowerCase().includes(w));

      if (Array.isArray(dictData) && !isBaseField) {
        const validExamples = dictData.filter((val) => val && String(val).trim() !== "");
        
        if (validExamples.length > 0) {
          // Умный фильтр отсеет всё, где нет цифр или коротких кодов (оставит только размеры, индексы и т.д.)
          const isCodeOrNumber = validExamples.some((ex) => {
            const str = String(ex).trim();
            return (/\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3));
          });

          if (isCodeOrNumber) {
            kaspiParams.push({
              id: paramName,
              name: paramName,
              examples: validExamples.slice(0, 3),
            });
          }
        }
      }
    }
  }

  // === ЧТЕНИЕ СОХРАНЕННЫХ ПРАВИЛ ДЛЯ ВОССТАНОВЛЕНИЯ ГАЛОЧЕК ===
  window.mapper2State = window.mapper2State || {};
  const savedRules = window.mapper2State.smartRules || {};

  complexColumns.forEach((col) => {
    const card = document.createElement("div");
    card.className = "smart-mapper-card";
    card.dataset.colname = col.colName;

    const rawColName = String(col.colName).toLowerCase().trim();
    let translatedName = col.colName;
    if (typeof translations !== "undefined" && typeof currentLang !== "undefined") {
      if (translations[currentLang] && translations[currentLang][rawColName]) {
        translatedName = `${translations[currentLang][rawColName]} (${col.colName})`;
      }
    }

    const currentSavedParams = savedRules[col.colName] || [];

    let checkboxesHtml = kaspiParams
      .map((param) => {
        let exampleSpans = param.examples.map((ex) => `<span>${ex}</span>`).join("");
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

    let initialChips = "";
    if (currentSavedParams.length > 0) {
      let selectedNames = kaspiParams.filter((p) => currentSavedParams.includes(p.id)).map((p) => p.name);
      initialChips = selectedNames.map((name) => `<span class="chip">${name}</span>`).join("");
    } else {
      initialChips = `<span class="empty-chips" data-i18n="smart_mapper_empty"></span>`;
    }

    card.innerHTML = `
            <div class="smart-col-info">
                <span data-i18n="smart_mapper_col_prefix"></span> <span>${translatedName.toUpperCase()}</span>
                <strong>${col.example || ""}</strong>
            </div>
            <div class="smart-chips-area">
                <div class="chips-title" data-i18n="smart_mapper_you_selected"></div>
                <div class="chips-container">${initialChips}</div>
            </div>
            <div class="smart-question" data-i18n="smart_mapper_question"></div>
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
        if (this.checked) label.classList.add("active");
        else label.classList.remove("active");

        const selected = Array.from(checkboxes)
          .filter((box) => box.checked)
          .map((box) => box.dataset.name);

        if (selected.length > 0) {
          chipsContainer.innerHTML = selected.map((name) => `<span class="chip">${name}</span>`).join("");
        } else {
          chipsContainer.innerHTML = `<span class="empty-chips" data-i18n="smart_mapper_empty"></span>`;
          if (typeof applyLanguage === "function") applyLanguage(currentLang);
        }
      });
    });
  });

  modal.appendChild(body);

  // === СОХРАНЯЕМ ДАННЫЕ ДЛЯ МАТРЕШКИ ===
  window.mapper2State.lastComplexColumns = complexColumns;

  // === ДОСТАЕМ ПЕРЕВОД НА ЛЕТУ ===
  let backBtnText = "НАЗАД";
  let confirmBtnText = "ПОДТВЕРДИТЬ";

  if (typeof translations !== "undefined" && typeof currentLang !== "undefined" && translations[currentLang]) {
    if (translations[currentLang]["smart_mapper_back"]) backBtnText = translations[currentLang]["smart_mapper_back"];
    else if (translations[currentLang]["cancel"]) backBtnText = translations[currentLang]["cancel"];

    if (translations[currentLang]["smart_mapper_btn"]) confirmBtnText = translations[currentLang]["smart_mapper_btn"];
  }

  // === СОБИРАЕМ ПОДВАЛ С ДВУМЯ КНОПКАМИ ===
  const footer = document.createElement("div");
  footer.className = "smart-modal-footer";
  footer.innerHTML = `
        <div style="display: flex; gap: 10px;">
            <button class="cancel-btn" id="smartBackBtn" data-i18n="inc_back" style="flex: 1; font-weight: bold; font-size: 14px; text-transform: uppercase;">${backBtnText}</button>
            <button class="confirm-btn btn-primary green" id="smartConfirmBtn" data-i18n="smart_mapper_btn" style="flex: 2; margin: 0; font-weight: bold; font-size: 14px; text-transform: uppercase;">${confirmBtnText}</button>
        </div>
    `;
  modal.appendChild(footer);
  container.appendChild(modal);

  if (typeof applyLanguage === "function" && typeof currentLang !== "undefined") applyLanguage(currentLang);

  // === БЕЗОПАСНАЯ ПРИВЯЗКА КНОПОК ===
  const backBtn = document.getElementById("smartBackBtn");
  const confirmBtn = document.getElementById("smartConfirmBtn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (typeof window.navigateIncomeStep === "function") window.navigateIncomeStep(1);
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      window.mapper2State.smartRules = {};

      const cards = body.querySelectorAll(".smart-mapper-card");
      cards.forEach((card) => {
        const colName = card.dataset.colname;
        const checkedBoxes = Array.from(card.querySelectorAll('input[type="checkbox"]:checked'));
        const selectedParams = checkedBoxes.map((cb) => cb.value);

        if (selectedParams.length > 0) {
          window.mapper2State.smartRules[colName] = selectedParams;
        }
      });

      // 1. Прячем окно Сита
      const smartContainer = document.getElementById("smartMapperContainer");
      if (smartContainer) smartContainer.innerHTML = "";

      // 2. ЗАПУСКАЕМ ТОКЕНИЗАТОР (ОБУЧЕНИЕ) ВМЕСТО МАППИНГА!
      if (typeof window.startPreTokenizer === "function") {
        window.startPreTokenizer(window.mapper2State.smartRules, window.mapper2State.lastComplexColumns);
      } else {
        // Запасной вариант
        if (typeof window.navigateIncomeStep === "function") window.navigateIncomeStep(2);
        if (typeof window.renderMapper2Cards === "function") window.renderMapper2Cards(window.currentTemplateData);
      }
    });
  }
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
  const tr = typeof translations !== "undefined" && translations[lang] ? translations[lang] : {};

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
                            placeholder="${tr.inc_search_enter || 'Поиск...'}"
                            oninput="window.filterTokenizerDict(this)"
                            style="width: 100%; box-sizing: border-box;">
                        
                        <label style="display:flex; align-items:center; gap:10px; margin-top:15px; padding:15px; background:var(--bg-panel); border-radius:8px; border:1px solid var(--border-light); cursor:pointer;">
                            <input type="checkbox" class="fallback-apply-all" style="width:20px; height:20px;">
                            <span style="font-size:14px; color:var(--text-main);">${tr.inc_apply_all || 'Применить ко всем товарам'}</span>
                        </label>
                        
                        <div class="btn-clear-fallback" onclick="window.clearFallbackSelection()" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-top:10px; padding:12px; background:rgba(255,68,68,0.1); color:#ff4444; border-radius:8px; border:1px solid rgba(255,68,68,0.3); font-size:14px; font-weight:bold; cursor:pointer; transition:background 0.2s;">
                            <span>✖</span> ${tr.inc_clear_selection || 'Очистить выбор'}
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
  });
};

// Функция очистки для кнопки "Очистить выбор"
window.clearFallbackSelection = function() {
    const overlay = document.getElementById("tokenizer-overlay");
    if (!overlay) return;
    
    const searchInput = overlay.querySelector(".fallback-search-input");
    if(searchInput) searchInput.value = "";
    
    const applyAllCheckbox = overlay.querySelector(".fallback-apply-all");
    if(applyAllCheckbox) applyAllCheckbox.checked = false;
    
    // Сбрасываем список к изначальному состоянию
    if (typeof window.filterTokenizerDict === "function") {
        window.filterTokenizerDict({ value: "" });
    }
};

window.filterTokenizerDict = function(inputEl) {
    const query = inputEl.value.toLowerCase().trim();
    const ul = document.querySelector("#tokenizer-overlay .fallback-dict-list");
    if (!ul || !window.currentTokenizerDict) return;
    
    const filtered = window.currentTokenizerDict.filter(val => String(val).toLowerCase().includes(query));
    
    ul.innerHTML = filtered
        .map((val) => {
            const regex = new RegExp(`(${query})`, "gi");
            const highlighted = query ? String(val).replace(regex, "<mark style='background:#fef08a; color:#854d0e;'>$1</mark>") : val;
            return `<li onclick="window.selectTokenizerDictValue('${String(val).replace(/'/g, "\\'")}', this)" class="param-row" style="padding:15px; border-bottom:1px solid var(--border-light); cursor:pointer; font-size:14px;"><span style="color:var(--text-main);">${highlighted}</span></li>`;
        })
        .join("");
};

window.selectTokenizerDictValue = function(val, liElement) {
    // Подсвечиваем выбранный элемент
    const ul = document.querySelector("#tokenizer-overlay .fallback-dict-list");
    ul.querySelectorAll("li").forEach(li => {
        li.style.background = 'transparent';
        li.querySelector('span.check-mark')?.remove();
    });
    liElement.style.background = 'rgba(59, 130, 246, 0.15)';
    liElement.insertAdjacentHTML('beforeend', '<span class="check-mark" style="color:var(--accent-blue); float:right;">✔</span>');

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

window.startTokenizerQueue = function () {
  const rawQueue = window.mapper2State.quarantine || [];

  const filteredQueue = rawQueue.filter((pattern) => {
    if (!pattern || !pattern.rawString) return false;
    const tokens = pattern.rawString.match(
      /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
    ) || [pattern.rawString];
    const validTokens = tokens.filter(
      (t) => t.trim().length > 0 && !/^[\s\-_]+$/.test(t),
    );
    return validTokens.length > 1;
  });

  // ИСПРАВЛЕНИЕ 2: Сортируем очередь так, чтобы самая длинная строка всегда была первой
  filteredQueue.sort(
    (a, b) => (b.rawString || "").length - (a.rawString || "").length,
  );

  function getPatternMask(str) {
    const tokens = str.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [str];
    return tokens
      .map((t) => {
        if (/^\d+$/.test(t)) return "N";
        if (/^[a-zA-Zа-яА-ЯёЁ]+$/.test(t)) return "A";
        return "S";
      })
      .join("-");
  }

  const uniquePatternsMap = new Map();
  filteredQueue.forEach((item) => {
    const mask = getPatternMask(item.rawString);
    // Берем только первый паттерн (благодаря сортировке выше, он гарантированно самый длинный)
    if (!uniquePatternsMap.has(mask)) {
      item.mask = mask;
      uniquePatternsMap.set(mask, item);
    }
  });

  const queue = Array.from(uniquePatternsMap.values());

  if (queue.length === 0) {
    finishAndGoToPreview();
    return;
  }

  let currentQueueIndex = 0;
  let mappedResults = {};

  function processNext() {
    if (currentQueueIndex >= queue.length) {
      applyResultsToData();
      return;
    }

    const pattern = queue[currentQueueIndex];
    mappedResults = pattern.resolvedAttributes
      ? JSON.parse(JSON.stringify(pattern.resolvedAttributes))
      : {};

    const currentTokens = pattern.rawString.match(
      /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
    ) || [pattern.rawString];
    const dicts = window.kaspiDicts || {};
    let paramsList = [];

    // ИСПРАВЛЕНИЕ 1: Убрали фильтр isCodeOrNumber.
    const excludeFromSmart = [
      "Артикул",
      "Название товара",
      "Бренд",
      "Цена",
      "Название модели",
      "Модель",
      "Рубрика",
      "category",
      "Сезонность",
      "Назначение",
      "Тип шины",
      "Комплектация",
      "Тип рисунка протектора",
      "Шипы",
      "Код изображений",
      "Ссылка на YouTube",
      "Ссылка на картинку",
      "Описание (мин. 100 символов, макс. 7 000 символов)",
      "Описание",
      "Вес для расчета логистики",
      "Объединить в одну карточку",
      "В наличии",
    ];

    Object.keys(dicts).forEach((paramName) => {
      if (
        !excludeFromSmart.includes(paramName) &&
        Array.isArray(dicts[paramName])
      ) {
        const validExamples = dicts[paramName].filter(
          (val) => val && String(val).trim() !== "",
        );
        if (validExamples.length > 0) {
          // ВОЗВРАЩАЕМ УДАЛЕННЫЙ ФИЛЬТР: оставляем только параметры с цифрами или короткими кодами (индексы, размеры)
          const isCodeOrNumber = validExamples.some((ex) => {
            const str = String(ex).trim();
            return (
              /\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3)
            );
          });
          if (isCodeOrNumber) paramsList.push({ name: paramName });
        }
      }
    });

    if (paramsList.length === 0)
      paramsList = [{ name: "Неизвестный параметр" }];

    // ИСПРАВЛЕНИЕ: Приоритет отдается реальному названию колонки из Excel
    const displayColName = pattern.excelColumnName || "Многосоставные данные";

    window.showTokenizer(displayColName, currentTokens, paramsList);

    const overlay = document.getElementById("tokenizer-overlay");
    const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
    const tr = typeof translations !== "undefined" && translations[lang] ? translations[lang] : {};

    const titleEl = overlay.querySelector(".modal-title");
    if (titleEl) {
      // Используем шаблон, который сам знает, куда ставить цифры
      let progressTemplate = tr.tok_progress || "Паттерн {current} из {total}";
      
      titleEl.textContent = progressTemplate
        .replace("{current}", currentQueueIndex + 1)
        .replace("{total}", queue.length);
    }

    const btnDone = overlay.querySelector(".btn-done");
    if (btnDone) {
      const isLastStep = currentQueueIndex === queue.length - 1;
      btnDone.textContent = isLastStep ? (tr.tok_finish || "ЗАВЕРШИТЬ") : (tr.tok_next || "ДАЛЕЕ");
    }

    const backBtn = overlay.querySelector(".btn-back");
    if (backBtn) {
      if (currentQueueIndex === 0) {
        backBtn.style.opacity = "0.5";
        backBtn.style.pointerEvents = "none";
      } else {
        backBtn.style.opacity = "1";
        backBtn.style.pointerEvents = "auto";
      }
    }

    attachLogic(pattern, dicts, overlay);

    if (Object.keys(mappedResults).length > 0) {
      Object.keys(mappedResults).forEach((sysKey) => {
        const rule = mappedResults[sysKey];
        const humanName =
          (window.mapper2State.sysToHumanMap &&
            window.mapper2State.sysToHumanMap[sysKey]) ||
          sysKey;

        const row = Array.from(overlay.querySelectorAll(".param-row")).find(
          (r) =>
            r.dataset.paramName === humanName || r.dataset.paramName === sysKey,
        );

        if (row) {
          const gluedText = rule.indexes
            .map((idx) => currentTokens[idx])
            .join("");
          const displayVal = rule.value || gluedText;

          row.classList.remove("active-target");
          row.classList.add("disabled");
          row.querySelector(".param-preview").style.display = "none";
          row.querySelector(".btn-confirm-inline").style.display = "none";

          const radio = row.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;

          const oldBadge = row.querySelector(".param-badge");
          if (oldBadge) oldBadge.remove();

          const badgeHtml = `<span class="param-badge" style="background: var(--accent-green, #2ecc71); color: #000; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-left: auto; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">✓ ${displayVal}</span>`;
          row.insertAdjacentHTML("beforeend", badgeHtml);
        }

        rule.indexes.forEach((idx) => {
          const tokenBtn = overlay.querySelector(`.token[data-index="${idx}"]`);
          if (tokenBtn) {
            tokenBtn.classList.remove("selected");
            tokenBtn.classList.add("disabled");
          }
        });
      });

      if (btnDone) {
        btnDone.style.opacity = "1";
        setTimeout(() => {
          btnDone.style.pointerEvents = "auto";
          btnDone.style.cursor = "pointer";
        }, 300);
      }
    }
  }

  function attachLogic(pattern, dicts, overlay) {
    const tokensBtns = overlay.querySelectorAll(".token");
    const paramRows = overlay.querySelectorAll(".param-row");
    const fallbackZone = overlay.querySelector(".fallback-zone");
    const fallbackSelect = overlay.querySelector(".fallback-select");
    const btnFallback = overlay.querySelector(".btn-fallback");
    const btnClear = overlay.querySelector(".btn-clear");
    const btnDone = overlay.querySelector(".btn-done");
    const btnBack = overlay.querySelector(".btn-back");

    const updatePreview = () => {
      overlay
        .querySelectorAll(".param-row:not(.disabled) .param-preview")
        .forEach((el) => (el.innerHTML = ""));
      const activeRow = overlay.querySelector(".param-row.active-target");
      if (!activeRow) return;
      const selectedText = Array.from(
        overlay.querySelectorAll(".token.selected"),
      )
        .map((b) => b.textContent)
        .join("");
      activeRow.querySelector(".param-preview").textContent = selectedText;
    };

    tokensBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) return;
        btn.classList.toggle("selected");
        fallbackZone.style.display = "none";
        updatePreview();
      });
    });

    paramRows.forEach((row) => {
      row.addEventListener("click", (e) => {
        if (row.classList.contains("disabled")) return;
        paramRows.forEach((r) => {
          r.classList.remove("active-target");
          r.querySelector(".btn-confirm-inline").style.display = "none";
        });
        row.classList.add("active-target");
        row.querySelector('input[type="radio"]').checked = true;
        row.querySelector(".btn-confirm-inline").style.display = "block";
        updatePreview();
      });
    });

    paramRows.forEach((row) => {
      const confirmBtn = row.querySelector(".btn-confirm-inline");
      confirmBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const paramName = row.querySelector('input[type="radio"]').value;
        const gluedText = row.querySelector(".param-preview").textContent;
        if (!gluedText) return;

        let dictArray = dicts[paramName] || [];
        let matchedValue = null;

        for (let dv of dictArray) {
          let strDv = String(dv).trim();
          let baseDv = strDv.split("(")[0].trim();
          if (
            baseDv.toLowerCase() === gluedText.toLowerCase() ||
            (!isNaN(parseFloat(baseDv)) &&
              parseFloat(baseDv) === parseFloat(gluedText))
          ) {
            matchedValue = strDv;
            break;
          }
        }

        if (matchedValue) {
          lockParameter(row, paramName, matchedValue, gluedText);
        } else {
          const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
          const tr = typeof translations !== "undefined" && translations[lang] ? translations[lang] : {};
          
          let notFoundMsg = tr.tok_not_found || `Значение <b>"{val}"</b> не найдено в справочнике. Выберите вручную:`;
          overlay.querySelector(".fallback-msg").innerHTML = notFoundMsg.replace("{val}", gluedText);
          
          fallbackSelect.innerHTML =
            `<option value="" disabled selected>${tr.tok_dict_name || "Справочник:"} ${paramName}...</option>` +
            dictArray
              .map((val) => `<option value="${val}">${val}</option>`)
              .join("");
          fallbackZone.style.display = "block";
        }
      });
    });

    btnFallback.addEventListener("click", () => {
      const activeRow = overlay.querySelector(".param-row.active-target");
      const paramName = activeRow.querySelector('input[type="radio"]').value;
      const gluedText = activeRow.querySelector(".param-preview").textContent;
      const selectedVal = window.tempFallbackVal; // ИЗМЕНЕНО: берем из глобальной переменной
      if (!selectedVal) return;
      
      // Если чекбокс нажат, добавляем ключ в глобальный applyToAllMap
      if (window.tempFallbackApplyAll) {
          if (!window.applyToAllMap) window.applyToAllMap = {};
          // Находим системный ключ для этого параметра
          let sysKey = Object.keys(window.mapper2State.sysToHumanMap || {}).find(k => window.mapper2State.sysToHumanMap[k] === paramName) || paramName;
          window.applyToAllMap[sysKey] = true;
      }
      
      lockParameter(activeRow, paramName, selectedVal, gluedText);
      fallbackZone.style.display = "none";
    });

    const lockParameter = (row, humanName, finalValue, tokenText) => {
      let sysKey = Object.keys(window.mapper2State.sysToHumanMap || {}).find(
        (k) => window.mapper2State.sysToHumanMap[k] === humanName,
      );
      if (!sysKey) sysKey = humanName;

      const selectedTokens = Array.from(
        overlay.querySelectorAll(".token.selected"),
      );
      const tokenIndexes = selectedTokens.map((t) => parseInt(t.dataset.index));

      mappedResults[sysKey] = {
        value: finalValue,
        indexes: tokenIndexes,
      };

      pattern.resolvedAttributes = JSON.parse(JSON.stringify(mappedResults));

      row.classList.remove("active-target");
      row.classList.add("disabled");
      row.querySelector(".param-preview").style.display = "none";
      row.querySelector(".btn-confirm-inline").style.display = "none";

      const oldBadge = row.querySelector(".param-badge");
      if (oldBadge) oldBadge.remove();

      const badgeHtml = `<span class="param-badge" style="background: var(--accent-green, #2ecc71); color: #000; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-left: auto; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">✓ ${finalValue || tokenText}</span>`;
      row.insertAdjacentHTML("beforeend", badgeHtml);

      overlay.querySelectorAll(".token.selected").forEach((t) => {
        t.classList.remove("selected");
        t.classList.add("disabled");
      });

      btnDone.style.opacity = "1";
      setTimeout(() => {
        btnDone.style.pointerEvents = "auto";
        btnDone.style.cursor = "pointer";
      }, 300);
    };

    btnClear.addEventListener("click", () => {
      mappedResults = {};
      if (pattern.resolvedAttributes) {
        delete pattern.resolvedAttributes;
      }
      processNext();
    });

    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (currentQueueIndex > 0) {
          currentQueueIndex--;
          processNext();
        }
      });
    }

    btnDone.addEventListener("click", (e) => {
      if (btnDone.disabled) return;
      btnDone.disabled = true;

      if (
        !pattern.resolvedAttributes ||
        Object.keys(pattern.resolvedAttributes).length === 0
      ) {
        btnDone.disabled = false;
        return;
      }
      currentQueueIndex++;
      processNext();
    });
  }

  function applyResultsToData() {
    const dicts = window.kaspiDicts || {};

    window.parsedInvoiceData.forEach((item) => {
      if (item._hasCollisions) {
        let attrsObj = {};

        if (item._attributesObj) {
          Object.assign(attrsObj, item._attributesObj);
        }
        if (item.attributes) {
          try {
            let parsed = JSON.parse(item.attributes);
            Object.assign(attrsObj, parsed);
          } catch (e) {}
        }

        item._collisionsList.forEach((col) => {
          const mask = getPatternMask(col.rawString);
          const resolvedPattern = queue.find((q) => q.mask === mask);

          if (resolvedPattern && resolvedPattern.resolvedAttributes) {
            const colTokens = col.rawString.match(
              /\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
            ) || [col.rawString];

            Object.keys(resolvedPattern.resolvedAttributes).forEach(
              (sysKey) => {
                const rule = resolvedPattern.resolvedAttributes[sysKey];
                if (rule && rule.indexes && rule.indexes.length > 0) {
                  const gluedText = rule.indexes
                    .map((idx) => colTokens[idx])
                    .join("");

                  let finalVal = rule.value || gluedText;

                  if (!rule.value) {
                    let humanName = window.mapper2State.sysToHumanMap
                      ? window.mapper2State.sysToHumanMap[sysKey]
                      : sysKey;
                    let dictArray = dicts[humanName] || dicts[sysKey] || [];
                    if (dictArray.length > 0) {
                      for (let dv of dictArray) {
                        let strDv = String(dv).trim();
                        let baseDv = strDv.split("(")[0].trim();
                        if (
                          baseDv.toLowerCase() === gluedText.toLowerCase() ||
                          (!isNaN(parseFloat(baseDv)) &&
                            parseFloat(baseDv) === parseFloat(gluedText))
                        ) {
                          finalVal = strDv;
                          break;
                        }
                      }
                    }
                  }

                  attrsObj[sysKey] = finalVal;
                }
              },
            );
          }
        });

        item.attributes =
          Object.keys(attrsObj).length > 0 ? JSON.stringify(attrsObj) : "";
        item._attributesObj = attrsObj;
      }
    });

    window.mapper2State.quarantine = [];
    finishAndGoToPreview();
  }

  function finishAndGoToPreview() {
    const overlay = document.getElementById("tokenizer-overlay");
    if (overlay) {
      overlay.style.display = "none";
      overlay.innerHTML = "";
    }
    window.renderPreviewTable();
    document.getElementById("mapper2Area").style.display = "none";
    document.getElementById("invoicePreviewArea").style.display = "flex";
  }

  processNext();
};

window.startPreTokenizer = function(smartRules, complexColumns) {
    const queue = [];
    
    // Формируем очередь из всех уникальных паттернов
    Object.keys(smartRules).forEach(colName => {
        const colInfo = complexColumns.find(c => c.colName === colName);
        if (colInfo && smartRules[colName].length > 0) {
            const examplesList = colInfo.examples || [colInfo.example];
            examplesList.forEach(ex => {
                queue.push({
                    colName: colName,
                    example: ex,
                    humanNames: smartRules[colName]
                });
            });
        }
    });

    let currentIndex = 0;
    
    function processNext() {
        if (currentIndex >= queue.length) {
            const overlay = document.getElementById("tokenizer-overlay");
            if (overlay) { 
                overlay.style.display = "none"; 
                overlay.innerHTML = ""; 
            }
            if (typeof window.navigateIncomeStep === "function") window.navigateIncomeStep(2);
            if (typeof window.renderMapper2Cards === "function") window.renderMapper2Cards(window.currentTemplateData);
            return;
        }

        const item = queue[currentIndex];
        const currentTokens = item.example.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [item.example];
        
        const paramsList = item.humanNames.map(name => {
            return { name: name };
        });

        // ⚡ ДОБАВЛЯЕМ СПАСИТЕЛЬНУЮ СТРОКУ ДЛЯ МУСОРА
        paramsList.push({ name: "Лишние фрагменты 🗑️" });

        window.showTokenizer(item.colName, currentTokens, paramsList);
        const overlay = document.getElementById("tokenizer-overlay");
        
        const titleEl = overlay.querySelector(".modal-title");
        if (titleEl) titleEl.textContent = `Обучение: Шаг ${currentIndex + 1} из ${queue.length}`;
        
        const descEl = overlay.querySelector(".modal-subtitle");
        if (descEl) descEl.textContent = "Свяжите фрагменты текста с параметрами. Скрипт запомнит это правило для всей колонки.";

        const tokensBtns = overlay.querySelectorAll(".token");
        const paramRows = overlay.querySelectorAll(".param-row");
        const btnClear = overlay.querySelector(".btn-clear");
        const btnDone = overlay.querySelector(".btn-done");
        const btnBack = overlay.querySelector(".btn-back");

        // Предохранитель кнопки "Далее"
        const checkAllConfirmed = () => {
            let allDone = true;
            paramRows.forEach(r => {
                if (!r.classList.contains("disabled")) allDone = false;
            });
            
            if (allDone && paramRows.length > 0) {
                btnDone.style.opacity = "1";
                btnDone.style.pointerEvents = "auto";
                btnDone.style.cursor = "pointer";
            } else {
                btnDone.style.opacity = "0.5";
                btnDone.style.pointerEvents = "none";
                btnDone.style.cursor = "default";
            }
        };

        checkAllConfirmed();

        if (btnBack) {
            btnBack.style.opacity = "1"; 
            btnBack.style.pointerEvents = "auto"; 
            btnBack.addEventListener("click", () => {
                if (currentIndex > 0) { 
                    currentIndex--; 
                    processNext(); 
                } else {
                    const overlay = document.getElementById("tokenizer-overlay");
                    if (overlay) { overlay.style.display = "none"; overlay.innerHTML = ""; }
                    window.renderSmartMapperModal(complexColumns);
                }
            });
        }

        const updatePreview = () => {
            overlay.querySelectorAll(".param-row:not(.disabled) .param-preview").forEach(el => el.innerHTML = "");
            const activeRow = overlay.querySelector(".param-row.active-target");
            if (!activeRow) return;
            const selectedText = Array.from(overlay.querySelectorAll(".token.selected")).map(b => b.textContent).join("");
            activeRow.querySelector(".param-preview").textContent = selectedText;
        };

        tokensBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("disabled")) return;
                btn.classList.toggle("selected");
                updatePreview();
            });
        });

        paramRows.forEach(row => {
            row.addEventListener("click", () => {
                if (row.classList.contains("disabled")) return;
                paramRows.forEach(r => { 
                    r.classList.remove("active-target"); 
                    r.querySelector(".btn-confirm-inline").style.display = "none"; 
                });
                row.classList.add("active-target");
                row.querySelector('input[type="radio"]').checked = true;
                row.querySelector(".btn-confirm-inline").style.display = "block";
                updatePreview();
            });

            const confirmBtn = row.querySelector(".btn-confirm-inline");
            confirmBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const paramName = row.querySelector('input[type="radio"]').value;
                const gluedText = row.querySelector(".param-preview").textContent;
                if (!gluedText) return;

                const isTrash = paramName === "Лишние фрагменты 🗑️";

                // ⚡ ИСПРАВЛЕННАЯ ВАЛИДАЦИЯ (Достаем словарь напрямую)
                if (!isTrash) {
                    let isValid = true;
                    const tData = window.currentTemplateData;
                    const dictArray = (tData && tData.dictionary) ? tData.dictionary[paramName] : null;
                    
                    if (dictArray && dictArray.length > 0) {
                        isValid = dictArray.some(dv => {
                            let strDv = String(dv).trim();
                            let baseDv = strDv.split('(')[0].trim();
                            return baseDv.toLowerCase() === gluedText.toLowerCase() || 
                                   (!isNaN(parseFloat(baseDv)) && parseFloat(baseDv) === parseFloat(gluedText));
                        });
                    }

                    if (!isValid) {
                        const lang = window.currentLang || localStorage.getItem("pos_lang") || "ru";
                        const tr = typeof translations !== "undefined" && translations[lang] ? translations[lang] : {};
                        let errorMsg = tr.tok_not_found ? tr.tok_not_found.replace("{val}", gluedText) : `Внимание! Значения "${gluedText}" нет в справочнике Kaspi для параметра "${paramName}".\n\nПроверьте выделенные токены.`;
                        errorMsg = errorMsg.replace(/<[^>]*>?/gm, ''); 
                        alert(errorMsg);
                        return; // Блокируем
                    }
                }

                // ⚡ ЕСЛИ ЭТО НЕ МУСОР — СОХРАНЯЕМ ПРАВИЛО
                if (!isTrash) {
                    let sysKey = paramName;
                    if (window.currentTemplateData && window.currentTemplateData.humanNames) {
                        const idx = window.currentTemplateData.humanNames.indexOf(paramName);
                        if (idx !== -1) sysKey = window.currentTemplateData.systemKeys[idx];
                    }

                    const selectedTokens = Array.from(overlay.querySelectorAll(".token.selected"));
                    const tokenIndexes = selectedTokens.map(t => parseInt(t.dataset.index));

                    const tks = item.example.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [item.example];
                    const mask = tks.map(t => /^\d+$/.test(t) ? "N" : /^[a-zA-Zа-яА-ЯёЁ]+$/.test(t) ? "A" : "S").join("-");

                    window.mapper2State.splitRules = window.mapper2State.splitRules || {};
                    
                    if (!Array.isArray(window.mapper2State.splitRules[sysKey]) || (window.mapper2State.splitRules[sysKey].length > 0 && typeof window.mapper2State.splitRules[sysKey][0] === 'number')) {
                        window.mapper2State.splitRules[sysKey] = [];
                    }
                    
                    const existingIdx = window.mapper2State.splitRules[sysKey].findIndex(r => r.mask === mask);
                    if (existingIdx !== -1) {
                        window.mapper2State.splitRules[sysKey][existingIdx].rule = tokenIndexes;
                    } else {
                        window.mapper2State.splitRules[sysKey].push({
                            mask: mask,
                            rule: tokenIndexes
                        });
                    }
                }

                // В ЛЮБОМ СЛУЧАЕ помечаем строку выполненной
                row.classList.remove("active-target");
                row.classList.add("disabled");
                row.querySelector(".param-preview").style.display = "none";
                row.querySelector(".btn-confirm-inline").style.display = "none";
                
                const badgeColor = isTrash ? "#95a5a6" : "var(--accent-green, #2ecc71)";
                const badgeHtml = `<span class="param-badge" style="background: ${badgeColor}; color: #000; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-left: auto;">✓ ${gluedText}</span>`;
                row.insertAdjacentHTML("beforeend", badgeHtml);

                overlay.querySelectorAll(".token.selected").forEach(t => {
                    t.classList.remove("selected");
                    t.classList.add("disabled");
                });

                checkAllConfirmed();
            });
        });

        btnClear.addEventListener("click", () => {
            item.humanNames.forEach(paramName => {
                let sysKey = paramName;
                if (window.currentTemplateData && window.currentTemplateData.humanNames) {
                    const idx = window.currentTemplateData.humanNames.indexOf(paramName);
                    if (idx !== -1) sysKey = window.currentTemplateData.systemKeys[idx];
                }
                
                const tks = item.example.match(/\d+|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [item.example];
                const mask = tks.map(t => /^\d+$/.test(t) ? "N" : /^[a-zA-Zа-яА-ЯёЁ]+$/.test(t) ? "A" : "S").join("-");
                
                if (Array.isArray(window.mapper2State.splitRules[sysKey])) {
                    window.mapper2State.splitRules[sysKey] = window.mapper2State.splitRules[sysKey].filter(r => r.mask !== mask);
                }
            });
            processNext(); 
        });

        btnDone.addEventListener("click", () => {
            if (btnDone.style.pointerEvents === "none" || btnDone.disabled) return;
            currentIndex++;
            processNext();
        });
    }
    
    processNext();
};