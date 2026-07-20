        const translations = {
            ru: {
                btn_sale: "ПРОДАЖА", btn_return: "ВОЗВРАТ", search_placeholder: "ПОИСК...",
                header_name: "НАИМЕНОВАНИЕ", header_price: "ЦЕНА", header_stock: "ОСТ",
                total_label_sale: "ИТОГО:", total_label_return: "К ВОЗВРАТУ:",
                pay_cash: "Нал", pay_qr: "QR", pay_red: "Red", pay_card: "Карт", pay_trans: "Пер",
                btn_cancel: "ОТМЕНА", btn_confirm: "ПОДТВЕРДИТЬ", btn_close: "ЗАКРЫТЬ",
                btn_close_report: "ЗАКРЫТЬ ОТЧЕТ", settings_title: "НАСТРОЙКИ",
                settings_lang: "ЯЗЫК ИНТЕРФЕЙСА", settings_sync: "СИНХРОНИЗАЦИЯ", settings_system: "СИСТЕМА",
                btn_sync: "Отправить чеки", btn_update: "Обновить кэш",
                msg_sync_empty: "Все чеки уже отправлены!", msg_sync_success: "Синхронизация успешна!", msg_sync_error: "Ошибка сети.",
                txt_sale_confirm: "ПОДТВЕРДИТЬ ПРОДАЖУ", txt_return_confirm: "ПОДТВЕРДИТЬ ВОЗВРАТ",
                txt_payment: "Оплата: ", txt_total: "ИТОГО: ",
                btn_add_cart: "В КОРЗИНУ", btn_save_db: "СОХРАНИТЬ В БАЗУ", 
                btn_camera: "КАМЕРА", btn_gallery: "ГАЛЕРЕЯ",
                btn_saving: "СОХРАНЕНИЕ...", btn_saved: "СОХРАНЕНО!",
                report_name: "НАИМЕНОВАНИЕ", report_qty: "КОЛ.", report_sum: "СУММА",
                report_sales: "Продажи", report_returns: "Возвраты", report_total_net: "Итого (чис.):",
                report_in_register: "В КАССЕ:", msg_loading: "ЗАГРУЗКА...", msg_no_internet: "НЕТ ИНТЕРНЕТА", 
                msg_no_data: "ОПЕРАЦИЙ НЕ НАЙДЕНО", msg_server_error: "ОШИБКА СЕРВЕРА",
                report_avg: "ср:",
                income_title: "📦 ИМПОРТ НАКЛАДНОЙ",
                income_rate: "Курс USD/KZT:",
                income_file: "Выберите файл:",
                income_parse: "ОБРАБОТАТЬ ФАЙЛ",
                income_code: "Код",
                income_name: "Наименование",
                income_qty: "Кол-во",
                income_price: "Цена",
                income_confirm: "✅ ОПРИХОДОВАТЬ НА СКЛАД",
                income_meta_supplier: "Поставщик",
                income_meta_doc: "Документ",
                income_meta_items: "Позиций",
                receive_btn: "ПРИЕМКА",
                pin_no_internet: "НЕТ ИНТЕРНЕТА", pin_checking: "ПРОВЕРКА...", pin_granted: "ДОСТУП РАЗРЕШЕН",
                pin_wrong: "НЕВЕРНЫЙ ПИН-КОД", pin_wrong_left: "НЕВЕРНЫЙ ПИН. ОСТАЛОСЬ: ", pin_conn_error: "СБОЙ ПОДКЛЮЧЕНИЯ",
                inc_file_selected: "Выбрано файлов: ", inc_file_placeholder: "Нажмите для выбора Excel",
                inc_err_no_doc: "нет номера инвойса", inc_err_no_sup: "нет поставщика", inc_err_no_table: "таблица с товарами не найдена",
                inc_err_missing: "в шапке (строка {0}) не найдено: ", inc_err_no_items: "из таблицы не удалось извлечь товары",
                inc_success: "{0} поз. распознано", inc_err_doc_format: "ОШИБКА НОМЕРА",
                inc_lbl_sup: "Поставщик:", inc_lbl_doc: "Документ:", inc_lbl_items: "Позиций:",
                inc_empty_cart: "Корзина пуста!", inc_doc_empty: "Номер документа не может быть пустым!",
                inc_sending: "Отправка {0}...", inc_server_err: "Ошибка сервера", inc_send_err: "❌ Ошибка при отправке инвойса: ",
                inc_archive_created: "Архив создан! Склад обновлен.", inc_all_done: "✅ Все накладные успешно проведены!",
                word_code: "«Код»", word_qty: "«Кол-во»", word_price: "«Цена»", login_title: "ВХОД", inc_err_sheet_missing: "[Лист {0}] стр. {1}: нет ",
                inc_err_sheet_no_table: "[Лист {0}]: нет таблицы с цифрами", cat_all: "Все",
                server_dup: "Накладная с номером {0} уже была проведена ранее.",
                server_no_db: "База не привязана. Нажмите POS Setup -> Привязать базу.",
                theme_toggle: "СМЕНА ТЕМЫ (ДЕНЬ/НОЧЬ)", settings_theme: "ОФОРМЛЕНИЕ",
                pay_cash_full: "НАЛИЧНЫЕ",
                pay_qr_full: "QR",
                pay_red_full: "РАССРОЧКА",
                pay_card_full: "ТЕРМИНАЛ",
                pay_trans_full: "ПЕРЕВОД",
                income_cbm: "Объем (CBM)",
                income_weight: "Вес (кг)",
                inc_file_selected: "Выбрано файлов: ",
                inc_file_placeholder: "Нажмите для выбора Excel",
                inc_no_file: "Пожалуйста, выберите файл!",
                inc_file_corrupted: "Файл поврежден или не является таблицей",
                inc_empty_cart: "Корзина пуста!",
                inc_doc_empty: "Номер документа не может быть пустым!",
                inc_all_done: "✅ Все накладные успешно проведены, оригиналы сохранены в папки!",
                err_server: "Ошибка сервера",
                err_network: "Ошибка сети",
                pin_block: "БЛОКИРОВКА. ОЖИДАНИЕ: ",
                pin_wrong: "НЕВЕРНЫЙ ПИН-КОД",
                loading_items: "Загрузка товаров...",
                status_offline: " (OFFLINE)",
                status_net_err: " (ОШИБКА СЕТИ - КЭШ)",
                photo_err: "⚠️ ФОТО НЕДОСТУПНО<br><br>Google отклонил запрос или файл удален",
                inc_status_db: "Связь с базы данных... ⏳",
                inc_status_write: "Запись товаров в таблицу... 📝",
                inc_status_drive: "Создаем архив на Google Drive... 📂",
                inc_status_almost: "Завершаем обработку... Осталось чуть-чуть ⏳",
                inc_status_done: "✅ Архив создан! Склад обновлен.",
                server_dup_fp: "Файл с точно таким же составом товаров уже был загружен ранее! Проверьте базу.",
                kaspi_check_btn: "🔍 ПРОВЕРИТЬ РЕЗЕРВ KASPI",
                kaspi_checking: "⏳ ПРОВЕРКА...",
                kaspi_err_net: "НЕТ ИНТЕРНЕТА",
                kaspi_err_server: "ОШИБКА СВЯЗИ С СЕРВЕРОМ",
                kaspi_no_token: "ТОКЕН KASPI НЕ НАСТРОЕН",
                kaspi_safe: "В РЕЗЕРВЕ ЧИСТО. МОЖНО ПРОДАВАТЬ",
                kaspi_danger: "ВНИМАНИЕ! ЗАКАЗАН НА KASPI:",
                kaspi_pcs: "шт. ОПАСНО!",
                kaspi_err_api: "ОШИБКА СЕРВЕРА KASPI",
                btn_delete_photo: "УДАЛИТЬ ФОТО",
                msg_photo_deleting: "УДАЛЕНИЕ...",
                confirm_delete_photo: "Удалить фотографию этого товара?",
                msg_loading_photo: "Загрузка фото...",
                setup_title: "Активация Системы",
                setup_account: "Аккаунт:",
                setup_store_name: "Название магазина",
                setup_plan: "Тип лицензии",
                setup_plan_trial: "Тест (7 дней)",
                setup_plan_pro: "Полная версия",
                setup_btn_start: "Развернуть базу данных",
                setup_footer: "Система автоматически создаст структуру папок на вашем Google Диске.",
                setup_pin_msg: "ПИН-код администратора:",
                setup_process_folder: "Создание главной папки...",
                setup_process_struct: "Создание структуры...",
                setup_process_copy: "Копирование баз данных...",
                setup_process_perms: "Настройка прав доступа...",
                setup_process_reg: "Регистрация в системе...",
                setup_success_title: "Система готова!",
                setup_success_desc: "Базы успешно скопированы на ваш Google Диск.",
                setup_btn_start_work: "Начать работу",
                markup_title: "НАЦЕНКА КАТЕГОРИИ",
                markup_type_perc: "% Процент",
                markup_type_fix: "₸ Сумма",
                markup_placeholder: "Значение...",
                markup_apply: "ПРИМЕНИТЬ",
                markup_err_val: "Введите корректное значение",
                markup_no_cost: "В этой категории нет товаров с закупочной ценой",
                report_sales: "ПРОДАЖИ", report_returns: "ВОЗВРАТЫ", report_total_net: "Итого (чис.):",
                report_items: "ТОВАРЫ", report_receipts: "ЧЕКИ",
                settings_help: "Справка",
                btn_help: "Руководство пользователя"
            },
            kz: {
                btn_sale: "САТУ", btn_return: "ҚАЙТАРУ", search_placeholder: "ІЗДЕУ...",
                header_name: "АТАУЫ", header_price: "БАҒА", header_stock: "ҚАЛД",
                total_label_sale: "БАРЛЫҒЫ:", total_label_return: "ҚАЙТАРЫЛАТЫН:",
                pay_cash: "Қолма", pay_qr: "QR", pay_red: "Red", pay_card: "Карта", pay_trans: "Аудр",
                btn_cancel: "БАС ТАРТУ", btn_confirm: "РАСТАУ", btn_close: "ЖАБУ",
                btn_close_report: "ЕСЕПТІ ЖАБУ", settings_title: "ПАРАМЕТРЛЕР",
                settings_lang: "ИНТЕРФЕЙС ТІЛІ", settings_sync: "СИНХРОНДАУ", settings_system: "ЖҮЙЕ",
                btn_sync: "Чектерді жіберу", btn_update: "Кэшті жаңарту",
                msg_sync_empty: "Чектер жоқ!", msg_sync_success: "Сәтті аяқталды!", msg_sync_error: "Желі қатесі.",
                txt_sale_confirm: "САТУДЫ РАСТАУ", txt_return_confirm: "ҚАЙТАРУДЫ РАСТАУ",
                txt_payment: "Төлем: ", txt_total: "БАРЛЫҒЫ: ",
                btn_add_cart: "СЕБЕТКЕ САЛУ", btn_save_db: "БАЗАҒА САҚТАУ", 
                btn_camera: "КАМЕРА", btn_gallery: "ГАЛЕРЕЯ",
                btn_saving: "САҚТАЛУДА...", btn_saved: "САҚТАЛДЫ!",
                report_name: "АТАУЫ", report_qty: "САНЫ", report_sum: "СОМАСЫ",
                report_sales: "Сатылымдар", report_returns: "Қайтарымдар", report_total_net: "Таза табыс:",
                report_in_register: "КАССАДА:", msg_loading: "ЖҮКТЕЛУДЕ...", msg_no_internet: "ИНТЕРНЕТ ЖОҚ", 
                msg_no_data: "ОПЕРАЦИЯЛАР ЖОҚ", msg_server_error: "СЕРВЕР ҚАТЕСІ",
                report_avg: "орт:",
                income_title: "📦 ЖҮКҚҰЖАТТЫ ИМПОРТТАУ",
                income_rate: "USD/KZT бағамы:",
                income_file: "Файлды таңдаңыз:",
                income_parse: "ФАЙЛДЫ ӨҢДЕУ",
                income_code: "Коды",
                income_name: "Атауы",
                income_qty: "Саны",
                income_price: "Бағасы",
                income_confirm: "✅ ҚОЙМАҒА КІРІСТЕУ",
                income_meta_supplier: "Жеткізуші",
                income_meta_doc: "Құжат",
                income_meta_items: "Позициялар",
                receive_btn: "ҚАБЫЛДАУ",
                pin_no_internet: "ИНТЕРНЕТ ЖОҚ", pin_checking: "БАЗАДАН ТЕКСЕРІЛУДЕ...", pin_granted: "РУҚСАТ БЕРІЛДІ",
                pin_wrong: "ҚАТЕ ПИН-КОД", pin_wrong_left: "ҚАТЕ ПИН. ҚАЛДЫ: ", pin_conn_error: "ҚОСЫЛУ ҚАТЕСІ",
                inc_file_selected: "Таңдалған файлдар: ", inc_file_placeholder: "Excel файлын таңдау үшін басыңыз",
                inc_err_no_doc: "инвойс нөмірі жоқ", inc_err_no_sup: "жеткізуші жоқ", inc_err_no_table: "тауарлар кестесі табылмады",
                inc_err_missing: "бас жағында ({0}-жол) табылмады: ", inc_err_no_items: "кестеден тауарларды оқу мүмкін болмады",
                inc_success: "{0} поз. анықталды", inc_err_doc_format: "НӨМІР ҚАТЕСІ",
                inc_lbl_sup: "Жеткізуші:", inc_lbl_doc: "Құжат:", inc_lbl_items: "Позициялар:",
                inc_empty_cart: "Себет бос!", inc_doc_empty: "Құжат нөмірі бос болмауы керек!",
                inc_sending: "{0} жіберілуде...", inc_server_err: "Сервер қатесі", inc_send_err: "❌ Инвойсты жіберу қатесі: ",
                inc_archive_created: "Мұрағат құрылды! Қойма жаңартылды.", inc_all_done: "✅ Барлық жүкқұжаттар сәтті өтті!",
                word_code: "«Код»", word_qty: "«Саны»", word_price: "«Бағасы»", login_title: "КІРУ", inc_err_sheet_missing: "[{0} парағы] {1}-жол: табылмады ",
                inc_err_sheet_no_table: "[{0} парағы]: цифрлары бар кесте жоқ", cat_all: "Барлығы",
                server_dup: "{0} нөмірлі жүкқұжат бұрын қабылданған.",
                server_no_db: "Дерекқор байланыспаған. POS Setup -> Привязать базу түймесін басыңыз.",
                theme_toggle: "ТАҚЫРЫПТЫ АУЫСТЫРУ (КҮН/ТҮН)", settings_theme: "КӨРІНІС",
                pay_cash_full: "ҚОЛМА ҚОЛ",
                pay_qr_full: "QR",
                pay_red_full: "БӨЛІП ТӨЛЕУ",
                pay_card_full: "ТЕРМИНАЛ",
                pay_trans_full: "АУДАРЫМ",
                income_cbm: "Көлемі (CBM)",
                income_weight: "Салмағы (кг)",
                inc_file_selected: "Таңдалған файлдар: ",
                inc_file_placeholder: "Excel файлын таңдау үшін басыңыз",
                inc_no_file: "Файлды таңдаңыз!",
                inc_file_corrupted: "Файл зақымдалған немесе кесте емес",
                inc_empty_cart: "Себет бос!",
                inc_doc_empty: "Құжат нөмірі бос болмауы керек!",
                inc_all_done: "✅ Барлық жүкқұжаттар сәтті өтті, түпнұсқалар папкаларға сақталды!",
                err_server: "Сервер қатесі",
                err_network: "Желі қатесі",
                pin_block: "БҰҒАТТАУ. КҮТУ: ",
                pin_wrong: "ҚАТЕ ПИН-КОД",
                loading_items: "Тауарларды жүктеу...",
                status_offline: " (ЖЕЛІСІЗ)",
                status_net_err: " (ЖЕЛІ ҚАТЕСІ - КЭШ)",
                photo_err: "⚠️ ФОТО ҚОЛЖЕТІМСІЗ<br><br>Google сұрауды қабылдамады немесе файл жойылды",
                inc_status_db: "Дерекқормен байланыс... ⏳",
                inc_status_write: "Тауарларды кестеге жазу... 📝",
                inc_status_drive: "Google Drive-та архив жасау... 📂",
                inc_status_almost: "Өңдеуді аяқтау... Сәл қалды ⏳",
                inc_status_done: "✅ Архив жасалды! Қойма жаңартылды.",
                server_dup_fp: "Құрамы дәл осындай файл бұрын жүктелген! Базаны тексеріңіз.",
                kaspi_check_btn: "🔍 KASPI РЕЗЕРВІН ТЕКСЕРУ",
                kaspi_checking: "⏳ ТЕКСЕРІЛУДЕ...",
                kaspi_err_net: "ИНТЕРНЕТ ЖОҚ",
                kaspi_err_server: "СЕРВЕРМЕН БАЙЛАНЫС ҚАТЕСІ",
                kaspi_no_token: "KASPI ТОКЕНІ БАПТАЛМАҒАН",
                kaspi_safe: "РЕЗЕРВ ТАЗА. САТУҒА БОЛАДЫ",
                kaspi_danger: "KASPI-ДЕ ТАПСЫРЫС БЕРІЛГЕН:",
                kaspi_pcs: "дана. ҚАУІПТІ!",
                kaspi_err_api: "KASPI СЕРВЕРІНІҢ ҚАТЕСІ",
                btn_delete_photo: "СУРЕТТІ ЖОЮ",
                msg_photo_deleting: "ЖОЮ...",
                confirm_delete_photo: "Бұл тауардың суретін жою керек пе?",
                msg_loading_photo: "Сурет жүктелуде...",
                setup_title: "Жүйені іске қосу",
                setup_account: "Аккаунт:",
                setup_store_name: "Дүкен атауы",
                setup_plan: "Лицензия түрі",
                setup_plan_trial: "Сынақ (7 күн)",
                setup_plan_pro: "Толық нұсқа",
                setup_btn_start: "Дерекқорды орнату",
                setup_footer: "Жүйе сіздің Google Drive-та папкалар құрылымын автоматты түрде жасайды.",
                setup_pin_msg: "Әкімшінің ПИН-коды:",
                setup_process_folder: "Негізгі папканы құру...",
                setup_process_struct: "Құрылымды жасау...",
                setup_process_copy: "Дерекқорларды көшіру...",
                setup_process_perms: "Рұқсаттарды баптау...",
                setup_process_reg: "Жүйеге тіркеу...",
                setup_success_title: "Жүйе дайын!",
                setup_success_desc: "Дерекқорлар сіздің Google Drive-қа сәтті көшірілді.",
                setup_btn_start_work: "Жұмысты бастау",
                markup_title: "КАТЕГОРИЯ ҮСТЕМЕСІ",
                markup_type_perc: "% Пайыз",
                markup_type_fix: "₸ Сома",
                markup_placeholder: "Мәні...",
                markup_apply: "ҚОЛДАНУ",
                markup_err_val: "Дұрыс мәнді енгізіңіз",
                markup_no_cost: "Бұл санатта сатып алу бағасы бар тауарлар жоқ",
                report_sales: "САТЫЛЫМДАР", report_returns: "ҚАЙТАРЫМДАР", report_total_net: "Таза табыс:",
                report_items: "ТАУАРЛАР", report_receipts: "ЧЕКТЕР",
                settings_help: "Анықтама",
                btn_help: "Пайдаланушы нұсқаулығы"
            }
        };

        // Загружаем сохраненную тему
        let currentTheme = localStorage.getItem('pos_theme') || 'dark';
        if (currentTheme === 'light') { document.body.classList.add('light-theme'); }

        function toggleTheme() {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('pos_theme', isLight ? 'light' : 'dark');
        }

        let currentLang = localStorage.getItem('pos_lang') || 'ru';
        let db = [], cart = [], mode = 'sale', pendingMethod = null;
        let staffList = [], currentUser = null;
        let currentPinInput = '';
        let itemHoldTimer = null;
        let isItemLongPress = false;

        // Состояние дашборда отчетов
        let reportState = { method: 'all', type: 'sale', view: 'items' };

        let failedAttempts = parseInt(localStorage.getItem('pos_fails')) || 0;
        let blockUntil = parseInt(localStorage.getItem('pos_block')) || 0;
        
        let invoiceSynonyms = {};
        let currentCategory = 'all';

        // === ВСТАВЛЯЕТЕ КОД СЮДА (Начало П1) ===
