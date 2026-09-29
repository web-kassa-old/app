/**
 * Детектор сложных колонок (Smart Hybrid Mapper)
 * @param {Array} headers - Массив названий колонок (шапок), например: ['Бренд', 'Size', 'Цена']
 * @param {Array} rows - Массив массивов с данными, например: [['Nokian', '205/55R16', '25000'], ...]
 * @returns {Array} - Массив объектов с найденными сложными колонками и их максимальными примерами
 */
function detectComplexColumns(headers, rows) {
    // 1. Игнор-лист: колонки, которые точно не нужно парсить на токены
    const blacklist = ['цена', 'price', 'сумма', 'кол-во', 'количество', 'qty', 'штрихкод', 'barcode', 'артикул', 'sku', 'id'];
    
    const complexColumns = [];

    // Перебираем каждую колонку по её индексу
    headers.forEach((header, colIndex) => {
        const headerLower = String(header || "").toLowerCase();
        
        // Пропускаем пустые шапки и те, что попали в игнор-лист
        if (!headerLower || blacklist.some(word => headerLower.includes(word))) {
            return; 
        }

        let isComplex = false;
        let maxTokensCount = 0;
        let bestExample = "";

        // 2. Сканируем все строки колонки
        for (let i = 0; i < rows.length; i++) {
            // Защита от пустых или битых ячеек
            const cellValue = String(rows[i][colIndex] || "").trim();
            if (!cellValue) continue;

            // 3. Проверка на сложность (триггеры)
            // Ищем: цифра+символ+цифра (205/55, 31X10) ИЛИ склейку цифра+буква (R15, 91V)
            const hasSpecialChars = /\d+\s*[\/xX\-\*]\s*\d+/.test(cellValue);
            const hasMixedTypes = /\d+[a-zA-Zа-яА-ЯёЁ]+|[a-zA-Zа-яА-ЯёЁ]+\d+/.test(cellValue);

            if (hasSpecialChars || hasMixedTypes) {
                isComplex = true;
            }

            // 4. Токенизация для поиска самого "жирного" эталона
            // Режет на: слова | числа (включая дроби с точкой) | отдельные спецсимволы
            const tokens = cellValue.match(/[a-zA-Zа-яА-ЯёЁ]+|\d+(?:\.\d+)?|[^a-zA-Zа-яА-ЯёЁ\d\s]/g) || [];
            
            // Запоминаем строку, если она побила рекорд по количеству токенов
            if (tokens.length > maxTokensCount) {
                maxTokensCount = tokens.length;
                bestExample = cellValue;
            }
        }

        // 5. Если колонка сложная и мы нашли пример, сохраняем в итоговый массив
        if (isComplex && bestExample) {
            complexColumns.push({
                colName: header,         // Оригинальное название шапки
                example: bestExample,    // Тот самый "жирный" пример (например: 31X10.50R15LT)
                tokenCount: maxTokensCount
            });
        }
    });

    return complexColumns;
}

/**
 * Рендер модалки "Умное сито"
 * @param {Array} detectedColumns - Результат работы detectComplexColumns()
 */
window.renderSmartMapperModal = function(complexColumns) {
    const container = document.getElementById('smartMapperContainer');
    if (!container) return;

    // 1. Очищаем контейнер от старого мусора
    container.innerHTML = '';

    // 2. Создаем ЕДИНЫЙ каркас окна
    const modal = document.createElement('div');
    modal.className = 'smart-modal-content';

    // 3. Единая шапка
    const header = document.createElement('div');
    header.className = 'smart-modal-header';
    header.innerText = 'Настройка сложных колонок';
    modal.appendChild(header);

    // 4. Единое тело (сюда сложим карточки вертикально)
    const body = document.createElement('div');
    body.className = 'smart-modal-body';

    // === ТВОЙ СПИСОК ПАРАМЕТРОВ КАСПИ ===
    // (Я взял примерные данные, если у тебя есть свой массив — используй его)
    const kaspiParams = [
        { id: 'width', name: 'Ширина профиля', examples: ['175', '195', '10.50'] },
        { id: 'height', name: 'Высота профиля', examples: ['55', '65', '31'] },
        { id: 'diameter', name: 'Диаметр диска', examples: ['15', '16', '17'] },
        { id: 'load', name: 'Индекс нагрузки', examples: ['91', '94', '115/110'] },
        { id: 'speed', name: 'Индекс скорости', examples: ['T', 'H', 'V'] },
        { id: 'season', name: 'Сезонность', examples: ['Летние', 'Зимние'] }
    ];

    // 5. Цикл: генерируем ТОЛЬКО карточки внутри окна
    complexColumns.forEach(col => {
        const card = document.createElement('div');
        card.className = 'smart-mapper-card';

        // Оборачиваем каждый пример в <span>, чтобы они не слипались
        let checkboxesHtml = kaspiParams.map(param => {
            let exampleSpans = param.examples.map(ex => `<span>${ex}</span>`).join('');
            
            return `
                <label class="checkbox-item">
                    <input type="checkbox" value="${param.id}" data-col="${col.colName}">
                    <div class="checkbox-details">
                        <div class="checkbox-title">${param.name}</div>
                        <div class="checkbox-examples">${exampleSpans}</div>
                    </div>
                </label>
            `;
        }).join('');

        // Собираем карточку колонки
        card.innerHTML = `
            <div class="smart-col-info">
                <span>КОЛОНКА: ${col.colName.toUpperCase()}</span>
                <strong>${col.example || 'Пример не найден'}</strong>
            </div>
            <div class="smart-chips-area">
                <div style="font-size: 11px; color: #666; margin-bottom: 4px; text-transform: uppercase;">Вы выбрали:</div>
                <span class="empty-chips">Пока ничего не выбрано...</span>
            </div>
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px;">Какие параметры Kaspi здесь зашиты?</div>
            <div class="checkbox-grid">
                ${checkboxesHtml}
            </div>
        `;
        body.appendChild(card);
    });

    modal.appendChild(body);

    // 6. Единый подвал с ОДНОЙ кнопкой (используем родные стили POS Noir)
    const footer = document.createElement('div');
    footer.className = 'smart-modal-footer';
    footer.innerHTML = `<button class="btn-primary green" id="smartConfirmBtn">ПОДТВЕРДИТЬ ВЫБОР</button>`;
    modal.appendChild(footer);

    // Выводим готовую модалку на экран
    container.appendChild(modal);

    // 7. Обработчик нажатия на кнопку
    document.getElementById('smartConfirmBtn').addEventListener('click', () => {
        // Убираем оверлей
        container.className = '';
        container.innerHTML = '';
        // Переходим к старому интерфейсу
        if (typeof window.renderMapper2Cards === 'function') {
            window.renderMapper2Cards(window.currentTemplateData);
        }
    });
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