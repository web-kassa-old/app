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

window.showTokenizer = function(columnName, tokensArray, paramsList) {
    const overlay = document.getElementById('tokenizer-overlay');
    console.log("Оверлей найден?", overlay);
    if (!overlay) return;

    // Генерируем кнопки токенов
    const tokensHtml = tokensArray.map((token, index) => {
        return `<button class="token" data-index="${index}">${token}</button>`;
    }).join('');

    // Генерируем строки параметров
    const paramsHtml = paramsList.map((param, index) => {
        // Делаем первый параметр активным по умолчанию
        const isActive = index === 0 ? 'active-target' : '';
        const isChecked = index === 0 ? 'checked' : '';
        
        return `
        <div class="param-row ${isActive}" data-param-name="${param.name}">
          <label class="param-info">
            <input type="radio" name="param_target" value="${param.name}" ${isChecked}>
            <span>${param.name}</span>
          </label>
          <div class="param-preview"></div>
          <button class="btn-confirm-inline" style="display: ${index === 0 ? 'block' : 'none'};">✔ Ок</button>
        </div>
        `;
    }).join('');

    // Собираем итоговую верстку модалки
    overlay.innerHTML = `
        <div class="tokenizer-modal">
            <div class="modal-header">
                <h2 class="modal-title" data-i18n="tok_pattern">Разрешение конфликта</h2>
                <button class="close-btn">&times;</button>
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

            <div class="params-list">
                ${paramsHtml}
            </div>

            <!-- Зона фолбэка скрыта по умолчанию -->
            <div class="fallback-zone" style="display: none;">
                <div class="fallback-msg"></div>
                <select class="fallback-select"></select>
                <button class="btn-fallback">Подтвердить выбор</button>
            </div>
            
            <div class="modal-footer" style="display: flex; gap: 10px;">
                <button type="button" class="btn-back" data-i18n="inc_back" style="flex: 1; background: var(--bg-secondary); border: 1px solid var(--border-light); color: var(--text-main); padding: 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">НАЗАД</button>
                <button type="button" class="btn-done" style="flex: 2; background: var(--accent-success); color: #000; border: none; padding: 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">ЗАВЕРШИТЬ</button>
            </div>
        </div>
    `;

    // Показываем окно
    overlay.style.display = 'flex';

    // --- БАЗОВЫЕ ОБРАБОТЧИКИ (ЗАКРЫТИЕ) ---
    const closeModal = () => {
        overlay.style.display = 'none';
        overlay.innerHTML = ''; // Очищаем DOM
    };

    overlay.querySelector('.close-btn').addEventListener('click', closeModal);
    overlay.querySelector('.btn-back').addEventListener('click', closeModal);
}; // <--- Здесь не хватало закрывающей скобки