window.itemHoldTimer = null;
window.isItemLongPress = false;

window.startItemHold = function(id, event) {
    window.isItemLongPress = false;
    window.itemHoldTimer = setTimeout(() => {
        window.isItemLongPress = true;
        openQuickEditModal(id);
    }, 800);
};

window.cancelItemHold = function() {
    if (window.itemHoldTimer) {
        clearTimeout(window.itemHoldTimer);
        window.itemHoldTimer = null;
    }
};

window.handleItemClick = function(id, event) {
    if (window.isItemLongPress) {
        event.preventDefault();
        return false;
    }
    if (typeof add === 'function') {
        add(id);
    }
};

window.openQuickEditModal = function(id) {
    const item = db.find(i => String(i.id) === String(id));
    if (!item) return;

    // Удаляем старое окно, если есть
    const existingModal = document.getElementById('quickEditModal');
    if (existingModal) existingModal.remove();

    // Собираем категории
    const uniqueCats = [...new Set(db.map(i => i.category).filter(Boolean))];
    let catOptions = `<option value="0" ${!item.category || item.category === '0' ? 'selected' : ''}>Не выбрано</option>`;
    
    uniqueCats.forEach(cat => {
        if (cat !== '0') {
            let selected = (item.category === cat) ? 'selected' : '';
            catOptions += `<option value="${cat}" ${selected}>${cat}</option>`;
        }
    });
    catOptions += `<option value="new">+ Новая категория</option>`;

    // Определяем мин. остаток (по умолчанию 1) и фактический остаток
    const minStockVal = item.min_stock !== undefined ? item.min_stock : 1;
    const currentStock = Number(item.stock) || 0;

    const modalHtml = `
        <div id="quickEditModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; justify-content: center; align-items: flex-start; padding-top: 5vh; font-family: 'Roboto', sans-serif;">
            
            <style>
                /* Скрываем стрелки у числовых полей */
                .no-spinners::-webkit-outer-spin-button,
                .no-spinners::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .no-spinners {
                    -moz-appearance: textfield;
                }
                
                /* Базовые стили элементов окна */
                #quickEditModal input, #quickEditModal select {
                    background: #000;
                    color: #fff;
                    border: 1px solid #333;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 16px;
                    box-sizing: border-box;
                    outline: none;
                }
                #quickEditModal input:focus, #quickEditModal select:focus {
                    border-color: #555;
                }
                #quickEditModal label {
                    font-size: 11px;
                    color: #888;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                    display: block;
                    letter-spacing: 0.5px;
                }
            </style>

            <div style="background: #1e1e1e; padding: 20px; border-radius: 8px; width: 90%; max-width: 350px; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #333;">
                <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 16px; text-align: center; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px; letter-spacing: 1px;">РАСПРЕДЕЛЕНИЕ ТОВАРА</h3>
                
                <div style="margin-bottom: 15px;">
                    <label>Наименование</label>
                    <input type="text" id="qe-name" value="${item.name || ''}" style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label>Категория</label>
                    <select id="qe-category" style="width: 100%;" onchange="if(this.value==='new') { alert('Тут будет вызов модалки создания категории'); }">
                        ${catOptions}
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label>Штрихкод</label>
                    <div style="display: flex;">
                        <input type="text" id="qe-barcode" value="${item.barcode || ''}" placeholder="Отсканируйте..." style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0; border-right: none;">
                        <button type="button" style="padding: 0 15px; border: 1px solid #333; background: #2a2a2a; border-top-right-radius: 4px; border-bottom-right-radius: 4px; color: #888; font-size: 18px; cursor: pointer;">📷</button>
                    </div>
                </div>

                <div style="display: flex; gap: 15px; margin-bottom: 5px;">
                    <div style="flex: 1;">
                        <label>Цена (₸)</label>
                        <input type="number" inputmode="numeric" class="no-spinners" id="qe-price" value="${item.price || 0}" onclick="this.select()" style="width: 100%;">
                    </div>
                    <div style="flex: 1;">
                        <label>Мин. остаток</label>
                        <input type="number" inputmode="numeric" class="no-spinners" id="qe-minstock" value="${minStockVal}" onclick="this.select()" style="width: 100%;">
                    </div>
                </div>
                
                <div style="text-align: right; margin-bottom: 20px;">
                    <span style="color: #00bcd4; font-size: 12px;">Факт: ${currentStock}</span>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button type="button" onclick="window.saveQuickEdit('${item.id}')" style="flex: 2; padding: 12px; border: none; background: #1b5e20; color: white; border-radius: 4px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer;">Сохранить</button>
                    <button type="button" onclick="document.getElementById('quickEditModal').remove()" style="flex: 1; padding: 12px; border: none; background: #b71c1c; color: white; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer;">✖</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveQuickEdit = function(id) {
    const item = db.find(i => String(i.id) === String(id));
    if (!item) return;

    // 1. Точный захват полей по стандартным ID модального окна быстрой правки
    const nameInput = document.getElementById('qe-name');
    const priceInput = document.getElementById('qe-price');
    const minStockInput = document.getElementById('qe-minstock');
    const barcodeInput = document.getElementById('qe-barcode');
    const catInput = document.getElementById('qe-category');

    const newName = nameInput ? nameInput.value.trim() : "";
    const rawPrice = priceInput ? priceInput.value : "0";
    const rawMinStock = minStockInput ? minStockInput.value : "0";
    const newBarcode = barcodeInput ? barcodeInput.value.trim() : "";
    const catValue = catInput ? catInput.value : "";

    // 2. Безопасная очистка чисел (обязательная замена запятой на точку для parseFloat)
    const cleanPrice = String(rawPrice).replace(/\s/g, '').replace(',', '.');
    const newPrice = parseFloat(cleanPrice) || 0;
    
    const cleanMinStock = String(rawMinStock).replace(/\s/g, '').replace(',', '.');
    const newMinStock = parseFloat(cleanMinStock) || 0;

    // 3. Обновляем локальную базу (Optimistic UI) с правильным ключом item_name
    if (newName) {
        item.item_name = newName;
        item.name = newName; // дублируем на случай внутренних проверок клиента
    }
    item.price = newPrice;
    item.min_stock = newMinStock;
    item.barcode = newBarcode;

    if (catValue === '0' || catValue === 'Не выбрано' || catValue === '') {
        item.category = "Без категории"; 
    } else if (catValue !== 'new') {
        item.category = catValue;
    }

    // Закрываем модальное окно и перерисовываем интерфейс
    const modal = document.getElementById('quickEditModal');
    if (modal) modal.remove();
    if (typeof render === 'function') render();

    // 4. Формируем payload точно по спецификации бэкенда (command: "direct_update")
    const payload = {
      action: "direct_update",
      api_key: CLIENT_API_KEY,
      itemId: String(item.id), 
      data: {
        item_name: item.item_name || item.name, 
        category: item.category,
        barcode: item.barcode,
        min_stock: newMinStock,
        price: newPrice 
      }
    };

    // 5. Отправка на сервер через единый шлюз
    fetch(GATEWAY_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' 
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('Ответ от сервера:', response);
        if (response && response.error) {
            alert('Бэкенд отказал в записи: ' + response.error);
        } else if (response && response.success === false) {
            alert('Бэкенд вернул success: false. Проверьте code.gs');
        } else {
            console.log('Товар успешно обновлен в таблице!');
        }
    })
    .catch(err => {
        alert('Критическая ошибка вызова сервера: ' + err.message);
    });
};

// === (Конец П1) ===

        // Криптографическое хеширование ПИН-кода на стороне кассы
        async function getSecurePin(rawPin) {
            const encoder = new TextEncoder();
            const data = encoder.encode(String(rawPin).trim());
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        function renderCategories() {
            const categories = new Set();
            document.querySelectorAll('.c-item').forEach(el => {
                const cat = el.getAttribute('data-cat');
                if (cat) categories.add(cat);
            });

            const bar = document.getElementById('categoryBar');
            if (!bar) return;

            let html = `<div class="cat-btn ${currentCategory === 'all' ? 'active' : ''}" 
                onmousedown="startCatHold('all', event)" 
                onmouseup="cancelCatHold()" 
                onmouseleave="cancelCatHold()" 
                ontouchstart="startCatHold('all', event)" 
                ontouchend="cancelCatHold()" 
                ontouchmove="cancelCatHold()"
                ontouchcancel="cancelCatHold()" 
                onclick="handleCatClick('all')" 
                data-i18n="cat_all">${translations[currentLang].cat_all}</div>`;

            categories.forEach(c => {
                html += `<div class="cat-btn ${currentCategory === c ? 'active' : ''}" 
                onmousedown="startCatHold('${c}', event)" 
                onmouseup="cancelCatHold()" 
                onmouseleave="cancelCatHold()" 
                ontouchstart="startCatHold('${c}', event)" 
                ontouchend="cancelCatHold()" 
                ontouchmove="cancelCatHold()"
                ontouchcancel="cancelCatHold()" 
                onclick="handleCatClick('${c}')">${c}</div>`;
            });

            bar.innerHTML = html;
        }

        function setCategory(cat) {
            currentCategory = cat;
            renderCategories();
            filter();
        }

        function checkBlockTimer() {
            if (blockUntil > Date.now()) {
                const err = document.getElementById('login-error');
                const field = document.getElementById('pin-field');
                
                field.style.color = 'var(--accent-red)';
                err.style.color = 'var(--accent-red)';
                err.style.visibility = 'visible';
                
                const interval = setInterval(() => {
                    const remaining = Math.ceil((blockUntil - Date.now()) / 1000);
                    
                    if (remaining <= 0) {
                        clearInterval(interval);
                        failedAttempts = 0;
                        localStorage.removeItem('pos_fails');
                        localStorage.removeItem('pos_block');
                        
                        err.style.visibility = 'hidden';
                        field.style.color = 'var(--accent-yellow)'; 
                        err.innerText = translations[currentLang].pin_wrong;
                    } else {
                        const mins = Math.floor(remaining / 60);
                        const secs = remaining % 60;
                        err.innerText = translations[currentLang].pin_block + `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                    }
                }, 1000);
                return true;
            }
            return false;
        }

        function applyLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('pos_lang', lang);
            document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
            document.getElementById('lang-kz').classList.toggle('active', lang === 'kz');
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) el.innerText = translations[lang][key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[lang][key]) el.placeholder = translations[lang][key];
            });
            sm(mode);
        }

        function sm(m) {
            mode = m;
            document.getElementById('ms').classList.toggle('active-s', m==='sale');
            document.getElementById('mr').classList.toggle('active-r', m==='return');
            document.getElementById('cs').classList.toggle('r-theme', m==='return');
            document.getElementById('tl').innerText = m === 'return' ? translations[currentLang].total_label_return : translations[currentLang].total_label_sale;
            
            // МАГИЯ ПЕРЕМЕННЫХ: Принудительно меняем базовый цвет ВСЕЙ программы
            if (m === 'return') {
                document.body.style.setProperty('--bg-body', 'var(--bg-return)');
            } else {
                document.body.style.removeProperty('--bg-body');
            }
        }

        function addPin(digit) {
            if (currentPinInput.length < 4) {
                currentPinInput += digit;
                document.getElementById('pin-field').value = currentPinInput;
                if (currentPinInput.length === 4) {
                    handleAutoLogin(currentPinInput);
                }
            }
        }

        function clearPin() {
            currentPinInput = '';
            document.getElementById('pin-field').value = '';
        }

        function delPin() {
            currentPinInput = currentPinInput.slice(0, -1);
            document.getElementById('pin-field').value = currentPinInput;
        }

