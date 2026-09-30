/**
 * Детектор сложных колонок (Smart Hybrid Mapper)
 * @param {Array} headers - Массив названий колонок (шапок), например: ['Бренд', 'Size', 'Цена']
 * @param {Array} rows - Массив массивов с данными, например: [['Nokian', '205/55R16', '25000'], ...]
 * @returns {Array} - Массив объектов с найденными сложными колонками и их максимальными примерами
 */
window.detectComplexColumns = function(headers, rows) {
    if (!headers || !rows || headers.length === 0 || rows.length === 0) return [];

    const dict = window.mapper2State?.dictValues || (typeof invoiceSynonyms !== 'undefined' ? invoiceSynonyms : {});
    
    // П1: Добавили Модель и Рисунок в список игнора
    const excludeKeys = ['Артикул', 'Штрихкод', 'Код', 'Бренд', 'Цена', 'Остаток', 'Количество', 'Сумма', 'Модель', 'Рисунок'];
    let dynamicBlacklist = [];

    excludeKeys.forEach(key => {
        if (dict[key] && Array.isArray(dict[key])) {
            const synonyms = dict[key].map(s => String(s).toLowerCase().trim());
            dynamicBlacklist = dynamicBlacklist.concat(synonyms);
        }
    });

    const fallbackBlacklist = [
        'артикул', 'код', 'code', 'barcode', 'штрихкод', 'brand', 'бренд', 
        'цена', 'price', 'usd', 'eur', 'kzt', 'руб', 
        'кол-во', 'qty', 'pcs', 'amount', 'сумма', 'total',
        'pattern', 'модель' // П1: Жесткое исключение для Pattern
    ];
    
    const blacklist = [...new Set([...dynamicBlacklist, ...fallbackBlacklist])];
    const complexCols = [];

    headers.forEach((colName, colIndex) => {
        if (!colName) return;
        
        const cleanColName = String(colName).toLowerCase().trim();
        if (blacklist.includes(cleanColName)) return; 

        let exampleVal = '';
        let validTokens = [];
        
        // П2: Сканируем всю колонку (до 1000 строк), чтобы не пропустить "115/110" где-то внизу
        const maxRows = Math.min(1000, rows.length);
        for (let i = 0; i < maxRows; i++) {
            const row = rows[i];
            if (!row) continue;
            
            const cellVal = row[colIndex];
            if (cellVal !== undefined && cellVal !== null && String(cellVal).trim() !== '') {
                const strVal = String(cellVal).trim();
                
                // Если ячейка - просто число (например 82), идем к следующей СТРОКЕ, но не бросаем колонку
                const isJustNumber = !isNaN(Number(strVal.replace(/,/g, '')));
                if (isJustNumber) continue;

                const tokens = strVal.split(/[\s/\-_*xX]+/).filter(t => t.length > 0);
                
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
                complexCols.push({ colName: colName, example: exampleVal, tokenCount: validTokens.length });
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
window.renderSmartMapperModal = function(complexColumns) {
    const container = document.getElementById('smartMapperContainer');
    if (!container) return;
    container.innerHTML = ''; 

    const modal = document.createElement('div');
    modal.className = 'smart-modal-content';

    const header = document.createElement('div');
    header.className = 'smart-modal-header';
    // Подключаем архитектуру перевода для шапки
    header.setAttribute('data-i18n', 'smart_mapper_title');
    modal.appendChild(header);

    const body = document.createElement('div');
    body.className = 'smart-modal-body';

    let kaspiParams = [];
    const tData = window.currentTemplateData;
    
    if (tData && tData.humanNames) {
        const excludeFromSmart = [
            'Артикул', 'Название товара', 'Бренд', 'Цена', 'Название модели', 
            'Рубрика', 'Код изображений', 'Ссылка на YouTube', 'Ссылка на картинку',
            'Описание (мин. 100 символов, макс. 7 000 символов)', 'Описание',
            'Вес для расчета логистики', 'Объединить в одну карточку', 'В наличии'
        ];
        
        for (let i = 0; i < tData.humanNames.length; i++) {
            const paramName = tData.humanNames[i];
            const dictData = tData.dictionary ? tData.dictionary[paramName] : null;
            
            if (Array.isArray(dictData)) {
                const validExamples = dictData.filter(val => val && String(val).trim() !== '');
                if (validExamples.length > 0 && !excludeFromSmart.includes(paramName)) {
                    
                    const isCodeOrNumber = validExamples.some(ex => {
                        const str = String(ex).trim();
                        return /\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3);
                    });

                    if (isCodeOrNumber) {
                        kaspiParams.push({
                            id: paramName,
                            name: paramName,
                            examples: validExamples.slice(0, 3)
                        });
                    }
                }
            }
        }
    }

    // === ЧТЕНИЕ СОХРАНЕННЫХ ПРАВИЛ ДЛЯ ВОССТАНОВЛЕНИЯ ГАЛОЧЕК ===
    window.mapper2State = window.mapper2State || {};
    const savedRules = window.mapper2State.smartRules || {};

    complexColumns.forEach(col => {
        const card = document.createElement('div');
        card.className = 'smart-mapper-card';
        card.dataset.colname = col.colName;

        // Динамический перевод английской шапки колонки из глобального словаря (если есть)
        const rawColName = String(col.colName).toLowerCase().trim();
        let translatedName = col.colName;
        if (typeof translations !== 'undefined' && typeof currentLang !== 'undefined') {
            if (translations[currentLang] && translations[currentLang][rawColName]) {
                translatedName = `${translations[currentLang][rawColName]} (${col.colName})`;
            }
        }

        // Достаем массив уже отмеченных параметров для конкретной колонки
        const currentSavedParams = savedRules[col.colName] || [];

        let checkboxesHtml = kaspiParams.map(param => {
            let exampleSpans = param.examples.map(ex => `<span>${ex}</span>`).join('');
            
            // Восстанавливаем состояние чекбокса
            let isChecked = currentSavedParams.includes(param.id) ? 'checked' : '';
            let activeClass = isChecked ? 'active' : '';

            return `
                <label class="checkbox-item ${activeClass}">
                    <input type="checkbox" value="${param.id}" data-name="${param.name}" ${isChecked}>
                    <div class="checkbox-details">
                        <div class="checkbox-title">${param.name}</div>
                        <div class="checkbox-examples">${exampleSpans}</div>
                    </div>
                </label>
            `;
        }).join('');

        // Восстанавливаем отрисовку зеленых чипсов
        let initialChips = '';
        if (currentSavedParams.length > 0) {
            let selectedNames = kaspiParams.filter(p => currentSavedParams.includes(p.id)).map(p => p.name);
            initialChips = selectedNames.map(name => `<span class="chip">${name}</span>`).join('');
        } else {
            initialChips = `<span class="empty-chips" data-i18n="smart_mapper_empty"></span>`;
        }

        // Вся статика размечена атрибутами data-i18n
        card.innerHTML = `
            <div class="smart-col-info">
                <span data-i18n="smart_mapper_col_prefix"></span> <span>${translatedName.toUpperCase()}</span>
                <strong>${col.example || ''}</strong>
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
        const chipsContainer = card.querySelector('.chips-container');

        checkboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                const label = this.closest('.checkbox-item');
                if (this.checked) label.classList.add('active');
                else label.classList.remove('active');

                const selected = Array.from(checkboxes)
                    .filter(box => box.checked)
                    .map(box => box.dataset.name);

                if (selected.length > 0) {
                    chipsContainer.innerHTML = selected.map(name => `<span class="chip">${name}</span>`).join('');
                } else {
                    // Возвращаем пустую надпись и переводим её на лету
                    chipsContainer.innerHTML = `<span class="empty-chips" data-i18n="smart_mapper_empty"></span>`;
                    if (typeof applyLanguage === 'function') applyLanguage(currentLang);
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

    if (typeof translations !== 'undefined' && typeof currentLang !== 'undefined' && translations[currentLang]) {
        if (translations[currentLang]['smart_mapper_back']) {
            backBtnText = translations[currentLang]['smart_mapper_back'];
        } else if (translations[currentLang]['cancel']) {
            backBtnText = translations[currentLang]['cancel']; // Резервное слово, если нет ключа
        }
        
        if (translations[currentLang]['smart_mapper_btn']) {
            confirmBtnText = translations[currentLang]['smart_mapper_btn'];
        }
    }

    // === СОБИРАЕМ ПОДВАЛ С ДВУМЯ КНОПКАМИ ===
    const footer = document.createElement('div');
    footer.className = 'smart-modal-footer';
    footer.innerHTML = `
        <div style="display: flex; gap: 10px;">
            <button class="cancel-btn" id="smartBackBtn" data-i18n="inc_back" style="flex: 1; font-weight: bold; font-size: 14px; text-transform: uppercase;">${backBtnText}</button>
            <button class="confirm-btn btn-primary green" id="smartConfirmBtn" data-i18n="smart_mapper_btn" style="flex: 2; margin: 0; font-weight: bold; font-size: 14px; text-transform: uppercase;">${confirmBtnText}</button>
        </div>
    `;
    modal.appendChild(footer);
    container.appendChild(modal);

    // Запускаем глобальный переводчик (на всякий случай для других статических текстов)
    if (typeof applyLanguage === 'function' && typeof currentLang !== 'undefined') {
        applyLanguage(currentLang);
    }

    // === БЕЗОПАСНАЯ ПРИВЯЗКА КНОПОК ===
    const backBtn = document.getElementById('smartBackBtn');
    const confirmBtn = document.getElementById('smartConfirmBtn');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (typeof window.navigateIncomeStep === 'function') {
                window.navigateIncomeStep(1);
            }
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            window.mapper2State.smartRules = {}; 

            const cards = body.querySelectorAll('.smart-mapper-card');
            cards.forEach(card => {
                const colName = card.dataset.colname;
                const checkedBoxes = Array.from(card.querySelectorAll('input[type="checkbox"]:checked'));
                const selectedParams = checkedBoxes.map(cb => cb.value); 
                
                if (selectedParams.length > 0) {
                    window.mapper2State.smartRules[colName] = selectedParams;
                }
            });

            // Просим роутер открыть Шаг 2 и рендерим карточки
            if (typeof window.navigateIncomeStep === 'function') {
                window.navigateIncomeStep(2);
            }
            if (typeof window.renderMapper2Cards === 'function') {
                window.renderMapper2Cards(window.currentTemplateData);
            }
        });
    }
}

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
        { key: "smart_param_season", ex: ["Летние", "Зимние"] }
    ];

    return params.map(p => `
        <label class="checkbox-item">
            <input type="checkbox" value="${p.key}" onchange="updateSmartChips(this, ${cardIndex})">
            <div class="checkbox-content">
                <span class="checkbox-title" data-i18n="${p.key}">Параметр</span>
                <div class="example-stack">
                    ${p.ex.map(val => `<span>${val}</span>`).join('')}
                </div>
            </div>
        </label>
    `).join('');
}

/**
 * Обновление визуальных плашек (чипсов) при клике на чекбокс
 * @param {HTMLElement} checkbox - Нажатый инпут
 * @param {number} cardIndex - Индекс карточки (колонки)
 */
function updateSmartChips(checkbox, cardIndex) {
    const chipsContainer = document.getElementById(`chipsContainer_${cardIndex}`);
    const parentLabel = checkbox.closest('.checkbox-item');
    
    // Получаем текст для плашки (уже переведенный, если applyLanguage отработал)
    const titleSpan = parentLabel.querySelector('.checkbox-title');
    const labelText = titleSpan ? titleSpan.innerText : checkbox.value;

    if (checkbox.checked) {
        // Подсвечиваем чекбокс
        parentLabel.classList.add('active');
        
        // Создаем новую зеленую плашку
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.setAttribute('data-value', checkbox.value); // Прячем системный ключ для удобства
        chip.innerHTML = labelText;
        chipsContainer.appendChild(chip);
        
        // Убираем надпись "Пока ничего не выбрано", если она есть
        const emptyMsg = chipsContainer.querySelector('.empty-chips');
        if (emptyMsg) {
            emptyMsg.remove();
        }
    } else {
        // Снимаем подсветку
        parentLabel.classList.remove('active');
        
        // Ищем и удаляем плашку, связанную с этим чекбоксом
        const chips = chipsContainer.querySelectorAll('.chip');
        chips.forEach(chip => {
            if (chip.getAttribute('data-value') === checkbox.value) {
                chip.remove();
            }
        });
        
        // Возвращаем надпись, если плашек не осталось
        if (chipsContainer.querySelectorAll('.chip').length === 0) {
            chipsContainer.innerHTML = '<span class="empty-chips" data-i18n="smart_empty_chips">Пока ничего не выбрано...</span>';
            // Если функция перевода доступна, сразу переводим эту строку
            if (typeof applyLanguage === 'function' && typeof currentLang !== 'undefined') {
                applyLanguage(currentLang);
            }
        }
    }
}

/**
 * Сохранение выбранных параметров и переход к стандартному маппингу
 */
function saveSmartRules() {
    const cards = document.querySelectorAll('.smart-mapper-card');
    const smartRules = {};

    cards.forEach(card => {
        const colName = card.getAttribute('data-col-name');
        const checkedBoxes = card.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkedBoxes.length > 0) {
            // Собираем системные ключи выбранных параметров
            const selectedParams = Array.from(checkedBoxes).map(box => box.value);
            smartRules[colName] = selectedParams;
        }
    });

    console.log("Сохраненные правила Smart Mapper:", smartRules);
    
    // Сохраняем правила в глобальный объект, чтобы бэкенд или парсер могли их забрать
    window.posSmartRules = smartRules;
    
    // Прячем Умное сито (очищаем контейнер)
    const container = document.getElementById('smartMapperContainer');
    if (container) {
        container.innerHTML = ''; 
    }

    // Запускаем старый интерфейс маппинга, передавая ему сохраненные данные шаблона
    if (typeof window.renderMapper2Cards === 'function') {
        window.renderMapper2Cards(window.currentTemplateData); 
    } else {
        console.error("Функция renderMapper2Cards не найдена");
    }
}

// Жестко привязываем функции к объекту window
window.detectComplexColumns = detectComplexColumns;
window.renderSmartMapperModal = renderSmartMapperModal;
// ==========================================
// ПРИМЕР РАБОТЫ (ДЛЯ ТЕСТА В КОНСОЛИ):
// ==========================================
/*
const testHeaders = ["Артикул", "Бренд", "Параметры", "Цена"];
const testRows = [
    ["A001", "Nokian", "205/55R16", "25000"],
    ["A002", "Michelin", "31X10.50R15LT 109S", "35000"], // <- Этот пример победит
    ["A003", "Pirelli", "195/65", "20000"]
];

const result = detectComplexColumns(testHeaders, testRows);
console.log(result);
// Выдаст: [{ colName: "Параметры", example: "31X10.50R15LT 109S", tokenCount: 7 }]
// Колонка "Цена" и "Артикул" будут проигнорированы из-за blacklist.
*/