window.startTokenizerQueue = function() {
    const queue = window.mapper2State.quarantine || [];
    
    // Если карантин пуст - просто идем на Экран 4
    if (queue.length === 0) {
        finishAndGoToPreview();
        return;
    }

    let currentQueueIndex = 0;
    let mappedResults = {}; // Временное хранилище: { sysKey: "Значение из словаря" }

    // --- 1. ЗАПУСК ОЧЕРЕДНОГО ПАТТЕРНА ---
    // --- 1. ЗАПУСК ОЧЕРЕДНОГО ПАТТЕРНА ---
    function processNext() {
        if (currentQueueIndex >= queue.length) {
            // Очередь закончилась, применяем результаты
            applyResultsToData();
            return;
        }

        const pattern = queue[currentQueueIndex];
        mappedResults = {}; // Сбрасываем для нового паттерна

        // Умная нарезка строки
        const currentTokens = pattern.rawString.match(/\d+(?:\.\d+)?|[a-zA-Zа-яА-ЯёЁ]+|[^\s\wа-яА-ЯёЁ]/g) || [pattern.rawString];

        const dicts = window.kaspiDicts || {};
        let paramsList = [];
        
        // --- НОВАЯ ЛОГИКА: Фильтруем параметры (оставляем только цифры и короткие коды) ---
        const excludeFromSmart = [
            'Артикул', 'Название товара', 'Бренд', 'Цена', 'Название модели', 
            'Рубрика', 'Код изображений', 'Ссылка на YouTube', 'Ссылка на картинку',
            'Описание (мин. 100 символов, макс. 7 000 символов)', 'Описание',
            'Вес для расчета логистики', 'Объединить в одну карточку', 'В наличии'
        ];

        Object.keys(dicts).forEach(paramName => {
            if (!excludeFromSmart.includes(paramName) && Array.isArray(dicts[paramName])) {
                const validExamples = dicts[paramName].filter(val => val && String(val).trim() !== '');
                if (validExamples.length > 0) {
                    // Проверяем, есть ли в словаре параметра цифры или короткие английские буквы (коды)
                    const isCodeOrNumber = validExamples.some(ex => {
                        const str = String(ex).trim();
                        return /\d/.test(str) || (/^[a-zA-Z]+$/.test(str) && str.length <= 3);
                    });
                    if (isCodeOrNumber) {
                        paramsList.push({ name: paramName });
                    }
                }
            }
        });
        
        // Фоллбэк, если после фильтра ничего не осталось
        if (paramsList.length === 0) {
            paramsList = [{ name: pattern.humanName || 'Неизвестная колонка' }];
        }

        // Рисуем UI
        window.showTokenizer(pattern.humanName || 'Неизвестная колонка', currentTokens, paramsList);

        // Обновляем заголовок очереди
        const overlay = document.getElementById('tokenizer-overlay');
        const titleEl = overlay.querySelector('.modal-title');
        if (titleEl) {
            titleEl.textContent = `Паттерн: ${currentQueueIndex + 1} из ${queue.length}`;
        }

        // Вешаем логику на кнопки
        attachLogic(pattern, dicts, overlay);
    }

    // --- 2. ЛОГИКА ИНТЕРФЕЙСА (Клики, склейка, проверки) ---
    function attachLogic(pattern, dicts, overlay) {
        const tokensBtns = overlay.querySelectorAll('.token');
        const paramRows = overlay.querySelectorAll('.param-row');
        const fallbackZone = overlay.querySelector('.fallback-zone');
        const fallbackSelect = overlay.querySelector('.fallback-select');
        const btnFallback = overlay.querySelector('.btn-fallback');
        const btnClear = overlay.querySelector('.btn-clear');
        const btnDone = overlay.querySelector('.btn-done');

        // Функция обновления превью (склейка выбранных токенов)
        const updatePreview = () => {
            const activeRow = overlay.querySelector('.param-row.active-target');
            if (!activeRow) return;
            const previewEl = activeRow.querySelector('.param-preview');
            const selectedText = Array.from(overlay.querySelectorAll('.token.selected')).map(b => b.textContent).join('');
            previewEl.textContent = selectedText;
        };

        // Клик по токену
        tokensBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;
                btn.classList.toggle('selected');
                fallbackZone.style.display = 'none'; // Прячем ошибку, если начали новый выбор
                updatePreview();
            });
        });

        // Клик по строке параметра (переключение радио-кнопки)
        paramRows.forEach(row => {
            row.addEventListener('click', (e) => {
                if (row.classList.contains('disabled')) return;
                
                // Деактивируем остальные
                paramRows.forEach(r => {
                    r.classList.remove('active-target');
                    r.querySelector('.btn-confirm-inline').style.display = 'none';
                });
                
                // Активируем текущую
                row.classList.add('active-target');
                row.querySelector('input[type="radio"]').checked = true;
                row.querySelector('.btn-confirm-inline').style.display = 'block';
                updatePreview();
            });
        });

        // Клик по галочке "✔ Ок"
        paramRows.forEach(row => {
            const confirmBtn = row.querySelector('.btn-confirm-inline');
            confirmBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Чтобы не сработал клик по самой строке
                
                const paramName = row.querySelector('input[type="radio"]').value;
                const gluedText = row.querySelector('.param-preview').textContent;
                
                if (!gluedText) return;

                // Ищем в справочнике
                let dictArray = dicts[paramName] || [];
                let matchedValue = null;
                
                for (let dv of dictArray) {
                    let strDv = String(dv).trim();
                    let baseDv = strDv.split('(')[0].trim();
                    
                    // Математическое или точное текстовое совпадение
                    if (baseDv.toLowerCase() === gluedText.toLowerCase() || 
                       (!isNaN(parseFloat(baseDv)) && parseFloat(baseDv) === parseFloat(gluedText))) {
                        matchedValue = strDv;
                        break;
                    }
                }

                if (matchedValue) {
                    lockParameter(row, paramName, matchedValue, gluedText);
                } else {
                    // ФОЛЛБЭК: Значение не найдено!
                    overlay.querySelector('.fallback-msg').innerHTML = `Значение <b>"${gluedText}"</b> не найдено в справочнике. Выберите вручную:`;
                    fallbackSelect.innerHTML = `<option value="" disabled selected>Справочник: ${paramName}...</option>` + 
                        dictArray.map(val => `<option value="${val}">${val}</option>`).join('');
                    fallbackZone.style.display = 'block';
                }
            });
        });

        // Клик по подтверждению Фоллбэка
        btnFallback.addEventListener('click', () => {
            const activeRow = overlay.querySelector('.param-row.active-target');
            const paramName = activeRow.querySelector('input[type="radio"]').value;
            const gluedText = activeRow.querySelector('.param-preview').textContent;
            const selectedVal = fallbackSelect.value;
            
            if (!selectedVal) return;
            
            lockParameter(activeRow, paramName, selectedVal, gluedText);
            fallbackZone.style.display = 'none';
        });

        // Функция фиксации (блокировки) параметра и токенов
        const lockParameter = (row, humanName, finalValue, tokenText) => {
            // Находим системный ключ для этого параметра, чтобы правильно сохранить в JSON
            let sysKey = Object.keys(window.mapper2State.sysToHumanMap || {}).find(k => window.mapper2State.sysToHumanMap[k] === humanName);
            if (!sysKey) sysKey = humanName;
            
            mappedResults[sysKey] = finalValue; // Сохраняем в память!

            // Блокируем UI строки
            row.classList.remove('active-target');
            row.classList.add('disabled');
            row.querySelector('.param-preview').style.display = 'none';
            row.querySelector('.btn-confirm-inline').style.display = 'none';
            row.insertAdjacentHTML('beforeend', `<span class="param-badge">${tokenText}</span>`);

            // Блокируем выбранные токены
            overlay.querySelectorAll('.token.selected').forEach(t => {
                t.classList.remove('selected');
                t.classList.add('disabled');
            });
            
            // Авто-фокус на следующую свободную строку
            const nextRow = overlay.querySelector('.param-row:not(.disabled)');
            if (nextRow) nextRow.click();
        };

        // Кнопка Сбросить (просто перезапускаем текущий паттерн)
        btnClear.addEventListener('click', () => {
            processNext();
        });

        // Кнопка Завершить
        btnDone.addEventListener('click', () => {
            // Сохраняем результаты работы над этим паттерном
            pattern.resolvedAttributes = mappedResults;
            currentQueueIndex++;
            processNext(); // Идем к следующему
        });
    }

    // --- 3. ФИНАЛИЗАЦИЯ И ПЕРЕХОД ---
    function applyResultsToData() {
        // Проходим по всем сформированным товарам
        window.parsedInvoiceData.forEach(item => {
            if (item._hasCollisions) {
                let attrsObj = item._attributesObj || {};
                
                // Для каждой коллизии этого товара ищем, как клиент ее разрешил
                item._collisionsList.forEach(col => {
                    const resolvedPattern = queue.find(q => q.rawString === col.rawString && q.sysKey === col.sysKey);
                    if (resolvedPattern && resolvedPattern.resolvedAttributes) {
                        // Вливаем вручную спаренные атрибуты
                        Object.assign(attrsObj, resolvedPattern.resolvedAttributes);
                    }
                });
                
                // Обновляем финальную JSON-строку атрибутов
                item.attributes = Object.keys(attrsObj).length > 0 ? JSON.stringify(attrsObj) : "";
            }
        });

        window.mapper2State.quarantine = []; // Очищаем карантин
        finishAndGoToPreview();
    }

    function finishAndGoToPreview() {
        const overlay = document.getElementById('tokenizer-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
        }
        window.renderPreviewTable();
        document.getElementById("mapper2Area").style.display = "none";
        document.getElementById("invoicePreviewArea").style.display = "flex";
    }

    // Запускаем маховик!
    processNext();
};