async function handleAutoLogin(val) {
            if (blockUntil > Date.now()) {
                clearPin();
                return; 
            }

            const err = document.getElementById('login-error');
            const field = document.getElementById('pin-field');
            
            const securedPin = await getSecurePin(val);
            
            // === НАЧАЛО: УМНАЯ ОФЛАЙН-АВТОРИЗАЦИЯ ===
            if (!navigator.onLine) {
                const savedPin = localStorage.getItem('offline_pin');
                const savedUser = localStorage.getItem('offline_user');
                
                if (savedPin && savedUser && securedPin === savedPin) {
                    field.style.color = 'var(--accent-green)'; 
                    err.innerText = translations[currentLang].pin_granted + translations[currentLang].status_offline;
                    err.style.color = 'var(--accent-green)';
                    err.style.visibility = 'visible';
                    
                    setTimeout(() => {
                        login(JSON.parse(savedUser)); 
                        field.style.color = 'var(--accent-yellow)';
                        err.style.visibility = 'hidden';
                    }, 400);
                    return;
                } else {
                    field.style.color = 'var(--accent-red)'; 
                    field.classList.add('error-shake');
                    err.innerText = savedPin ? translations[currentLang].pin_wrong : translations[currentLang].pin_no_internet; 
                    err.style.color = 'var(--accent-red)'; 
                    err.style.visibility = 'visible';
                    setTimeout(() => { field.classList.remove('error-shake'); err.style.visibility = 'hidden'; field.style.color = 'var(--accent-yellow)'; clearPin(); }, 1200);
                    return;
                }
            }
            // === КОНЕЦ: ОФЛАЙН-АВТОРИЗАЦИЯ ===

            field.style.color = 'var(--accent-blue)'; 
            err.innerText = translations[currentLang].pin_checking;
            err.style.color = 'var(--accent-blue)';
            err.style.visibility = 'visible';

            try {
                // Достаем актуальный API-ключ
                let activeApiKey = localStorage.getItem('CLIENT_API_KEY') || (typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : "");

                const response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        api_key: activeApiKey, 
                        action: 'verifyPin', 
                        pin: securedPin 
                    })
                });

                const textRes = await response.text(); 
                let res;
                try {
                    res = JSON.parse(textRes);
                } catch (e) {
                    throw new Error("SERVER_ERROR");
                }

                if (res.success) {
                    failedAttempts = 0;
                    localStorage.removeItem('pos_fails');
                    localStorage.removeItem('pos_block');
                    
                    localStorage.setItem('offline_pin', securedPin);
                    localStorage.setItem('offline_user', JSON.stringify(res.user));

                    field.style.color = 'var(--accent-green)'; 
                    err.innerText = translations[currentLang].pin_granted;
                    err.style.color = 'var(--accent-green)';
                    
                    setTimeout(() => {
                        login(res.user); 
                        field.style.color = 'var(--accent-yellow)';
                        err.style.color = 'var(--accent-red)';
                        err.style.visibility = 'hidden';
                        err.innerText = translations[currentLang].pin_wrong;
                    }, 400);

                } else {
                    // === НОВАЯ ЗАЩИТА ОТ БИТЫХ КЛЮЧЕЙ ===
                    if (res.error && (res.error.includes("api_key") || res.error.includes("База клиента не найдена") || res.error.includes("INVALID"))) {
                        throw new Error("BAD_API_KEY"); // Сервер ругается на ключ арендатора
                    }
                    throw new Error("WRONG_PIN"); // Реально неверный пин-код
                }

            } catch (error) {
                console.error("Ошибка авторизации:", error);
                
                // === АВТОМАТИЧЕСКИЙ СБРОС БЕЗ ЗАВИСАНИЙ ===
                if (error.message === "BAD_API_KEY") {
                    localStorage.clear(); // Полностью вычищаем битые ключи
                    alert("Ключ доступа устарел. Приложение будет перезагружено для безопасности.");
                    window.location.reload(true); // Жесткая перезагрузка страницы (никаких зависаний)
                    return;
                }

                let isWrongPin = error.message === "WRONG_PIN";
                
                if (isWrongPin) {
                    failedAttempts++;
                    localStorage.setItem('pos_fails', failedAttempts);
                    
                    if (failedAttempts >= 3) {
                        blockUntil = Date.now() + 5 * 60 * 1000;
                        localStorage.setItem('pos_block', blockUntil);
                        field.classList.add('error-shake');
                        setTimeout(() => { field.classList.remove('error-shake'); clearPin(); }, 800);
                        checkBlockTimer(); 
                        return;
                    }
                }

                field.style.color = 'var(--accent-red)'; 
                field.classList.add('error-shake');
                
                const attemptsLeft = Math.max(0, 3 - failedAttempts);
                err.innerText = isWrongPin ? `${translations[currentLang].pin_wrong_left}${attemptsLeft}` : translations[currentLang].pin_conn_error;
                err.style.color = 'var(--accent-red)';
                err.style.visibility = 'visible';

                setTimeout(() => { 
                    field.classList.remove('error-shake');
                    err.style.visibility = 'hidden'; 
                    field.style.color = 'var(--accent-yellow)'; 
                    clearPin();
                }, 1200);
            }
        }
        function login(user) {
            currentUser = user;
            localStorage.setItem('user_role', user.role);
            localStorage.setItem('user_uid', user.uid);
            document.getElementById('pin-screen').style.display = 'none';
            const badge = document.getElementById('cashier-info');
            badge.innerText = `👤 ${user.name.toUpperCase()} (${user.uid})`;
            badge.style.display = 'inline-block';
            clearPin();
            document.getElementById('sb').blur(); 
            
            // Мгновенно запрашиваем персональную кассу (без всплывающих окон об ошибке сети)
            refreshPosData(true); 
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_uid'); // Стираем данные сессии
            document.getElementById('cashier-info').style.display = 'none';
            document.getElementById('pin-screen').style.display = 'flex';
            clearPin();
            
            // Визуально обнуляем суммы при выходе, чтобы сменщик их не увидел
            ['sum-cash','sum-qr','sum-red','sum-card','sum-trans'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.innerText = '0 ₸';
            });
        }

        async function load() {
            const savedUid = localStorage.getItem('user_uid') || (currentUser ? currentUser.uid : '');
            const savedRole = localStorage.getItem('user_role') || '';
            // Делаем персональный кэш, чтобы продавцы не видели суммы друг друга при перезагрузке
            const cacheKey = 'totals_cache_' + (savedUid || 'anon');

            try {
                const cachedDb = localStorage.getItem('db_cache');
                const cachedTotals = localStorage.getItem(cacheKey);
                const cachedStaff = localStorage.getItem('staff_cache'); 
                if (cachedDb) db = JSON.parse(cachedDb);
                if (cachedStaff) staffList = JSON.parse(cachedStaff);
                if (cachedTotals) {
                    const t = JSON.parse(cachedTotals);
                    document.getElementById('sum-cash').innerText = (t.cash || 0).toLocaleString() + ' ₸';
                    document.getElementById('sum-qr').innerText = (t.qr_kaspi || t.qr || 0).toLocaleString() + ' ₸';
                    document.getElementById('sum-red').innerText = (t.installment || 0).toLocaleString() + ' ₸';
                    document.getElementById('sum-card').innerText = (t.pos_terminal || t.card || 0).toLocaleString() + ' ₸';
                    document.getElementById('sum-trans').innerText = (t.transfer || 0).toLocaleString() + ' ₸';
                }
                if (db.length > 0) render();
            } catch (e) {}

            if (!navigator.onLine) return; 
            
            // Запрещаем сетевой запрос к серверу, пока кассир не прошел ПИН-код
            if (!currentUser) return;

            try {
                // Передаем серверу данные авторизованного пользователя
                const fetchUrl = `${APPS_SCRIPT_URL}?action=getInitialData&api_key=${CLIENT_API_KEY}&t=${Date.now()}&uid=${savedUid}&role=${savedRole}`;
                const res = await fetch(fetchUrl, { redirect: 'follow' });
                const data = await res.json();
                if (data.items) db = data.items;
                if (data.staff) {
                    staffList = data.staff;
                    localStorage.setItem('staff_cache', JSON.stringify(staffList));
                }
                
                if (data.synonyms && Object.keys(data.synonyms).length > 0) {
                    invoiceSynonyms = data.synonyms;
                }
                
                const t = data.totals || { cash: 0, qr_kaspi: 0, installment: 0, pos_terminal: 0, transfer: 0 };
                document.getElementById('sum-cash').innerText = (t.cash || 0).toLocaleString() + ' ₸';
                document.getElementById('sum-qr').innerText   = (t.qr_kaspi || t.qr || 0).toLocaleString() + ' ₸';
                document.getElementById('sum-red').innerText  = (t.installment || t.red || 0).toLocaleString() + ' ₸';
                document.getElementById('sum-card').innerText = (t.pos_terminal || t.pos || t.card || 0).toLocaleString() + ' ₸';
                document.getElementById('sum-trans').innerText= (t.transfer || 0).toLocaleString() + ' ₸';
                render();
                localStorage.setItem('db_cache', JSON.stringify(db));
                localStorage.setItem(cacheKey, JSON.stringify(t)); // Сохраняем в персональный кэш
            } catch (e) { console.error("Ошибка загрузки данных"); }
        }

        async function refreshPosData(isSilent = false) {
            if (!navigator.onLine) {
                // Выдаем ошибку только если обновление запрошено вручную
                if (isSilent !== true) {
                    alert(translations[currentLang].msg_no_internet);
                }
                return;
            }
            const btn = document.getElementById('btn-sync-data');
            btn.classList.add('sync-spin'); 
            try { await load(); } finally { setTimeout(() => { btn.classList.remove('sync-spin'); }, 600); }
        }

        function startItemHold(id, event) {
    isItemLongPress = false;
    // Запускаем таймер на 1 секунду
    itemHoldTimer = setTimeout(() => {
        isItemLongPress = true;
        openQuickEditModal(id);
    }, 1000); 
}

function cancelItemHold() {
    if (itemHoldTimer) {
        clearTimeout(itemHoldTimer);
        itemHoldTimer = null;
    }
}

function handleItemClick(id, event) {
    // Если это было долгое нажатие, отменяем обычную продажу/добавление
    if (isItemLongPress) {
        event.preventDefault();
        return;
    }
    add(id);
}

