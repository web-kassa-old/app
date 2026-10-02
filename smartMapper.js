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

        const tokens = strVal.split(/[\s/\-_*xX]+/).filter((t) => t.length > 0);

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

  console.log("Детектор проверил файл. Найдено сложных колонок:", complexCols);
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

  const modal = document.createElement("div");
  modal.className = "smart-modal-content";

  const header = document.createElement("div");
  header.className = "smart-modal-header";
  // Подключаем архитектуру перевода для шапки
  header.setAttribute("data-i18n", "smart_mapper_title");
  modal.appendChild(header);

  const body = document.createElement("div");
  body.className = "smart-modal-body";

  let kaspiParams = [];
  const tData = window.currentTemplateData;

  if (tData && tData.humanNames) {
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

    for (let i = 0; i < tData.humanNames.length; i++) {
      const paramName = tData.humanNames[i];
      const dictData = tData.dictionary ? tData.dictionary[paramName] : null;

      if (Array.isArray(dictData)) {
        const validExamples = dictData.filter(
          (val) => val && String(val).trim() !== "",
        );
        if (validExamples.length > 0 && !excludeFromSmart.includes(paramName)) {
          const isCodeOrNumber = validExamples.some((ex) => {
            const str = String(ex).trim();
            return (
              /\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3)
            );
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

    // Динамический перевод английской шапки колонки из глобального словаря (если есть)
    const rawColName = String(col.colName).toLowerCase().trim();
    let translatedName = col.colName;
    if (
      typeof translations !== "undefined" &&
      typeof currentLang !== "undefined"
    ) {
      if (translations[currentLang] && translations[currentLang][rawColName]) {
        translatedName = `${translations[currentLang][rawColName]} (${col.colName})`;
      }
    }

    // Достаем массив уже отмеченных параметров для конкретной колонки
    const currentSavedParams = savedRules[col.colName] || [];

    let checkboxesHtml = kaspiParams
      .map((param) => {
        let exampleSpans = param.examples
          .map((ex) => `<span>${ex}</span>`)
          .join("");

        // Восстанавливаем состояние чекбокса
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
      })
      .join("");

    // Восстанавливаем отрисовку зеленых чипсов
    let initialChips = "";
    if (currentSavedParams.length > 0) {
      let selectedNames = kaspiParams
        .filter((p) => currentSavedParams.includes(p.id))
        .map((p) => p.name);
      initialChips = selectedNames
        .map((name) => `<span class="chip">${name}</span>`)
        .join("");
    } else {
      initialChips = `<span class="empty-chips" data-i18n="smart_mapper_empty"></span>`;
    }

    // Вся статика размечена атрибутами data-i18n
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
          chipsContainer.innerHTML = selected
            .map((name) => `<span class="chip">${name}</span>`)
            .join("");
        } else {
          // Возвращаем пустую надпись и переводим её на лету
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

  if (
    typeof translations !== "undefined" &&
    typeof currentLang !== "undefined" &&
    translations[currentLang]
  ) {
    if (translations[currentLang]["smart_mapper_back"]) {
      backBtnText = translations[currentLang]["smart_mapper_back"];
    } else if (translations[currentLang]["cancel"]) {
      backBtnText = translations[currentLang]["cancel"]; // Резервное слово, если нет ключа
    }

    if (translations[currentLang]["smart_mapper_btn"]) {
      confirmBtnText = translations[currentLang]["smart_mapper_btn"];
    }
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

  // Запускаем глобальный переводчик (на всякий случай для других статических текстов)
  if (
    typeof applyLanguage === "function" &&
    typeof currentLang !== "undefined"
  ) {
    applyLanguage(currentLang);
  }

  // === БЕЗОПАСНАЯ ПРИВЯЗКА КНОПОК ===
  const backBtn = document.getElementById("smartBackBtn");
  const confirmBtn = document.getElementById("smartConfirmBtn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (typeof window.navigateIncomeStep === "function") {
        window.navigateIncomeStep(1);
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      window.mapper2State.smartRules = {};

      const cards = body.querySelectorAll(".smart-mapper-card");
      cards.forEach((card) => {
        const colName = card.dataset.colname;
        const checkedBoxes = Array.from(
          card.querySelectorAll('input[type="checkbox"]:checked'),
        );
        const selectedParams = checkedBoxes.map((cb) => cb.value);

        if (selectedParams.length > 0) {
          window.mapper2State.smartRules[colName] = selectedParams;
        }
      });

      // Просим роутер открыть Шаг 2 и рендерим карточки
      if (typeof window.navigateIncomeStep === "function") {
        window.navigateIncomeStep(2);
      }
      if (typeof window.renderMapper2Cards === "function") {
        window.renderMapper2Cards(window.currentTemplateData);
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

  const tokensHtml = tokensArray
    .map((token, index) => {
      return `<button class="token" data-index="${index}">${token}</button>`;
    })
    .join("");

  // ИСПРАВЛЕНИЕ 2: Убрали стартовое выделение (active-target и checked)
  const paramsHtml = paramsList
    .map((param) => {
      return `
        <div class="param-row" data-param-name="${param.name}">
          <label class="param-info">
            <input type="radio" name="param_target" value="${param.name}">
            <span>${param.name}</span>
          </label>
          <div class="param-preview"></div>
          <button class="btn-confirm-inline" style="display: none;">✔ Ок</button>
        </div>
        `;
    })
    .join("");

  overlay.innerHTML = `
        <div class="tokenizer-modal">
            <div class="modal-header" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <h2 class="modal-title" data-i18n="tok_pattern">Разрешение конфликта</h2>
                    <button class="close-btn" style="background: var(--accent-red); color: #fff; font-size: 12px; font-weight: bold; border: none; border-radius: 6px; padding: 6px 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; text-transform: uppercase; box-shadow: 0 4px 10px rgba(231,76,60,0.3);">
                        <span style="font-size: 18px; line-height: 1;">&times;</span> Закрыть
                    </button>
                </div>
                <div class="modal-subtitle" style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
                    Скрипт не смог однозначно распределить эти данные. Выберите нужные фрагменты и привяжите их к параметрам из справочника.
                </div>
            </div>
            
            <div class="toolbar">
                <div class="toolbar-label"><span data-i18n="tok_source">Колонка:</span> ${columnName}</div>
                <button class="btn-clear" data-i18n="tok_clear">✕ Сбросить токены</button>
            </div>

            <div class="workspace">
    <div class="workspace-label" data-i18n="tok_select_frag">Выберите фрагменты (можно несколько):</div>
    <div class="tokens-container">
        ${tokensHtml}
    </div>
</div>

<div class="params-list" style="max-height: 40vh; overflow-y: auto; padding-right: 5px; margin-bottom: 10px;">
    ${paramsHtml}
</div>

<div class="fallback-zone" style="display: none;">
                <div class="fallback-msg"></div>
                <select class="fallback-select"></select>
                <button class="btn-fallback">Подтвердить выбор</button>
            </div>
            
            <div class="modal-footer" style="display: flex; gap: 10px;">
                <button type="button" class="btn-back" data-i18n="inc_back" style="flex: 1; background: var(--bg-panel); border: 1px solid var(--border-light); color: var(--text-main); padding: 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">НАЗАД</button>
                <!-- ИСПРАВЛЕНИЕ 1в: Кнопка заблокирована по умолчанию -->
                <button type="button" class="btn-done" style="flex: 2; background: var(--accent-green); color: #000; border: none; padding: 14px; border-radius: 6px; font-weight: bold; opacity: 0.5; pointer-events: none; transition: 0.2s;">ДАЛЕЕ</button>
            </div>
        </div>
    `;

  overlay.style.display = "flex";

  overlay.querySelector(".close-btn").addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.innerHTML = "";
  });
};

window.startTokenizerQueue = function () {
  const rawQueue = window.mapper2State.quarantine || [];

  const filteredQueue = rawQueue.filter((pattern) => {
    if (!pattern || !pattern.rawString) return false;
    const tokens = pattern.rawString.match(
      /\d+(?:\.\d+)?|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
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
    const tokens = str.match(
      /\d+(?:\.\d+)?|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
    ) || [str];
    return tokens
      .map((t) => {
        if (/^\d+(\.\d+)?$/.test(t)) return "N";
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
    const titleEl = overlay.querySelector(".modal-title");
    if (titleEl) {
      titleEl.textContent = `Паттерн: ${currentQueueIndex + 1} из ${queue.length}`;
    }

    const btnDone = overlay.querySelector(".btn-done");
    if (btnDone) {
      const isLastStep = currentQueueIndex === queue.length - 1;
      btnDone.textContent = isLastStep ? "ЗАВЕРШИТЬ" : "ДАЛЕЕ";
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
          overlay.querySelector(".fallback-msg").innerHTML =
            `Значение <b>"${gluedText}"</b> не найдено в справочнике. Выберите вручную:`;
          fallbackSelect.innerHTML =
            `<option value="" disabled selected>Справочник: ${paramName}...</option>` +
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
      const selectedVal = fallbackSelect.value;
      if (!selectedVal) return;
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
              /\d+(?:\.\d+)?|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g,
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