// Заглушка, чтобы код не выдавал ошибку при тесте
function openQuickEditModal(id) {
    console.log("Открываем быстрое редактирование для товара:", id);
    // На следующем шаге здесь будет логика заполнения окна
}

        function render() {
            const catalog = document.getElementById('catalog');
            if (!db || db.length === 0) return catalog.innerHTML = '<div style="color:var(--text-muted); padding:20px; text-align:center;">' + translations[currentLang].loading_items + '</div>';
            catalog.innerHTML = db.map(i => {
                const hasPhoto = i.img && i.img.toString().length > 10;
                // Компактная иконка вместо слова ФОТО с правильным курсором
                const photoBadge = `<span onclick="openItemMenu('${i.id}'); event.stopPropagation();" style="display:flex; align-items:center; justify-content:center; width: 28px; height: 28px; background-color: ${hasPhoto?'var(--accent-yellow)':'var(--bg-hover)'}; color: ${hasPhoto?'#000':'var(--text-muted)'}; font-size: 15px; border-radius: 4px; margin-right: 8px; border: 1px solid ${hasPhoto?'var(--accent-yellow)':'var(--border-focus)'}; flex-shrink: 0; cursor: pointer; user-select: none;">📷</span>`;
                
                const roundedPrice = Math.round(Number(i.price) || 0);
                
                return `<div class="c-item" 
                    onmousedown="window.startItemHold('${i.id}', event)" 
                    onmouseup="window.cancelItemHold()" 
                    onmouseleave="window.cancelItemHold()" 
                    ontouchstart="window.startItemHold('${i.id}', event)" 
                    ontouchend="window.cancelItemHold()" 
                    ontouchcancel="window.cancelItemHold()" 
                    oncontextmenu="event.preventDefault(); return false;"
                    onclick="window.handleItemClick('${i.id}', event)" 
                    data-cat="${i.category || ''}">
                    <div class="i-name" style="display:flex; align-items:center; flex: 1; min-width: 0;">
                        ${photoBadge} 
                        
                        <div style="display: flex; align-items: center; gap: 6px; flex: 1; overflow-x: auto; white-space: nowrap; scrollbar-width: none;">
                            <span style="color: var(--text-main); font-size: 13px;">${i.name || 'Без названия'}</span>
                            <span style="color: var(--text-muted); font-size: 11px; font-family: 'Roboto', sans-serif; font-weight: normal;">#${i.id}</span>
                        </div>
                        
                    </div>
                    
                    <div class="i-price" style="width: auto; min-width: 60px; white-space: nowrap; flex-shrink: 0; margin-left: 6px;">${roundedPrice.toLocaleString('ru-RU')} ₸</div>
                    
                    <div class="i-stock" style="flex-shrink: 0; margin-left: 6px;">${Number(i.stock)||0}</div>
                </div>`;
            }).join('');
            
            renderCategories();
            filter(); 
        }

        function filter() {
            let q = document.getElementById('sb').value.toLowerCase();
            document.querySelectorAll('.c-item').forEach(el => {
                const name = el.querySelector('.i-name').innerText.toLowerCase();
                const itemCat = el.getAttribute('data-cat') || '';
                
                const matchesSearch = name.includes(q);
                const matchesCat = (currentCategory === 'all' || itemCat === currentCategory);
                
                el.style.display = (matchesSearch && matchesCat) ? 'flex' : 'none';
            });
        }

        function handleSearchInput() {
            document.getElementById('clear-search').style.display = document.getElementById('sb').value.length > 0 ? 'flex' : 'none';
            filter(); 
        }

        function clearSearch() {
            document.getElementById('sb').value = '';
            document.getElementById('clear-search').style.display = 'none';
            filter(); document.getElementById('sb').focus(); 
        }

        function add(id) {
            const p = db.find(x => x.id === id);
            const inC = cart.find(x => x.id === id);
            
            const roundedPrice = Math.round(Number(p.price) || 0);
            const roundedCost = Math.round(Number(p.cost) || 0);
            
            if (inC) {
                inC.qty++; 
            } else {
                cart.push({
                id: p.id, 
                name: p.name, 
                qty: 1, 
                price: roundedPrice, 
                origPrice: roundedPrice, 
                cost: roundedCost,
                stock: parseFloat(p.stock) || 0,
                min_stock: parseFloat(p.min_stock) || 1
            });
            }
            
            // --- 1. ВИБРООТКЛИК (для мобильных устройств) ---
            if (navigator.vibrate) {
                navigator.vibrate(40); // Легкий, четкий толчок
            }

            // --- 2. ВИЗУАЛЬНАЯ ВСПЫШКА ---
            // Находим карточку, по которой кликнули, и на 150мс меняем ей фон
            const clickedElement = event.currentTarget || event.target.closest('.c-item');
            if (clickedElement && clickedElement.classList.contains('c-item')) {
                const originalBg = clickedElement.style.background;
                // Вспышка (используем наш зеленый акцент, но с прозрачностью, чтобы текст читался)
                clickedElement.style.background = 'var(--bg-success-dim)'; 
                clickedElement.style.transition = 'none'; // Убираем плавность для резкой вспышки
                
                setTimeout(() => {
                    clickedElement.style.transition = 'background 0.3s'; // Возвращаем плавность затухания
                    clickedElement.style.background = originalBg || '';
                }, 150);
            }

            update();
        }

        function handleFocus(elem, rowId) {
            elem.select(); 
            const alignRow = () => {
                const row = document.getElementById(rowId);
                if (row) row.scrollIntoView({behavior: "smooth", block: "center"});
            };
            setTimeout(alignRow, 350); 
            setTimeout(alignRow, 750); 
        }

        function update() {
            document.getElementById('cart-list').innerHTML = cart.map((item, idx) => {
                
                // === НОВЫЙ БЛОК: ПРОВЕРКА КРИТИЧЕСКОГО ОСТАТКА ===
                let remainingStock = item.stock - item.qty;
                // Задаем стандартные стили строки
                let rowBgColor = "var(--bg-panel)";
                let rowBorder = "1px solid var(--border-main)";
                let kaspiBtnHtml = "";

                // Если остаток опускается до или ниже критического уровня (по умолчанию 1)
                let minStockLevel = item.min_stock !== undefined ? item.min_stock : 1;
                
                // Если остаток упал до минимума — включаем тревогу
                if (remainingStock <= minStockLevel) {
                    // Агрессивный фон (светло-красный в светлой теме, бордовый в темной)
                    rowBgColor = "var(--bg-danger-dim)"; 
                    // Толстая красная рамка (2px вместо 1px)
                    rowBorder = "2px solid var(--accent-red)"; 
                    
                    // Кнопка тоже становится красной и более массивной
                    kaspiBtnHtml = `
                        <div style="width: 100%; margin-top: 8px;">
                            <button onclick="checkKaspiFromCart('${item.id}', this)" style="width: 100%; background: var(--bg-card); color: var(--accent-red); border: 2px dashed var(--accent-red); padding: 10px; border-radius: 4px; font-size: 12px; font-weight: 900; cursor: pointer; text-transform: uppercase; transition: 0.2s;">
                                ${translations[currentLang].kaspi_check_btn}
                            </button>
                        </div>
                    `;
                }
                // ===============================================

                return `
                <div class="cart-row" id="r-${item.id}" style="background: ${rowBgColor}; border: ${rowBorder}; padding: 6px 10px; display: flex; flex-direction: column; gap: 6px; border-radius: 4px; margin-bottom: 3px; color: var(--text-main);">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        
                        <div style="display: flex; align-items: center; gap: 6px; flex: 1; overflow-x: auto; white-space: nowrap; scrollbar-width: none;">
                            <span style="color: var(--text-main); font-size: 13px; font-weight: bold;">${item.name}</span>
                            <span style="color: var(--text-muted); font-size: 11px; font-family: 'Roboto', sans-serif; font-weight: normal;">#${item.id}</span>
                        </div>
                        
                        <div style="display: flex; justify-content: flex-end; align-items: center; width: 110px; flex-shrink: 0;">
                            <span style="color: var(--text-muted); font-size: 12px; font-family: 'Roboto', sans-serif; text-decoration: ${item.origPrice && item.origPrice !== item.price ? 'line-through' : 'none'};">${item.origPrice ? item.origPrice.toLocaleString('ru-RU') : item.price.toLocaleString('ru-RU')} ₸</span>
                            <div onclick="rm('${item.id}')" style="color:var(--accent-red); font-size:18px; font-weight:bold; cursor:pointer; margin-left: 10px; line-height: 1; user-select: none;">✕</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        
                        <div class="qty-box">
                            <button class="q-btn" onclick="qty('${item.id}',-1)">-</button>
                            <input type="text" inputmode="numeric" class="q-val" value="${item.qty.toLocaleString('ru-RU')}" 
                                onfocus="handleFocus(this, 'r-${item.id}')" 
                                oninput="cart[${idx}].qty=parseInt(this.value.replace(/\\s/g, ''))||0; total()" 
                                onblur="if(cart[${idx}].qty <= 0) { rm('${item.id}'); } else { this.value = cart[${idx}].qty.toLocaleString('ru-RU'); }">
                            <button class="q-btn" onclick="qty('${item.id}',1)">+</button>
                        </div>
                                                
                        <div style="position: relative; width: 110px; flex-shrink: 0;">
                            <input type="text" inputmode="numeric" class="p-input" value="${item.price.toLocaleString('ru-RU')}" 
                                onfocus="handleFocus(this, 'r-${item.id}')" 
                                oninput="cart[${idx}].price=parseFloat(this.value.replace(/\\s/g, '').replace(',', '.'))||0; total()" 
                                onblur="this.value = cart[${idx}].price.toLocaleString('ru-RU')">
                            <span style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: var(--accent-yellow); font-size: 14px; pointer-events: none; font-family: 'Roboto', sans-serif; font-weight: bold;">₸</span>
                        </div>
                    </div>
                    
                    ${kaspiBtnHtml}

                </div>`
            }).join('');
            total();
        }

        async function checkKaspiFromCart(itemId, btnElem) {
            if (!navigator.onLine) return alert(translations[currentLang].kaspi_err_net);
            
            const originalText = btnElem.innerHTML;
            btnElem.innerHTML = translations[currentLang].kaspi_checking;
            btnElem.disabled = true;
            btnElem.style.opacity = '0.7';

            try {
                const response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({ api_key: CLIENT_API_KEY, action: 'check_kaspi', item_id: itemId })
                });
                
                const res = await response.json();
                
                if (res.safe === false) {
                    // Умный поиск цифры (количества штук) в ответе сервера
                    let match = res.message ? res.message.match(/\((\d+)/) : null;
                    let qty = match ? match[1] : '!';

                    btnElem.style.background = 'var(--bg-danger-dim)';
                    btnElem.style.color = 'var(--accent-red)';
                    btnElem.style.border = '2px solid var(--accent-red)';
                    btnElem.innerHTML = `⚠️ ${translations[currentLang].kaspi_danger} ${qty} ${translations[currentLang].kaspi_pcs}`;
                    if (navigator.vibrate) navigator.vibrate([100, 50, 100]); 
                } else if (res.safe === true) {
                    btnElem.style.background = 'var(--bg-success-dim)';
                    btnElem.style.color = 'var(--accent-green)';
                    btnElem.style.border = '2px solid var(--accent-green)';
                    btnElem.innerHTML = `✅ ${translations[currentLang].kaspi_safe}`;
                } else if (res.warning) {
                    btnElem.style.background = 'var(--bg-hover)';
                    btnElem.style.color = 'var(--text-main)';
                    btnElem.style.border = '1px solid var(--border-focus)';
                    btnElem.innerHTML = `⚙️ ${translations[currentLang].kaspi_no_token}`;
                } else {
                    btnElem.innerHTML = `❌ ${translations[currentLang].kaspi_err_api}`;
                }
            } catch (e) {
                alert(translations[currentLang].kaspi_err_server);
                btnElem.innerHTML = originalText;
                btnElem.disabled = false;
                btnElem.style.opacity = '1';
            }
        }

        function qty(id, d) { 
            const i = cart.find(x => x.id === id); 
            if(i) { 
                i.qty += d; 
                if(i.qty <= 0) {
                    rm(id); 
                } else { 
                    update(); // Перерисовываем корзину с новыми цифрами
                    
                    // 1. Виброотклик (для Android-устройств)
                    if (navigator.vibrate) navigator.vibrate(40);
                    
                    // 2. Визуальная вспышка нужной строки
                    const row = document.getElementById('r-' + id);
                    if (row) {
                        // Если d > 0 (плюс) — зеленая вспышка, иначе — красная
                        row.style.background = d > 0 ? 'var(--bg-success-dim)' : 'var(--bg-danger-dim)';
                        row.style.transition = 'none'; // Резко включаем цвет
                        
                        setTimeout(() => {
                            row.style.transition = 'background 0.3s'; // Плавно гасим
                            row.style.background = ''; // Возвращаем родной фон панели
                        }, 150);
                    }
                } 
            } 
        }
        function rm(id) { cart = cart.filter(x => x.id !== id); update(); }
        function total() { document.getElementById('ta').innerText = cart.reduce((a, b) => a + (b.price * b.qty), 0).toLocaleString() + ' ₸'; }

        function initPay(methodCode, methodName) {
            if (!cart.length) return;
            pendingMethod = methodCode; 
            const colors = { 'cash': 'var(--accent-green)', 'qr_kaspi': 'var(--accent-red)', 'installment': '#8e44ad', 'pos_terminal': '#2980b9', 'transfer': '#f39c12' };
            const activeColor = colors[methodCode] || 'var(--accent-green)';
            document.querySelector('.receipt-box').style.borderColor = activeColor;
            document.getElementById('r-method').style.color = activeColor;
            const btnConfirm = document.getElementById('btn-confirm');
            btnConfirm.style.background = activeColor;
            btnConfirm.style.color = methodCode === 'transfer' ? 'var(--text-dark)' : '#fff';
            document.getElementById('r-title').innerText = mode === 'sale' ? translations[currentLang].txt_sale_confirm : translations[currentLang].txt_return_confirm;
            document.getElementById('r-method').innerText = translations[currentLang].txt_payment + methodName;
            document.getElementById('r-items-list').innerHTML = cart.map(c => `<div class="r-item"><span>${c.name}</span><b>${c.qty} x ${c.price.toLocaleString()}</b></div>`).join('');
            document.getElementById('r-total').innerText = translations[currentLang].txt_total + cart.reduce((a, b) => a + (b.price * b.qty), 0).toLocaleString() + " ₸";
            document.getElementById('receipt-modal').style.display = 'flex';
        }

        function cancelTx() { document.getElementById('receipt-modal').style.display = 'none'; }

        async function confirmTx() {
            const btn = document.getElementById('btn-confirm');
            btn.disabled = true;
            const tid = (mode === 'sale' ? 'SL-' : 'RT-') + Math.random().toString(36).substring(7).toUpperCase();
            const now = new Date();
            const localTime = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU');
            
            const p = {
                tx_id: tid, tx_type: mode, payment_method: pendingMethod, source: "pos_v5.5.0", 
                created_at: localTime,
                seller_id: currentUser ? currentUser.uid : "S-XX", 
                cart: cart.map(c => ({item_id:c.id, item_name:c.name, qty:c.qty, price:c.price, cost_price:c.cost}))
            };

            try {
                let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
                queue.push(p);
                localStorage.setItem('txQueue', JSON.stringify(queue));
                updateQueueCounter();

                const cartTotal = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);
                const methodMap = { 'cash': 'sum-cash', 'qr_kaspi': 'sum-qr', 'qr': 'sum-qr', 'installment': 'sum-red', 'pos_terminal': 'sum-card', 'card': 'sum-card', 'transfer': 'sum-trans' };
                const targetId = methodMap[pendingMethod];
                
                if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                        let currentSum = parseInt(el.innerText.replace(/[^\d-]/g, '')) || 0;
                        currentSum = (mode === 'sale') ? currentSum + cartTotal : currentSum - cartTotal;
                        el.innerText = currentSum.toLocaleString('ru-RU') + ' ₸';
                    }
                }
                document.getElementById('receipt-modal').style.display = 'none';
                
                // ==========================================
                // НАЧАЛО: Локальное обновление остатков (Optimistic UI)
                // ==========================================
                cart.forEach(c => {
                    // Ищем товар в локальном массиве db
                    let dbItem = db.find(i => String(i.id) === String(c.id));
                    if (dbItem) {
                        let sign = (mode === 'sale') ? -1 : 1; // Продажа: минус, Возврат: плюс
                        dbItem.stock = (parseFloat(dbItem.stock) || 0) + (c.qty * sign);
                    }
                });
                render(); // Мгновенно перерисовываем каталог с новыми цифрами
                localStorage.setItem('db_cache', JSON.stringify(db));
                // ==========================================
                // КОНЕЦ: Локальное обновление остатков
                // ==========================================

                cart = []; update(); sm('sale'); 
                const searchInput = document.getElementById('sb');
                searchInput.value = ''; searchInput.blur(); filter(); 
            } catch (e) { alert("ОШИБКА: " + e.message); } 
            finally { btn.disabled = false; }
        }

        function updateQueueCounter() {
            let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
            const badge = document.getElementById('queue-counter');
            const settingsBtn = document.getElementById('btn-settings');
            if (queue.length > 0) {
                badge.innerText = queue.length; badge.style.display = 'inline-block';
                settingsBtn.style.background = 'var(--bg-danger-dim)'; settingsBtn.style.borderColor = 'var(--accent-red)'; settingsBtn.style.color = 'var(--accent-red)';
            } else {
                badge.style.display = 'none';
                settingsBtn.style.background = 'var(--bg-panel)'; settingsBtn.style.borderColor = 'var(--border-light)'; settingsBtn.style.color = 'var(--text-main)';
            }
        }

        function moveTxToCacheLocally(tx) {
            try {
                const qDate = tx.created_at.split(' ')[0]; 
                const parts = qDate.split('.');
                if (parts.length !== 3) return;
                const localISO = `${parts[2]}-${parts[1]}-${parts[0]}`; 
                
                const keys = [
                    `report_${localISO}_${localISO}_all`,
                    `report_${localISO}_${localISO}_${tx.seller_id}`
                ];

                keys.forEach(key => {
                    let cached = localStorage.getItem(key);
                    if (cached) {
                        let reportData = JSON.parse(cached);
                        let qTotal = tx.cart.reduce((sum, c) => sum + (c.qty * c.price), 0);
                        let qTime = tx.created_at.split(' ')[1].substring(0,5);
                        
                        reportData.push({
                            type: tx.tx_type,
                            total: qTotal,
                            cart: tx.cart.map(c => ({ name: c.item_name, qty: c.qty, price: c.price })),
                            methodCode: tx.payment_method,
                            time: qTime,
                            date: qDate,
                            seller: tx.seller_id // <-- Добавили это поле
                        });
                        localStorage.setItem(key, JSON.stringify(reportData));
                    }
                });
            } catch (e) { console.error("Ошибка переливания кэша", e); }
        }

        let isSyncing = false; 
        async function syncQueue() {
            if (isSyncing || !navigator.onLine || !currentUser) return; 
            let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
            if (queue.length === 0) return; 
            isSyncing = true;
            try {
                const res = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ api_key: CLIENT_API_KEY, action: 'syncQueue', transactions: [queue[0]] }) });
                if ((await res.json()).success) { 
                    moveTxToCacheLocally(queue[0]); 
                    queue.shift(); 
                    localStorage.setItem('txQueue', JSON.stringify(queue)); 
                    updateQueueCounter(); 
                }
            } catch (e) {} finally { isSyncing = false; }
        }
        setInterval(syncQueue, 5000);

        async function manualSync() {
            if (!navigator.onLine) return alert(translations[currentLang].msg_sync_error);
            let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
            if (queue.length === 0) return alert(translations[currentLang].msg_sync_empty);
            document.getElementById('sync-status').innerText = '⏳';
            let hasError = false;
            while(queue.length > 0) {
                try {
                    const res = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ api_key: CLIENT_API_KEY, action: 'syncQueue', transactions: [queue[0]] }) });
                    if ((await res.json()).success) { 
                        moveTxToCacheLocally(queue[0]); 
                        queue.shift(); 
                        localStorage.setItem('txQueue', JSON.stringify(queue)); 
                        updateQueueCounter(); 
                    }
                    else { hasError = true; break; }
                } catch (e) { hasError = true; break; }
            }
            document.getElementById('sync-status').innerText = '📡';
            alert(hasError ? translations[currentLang].msg_sync_error : translations[currentLang].msg_sync_success);
        }

        function openHelpDocument() {
    // По умолчанию ставим русский
    let currentLang = 'ru';
    
    // Проверяем, есть ли у кнопки KZ класс 'active' (выбрана ли она сейчас)
    const kzButton = document.getElementById('lang-kz');
    if (kzButton && kzButton.classList.contains('active')) {
        currentLang = 'kz';
    }
    
    // Берем ссылку из config.js
    if (typeof HELP_LINKS !== 'undefined') {
        const link = HELP_LINKS[currentLang] || HELP_LINKS['ru'];
        
        if (link) {
            window.open(link, '_blank'); // Открываем в новой вкладке
        } else {
            console.warn("Ссылки на руководство не найдены в config.js");
        }
    } else {
        console.error("Объект HELP_LINKS не найден в файле конфигурации");
    }
    }

        function openSettings() { document.getElementById('settings-modal').style.display = 'flex'; }
        function closeSettings() { document.getElementById('settings-modal').style.display = 'none'; }

        async function forceAppUpdate() {
            document.getElementById('update-status').innerText = '⏳'; 
            try {
                if ('caches' in window) await Promise.all((await caches.keys()).map(k => caches.delete(k)));
                setTimeout(() => { window.location.reload(true); }, 1000);
            } catch (e) { window.location.reload(true); }
        }

        function openReport() {
    document.getElementById('report-modal').style.display = 'flex';
    const role = localStorage.getItem('user_role');
    const controls = document.getElementById('date-range-controls');
    const titleEl = document.getElementById('rep-header-title');
    
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISO = (new Date(now - offset)).toISOString().split('T')[0];
    
    document.getElementById('rep-date-start').value = localISO;
    document.getElementById('rep-date-end').value = localISO;

    if (role === 'manager') {
        if (controls) controls.style.display = 'flex';
        titleEl.innerText = currentLang === 'kz' ? "КЕЗЕҢДІК ЕСЕП" : "ОТЧЕТ ЗА ПЕРИОД";
    } else {
        if (controls) controls.style.display = 'none';
        titleEl.innerText = (currentLang === 'kz' ? "БҮГІНГІ ЕСЕП: " : "ОТЧЕТ ЗА СЕГОДНЯ: ") + now.toLocaleDateString('ru-RU');
    }
    
    // Сбрасываем фильтры при открытии на карточку "ВСЕ"
    // (renderReport запустится автоматически внутри этой функции)
    setReportMethod('all', document.getElementById('card-all'), 'active-all');
}

// --- ЛОГИКА ПОИСКА ПО ОТЧЕТУ ---
function clearReportSearch() {
    const searchInput = document.getElementById('rep-search');
    if(searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('rep-clear-search');
    if(clearBtn) clearBtn.style.display = 'none';
    filterReport(); 
    // УБРАНО: searchInput.focus(); -> Чтобы клавиатура на мобилках не прыгала
}

function filterReport() {
    const searchInput = document.getElementById('rep-search');
    if(!searchInput) return;
    const q = searchInput.value.toLowerCase().trim();
    const clearBtn = document.getElementById('rep-clear-search');
    if(clearBtn) clearBtn.style.display = q.length > 0 ? 'block' : 'none';
    
    document.querySelectorAll('#rep-list .acc-item').forEach(el => {
        const name = (el.getAttribute('data-name') || '').toLowerCase();
        el.style.display = name.includes(q) ? 'block' : 'none';
    });
}

// --- ГЛАВНЫЙ ДВИЖОК ДАШБОРДА (МАТРИЦА 2x2) ---
async function renderReport() {
    const start = document.getElementById('rep-date-start').value;
    const end = document.getElementById('rep-date-end').value;
    const repList = document.getElementById('rep-list');
    const totalsBox = document.getElementById('rep-totals');
    const searchInput = document.getElementById('rep-search');
    
    const fmt = (d) => d.split('-').reverse().join('.');
    const serverStart = fmt(start);
    const serverEnd = fmt(end);

    repList.innerHTML = `<div style="text-align:center; color:var(--accent-yellow); margin-top:30px; font-weight: bold; font-size: 14px;">⏳ ${translations[currentLang].msg_loading}</div>`;

    let reportDataToRender = [];
    const cacheKey = `report_${start}_${end}_${currentUser ? currentUser.uid : 'all'}`;

    if (!navigator.onLine) {
        const cachedReport = localStorage.getItem(cacheKey);
        if (cachedReport) reportDataToRender = JSON.parse(cachedReport);
    } else {
        try {
            let url = `${APPS_SCRIPT_URL}?action=report&date=${serverStart}&endDate=${serverEnd}&api_key=${CLIENT_API_KEY}&t=${Date.now()}`;
            if (currentUser && currentUser.role !== 'manager') url += `&seller_id=${currentUser.uid}`;
            const response = await fetch(url, { redirect: 'follow' });
            const data = await response.json();
            if (!data.error) {
                reportDataToRender = data.report || [];
                localStorage.setItem(cacheKey, JSON.stringify(reportDataToRender));
            }
        } catch (error) {
            const cachedReport = localStorage.getItem(cacheKey);
            if (cachedReport) reportDataToRender = JSON.parse(cachedReport);
        }
    }

    let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
    if (queue.length > 0) {
        queue.forEach(qTx => {
            if (currentUser && currentUser.role !== 'manager' && qTx.seller_id !== currentUser.uid) return;
            let qDate = qTx.created_at.split(' ')[0];
            let qTime = qTx.created_at.split(' ')[1].substring(0,5);
            if (qDate >= serverStart && qDate <= serverEnd) {
                let qTotal = qTx.cart.reduce((sum, c) => sum + (c.qty * c.price), 0);
                reportDataToRender.push({
                    type: qTx.tx_type, total: qTotal, cart: qTx.cart.map(c => ({ name: c.item_name, qty: c.qty, price: c.price })),
                    methodCode: qTx.payment_method, time: qTime + " ⏳", date: qDate, seller: qTx.seller_id
                });
            }
        });
    }

    const methodNames = { 'cash': translations[currentLang].pay_cash, 'qr_kaspi': 'QR', 'installment': 'Red', 'pos_terminal': translations[currentLang].pay_card, 'transfer': translations[currentLang].pay_trans };
    const methodColors = { 'cash': 'var(--pay-cash)', 'qr_kaspi': 'var(--pay-qr)', 'installment': 'var(--pay-red)', 'pos_terminal': 'var(--pay-card)', 'transfer': 'var(--pay-trans)' };
    const uiStr = { sale: translations[currentLang].report_sales, ret: translations[currentLang].report_returns, avg: translations[currentLang].report_avg || 'ср:' };

    // ==========================================
    // ШАГ 1: ЖЕЛЕЗОБЕТОННАЯ МАТЕМАТИКА (КАРТОЧКИ И ПОДВАЛ)
    // ==========================================
    let cardSums = { cash: 0, qr_kaspi: 0, pos_terminal: 0, installment: 0, transfer: 0 };
    let totalAllNet = 0;
    
    // Итоги для подвала (Считаются независимо от тумблеров 2x2!)
    let footSalesQty = 0, footSalesSum = 0, footRetQty = 0, footRetSum = 0;

    reportDataToRender.forEach(tx => {
        let isRet = (tx.type === 'return' || tx.type === 'refund');
        let m = tx.methodCode || 'cash';
        
        let txSum = 0, txQty = 0;
        tx.cart.forEach(c => {
            let q = Math.abs(c.qty);
            let s = q * Math.abs(c.price);
            txQty += q;
            txSum += s;
        });

        // 1. Пополняем суммы карточек наверху
        let sign = isRet ? -1 : 1;
        if (cardSums[m] !== undefined) cardSums[m] += (txSum * sign);
        totalAllNet += (txSum * sign);

        // 2. Пополняем суммы подвала (Только для выбранной вкладки)
        if (reportState.method === 'all' || reportState.method === m) {
            if (isRet) {
                footRetQty += txQty;
                footRetSum += txSum;
            } else {
                footSalesQty += txQty;
                footSalesSum += txSum;
            }
        }
    });

    document.getElementById('rep-sum-all').innerText = totalAllNet.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-cash').innerText = cardSums.cash.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-qr').innerText = cardSums.qr_kaspi.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-card').innerText = cardSums.pos_terminal.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-red').innerText = cardSums.installment.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-trans').innerText = cardSums.transfer.toLocaleString() + ' ₸';

    if (!reportDataToRender || reportDataToRender.length === 0) {
        repList.innerHTML = `<div style="text-align:center; color:var(--text-muted); margin-top:30px; font-size: 13px;">${translations[currentLang].msg_no_data}</div>`;
        totalsBox.innerHTML = '';
        return;
    }

    // ==========================================
    // ШАГ 2: НАРЕЗКА СПИСКА (УНИВЕРСАЛЬНАЯ ЛОГИКА 2x2)
    // ==========================================
    let htmlString = '';

    // 1. Фильтр по способу оплаты (Кнопка "ВСЕ" пропускает всё)
    let viewTx = reportDataToRender;
    if (reportState.method !== 'all') {
        viewTx = viewTx.filter(tx => (tx.methodCode || 'cash') === reportState.method);
    }

    // 2. Фильтр по типу (Продажи / Возвраты) - ПЕРВЫЙ ТУМБЛЕР 2x2
    let isSaleMode = reportState.type === 'sale';
    viewTx = viewTx.filter(tx => isSaleMode ? (tx.type !== 'return' && tx.type !== 'refund') : (tx.type === 'return' || tx.type === 'refund'));

    let sumColor = isSaleMode ? 'var(--accent-green)' : 'var(--accent-red)';
    let signPrefix = isSaleMode ? '' : '-';

    // 3. Разделение на Товары / Чеки - ВТОРОЙ ТУМБЛЕР 2x2
    if (reportState.view === 'items') {
        let agg = {};
        
        viewTx.forEach(tx => {
            let m = tx.methodCode || 'cash';
            tx.cart.forEach(c => {
                // В режиме "ВСЕ" разделяем один и тот же товар на разные строки по способу оплаты (Товар [Нал], Товар [Карт])
                let key = reportState.method === 'all' ? `${c.name}_${m}` : c.name;
                
                if (!agg[key]) agg[key] = { name: c.name, method: m, qty:0, sum:0, sellers:{} };
                if (!agg[key].sellers[tx.seller]) agg[key].sellers[tx.seller] = { qty:0, sum:0 };
                
                let q = Math.abs(c.qty); 
                let s = q * Math.abs(c.price);
                
                agg[key].qty += q; 
                agg[key].sum += s;
                agg[key].sellers[tx.seller].qty += q; 
                agg[key].sellers[tx.seller].sum += s;
            });
        });

        let sorted = Object.values(agg).sort((a,b) => b.sum - a.sum);
        
        sorted.forEach(item => {
            let mColor = methodColors[item.method] || 'var(--text-muted)';
            // Тег оплаты показываем только если нажата кнопка "ВСЕ"
            let methodTag = reportState.method === 'all' ? ` <span class="acc-method-tag" style="color:${mColor}; font-size:10px;">[${methodNames[item.method]}]</span>` : '';
            
            let detHtml = '';
            for (let seller in item.sellers) {
                let s = item.sellers[seller];
                let lbl = isSaleMode ? uiStr.sale : uiStr.ret;
                detHtml += `<div class="acc-detail-row"><span>${lbl} (${s.qty}) 👤 ${seller} | ${uiStr.avg} ${Math.round(s.sum/s.qty).toLocaleString()} ₸</span><span style="color:${sumColor}">${signPrefix}${s.sum.toLocaleString()}</span></div>`;
            }

            htmlString += `
                <div class="acc-item" data-name="${item.name.toLowerCase()}" style="border-left: 3px solid ${mColor};" onclick="this.classList.toggle('open')">
                    <div class="acc-header">
                        <div class="acc-title-col">${item.name}${methodTag}</div>
                        <div class="acc-qty-col">${item.qty}</div>
                        <div class="acc-sum-col" style="color:${sumColor}">${signPrefix}${item.sum.toLocaleString()} <span class="arr">▼</span></div>
                    </div>
                    <div class="acc-body">${detHtml}</div>
                </div>`;
        });

    } else {
        // Режим "ЧЕКИ"
        viewTx.forEach(tx => {
            let txSum = 0; let txQty = 0;
            let m = tx.methodCode || 'cash';
            let mColor = methodColors[m] || 'var(--text-muted)';
            // Тег оплаты для чека показываем только если нажата кнопка "ВСЕ"
            let methodTag = reportState.method === 'all' ? ` <span style="color:${mColor}; font-size:10px;">[${methodNames[m]}]</span>` : '';

            let detHtml = '';
            tx.cart.forEach(c => {
                let q = Math.abs(c.qty); let s = q * Math.abs(c.price);
                txSum += s; txQty += q;
                detHtml += `<div class="acc-detail-row"><span>${c.name}</span><span style="color:${sumColor}">${q} x ${Math.abs(c.price).toLocaleString()}</span></div>`;
            });

            htmlString += `
                <div class="acc-item" data-name="${tx.date} ${tx.time}" style="border-left: 3px solid ${mColor};" onclick="this.classList.toggle('open')">
                    <div class="acc-header">
                        <div class="acc-title-col">${tx.date} ${tx.time}${methodTag} <span style="font-size:10px; font-weight:normal; color:var(--text-muted); display:block;">👤 ${tx.seller}</span></div>
                        <div class="acc-qty-col">${txQty}</div>
                        <div class="acc-sum-col" style="color:${sumColor}">${signPrefix}${txSum.toLocaleString()} <span class="arr">▼</span></div>
                    </div>
                    <div class="acc-body">${detHtml}</div>
                </div>`;
        });
    }

    if (htmlString === '') {
        htmlString = `<div style="text-align:center; color:var(--text-muted); margin-top:30px; font-size:13px;">ОПЕРАЦИЙ НЕ НАЙДЕНО</div>`;
    }

    repList.innerHTML = htmlString;

    // ==========================================
    // ШАГ 3: ОБНОВЛЕНИЕ ПОДВАЛА
    // ==========================================
    totalsBox.innerHTML = `
        <div class="tot-row">
            <span>${uiStr.sale}:</span>
            <div style="display:flex; width: 130px; justify-content: space-between;">
                <span>${footSalesQty}</span><span>${footSalesSum.toLocaleString()}</span>
            </div>
        </div>
        <div class="tot-row" style="color: var(--accent-red);">
            <span>${uiStr.ret}:</span>
            <div style="display:flex; width: 130px; justify-content: space-between;">
                <span>${footRetQty > 0 ? '-'+footRetQty : '0'}</span><span>${footRetSum > 0 ? '-'+footRetSum.toLocaleString() : '0'}</span>
            </div>
        </div>
        <div class="tot-main">
            <span>${translations[currentLang].report_total_net}</span>
            <div style="display:flex; width: 130px; justify-content: space-between; align-items:center;">
                <span style="font-size: 12px; color: var(--text-muted); font-weight: normal;">${footSalesQty - footRetQty}</span>
                <span>${(footSalesSum - footRetSum).toLocaleString()} ₸</span>
            </div>
        </div>`;
        
    filterReport();
}

        function closeReport() { document.getElementById('report-modal').style.display = 'none'; }

        // --- УПРАВЛЕНИЕ ТУМБЛЕРАМИ ДАШБОРДА ---

function setReportMethod(method, element, activeClass) {
    reportState.method = method;
    
    // Сбрасываем стили всех карточек
    document.querySelectorAll('.method-card').forEach(c => c.className = 'method-card');
    if (element) element.classList.add(activeClass);
    
    // Теперь матрица 2x2 будет видна ВСЕГДА
    const toggles = document.getElementById('rep-toggles-row');
    if (toggles) toggles.style.display = 'flex';
    
    // Очищаем поиск при смене вкладки
    clearReportSearch();
    renderReport(); // Мгновенно перерисовываем
}

function setReportType(type) {
    reportState.type = type;
    document.getElementById('t-sale').classList.toggle('active', type === 'sale');
    document.getElementById('t-return').classList.toggle('active', type === 'return');
    renderReport();
}

function setReportView(view) {
    reportState.view = view;
    document.getElementById('t-item').classList.toggle('active', view === 'items');
    document.getElementById('t-date').classList.toggle('active', view === 'dates');
    renderReport();
}

        function displayAppVersion() {
            // Берем версию из config.js
            const v = typeof APP_VERSION !== 'undefined' ? APP_VERSION : "5.5.1";
            const versionText = "v: " + v;
            
            // 1. В шапке внутри самой кассы
            const appVer = document.getElementById('app-version');
            if (appVer) appVer.innerText = versionText;
            
            // 2. На стартовом экране Google
            const googleVer = document.getElementById('version-google');
            if (googleVer) googleVer.innerText = versionText;
            
            // 3. На экране ввода ПИН-кода
            const pinVer = document.getElementById('version-pin');
            if (pinVer) pinVer.innerText = versionText;
        }

        // === ПРИНУДИТЕЛЬНОЕ УДАЛЕНИЕ SERVICE WORKER ===
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for (let registration of registrations) {
                    registration.unregister(); // Убиваем старый SW
                }
            });
            // Удаляем старые кэши браузера
            if ('caches' in window) {
                caches.keys().then(function(names) {
                    for (let name of names) {
                        caches.delete(name);
                    }
                });
            }
            document.getElementById('app-version').innerText = "v: 5.5.1";
        }

        window.addEventListener('load', () => {
            checkBlockTimer(); 
            applyLanguage(currentLang); 
            updateQueueCounter();
            // === ИСТИННЫЙ SAAS: ПРОВЕРКА КЛЮЧА ===
        if (CLIENT_API_KEY) {
            // Если ключ уже есть в памяти телефона, пропускаем Google и сразу показываем ПИН-код
            document.getElementById('google-screen').style.display = 'none';
            document.getElementById('pin-screen').style.display = 'flex';
        } else {
            // Если ключа нет, требуем вход через Google
            document.getElementById('google-screen').style.display = 'flex';
            document.getElementById('pin-screen').style.display = 'none';
        }
            setTimeout(displayAppVersion, 500); 
            load();

            // === НАЧАЛО: ФИКС ДЛЯ КЛАВИАТУРЫ iOS SAFARI (УМНЫЙ ФОКУС) ===
            if (window.visualViewport) {
                // Запоминаем изначальную высоту экрана телефона
                const baseHeight = window.innerHeight; 
                
                window.visualViewport.addEventListener('resize', () => {
                    const currentHeight = window.visualViewport.height;
                    document.body.style.height = currentHeight + 'px';
                    
                    // Если видимая высота стала меньше 75% (значит, вылезла клавиатура)
                    if (currentHeight < baseHeight * 0.75) {
                        document.body.classList.add('keyboard-open'); // Прячем лишние кнопки
                        document.getElementById('cs').style.maxHeight = '65%'; // Расширяем лимит корзины
                    } else {
                        // Клавиатура скрыта - возвращаем всё как было
                        document.body.classList.remove('keyboard-open');
                        document.getElementById('cs').style.maxHeight = '40dvh';
                    }
                    window.scrollTo(0, 0);
                });
            }
            // === КОНЕЦ ФИКСА ===
        });

        let selectedItemId = null, tempBase64 = null; 
        function openItemMenu(id) {
            selectedItemId = id; tempBase64 = null; 
            const item = db.find(x => x.id === id);
            document.getElementById('menu-item-name').innerText = item.name;
            const preview = document.getElementById('photo-preview');
            document.getElementById('btn-add-cart').style.display = 'block';
            document.getElementById('btn-save-db').style.display = 'none';

            if (item.img && item.img.length > 5) {
                const match = item.img.match(/[-\w]{25,}/); 
                if (match) {
                    const fileId = match[0];
                    
                    // 1. Показываем статус загрузки
                    preview.innerHTML = `<div style="color:var(--text-muted); font-size:12px; padding:20px;">⏳ ${translations[currentLang].msg_loading_photo}</div>`;
                    
                    // 2. Настраиваем кнопки
                    document.getElementById('btn-take-photo').style.display = 'none'; 
                    document.getElementById('btn-retake-photo').style.display = 'block';
                    document.getElementById('btn-delete-photo').style.display = 'block';

                    // 3. Запрашиваем фото напрямую через наш сервер (в обход блокировок браузера)
                    fetch(APPS_SCRIPT_URL, {
                        method: 'POST',
                        body: JSON.stringify({ api_key: CLIENT_API_KEY, action: 'get_photo', file_id: fileId })
                    }).then(res => res.json()).then(data => {
                        if (data.success && data.base64) {
                            // Отрисовываем полученное фото
                            preview.innerHTML = `<img src="${data.base64}" onclick="openFullscreen('${data.base64}')" style="max-width: 100%; max-height: 250px; border-radius: 8px; border: 1px solid var(--border-focus); margin-top: 10px; cursor: zoom-in;">`;
                        } else {
                            throw new Error("Server rejected photo");
                        }
                    }).catch(e => {
                        preview.innerHTML = `<div style="color:var(--accent-yellow); padding: 15px; border: 1px dashed var(--accent-yellow); border-radius: 8px; font-size: 11px; font-weight: bold;">${translations[currentLang].photo_err}</div>`;
                    });
                }
            } else {
                preview.innerHTML = ''; 
                document.getElementById('btn-take-photo').style.display = 'block'; 
                document.getElementById('btn-retake-photo').style.display = 'none';
                document.getElementById('btn-delete-photo').style.display = 'none';
            }
            document.getElementById('btn-cancel-modal').innerText = translations[currentLang].btn_close;
            document.getElementById('item-menu-modal').style.display = 'flex';
        }

        function handleCancelModal() { if (tempBase64) openItemMenu(selectedItemId); else document.getElementById('item-menu-modal').style.display = 'none'; }
        function confirmAddFromMenu() { add(selectedItemId); document.getElementById('item-menu-modal').style.display = 'none'; }
        function triggerCamera() { document.getElementById('camera-input').click(); }
        function triggerGallery() { document.getElementById('gallery-input').click(); }

        async function handlePhoto(event) {
            const file = event.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById('resize-canvas');
                    let width = img.width, height = img.height;
                    if (width > 800) { height *= 800 / width; width = 800; }
                    canvas.width = width; canvas.height = height;
                    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                    tempBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    document.getElementById('photo-preview').innerHTML = `<img src="${tempBase64}" onclick="openFullscreen('${tempBase64}')" style="max-width: 100%; max-height: 250px; border-radius: 8px; border: 1px solid var(--border-focus); margin-top: 10px; cursor: zoom-in;">`;
                    document.getElementById('btn-add-cart').style.display = 'none'; document.getElementById('btn-save-db').style.display = 'block';
                    document.getElementById('btn-take-photo').style.display = 'none'; document.getElementById('btn-retake-photo').style.display = 'block';
                    document.getElementById('btn-cancel-modal').innerText = translations[currentLang].btn_cancel;
                }; img.src = e.target.result;
            }; reader.readAsDataURL(file);
        }

        async function confirmUpload() {
    if (!navigator.onLine) return alert(translations[currentLang].msg_sync_error);
    const btnSaveDb = document.getElementById('btn-save-db');
    btnSaveDb.innerText = "⏳ " + translations[currentLang].btn_saving; 
    btnSaveDb.disabled = true;
    try {
        const res = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ api_key: CLIENT_API_KEY, action: 'upload_photo', item_id: selectedItemId, base64: tempBase64 }) });
        
        const responseData = await res.json(); 
        
        if (responseData.success) { 
            btnSaveDb.innerText = "✅ " + translations[currentLang].btn_saved; 
            
            // 1. Сохраняем новую ссылку
            const item = db.find(x => x.id === selectedItemId);
            if (item) item.img = responseData.url; 
            
            // 2. Мгновенно перерисовываем список на фоне (иконка станет желтой)
            render(); 
            
            // 3. Тихо обновляем окно товара
            setTimeout(() => { 
                openItemMenu(selectedItemId); 
                btnSaveDb.innerHTML = '💾 <span data-i18n="btn_save_db">' + translations[currentLang].btn_save_db + '</span>'; 
                btnSaveDb.disabled = false; 
                btnSaveDb.style.display = 'none'; 
            }, 800); 
        }
        else { alert(translations[currentLang].err_server); btnSaveDb.innerHTML = '💾 <span data-i18n="btn_save_db">' + translations[currentLang].btn_save_db + '</span>'; btnSaveDb.disabled = false; }
    } catch (e) { alert(translations[currentLang].err_network); btnSaveDb.innerHTML = '💾 <span data-i18n="btn_save_db">' + translations[currentLang].btn_save_db + '</span>'; btnSaveDb.disabled = false; }
}

        async function deletePhoto() {
    if (!navigator.onLine) return alert(translations[currentLang].msg_sync_error);
    
    // Единое окно подтверждения на выбранном языке
    if (!confirm(translations[currentLang].confirm_delete_photo)) return;

    const btnDelete = document.getElementById('btn-delete-photo');
    const textSpan = document.getElementById('delete-photo-text'); // Теперь меняем только этот SPAN
    
    // Блокируем и ставим текст ожидания
    textSpan.innerText = translations[currentLang].msg_photo_deleting; 
    btnDelete.disabled = true;

    try {
        const res = await fetch(APPS_SCRIPT_URL, { 
            method: 'POST', 
            body: JSON.stringify({ 
                api_key: CLIENT_API_KEY, 
                action: 'delete_photo', 
                item_id: selectedItemId 
            }) 
        });
        
        const responseData = await res.json(); 
        
        if (responseData.success) { 
            // 1. Стираем фото из памяти
            const item = db.find(x => x.id === selectedItemId);
            if (item) item.img = ""; 

            // 2. Гасим желтую иконку в главном списке
            render(); 

            // 3. Перерисовываем меню товара (кнопка спрячется)
            openItemMenu(selectedItemId);
            
            // 4. САМОЕ ВАЖНОЕ: ВОССТАНАВЛИВАЕМ КНОПКУ ДЛЯ СЛЕДУЮЩИХ ТОВАРОВ!
            textSpan.innerText = translations[currentLang].btn_delete_photo;
            btnDelete.disabled = false;
            
        } else { 
            alert(translations[currentLang].err_server + ": " + responseData.error); 
            textSpan.innerText = translations[currentLang].btn_delete_photo;
            btnDelete.disabled = false;
        }
    } catch (e) { 
        alert(translations[currentLang].err_network); 
        textSpan.innerText = translations[currentLang].btn_delete_photo;
        btnDelete.disabled = false;
    }
}
        let fsScale = 1, fsX = 0, fsY = 0, fsStartX = 0, fsStartY = 0, fsInitDist = 0, fsInitScale = 1, isDragging = false;
        
        function openFullscreen(src) {
            const img = document.getElementById('fullscreen-img'); img.src = src; fsScale = 1; fsX = 0; fsY = 0;
            img.style.transform = `translate(0px, 0px) scale(1)`; document.getElementById('fullscreen-photo').style.display = 'flex';
            if (!img.dataset.gestures) {
                img.dataset.gestures = "true";
                img.addEventListener('touchstart', (e) => { if (e.touches.length === 2) { fsInitDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY); fsInitScale = fsScale; } else if (e.touches.length === 1) { fsStartX = e.touches[0].pageX - fsX; fsStartY = e.touches[0].pageY - fsY; } }, { passive: false });
                img.addEventListener('touchmove', (e) => { if (e.cancelable) e.preventDefault(); if (e.touches.length === 2) { fsScale = Math.min(Math.max(1, fsInitScale * (Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY) / fsInitDist)), 5); img.style.transform = `translate(${fsX}px, ${fsY}px) scale(${fsScale})`; } else if (e.touches.length === 1 && fsScale > 1) { fsX = e.touches[0].pageX - fsStartX; fsY = e.touches[0].pageY - fsStartY; img.style.transform = `translate(${fsX}px, ${fsY}px) scale(${fsScale})`; } }, { passive: false });
                img.addEventListener('wheel', (e) => { e.preventDefault(); const zoomAmount = e.deltaY > 0 ? 0.9 : 1.1; fsScale = Math.min(Math.max(1, fsScale * zoomAmount), 5); if (fsScale === 1) { fsX = 0; fsY = 0; } img.style.transform = `translate(${fsX}px, ${fsY}px) scale(${fsScale})`; }, { passive: false });
                img.addEventListener('mousedown', (e) => { if (fsScale > 1) { isDragging = true; fsStartX = e.pageX - fsX; fsStartY = e.pageY - fsY; } });
                window.addEventListener('mousemove', (e) => { if (isDragging && fsScale > 1) { fsX = e.pageX - fsStartX; fsY = e.pageY - fsStartY; img.style.transform = `translate(${fsX}px, ${fsY}px) scale(${fsScale})`; } });
                window.addEventListener('mouseup', () => { isDragging = false; });
            }
        }
        function closeFullscreen(e) { if (e && e.target.id === 'fullscreen-img' && fsScale > 1) return; forceCloseFs(); }
        function forceCloseFs() { document.getElementById('fullscreen-photo').style.display = 'none'; fsScale = 1; fsX = 0; fsY = 0; isDragging = false; }

        let barcodeBuffer = ''; let lastKeyTime = Date.now();
        document.addEventListener('keypress', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const currentTime = Date.now();
            if (currentTime - lastKeyTime > 50) barcodeBuffer = '';
            if (e.key === 'Enter') { if (barcodeBuffer.length > 2) { e.preventDefault(); const item = db.find(i => String(i.barcode) === String(barcodeBuffer)); if (item) { add(item.id); if (navigator.vibrate) navigator.vibrate(50); } barcodeBuffer = ''; } } else barcodeBuffer += e.key;
            lastKeyTime = currentTime;
        });
        
        // --- МОДУЛЬ УМНОЙ ПРИЕМКИ (ИНВОЙСЫ) ---
        let parsedInvoiceData = [];
        let invoiceGroups = {}; 

        function toggleDropdown() {
            const list = document.getElementById('dropdownList');
            const header = document.getElementById('dropdownHeader');
            list.classList.toggle('show');
            header.classList.toggle('active');
        }

        function selectCurrency(value) {
            document.getElementById('dropdownSelectedCode').innerText = value;
            document.getElementById('invoiceCurrency').value = value;
            const items = document.querySelectorAll('.currency-minimal-item');
            items.forEach(item => item.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('dropdownList').classList.remove('show');
            document.getElementById('dropdownHeader').classList.remove('active');
            
            // НОВОЕ: Меняем валюту в шапке таблицы
            let headerSpan = document.getElementById('dynamicCurrencySpan');
            if (headerSpan) headerSpan.innerText = value;
        }

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.currency-minimal-container')) {
                const list = document.getElementById('dropdownList');
                if (list) list.classList.remove('show');
                const header = document.getElementById('dropdownHeader');
                if (header) header.classList.remove('active');
            }
        });

        function updateFileNameCompactUI(input) {
            const fileNameText = document.getElementById('fileNameTextCompact');
            const containerBox = document.getElementById('fileInputLabel');
            if (input.files && input.files.length > 0) {
                fileNameText.innerText = input.files.length > 1 ? translations[currentLang].inc_file_selected + input.files.length : input.files[0].name;
                fileNameText.classList.remove('file-placeholder-text');
                fileNameText.style.color = 'var(--text-main)';          
                containerBox.style.borderColor = 'var(--accent-green)'; 
                containerBox.style.background = 'var(--bg-success-dim)';  
                containerBox.style.color = 'var(--text-main)';  
            } else {
                fileNameText.innerText = translations[currentLang].inc_file_placeholder;
                fileNameText.classList.add('file-placeholder-text');
                fileNameText.style.color = 'var(--text-placeholder)';
                containerBox.style.borderColor = 'var(--border-focus)';
                containerBox.style.background = 'var(--bg-body)';
                containerBox.style.color = 'var(--text-muted)';
            }
        }

        function toggleIncomeModule() {
            const modal = document.getElementById('income-modal');
            if (modal.style.display === 'none' || modal.style.display === '') {
                modal.style.display = 'flex';
            } else {
                modal.style.display = 'none';
                document.getElementById('invoicePreviewArea').style.display = 'none';
                document.getElementById('debug-container').style.display = 'none';
                document.getElementById('debug-container').innerHTML = '';
                document.getElementById('parseInvoiceBtn').style.display = 'block'; 
                
                const fileInput = document.getElementById('invoiceFileInput');
                fileInput.value = '';
                updateFileNameCompactUI(fileInput); 
                parsedInvoiceData = [];
            }
        }

        async function processInvoiceFile() {
            const fileInput = document.getElementById('invoiceFileInput');
            if (!fileInput.files.length) return alert(translations[currentLang].inc_no_file);

            parsedInvoiceData = []; 
            invoiceGroups = {}; 
            let processingLogs = []; 

            const markers = (invoiceSynonyms['supplier_keywords'] || ["the seller", "vendor", "supplier", "поставщик"]);
            const excludes = (invoiceSynonyms['exclude'] || ["commercial invoice", "packing list", "invoice", "specification", "sales contract", "contract"]);

            function isSynonym(cellValue, targetKey) {
                if (!cellValue) return false;
                const cleanCell = String(cellValue).replace(/\s+/g, '').toLowerCase();
                const synonymsList = (invoiceSynonyms[targetKey] || []).map(s => s.replace(/\s+/g, '').toLowerCase());
                return synonymsList.some(syn => syn !== "" && cleanCell.includes(syn));
            }

            for (let file of fileInput.files) {
                let fileErrors = [];
                let itemsInFile = 0;
                let fileParsedSuccessfully = false;
                let sheetErrorsList = []; 

                const b64Promise = new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });
                const originalBase64 = await b64Promise;

                const dataPromise = new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(new Uint8Array(e.target.result));
                    reader.readAsArrayBuffer(file);
                });

                const arrayBuffer = await dataPromise;
                let file_doc_no = 'UNKNOWN';
                let file_supplier = 'UNKNOWN';

                try {
                    const workbook = XLSX.read(arrayBuffer, {type: 'array'});
                    
                    for (let sheetName of workbook.SheetNames) {
                        const worksheet = workbook.Sheets[sheetName];
                        const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});
                        if (!rows || rows.length === 0) continue;

                        if (file_supplier === 'UNKNOWN') {
                            for (let i = 0; i < Math.min(10, rows.length); i++) {
                                let row = rows[i];
                                if (!row) continue;
                                for (let j = 0; j < row.length; j++) {
                                    let cellVal = String(row[j] || "").toLowerCase();
                                    if (markers.some(m => cellVal.includes(m.toLowerCase()))) {
                                        for (let k = j + 1; k < row.length; k++) {
                                            if (row[k] && String(row[k]).trim() !== '') {
                                                file_supplier = String(row[k]).trim().replace(/^"|"$/g, ''); 
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if (file_supplier === 'UNKNOWN') {
                                for (let i = 0; i < Math.min(8, rows.length); i++) {
                                    let row = rows[i] || [];
                                    let text = String(row[0] || "").trim();
                                    if (text && !excludes.some(ex => text.toLowerCase().includes(ex.toLowerCase()))) {
                                        file_supplier = text.replace(/^"|"$/g, '');
                                        break;
                                    }
                                }
                            }
                        }

                        if (file_doc_no === 'UNKNOWN') {
                            for (let i = 0; i < Math.min(20, rows.length); i++) {
                                let row = rows[i] || [];
                                for (let j = 0; j < row.length; j++) {
                                    if (isSynonym(row[j], 'invoice_no')) {
                                        let val = String(row[j+1] || '').trim();
                                        if (val && val !== 'UNKNOWN') file_doc_no = val;
                                    }
                                }
                            }
                        }

                        // НОВОЕ: Если оригинальный номер не найден — ставим заглушку (Дата+Время)
                        if (file_doc_no === 'UNKNOWN' || file_doc_no === '') {
                            let now = new Date();
                            let day = String(now.getDate()).padStart(2, '0');
                            let month = String(now.getMonth() + 1).padStart(2, '0');
                            let hours = String(now.getHours()).padStart(2, '0');
                            let minutes = String(now.getMinutes()).padStart(2, '0');
                            file_doc_no = `IN-${day}.${month}-${hours}${minutes}`;
                        }

                        let firstDataRowIdx = -1;
                        for (let i = 0; i < Math.min(50, rows.length); i++) {
                            let row = rows[i] || [];
                            if (row.length === 0) continue;

                            let numCount = row.filter(c => {
                                let val = String(c).trim().replace(/,/g, '');
                                return val !== '' && !isNaN(Number(val));
                            }).length;

                            if (numCount >= 2) {
                                let firstCol = String(row[0] || '').toUpperCase();
                                if (!firstCol.includes('TOTAL')) {
                                    firstDataRowIdx = i;
                                    break;
                                }
                            }
                        }

                        if (firstDataRowIdx > 0) {
                            let headerRowIdx = firstDataRowIdx - 1;
                            let colMap = { code: -1, brand: -1, desc: -1, qty: -1, price: -1, cbm: -1, weight: -1 };
                            
                            let headerRow = rows[headerRowIdx] || []; // <-- ЭТУ СТРОКУ ОСТАВЛЯЕМ!
                            
                            // 1. Читаем системные исключения
                            let baseKeys = [];
                            if (invoiceSynonyms && invoiceSynonyms['system_ignore_in_id']) {
                                baseKeys = invoiceSynonyms['system_ignore_in_id'].map(s => s.toLowerCase().trim());
                            }
                            // ЖЕСТКИЙ ПРЕДОХРАНИТЕЛЬ (на случай опечаток в Google Таблице)
                            ['id', 'qty', 'price', 'cost', 'cbm', 'weight', 'barcode', 'exclude', 'supplier_keywords', 'invoice_no', 'contract_no'].forEach(k => {
                                if (!baseKeys.includes(k)) baseKeys.push(k);
                            });

                            // 2. ЗАМЕНЯЕМ varMap НА МАССИВ (чтобы размер не затирался моделью)
                            let activeCols = [];
                            
                            for (let j = 0; j < headerRow.length; j++) {
                                let val = String(headerRow[j] || '').replace(/[\r\n]+/g, ' ').trim();
                                
                                if (val.toLowerCase().includes('total') || val.toLowerCase().includes('итого') || val.toLowerCase().includes('общий')) {
                                    continue; 
                                }
                                
                                if (colMap.code === -1 && isSynonym(val, 'id')) colMap.code = j;
                                if (colMap.qty === -1 && isSynonym(val, 'qty')) colMap.qty = j;
                                if (colMap.price === -1 && isSynonym(val, 'price')) colMap.price = j;
                                if (colMap.brand === -1 && isSynonym(val, 'brand')) colMap.brand = j;
                                if (colMap.desc === -1 && isSynonym(val, 'name')) colMap.desc = j;
                                if (colMap.cbm === -1 && isSynonym(val, 'cbm')) colMap.cbm = j;
                                if (colMap.weight === -1 && isSynonym(val, 'weight')) colMap.weight = j;

                                // --- ГЛАВНАЯ ЗАЩИТА ОТ СОВПАДЕНИЙ (unitPRice != PR) ---
                                // Проверяем, не является ли эта колонка системной (цена, количество, инвойс и т.д.)
                                let isSystemColumn = false;
                                for (let bk of baseKeys) {
                                    if (isSynonym(val, bk)) {
                                        isSystemColumn = true;
                                        break;
                                    }
                                }

                                // Если это Цена или Кол-во, мы намертво блокируем её. Она не попадет в генератор ID!
                                if (isSystemColumn) continue;

                                if (invoiceSynonyms) {
                                    for (let key in invoiceSynonyms) {
                                        let cleanKey = key.trim().toLowerCase();
                                        
                                        if (cleanKey === 'system_ignore_in_id') continue;
                                        
                                        if (!baseKeys.includes(cleanKey)) {
                                            if (isSynonym(val, key)) {
                                                activeCols.push({ key: cleanKey, colIdx: j });
                                                break; // Нашли совпадение — выходим, чтобы колонка не привязалась к двум ключам сразу
                                            }
                                        }
                                    }
                                }
                            }

                            if (colMap.code !== -1 && colMap.qty !== -1 && colMap.price !== -1) {
                                fileParsedSuccessfully = true; 
                                
                                if (!invoiceGroups[file_doc_no]) {
                                    invoiceGroups[file_doc_no] = { supplier: file_supplier, items: [], originalFiles: [] };
                                }

                                // --- ИСПРАВЛЕНИЕ 2: ПАМЯТЬ ДЛЯ ОБЪЕДИНЕННЫХ ЯЧЕЕК ---
                                let lastCode = "UNKNOWN";
                                let lastBrand = "";
                                let lastDesc = "";
                                let varMemory = {}; // НОВОЕ: Память для параметров (размер, вылет и тд)

                                for (let i = firstDataRowIdx; i < rows.length; i++) {
                                    const row = rows[i];
                                    if (!row || row.length === 0) continue;
                                    
                                    let codeCell = String(row[colMap.code] || '').trim();
                                    let qty = parseFloat(row[colMap.qty]);
                                    let price = parseFloat(row[colMap.price]);
                                    let brandStr = colMap.brand !== -1 ? String(row[colMap.brand] || '').trim() : '';
                                    let descStr = colMap.desc !== -1 ? String(row[colMap.desc] || '').trim() : '';

                                    // Логика "Протягивания" вниз
                                    if (codeCell === "" && (!isNaN(qty) || !isNaN(price))) {
                                        // Если код пустой, но есть цифры -> берем данные из памяти
                                        codeCell = lastCode;
                                        if (brandStr === "") brandStr = lastBrand;
                                        if (descStr === "") descStr = lastDesc;
                                    } else if (codeCell !== "") {
                                        // Если код написан, проверяем не конец ли это таблицы
                                        if (codeCell.toUpperCase().includes('TOTAL')) break; 
                                        // Запоминаем для следующих пустых строк
                                        lastCode = codeCell;
                                        lastBrand = brandStr;
                                        lastDesc = descStr;
                                    } else {
                                        // Если и код пустой, и цифр нет - значит таблица кончилась
                                        break; 
                                    }
                                    
                                    if (!isNaN(qty) && !isNaN(price)) {
                                        
                                        // --- НАЧАЛО НОВОГО БЛОКА ОЧИСТКИ И МАТЕМАТИКИ ---
                                        let rawCbm = colMap.cbm !== -1 ? (parseFloat((row[colMap.cbm] || '0').toString().replace(',', '.')) || 0) : 0;
                                        let finalCbm = rawCbm;

                                        if (colMap.cbm !== -1 && qty > 0) {
                                            let leftVal = parseFloat((row[colMap.cbm - 1] || '0').toString().replace(',', '.')) || 0;
                                            let rightVal = parseFloat((row[colMap.cbm + 1] || '0').toString().replace(',', '.')) || 0;
                                            
                                            if (leftVal > 0 && rawCbm > 0 && Math.abs((leftVal * qty) - rawCbm) < 0.2) {
                                                finalCbm = leftVal; 
                                            } else if (rightVal > 0 && rawCbm > 0 && Math.abs((rightVal * qty) - rawCbm) < 0.2) {
                                                finalCbm = rightVal; 
                                            } else if (rawCbm === 0) {
                                                if (leftVal > 0 && leftVal < 1) finalCbm = leftVal;
                                                else if (rightVal > 0 && rightVal < 1) finalCbm = rightVal;
                                            }
                                        }
                                        
                                        let finalWeight = colMap.weight !== -1 ? (parseFloat((row[colMap.weight] || '0').toString().replace(',', '.')) || 0) : 0;

                                        // --- РАЗДЕЛЬНАЯ ГЕНЕРАЦИЯ ID И ИМЕНИ ---
                                        let allowedForName = ['brand', 'name', 'size']; // Что разрешено показывать на кассе
                                        let excludeFromId = ['brand']; // ОПТИМИЗАЦИЯ: Что НЕ нужно дублировать в ID
                                        
                                        let nameParts = [];
                                        let idParts = [];

                                        // Идем по нашему массиву найденных колонок
                                        for (let col of activeCols) {
                                            let colIdx = col.colIdx;
                                            let key = col.key;
                                            
                                            let cellVal = String(row[colIdx] || '').trim();
                                            let activeVal = "";
                                            
                                            // Память столбцов (привязка к номеру колонки)
                                            if (cellVal !== '') {
                                                varMemory[colIdx] = cellVal;
                                                activeVal = cellVal;
                                            } else if (varMemory[colIdx]) {
                                                activeVal = varMemory[colIdx];
                                            }
                                            
                                            if (activeVal !== '') {
                                                // 1. Для короткого Имени на кассе
                                                if (allowedForName.includes(key)) {
                                                    nameParts.push(activeVal.toUpperCase());
                                                }
                                                
                                                // 2. Для длинного ID (Если ключ НЕ в списке исключений, добавляем его!)
                                                if (!excludeFromId.includes(key)) {
                                                    let idVal = activeVal.toUpperCase().replace(/\*/g, 'X').replace(/\s+/g, '');
                                                    // Ключ сортировки
                                                    idParts.push({ sortKey: key.toUpperCase() + colIdx, val: idVal });
                                                }
                                            }
                                        }

                                        // 1. Собираем короткое ИМЯ
                                        let finalName = nameParts.join(' ').trim();
                                        if (finalName === "") finalName = codeCell;

                                        // 2. Собираем длинный ID (Сортируем ключи - защита от перестановки колонок)
                                        idParts.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
                                        let compositeId = codeCell;
                                        for (let p of idParts) {
                                            compositeId += "_" + p.val;
                                        }
                                        // ---------------------------------------------

                                        const itemData = {
                                            doc_no: file_doc_no, 
                                            category: file_doc_no, // НОВОЕ: Единая категория, равная номеру партии
                                            supplier: file_supplier, 
                                            item_id: compositeId, 
                                            item_name: finalName, 
                                            qty: qty, 
                                            cost: price,
                                            cbm: finalCbm,
                                            weight: finalWeight,
                                            staff_id: currentUser ? currentUser.uid : 'Auto-Import' 
                                        };
                                        // --- КОНЕЦ НОВОГО БЛОКА ---

                                        parsedInvoiceData.push(itemData);
                                        invoiceGroups[file_doc_no].items.push(itemData);
                                        itemsInFile++;
                                    }
                                }
                            } else {
                                let missing = [];
                                if (colMap.code === -1) missing.push(translations[currentLang].word_code);
                                if (colMap.qty === -1) missing.push(translations[currentLang].word_qty);
                                if (colMap.price === -1) missing.push(translations[currentLang].word_price);
                                sheetErrorsList.push(translations[currentLang].inc_err_sheet_missing.replace('{0}', sheetName).replace('{1}', headerRowIdx + 1) + missing.join(', '));
                            }
                        } else {
                            sheetErrorsList.push(translations[currentLang].inc_err_sheet_no_table.replace('{0}', sheetName));
                        }
                    } 
                    
                    if (invoiceGroups[file_doc_no] && fileParsedSuccessfully) {
                        const alreadyAdded = invoiceGroups[file_doc_no].originalFiles.some(f => f.fileName === file.name);
                        if (!alreadyAdded) {
                            invoiceGroups[file_doc_no].originalFiles.push({
                                fileName: file.name,
                                fileBase64: originalBase64
                            });
                        }
                    }

                } catch (err) {
                    console.error("Ошибка чтения файла: " + file.name, err);
                    fileErrors.push(translations[currentLang].inc_file_corrupted);
                }

                if (file_doc_no === 'UNKNOWN') fileErrors.push(translations[currentLang].inc_err_no_doc);
                if (file_supplier === 'UNKNOWN') fileErrors.push(translations[currentLang].inc_err_no_sup);
                
                if (!fileParsedSuccessfully) {
                    fileErrors.push(sheetErrorsList.join('<br>'));
                } else if (itemsInFile === 0) {
                    fileErrors.push(translations[currentLang].inc_err_no_items);
                }

                if (fileErrors.length > 0) {
                    processingLogs.push(`<div style="color:var(--accent-red); font-size:12px; margin-bottom:4px; padding:6px; border-left:3px solid var(--accent-red); background:var(--bg-hover);">⚠️ <b>${file.name}</b>:<br>${fileErrors.join('<br>')}</div>`);
                } else {
                    processingLogs.push(`<div style="color:var(--accent-green); font-size:12px; margin-bottom:4px; padding:6px; border-left:3px solid var(--accent-green); background:var(--bg-hover);">✅ <b>${file.name}</b>: ${translations[currentLang].inc_success.replace('{0}', itemsInFile)}</div>`);
                }
            }

            const debugContainer = document.getElementById('debug-container');
            debugContainer.style.maxHeight = 'none'; 
            debugContainer.style.overflowY = 'visible';
            debugContainer.innerHTML = processingLogs.join('');
            debugContainer.style.display = 'flex';

            if (parsedInvoiceData.length === 0) {
                document.getElementById('invoicePreviewArea').style.display = 'none';
                return; 
            }

            const uniqueDocs = Object.keys(invoiceGroups).filter(k => k !== 'UNKNOWN');
            const uniqueSuppliers = [...new Set(parsedInvoiceData.map(i => i.supplier))];

            let docUiHtml = '';
            if (uniqueDocs.length === 1) {
                docUiHtml = `<input type="text" id="ui-doc-no" value="${uniqueDocs[0]}" style="background:var(--bg-hover); color:var(--accent-yellow); border:1px dashed var(--border-focus); padding:2px 6px; border-radius:3px; font-weight:bold; font-size:13px; width: 140px; outline:none;" title="Можно редактировать">`;
            } else if (uniqueDocs.length > 1) {
                docUiHtml = `<span style="color:var(--accent-yellow); font-weight:bold;">${uniqueDocs.join(', ')}</span>`;
            } else {
                docUiHtml = `<span style="color:var(--accent-red); font-weight:bold;">${translations[currentLang].inc_err_doc_format}</span>`;
            }

            document.getElementById('invoiceMetadata').innerHTML = `
                <span style="color:var(--text-muted); font-weight:normal; font-size:13px;">${translations[currentLang].inc_lbl_sup}</span> 
                <span style="color:var(--accent-yellow); font-weight:bold; font-size:14px; letter-spacing:0.5px;">${uniqueSuppliers.join(', ')}</span> 
                
                <span style="color:var(--border-light); margin:0 10px;">|</span> 
                
                <span style="color:var(--text-muted); font-weight:normal; font-size:13px;">${translations[currentLang].inc_lbl_doc}</span> 
                ${docUiHtml} 
                
                <span style="color:var(--border-light); margin:0 10px;">|</span> 
                
                <span style="color:var(--text-muted); font-weight:normal; font-size:13px;">${translations[currentLang].inc_lbl_items}</span> 
                <span style="color:var(--accent-yellow); font-weight:bold; font-size:14px;">${parsedInvoiceData.length}</span>
            `;
            
            document.getElementById('invoiceTableBody').innerHTML = parsedInvoiceData.map(item => `
                <tr style="border-bottom:1px solid var(--border-light); color:var(--text-main);">
                    <td style="padding:5px;">${item.item_id}</td>
                    <td style="padding:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
                        ${item.item_name}
                        ${uniqueDocs.length > 1 ? `<br><span style="font-size:9px; color:var(--text-muted);">[Инвойс: ${item.doc_no}]</span>` : ''}
                    </td>
                    <td style="padding:5px;">${item.qty}</td>
                    <td style="padding:5px;">${item.cbm}</td>
                    <td style="padding:5px;">${item.weight}</td>
                    <td style="padding:5px;">${item.cost}</td>
                </tr>`).join('');
            
            document.getElementById('invoicePreviewArea').style.display = 'flex';
            document.getElementById('parseInvoiceBtn').style.display = 'none';
        }

        async function sendInvoiceToBackend() {
            if (parsedInvoiceData.length === 0) return alert(translations[currentLang].inc_empty_cart);

            const docKeys = Object.keys(invoiceGroups);
            const docInput = document.getElementById('ui-doc-no');
            
            if (docKeys.length === 1 && docInput) {
                const finalDocNo = docInput.value.trim();
                if (!finalDocNo) return alert(translations[currentLang].inc_doc_empty);
                if (finalDocNo !== docKeys[0]) {
                    invoiceGroups[finalDocNo] = invoiceGroups[docKeys[0]];
                    delete invoiceGroups[docKeys[0]];
                    invoiceGroups[finalDocNo].items.forEach(i => i.doc_no = finalDocNo);
                }
            }

            const btn = document.getElementById('sendInvoiceBtn');
            const statusContainer = document.getElementById('status-container');
            const statusBar = document.getElementById('status-bar');
            const statusText = document.getElementById('status-text');
            const statusPercent = document.getElementById('status-percent');

            btn.disabled = true; btn.style.opacity = '0.5';
            statusContainer.style.display = 'block';
            
            // Стартуем с 5%
            let currentDisplayPct = 5;
            statusBar.style.width = '5%'; statusPercent.innerText = '5%';

            const totalSteps = Object.keys(invoiceGroups).length;
            let currentStep = 0;

            for (let docNo of Object.keys(invoiceGroups)) {
                currentStep++;
                let group = invoiceGroups[docNo];
                
                // Высчитываем целевой процент для этого шага (но оставим 5% на финализацию)
                let targetPct = Math.round((currentStep / totalSteps) * 95);

                statusText.innerText = translations[currentLang].inc_status_db;
                
                // ЗАПУСКАЕМ АНИМАЦИЮ ОЖИДАНИЯ СЕРВЕРА
                let fakeProgress = setInterval(() => {
                    let remaining = targetPct - currentDisplayPct;
                    if (remaining > 0) {
                        // Полоска замедляется по мере приближения к концу
                        let step = Math.max(1, Math.floor(remaining / 10)); 
                        currentDisplayPct += step;
                        statusBar.style.width = currentDisplayPct + '%';
                        statusPercent.innerText = currentDisplayPct + '%';

                        // Меняем текст, чтобы развлекать и информировать пользователя
                        if (currentDisplayPct > 20 && currentDisplayPct < 50) statusText.innerText = translations[currentLang].inc_status_write;
                        if (currentDisplayPct >= 50 && currentDisplayPct < 85) statusText.innerText = translations[currentLang].inc_status_drive;
                        if (currentDisplayPct >= 85) statusText.innerText = translations[currentLang].inc_status_almost;
                    }
                }, 600);

                try {
                    // НОВОЕ: Генерируем уникальный слепок содержимого инвойса
                    let fp = "FP_" + group.items.length + "шт_" + group.items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0) + "кол_" + (group.items[0].item_name || "").replace(/\s/g, '').substring(0, 10);

                    const response = await fetch(GATEWAY_URL, { // 1. Меняем адрес отправки на шлюз
    method: 'POST',
    body: JSON.stringify({ 
        master_url: APPS_SCRIPT_URL, // 2. Передаем шлюзу адрес Мастер-сервера, куда переслать цифры
        api_key: CLIENT_API_KEY,
        action: 'income', 
        data: group.items,
        files: group.originalFiles, 
        docNo: docNo, 
        currency: document.getElementById('invoiceCurrency').value,
        fingerprint: fp 
    })
});
                    
                    const res = await response.json();
                    
                    clearInterval(fakeProgress); // Останавливаем анимацию
                    
                    if (!res.success) {
                        throw new Error(res.error);
                    }
                } catch (err) {
                    clearInterval(fakeProgress); // Останавливаем анимацию при ошибке
                    statusText.innerText = translations[currentLang].inc_server_err; 
                    statusText.style.color = "var(--accent-red)";
                    
                    let errorMsg = err.message;
                    
                    let dupMatch = errorMsg.match(/Накладная с номером (.*?) уже была/i);
                    if (dupMatch && dupMatch[1]) {
                        errorMsg = translations[currentLang].server_dup.replace('{0}', dupMatch[1].trim());
                    } else if (errorMsg.includes("База не привязана")) {
                        errorMsg = translations[currentLang].server_no_db;
                    } else if (errorMsg.includes("с точно таким же составом")) {
                        // НОВОЕ: Перехватываем ошибку цифрового слепка
                        errorMsg = translations[currentLang].server_dup_fp;
                    }

                    alert(translations[currentLang].inc_send_err + errorMsg);
                    btn.disabled = false; btn.style.opacity = '1';
                    return;
                }
            }

            // Жестко ставим 100% только когда сервер ответил УСПЕХОМ
            statusBar.style.width = '100%'; statusPercent.innerText = '100%';
            statusText.innerText = translations[currentLang].inc_status_done;
            statusText.style.color = "var(--accent-green)";
            
            setTimeout(() => { 
                alert(translations[currentLang].inc_all_done); 
                toggleIncomeModule(); 
                if (typeof load === 'function') load(); 
            }, 800);
            
            btn.disabled = false; btn.style.opacity = '1';
        }

        // =======================================================
// УДЕРЖАНИЕ КНОПКИ "С" (Сброс кэша / Очистка ввода)
// =======================================================
let pinHoldTimer = null;
let pinHoldStart = null;
const HOLD_DURATION = 2000; // 2 секунды

function startResetHold(btn, e) {
    if (e && e.type === 'touchstart') {
        e.preventDefault(); 
    }
    
    pinHoldStart = Date.now();
    
    // Плавная заливка твоей кнопки (div) красным цветом
    btn.style.transition = `background-color ${HOLD_DURATION}ms linear, color ${HOLD_DURATION}ms linear`;
    btn.style.backgroundColor = 'var(--accent-red)';
    btn.style.color = '#ffffff';

    pinHoldTimer = setTimeout(() => {
        // === ПРОШЛО 2 СЕКУНДЫ: АВАРИЙНЫЙ СБРОС ===
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]); 
        }

        document.body.style.transition = 'background-color 0.1s ease';
        document.body.style.backgroundColor = 'var(--accent-red)';
        
        document.body.innerHTML = `
            <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
                <div style="font-size: 60px; margin-bottom: 20px;">🔄</div>
                <h2 style="font-family: sans-serif;">Сброс данных...</h2>
            </div>
        `;
        
        localStorage.clear();
        sessionStorage.clear();
        
        setTimeout(() => {
            window.location.reload(true);
        }, 500); 

    }, HOLD_DURATION);
}

function cancelResetHold(btn, e) {
    if (e && (e.type === 'touchend' || e.type === 'touchcancel')) {
        e.preventDefault(); 
    }
    
    if (!pinHoldStart) return; 

    clearTimeout(pinHoldTimer); 
    let holdTime = Date.now() - pinHoldStart;
    pinHoldStart = null; 
    
    // Если отпустили быстро (короткий тап) — вызываем ТВОЮ родную функцию
    if (holdTime < HOLD_DURATION) {
        if (typeof clearPin === 'function') {
            clearPin(); 
        }
    }
    
    // Мгновенно возвращаем твой div в исходное состояние
    btn.style.transition = 'background-color 0.2s ease, color 0.2s ease';
    btn.style.backgroundColor = '';
    btn.style.color = '';
}

    // --- ЛОГИКА МАССОВОЙ НАЦЕНКИ ---
        let targetMarkupCategory = null;
        let catHoldTimer = null;
        let isCatHold = false;

        function startCatHold(catName, e) {
            if (!currentUser || currentUser.role !== 'manager') return; 

            isCatHold = false;
            catHoldTimer = setTimeout(() => {
                isCatHold = true;
                if (navigator.vibrate) navigator.vibrate([50, 50, 50]); 
                openCategoryMarkup(catName);
            }, 1000); 
        }

        function cancelCatHold() {
            if (catHoldTimer) {
                clearTimeout(catHoldTimer);
                catHoldTimer = null;
            }
        }

        function handleCatClick(catName) {
            if (isCatHold) {
                isCatHold = false; 
                return; 
            }
            setCategory(catName); 
        }

        function openCategoryMarkup(catName) {
            targetMarkupCategory = catName;
            document.getElementById('markup-category-name').innerText = catName === 'all' ? translations[currentLang].cat_all : catName;
            document.getElementById('catMarkupValue').value = '';
            document.getElementById('category-markup-modal').style.display = 'flex';
        }

        function closeCategoryMarkup() {
            document.getElementById('category-markup-modal').style.display = 'none';
            targetMarkupCategory = null;
        }

        function applyCategoryMarkup() {
            const isPercent = document.getElementById('catTypePercent').checked;
            const rawValue = document.getElementById('catMarkupValue').value;
            // Умный парсинг: если ввели запятую, меняем ее на точку
            const value = parseFloat(rawValue.replace(',', '.'));
            
            if (isNaN(value) || value <= 0) return alert(translations[currentLang].markup_err_val);

            let changedCount = 0;
            
            // 1. ОПТИМИСТИЧНЫЙ ИНТЕРФЕЙС: Мгновенно пересчитываем цены локально
            db.forEach(item => {
                if (targetMarkupCategory === 'all' || item.category === targetMarkupCategory) {
                    let cost = parseFloat(item.cost) || 0;
                    
                    if (cost > 0) { 
                        let newPrice = isPercent ? cost + (cost * (value / 100)) : cost + value;
                        newPrice = Math.ceil(newPrice / 100) * 100; // Округление до 100 тенге
                        
                        item.price = newPrice;
                        changedCount++;
                    }
                }
            });

            if (changedCount > 0) {
                // Мгновенно перерисовываем каталог, сохраняем кэш и закрываем окно!
                localStorage.setItem('db_cache', JSON.stringify(db));
                render(); 
                closeCategoryMarkup();
                
                // 2. ФОНОВАЯ ОЧЕРЕДЬ: Создаем "команду" вместо тяжелого массива
                let queue = JSON.parse(localStorage.getItem('txQueue') || '[]');
                
                const now = new Date();
                const localTime = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU');
                const cmdId = 'BM-' + Math.random().toString(36).substring(7).toUpperCase();

                const commandTx = {
                    action: 'bulk_markup_command', // Тот самый ключ для бэкенда
                    tx_id: cmdId,
                    created_at: localTime,
                    category: targetMarkupCategory,
                    markup_type: isPercent ? 'percent' : 'fix',
                    value: value
                };

                // Кладем команду в очередь и зажигаем красный бейдж
                queue.push(commandTx);
                localStorage.setItem('txQueue', JSON.stringify(queue));
                updateQueueCounter();
                
                // Легкая вибрация, подтверждающая успех (для мобилок)
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

            } else {
                alert(translations[currentLang].markup_no_cost);
            }
        }

        // --- ГЛОБАЛЬНАЯ ГЛУШИЛКА КОНТЕКСТНОГО МЕНЮ ДЛЯ КНОПОК ---
        document.addEventListener('contextmenu', function(e) {
            if (e.target.closest('.cat-btn') || e.target.closest('.c-item')) {
                e.preventDefault(); // Запрещаем Андроиду показывать меню "Download/Share"
            }
        });

    let tokenClient;
    let clientAccessToken = ''; // НОВАЯ ПЕРЕМЕННАЯ: сохраняем токен клиента для Установщика

    // 1. Детектор встроенных браузеров
    function isBadInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        return (ua.indexOf('Telegram') > -1 || ua.indexOf('Instagram') > -1 || ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1);
    }

    // Функция ждет, пока Google полностью скачается
function initGoogleAuth() {
        if (isBadInAppBrowser()) {
            // ... (твой код заглушки для телеграма оставляем без изменений)
            document.getElementById('google-screen').innerHTML = `...`;
            return;
        }

        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID, 
            // ДОБАВИЛИ ПРАВА НА GOOGLE DRIVE
            scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive',
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    
                    // ЗАПОМИНАЕМ ТОКЕН В ГЛОБАЛЬНУЮ ПЕРЕМЕННУЮ
                    clientAccessToken = tokenResponse.access_token;
                    
                    const googleScreen = document.getElementById('google-screen');
                    googleScreen.innerHTML = '<h2 style="color: var(--accent-yellow); margin-bottom: 15px;">Проверка доступа...</h2><p style="color: var(--text-main);">Соединение с сервером</p>';

                    // Создаем глобальную переменную для хранения почты на время цепочки
                    let currentEmail = "";

                    // 1. Проверяем токен в Google
                    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: { Authorization: 'Bearer ' + clientAccessToken }
                    })
                    .then(async (res) => {
                        const text = await res.text();
                        if (!res.ok) throw new Error(`Ошибка Google Auth ${res.status}: ${text}`);
                        try {
                            return JSON.parse(text);
                        } catch {
                            throw new Error(`Google вернул не JSON:\n${text}`);
                        }
                    })
                    .then(userInfo => {
                        console.log("Юзер авторизован в Google:", userInfo.email);
                        
                        // ЗАПОМИНАЕМ ПОЧТУ для следующих шагов
                        currentEmail = userInfo.email; 
                        
                        // 2. Отправляем точный POST-запрос на твой шлюз
                        return fetch(GATEWAY_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                            body: JSON.stringify({
                                action: 'check_status', 
                                email: currentEmail
                            })
                        }); 
                    })
                    .then(async (res) => {
                        const text = await res.text();
                        try {
                            return JSON.parse(text);
                        } catch {
                            throw new Error("Сервер GAS вернул не JSON:\n" + text);
                        }
                    })
                    .then(serverResult => {
                        console.log("Ответ от GAS:", serverResult);

                        if (serverResult.success === false && serverResult.error) {
                            throw new Error(serverResult.error);
                        }

                        // 3. МАРШРУТИЗАЦИЯ
                        if (serverResult.status === "NEW_USER" || serverResult.status === "NEW_CLIENT") {
                            
                            if (typeof showInstallerForm === 'function') {
                                // ПЕРЕДАЕМ ЗАПОМНЕННУЮ ПОЧТУ
                                showInstallerForm(currentEmail); 
                            } else {
                                throw new Error("Функция установки showInstallerForm не найдена в коде!");
                            }

                        } else if (serverResult.status === "EXISTING_CLIENT") {
                            
                            if (serverResult.api_key) {
                                // Сохраняем в физическую память телефона
                                localStorage.setItem('CLIENT_API_KEY', serverResult.api_key);
                                // Мгновенно обновляем рабочую переменную кассы!
                                CLIENT_API_KEY = serverResult.api_key; 
                            }
                            
                            googleScreen.style.display = 'none';
                            document.getElementById('pin-screen').style.display = 'flex'; 

                        } else if (serverResult.status === "BLOCKED") {
                            throw new Error("Доступ приостановлен. Обратитесь в поддержку.");
                        } else {
                            throw new Error("Неизвестный статус от сервера: " + JSON.stringify(serverResult));
                        }
                    })
                    // 4. ЕДИНЫЙ БЛОК ВЫВОДА ОШИБОК
                    .catch(err => {
                        console.error("КРИТИЧЕСКАЯ ОШИБКА:", err);
                        googleScreen.innerHTML = `
                            <div style="color: #ff6b6b; padding: 20px; text-align: left; background: #1a1a1a; border-radius: 8px; border: 1px solid #333;">
                                <h2 style="margin-top: 0;">Ошибка при загрузке:</h2>
                                <pre style="white-space: pre-wrap; font-size: 13px; background: #000; padding: 10px; border-radius: 4px; color: #ffb3b3;">${err.message}</pre>
                                <button onclick="window.location.reload(true)" style="margin-top: 15px; padding: 10px 20px; background: #ff6b6b; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                                    Повторить попытку
                                </button>
                            </div>
                        `;
                    });
                }
            }
        });
    }

function showInstallerForm(email) {
    const googleScreen = document.getElementById('google-screen');
    
    googleScreen.innerHTML = `
        <div style="max-width: 480px; width: 90%; background: var(--bg-panel); padding: 30px; border-radius: 12px; border: 1px solid var(--border-light); text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative;">
            
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-bottom: 20px;">
                <button onclick="toggleSetupTheme()" id="setup-btn-theme" style="background: transparent; border: 1px solid var(--border-main); color: var(--text-muted); padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: 0.2s;">
                    ☀️ Light
                </button>
                <button onclick="toggleSetupLang()" id="setup-btn-lang" style="background: transparent; border: 1px solid var(--border-main); color: var(--text-muted); padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: 0.2s; font-weight: bold;">
                    KZ
                </button>
            </div>

            <h2 style="margin-top: 0; color: var(--accent-yellow); text-align: center; font-weight: var(--font-weight-main);" data-i18n="setup_title">
                Активация Системы
            </h2>
            
            <div style="background: var(--bg-hover); padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 25px; border: 1px solid var(--border-main); font-size: 14px;">
                <span style="color: var(--text-muted);" data-i18n="setup_account">Аккаунт:</span>
                <strong style="color: var(--text-main); margin-left: 5px;">${email}</strong>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; font-size: 14px; color: var(--text-main);" data-i18n="setup_store_name">
                    Название магазина
                </label>
                <input type="text" id="setup-store-name" placeholder="Супермаркет Алатау" 
                    style="width: 100%; box-sizing: border-box; padding: 12px 15px; background-color: var(--bg-card); border: 1px solid var(--border-main); color: var(--text-main); border-radius: 6px; font-size: 16px; outline: none;">
            </div>

            <div style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; font-size: 14px; color: var(--text-main);" data-i18n="setup_plan">
                    Тип лицензии
                </label>
                <select id="setup-plan-type" 
                    style="width: 100%; padding: 12px 15px; background-color: var(--bg-card); border: 1px solid var(--border-main); color: var(--text-main); border-radius: 6px; font-size: 16px; outline: none; cursor: pointer;">
                    <option value="trial" data-i18n="setup_plan_trial">Тест (7 дней)</option>
                    <option value="pro" data-i18n="setup_plan_pro">Полная версия</option>
                </select>
            </div>

            <button id="btn-start-setup" onclick="submitSetup('${email}')" 
                style="width: 100%; padding: 15px; font-size: 16px; background-color: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: opacity 0.2s;">
                <span data-i18n="setup_btn_start">Развернуть базу данных</span>
            </button>
            
            <div style="text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 15px;" data-i18n="setup_footer">
                Система автоматически создаст структуру папок на вашем Google Диске.
            </div>
        </div>
    `;

    if (typeof applyLanguage === 'function' && typeof currentLang !== 'undefined') {
        applyLanguage(currentLang);
    }
}

function toggleSetupTheme() {
    // Используем штатный механизм кассы (класс 'light-theme' на body)
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('pos_theme', isLight ? 'light' : 'dark'); // Запоминаем навсегда
    
    const btn = document.getElementById('setup-btn-theme');
    if (isLight) {
        btn.innerText = '🌙 Dark';
        btn.style.color = 'var(--text-main)';
    } else {
        btn.innerText = '☀️ Light';
        btn.style.color = 'var(--text-muted)';
    }
}

function toggleSetupLang() {
    currentLang = currentLang === 'ru' ? 'kz' : 'ru';
    localStorage.setItem('pos_lang', currentLang); // Запоминаем навсегда
    
    const btn = document.getElementById('setup-btn-lang');
    btn.innerText = currentLang === 'ru' ? 'KZ' : 'RU';
    
    if (typeof applyLanguage === 'function') {
        applyLanguage(currentLang); // Переводим интерфейс мгновенно
    }
    
    const input = document.getElementById('setup-store-name');
    if (input) {
        input.placeholder = currentLang === 'ru' ? 'Супермаркет Алатау' : 'Мысалы: Алатау дүкені';
    }
}

async function submitSetup(email) {
        const storeName = document.getElementById('setup-store-name').value.trim() || 'Мой Магазин';
        const planType = document.getElementById('setup-plan-type').value;
        const btn = document.getElementById('btn-start-setup');
        
        btn.disabled = true;
        btn.style.opacity = '0.7';

        if (!clientAccessToken) {
            showSetupError("Ошибка доступа к Диску. Попробуйте обновить страницу и войти заново.");
            return;
        }

        const extractId = (url) => {
            if (!url) return null;
            const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            return match ? match[1] : url.trim();
        };

        const tradeId = extractId(typeof TEMPLATE_TRADE_URL !== 'undefined' ? TEMPLATE_TRADE_URL : '');
        const configId = extractId(typeof TEMPLATE_CONFIG_URL !== 'undefined' ? TEMPLATE_CONFIG_URL : '');

        if (!tradeId || !configId) {
            showSetupError("Системная ошибка: Неверный формат ссылок на шаблоны в конфигурации.");
            return;
        }

        try {
            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_folder}</span>`;
            
            // 1. Создаем корневую папку
            const rootRes = await fetch('https://www.googleapis.com/drive/v3/files', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + clientAccessToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: `POS_System_Data - ${storeName}`, mimeType: 'application/vnd.google-apps.folder' })
            });
            if (!rootRes.ok) throw new Error("Сбой Google Drive API при создании главной папки.");
            const rootFolder = await rootRes.json();
            const rootId = rootFolder.id;

            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_struct}</span>`;
            
            // 2. Создаем служебные подпапки СТРОГО ПО ОЧЕРЕДИ (Защита от блокировки Google)
            let folderIds = {};
            const subfolders = ['POS_Backups', 'POS_Images', 'POS_Invoices', 'POS_Secret_Backups'];
            
            for (const name of subfolders) {
                const res = await fetch('https://www.googleapis.com/drive/v3/files', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + clientAccessToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, mimeType: 'application/vnd.google-apps.folder', parents: [rootId] })
                });
                
                if (!res.ok) {
                    const errTxt = await res.text();
                    throw new Error(`Ошибка при создании папки ${name}: ` + errTxt);
                }
                
                const f = await res.json();
                folderIds[name] = f.id;
            }

            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_copy}</span>`;
            
            // 3. Копируем Золотые Шаблоны
            const copyTradeRes = await fetch(`https://www.googleapis.com/drive/v3/files/${tradeId}/copy`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + clientAccessToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: `[POS] ${storeName} - Trade Control`, parents: [rootId] })
            });
            if (!copyTradeRes.ok) throw new Error("Сбой при копировании базы данных Trade Control.");
            const newTrade = await copyTradeRes.json();

            const copyConfigRes = await fetch(`https://www.googleapis.com/drive/v3/files/${configId}/copy`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + clientAccessToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: `[POS] ${storeName} - Config`, parents: [rootId] })
            });
            if (!copyConfigRes.ok) throw new Error("Сбой при копировании базы данных Config.");
            const newConfig = await copyConfigRes.json();

            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_perms}</span>`;
            
            // 4. Настраиваем права
            const permRes = await fetch(`https://www.googleapis.com/drive/v3/files/${rootId}/permissions`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + clientAccessToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'writer', type: 'user', emailAddress: ADMIN_EMAIL })
            });
            if (!permRes.ok) throw new Error(`Сбой выдачи прав серверу (${ADMIN_EMAIL})`);

            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_reg}</span>`;
            
            // 5. Отправляем все данные на сервер
            const regRes = await fetch(GATEWAY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'createTenant',
                    email: email,
                    storeName: storeName,
                    plan: planType,
                    lang: currentLang,
                    tradeId: newTrade.id,   
                    configId: newConfig.id,
                    folders: folderIds 
                })
            });
            
            if (!regRes.ok) throw new Error(`Сервер вернул статус ${regRes.status}`);
            const result = await regRes.json();

            if (result.success) {
                localStorage.setItem('CLIENT_API_KEY', result.api_key);
                document.getElementById('google-screen').innerHTML = `
                    <div style="text-align: center; max-width: 400px;">
                        <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
                        <h2 style="color: var(--accent-green); margin-bottom: 10px;">${translations[currentLang].setup_success_title}</h2>
                        <p style="color: var(--text-main); margin-bottom: 15px;">${translations[currentLang].setup_success_desc}</p>
                        <div style="background: var(--bg-card); border: 1px dashed var(--accent-yellow); padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-bottom: 5px;">${translations[currentLang].setup_pin_msg}</span>
                            <span style="color: var(--accent-yellow); font-size: 24px; font-weight: bold; letter-spacing: 2px;">1111</span>
                        </div>
                        <button onclick="window.location.reload(true);" style="padding: 15px 30px; background-color: var(--accent-green); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;">
                            ${translations[currentLang].setup_btn_start_work}
                        </button>
                    </div>
                `;
            } else {
                showSetupError(result.error || "Неизвестная ошибка сервера при регистрации.");
            }

        } catch (error) {
            showSetupError(error.message);
        }
    }

function showSetupError(errorMessage) {
    const btn = document.getElementById('btn-start-setup');
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.backgroundColor = 'var(--accent-red)';
        btn.innerHTML = '❌ Ошибка. Попробовать снова';
    }
    alert("Ошибка развертывания:\n" + errorMessage);
}
// ===================================================================

    // Эта функция срабатывает при клике на синюю кнопку
    function loginWithGoogle() {
        if (tokenClient) {
            tokenClient.requestAccessToken();
        }
    }