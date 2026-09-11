        const translations = {
            ru: {
                btn_sale: "ПРОДАЖА", btn_return: "ВОЗВРАТ", search_placeholder: "ПОИСК...",
                header_name: "НАИМЕНОВАНИЕ", header_price: "ЦЕНА", header_stock: "ОСТ",
                total_label_sale: "ИТОГО:", total_label_return: "К ВОЗВРАТУ:",
                pay_cash: "Нал", pay_qr: "QR", pay_red: "Red", pay_card: "Карт", pay_trans: "Пер",
                btn_cancel: "ОТМЕНА", btn_confirm: "ПОДТВЕРДИТЬ", btn_close: "ЗАКРЫТЬ",
                btn_close_report: "ЗАКРЫТЬ ОТЧЕТ", settings_title: "НАСТРОЙКИ",
                settings_lang: "ЯЗЫК ИНТЕРФЕЙСА", settings_sync: "СИНХРОНИЗАЦИЯ", settings_system: "СИСТЕМА",
                btn_sync: "Отправить чеки", btn_update: "Обновить кэш", btn_base: "База",
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
                inc_sup_unknown: "Не указан",
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
                theme_toggle: "Смена Темы (ДЕНЬ/НОЧЬ)", settings_theme: "ОФОРМЛЕНИЕ",
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
                kaspi_danger: "ТОВАР В РЕЗЕРВЕ KASPI:",
                kaspi_pcs: "шт. НЕ ПРОДАВАТЬ!",
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
                btn_help: "Руководство пользователя",
                qe_title: "РАСПРЕДЕЛЕНИЕ ТОВАРА",
                qe_name: "Наименование",
                qe_name_hint: "* Если не появляется экранная клавиатура, нажмите 2 раза кнопку на сканере",
                qe_category: "Категория",
                qe_no_category: "Не выбрано",
                qe_new_category: "+ Новая категория",
                qe_barcode: "ШТРИХКОД",
                qe_barcode_placeholder: "Отсканируйте...",
                qe_price: "Цена (₸)",
                qe_current: "Тек",
                qe_min_stock: "Мин. остаток",
                qe_fact: "Факт",
                qe_save: "СОХРАНИТЬ",
                qe_close: "Закрыть ✖",
                qe_receive_title: "Оформление прихода",
                qe_supplier: "Поставщик",
                qe_supplier_placeholder: "Выберите поставщика...",
                qe_supplier_new: "+ Новый поставщик",
                qe_supplier_name_placeholder: "Имя поставщика...",
                qe_receive_qty: "Количество",
                qe_receive_price: "Цена закупа",
                qe_btn_submit: "ВНЕСТИ ПРИХОД",
                qe_btn_back: "НАЗАД",
                qe_btn_open_receive: "+ Новая партия",
                modal_choose_supplier: "Выберите поставщика",
                modal_enter_supplier: "Ввести поставщика",
                modal_search_supplier: "Поиск или новый поставщик...",
                modal_add_supplier: "+ Добавить",
                modal_unknown_supplier: "Неизвестный поставщик",
                // Плейсхолдеры и заголовки полей нового товара
                ph_barcode: "Штрихкод...",
                ph_name: "Наименование товара...",
                ph_supplier: "Поставщик...",
                ph_category: "Категория...",
                nt_qty: "Количество",
                nt_price_in: "Цена закупа",
                nt_price_out: "Розница",
                // Системные сообщения и кнопки для сохранения
                msg_barcode_req: "Наименование обязательны для заполнения!",
                msg_qty_req: "Количество должно быть больше нуля!",
                btn_saving: "⏳ СОХРАНЕНИЕ...",
                btn_save_ready: "✅ ОПРИХОДОВАТЬ НА СКЛАД",
                msg_server_err: "Ошибка сервера: ",
                msg_conn_err: "Ошибка связи с сервером: ",
                modal_income_title: "ПРИЕМКА ТОВАРА",
                tab_import: "ИМПОРТ EXCEL",
                tab_new: "НОВЫЙ ТОВАР",
                file_select_excel: "Нажмите для выбора Excel",
                update_available: "Доступна новая версия системы",
                update_btn: "Обновить кассу",
                auth_checking: "Проверка доступа...",
                auth_connecting: "Соединение с сервером",
                auth_blocked: "Доступ приостановлен. Обратитесь в поддержку.",
                auth_error_title: "Ошибка при загрузке:",
                auth_retry: "Повторить попытку",
                auth_reloading: "Перезагружаем...",
                auth_opening: "Открываем Google...",
                auth_fail: "Сбой: ",
                app_subtitle: "Система автоматизации торговли",
                auth_title: "Авторизация",
                auth_desc: "Для получения доступа к кассовому терминалу и синхронизации с базой данных, пожалуйста, войдите под своим рабочим Google-аккаунтом.",
                btn_google: "ВОЙТИ ЧЕРЕЗ GOOGLE",
                setup_network_error_title: "Нет связи с Google Диском",
                setup_network_error_desc: "Системе не удалось создать файлы базы данных. Запрос был заблокирован или прерван.",
                setup_network_error_step1: "Интернет: проверьте соединение (Wi-Fi/LTE).",
                setup_network_error_step2: "Блокировщики: если включен AdGuard или антивирус, временно приостановите его работу.",
                setup_network_error_step3: "Браузер: если ссылка открыта в Telegram или WhatsApp, перейдите в Safari или Chrome.",
                setup_btn_retry: "Повторить попытку",
                setup_license_error_title: "Установка отклонена",
                setup_license_error_desc: "Касса уже была установлена на данный Google аккаунт.",
                setup_license_error_step1: "Для новой установки (тестового периода) используйте другой аккаунт Google.",
                setup_license_error_step2: "Для продления текущей кассы обратитесь к администратору.",
                // --- БАЗА ДАННЫХ (DRIVE МОДАЛКА) ---
                drive_modal_title: "БАЗА ДАННЫХ (DRIVE)",
                drive_root: "КОРНЕВАЯ ПАПКА",
                drive_db: "ТАБЛИЦА: ТОВАРЫ И ЧЕКИ",
                drive_config: "ТАБЛИЦА: НАСТРОЙКИ (CONFIG)",
                drive_images: "ПАПКА: ФОТОГРАФИИ",
                drive_invoices: "ПАПКА: НАКЛАДНЫЕ",
                drive_backups: "ПАПКА: РЕЗЕРВНЫЕ КОПИИ",
                drive_secret: "ПАПКА: СЕКРЕТНЫЕ КОПИИ",
                btn_close: "ЗАКРЫТЬ",
                drive_danger_zone: "ОПЕРАТИВНЫЕ ДЕЙСТВИЯ",
                drive_clear_btn: "ОЧИСТИТЬ БАЗУ ДАННЫХ",
                drive_restore_btn: "ВОССТАНОВИТЬ ОЧИЩЕННЫЕ ДАННЫЕ",
                drive_deep_restore_btn: "ВОССТАНОВИТЬ ИЗ БЭКАПА",
                deep_restore_title: "Выбор резервной копии",
                deep_restore_loading: "Поиск файлов в архиве...",

                // --- ОКНА ПОДТВЕРЖДЕНИЯ (SWEETALERT) ---
                // Окно очистки
                swal_clear_title: "ОЧИСТКА БАЗЫ",
                swal_clear_text: "Выберите тип очистки. Текущие данные будут временно сохранены в архив.",
                swal_clear_ops_btn: "ТОЛЬКО ОПЕРАЦИИ (Чеки)",
                swal_clear_all_btn: "ПОЛНАЯ ОЧИСТКА (Чеки, Накладные, Товары)",
                swal_catalog_warn_title: "ВНИМАНИЕ!",
                swal_catalog_warn_text: "Старые чеки будут навсегда удалены из быстрого буфера. Вы уверены?",
                swal_catalog_warn_confirm: "Да, восстановить только каталог<br>(Накладные и Товары)",

                // Окно восстановления
                swal_restore_title: "ВОССТАНОВЛЕНИЕ ДАННЫХ",
                swal_restore_text: "Выберите, какие данные нужно вернуть из временного архива.",
                swal_restore_catalog_btn: "ТОЛЬКО КАТАЛОГ (Товары и Накладные)",
                swal_restore_all_btn: "ВОССТАНОВИТЬ ВСЁ (Чеки, Накладные, Товары)",
                smart_merge_title: "Восстановление",
                smart_merge_text1: "Выбран архив от", 
                smart_merge_text2: "Вернутся только удаленные записи. Дублей не будет.",
                smart_merge_btn: "Восстановить",
                smart_merge_loading_title: "Восстановление...",
                smart_merge_loading_text: "Не закрывайте страницу.<br>Идет загрузка.",
                smart_merge_success_title: "Готово!",
                smart_merge_success_text: "Восстановлено строк:",
                pay_market_full: "МАРКЕТЫ",
                report_market_commission: "Комиссия маркета",
                report_market_logistics: "Логистика",
                report_market_net: "К выплате",
                swal_cancel: "ОТМЕНА",
                mapper_edit: "⚙️ Изменить привязку",
                mapper_attr: "Доп. атрибут",
                mapper_skip: "Пропустить",
                mapper_empty: "Пустая колонка",
                mapper_err_dup: "Ошибка: Вы назначили одну и ту же роль сразу нескольким колонкам!",
                mapper_err_missing: "Ошибка: Обязательно укажите колонки «Кол-во» и «Цена»!",
                mapper_title: "Настройка колонок",
                mapper_btn_apply: "ПРИМЕНИТЬ НАСТРОЙКИ",
                mapper_code: "Код / Артикул",
                mapper_barcode: "Штрихкод",
                mapper_brand: "Бренд",
                mapper_desc: "Наименование",
                mapper_qty: "Кол-во",
                mapper_price: "Цена",
                mapper_cbm: "Объем (CBM)",
                mapper_weight: "Вес (кг)",
                export_title: "НАСТРОЙКА ЭКСПОРТА",
                upload_template: "📄 Загрузить пустой шаблон (.xml, .xlsx)",
                generate_price: "СГЕНЕРИРОВАТЬ ПРАЙС",
                dict_title: "Выберите значение", 
                dict_placeholder: "Поиск или ввод вручную...",
                dict_total: "Всего доступно вариантов:",
                dict_search_in: "Поиск среди:",
                dict_not_found: "В справочнике не найдено.",
                dict_use_custom: "Использовать",
                dict_start_typing: "Начните вводить текст",
                dict_and_more: "...и ещё",
                dict_options: "вариантов.",
                dict_title: "Выберите значение", 
                dict_placeholder: "Поиск или ввод вручную...",
                dict_total: "Всего доступно вариантов:",
                dict_search_in: "Поиск среди:",
                dict_not_found: "В справочнике не найдено.",
                dict_use_custom: "Использовать",
                dict_start_typing: "Начните вводить текст",
                dict_and_more: "...и ещё",
                dict_options: "вариантов.",
                map_title: "СОПОСТАВЛЕНИЕ КОЛОНОК:",
                grp_db: "Поля из базы данных",
                grp_kaspi: "Справочник Каспи",
                grp_custom: "Свое значение",
                opt_skip: "-- Не выгружать --",
                opt_search: "Найти в справочнике",
                opt_manual: "Ввести вручную...",
                f_barcode: "Штрихкод / SKU",
                f_name: "Название",
                f_price: "Цена",
                f_qty: "Остаток партии",
                f_weight: "Вес, кг",
                f_volume: "Объем, м3",
                prompt_enter: "Введите значение для поля",
                download_template: "Загрузить пустой шаблон (.xml, .xlsx)"
            },
            kz: {
                btn_sale: "САТУ", btn_return: "ҚАЙТАРУ", search_placeholder: "ІЗДЕУ...",
                header_name: "АТАУЫ", header_price: "БАҒА", header_stock: "ҚАЛД",
                total_label_sale: "БАРЛЫҒЫ:", total_label_return: "ҚАЙТАРЫЛАТЫН:",
                pay_cash: "Қолма", pay_qr: "QR", pay_red: "Red", pay_card: "Карта", pay_trans: "Аудр",
                btn_cancel: "БАС ТАРТУ", btn_confirm: "РАСТАУ", btn_close: "ЖАБУ",
                btn_close_report: "ЕСЕПТІ ЖАБУ", settings_title: "ПАРАМЕТРЛЕР",
                settings_lang: "ИНТЕРФЕЙС ТІЛІ", settings_sync: "СИНХРОНДАУ", settings_system: "ЖҮЙЕ",
                btn_sync: "Чектерді жіберу", btn_update: "Кэшті жаңарту", btn_base: "База",
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
                inc_sup_unknown: "Көрсетілмеген",
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
                theme_toggle: "Тақырыпты ауыстыру (КҮН/ТҮН)", settings_theme: "КӨРІНІС",
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
                kaspi_danger: "KASPI-ДЕГІ РЕЗЕРВ:",
                kaspi_pcs: "дана. САТУҒА БОЛМАЙДЫ!",
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
                btn_help: "Пайдаланушы нұсқаулығы",
                qe_title: "ТАУАРДЫ БӨЛУ",
                qe_name: "Атауы",
                qe_name_hint: "* Экрандық пернетақта көрінбесе, сканердегі батырманы 2 рет басыңыз",
                qe_category: "Санат",
                qe_no_category: "Таңдалмаған",
                qe_new_category: "+ Жаңа санат",
                qe_barcode: "ШТРИХКОД",
                qe_barcode_placeholder: "Сканерлеңіз...",
                qe_price: "Бағасы (₸)",
                qe_current: "Ағымд",
                qe_min_stock: "Мин. қалдық",
                qe_fact: "Нақты",
                qe_save: "САҚТАУ",
                qe_close: "Жабу ✖",
                qe_receive_title: "Кірісті рәсімдеу",
                qe_supplier: "Жеткізуші",
                qe_supplier_placeholder: "Жеткізушіні таңдаңыз...",
                qe_supplier_new: "+ Жаңа жеткізуші",
                qe_supplier_name_placeholder: "Жеткізушінің аты...",
                qe_receive_qty: "Саны",
                qe_receive_price: "Сатып алу бағасы",
                qe_btn_submit: "КІРІСТІ ЕНГІЗУ",
                qe_btn_back: "АРТҚА",
                qe_btn_open_receive: "+ Жаңа топтама",
                modal_choose_supplier: "Жеткізушіні таңдаңыз",
                modal_enter_supplier: "Жеткізушіні енгізіңіз",
                modal_search_supplier: "Іздеу немесе жаңа жеткізуші...",
                modal_add_supplier: "+ Қосу",
                modal_unknown_supplier: "Белгісіз жеткізуші",
                // Плейсхолдеры и заголовки полей нового товара
                ph_barcode: "Штрихкод...",
                ph_name: "Тауар атауы...",
                ph_supplier: "Жеткізуші...",
                ph_category: "Санат...",
                nt_qty: "Саны",
                nt_price_in: "Сатып алу бағасы",
                nt_price_out: "Бөлшек баға",
                // Системные сообщения и кнопки для сохранения
                msg_barcode_req: "Атауы міндетті түрде толтырылуы тиіс!",
                msg_qty_req: "Саны нөлден үлкен болуы керек!",
                btn_saving: "⏳ САҚТАЛУДА...",
                btn_save_ready: "✅ ҚОЙМАҒА ҚАБЫЛДАУ",
                msg_server_err: "Сервер қателігі: ",
                msg_conn_err: "Сервермен байланыс қатесі: ",
                modal_income_title: "ТАУАРДЫ ҚАБЫЛДАУ",
                tab_import: "EXCEL ИМПОРТТАУ",
                tab_new: "ЖАҢА ТАУАР",
                file_select_excel: "Excel файлын таңдау үшін басыңыз",
                update_available: "Жүйенің жаңа нұсқасы қолжетімді",
                update_btn: "Кассаны жаңарту",
                auth_checking: "Қол жеткізуді тексеру...",
                auth_connecting: "Сервермен байланыс",
                auth_blocked: "Қол жеткізу тоқтатылды. Қолдау қызметіне хабарласыңыз.",
                auth_error_title: "Жүктеу қатесі:",
                auth_retry: "Қайта байқап көру",
                auth_reloading: "Қайта жүктелуде...",
                auth_opening: "Google ашылуда...",
                auth_fail: "Қате: ",
                app_subtitle: "Сауданы автоматтандыру жүйесі",
                auth_title: "Авторизация",
                auth_desc: "Кассалық терминалға қол жеткізу және деректер қорымен синхрондау үшін жұмыс Google-аккаунтыңызбен кіріңіз.",
                btn_google: "GOOGLE АРҚЫЛЫ КІРУ",
                setup_network_error_title: "Google Дискпен байланыс жоқ",
                setup_network_error_desc: "Жүйе деректер қоры файлдарын жасай алмады. Сұраным бұғатталды немесе үзілді.",
                setup_network_error_step1: "Интернет: қосылымды тексеріңіз (Wi-Fi/LTE).",
                setup_network_error_step2: "Бұғаттаушылар: AdGuard немесе антивирус қосулы болса, оны уақытша тоқтата тұрыңыз.",
                setup_network_error_step3: "Браузер: сілтеме Telegram немесе WhatsApp ішінде ашылса, Safari немесе Chrome-ға өтіңіз.",
                setup_btn_retry: "Қайталау",
                setup_license_error_title: "Орнатудан бас тартылды",
                setup_license_error_desc: "Бұл Google аккаунтына касса бұрын орнатылған.",
                setup_license_error_step1: "Жаңадан орнату үшін (сынақ мерзімі) басқа Google аккаунтын пайдаланыңыз.",
                setup_license_error_step2: "Қазіргі кассаны ұзарту үшін әкімшіге хабарласыңыз.",
                // --- ДЕРЕКҚОР (DRIVE МОДАЛКАСЫ) ---
                drive_modal_title: "ДЕРЕКҚОР (DRIVE)",
                drive_root: "ТҮБІРЛІК БУМА",
                drive_db: "КЕСТЕ: ТАУАРЛАР МЕН ЧЕКТЕР",
                drive_config: "КЕСТЕ: ПАРАМЕТРЛЕР (CONFIG)",
                drive_images: "БУМА: ФОТОСУРЕТТЕР",
                drive_invoices: "БУМА: ЖҮКҚҰЖАТТАР",
                drive_backups: "БУМА: РЕЗЕРВТІК КӨШІРМЕЛЕР",
                drive_secret: "БУМА: ҚҰПИЯ КӨШІРМЕЛЕР",
                btn_close: "ЖАБУ",
                drive_danger_zone: "ЖЕДЕЛ ӘРЕКЕТТЕР",
                drive_clear_btn: "ДЕРЕКҚОРДЫ ТАЗАЛАУ",
                drive_restore_btn: "ТАЗАЛАНҒАНДЫ ҚАЙТАРУ",
                drive_deep_restore_btn: "БЭКАПТАН ҚАЛПЫНА КЕЛТІРУ",
                deep_restore_title: "Резервтік көшірмені таңдау",
                deep_restore_loading: "Мұрағаттан файлдарды іздеу...",

                // --- РАСТАУ ТЕРЕЗЕЛЕРІ (SWEETALERT) ---
                // Тазалау терезесі
                swal_clear_title: "ДЕРЕКҚОРДЫ ТАЗАЛАУ",
                swal_clear_text: "Тазалау түрін таңдаңыз. Ағымдағы деректер уақытша мұрағатта сақталады.",
                swal_clear_ops_btn: "ТЕК ОПЕРАЦИЯЛАР (Чектер)",
                swal_clear_all_btn: "ТОЛЫҚ ТАЗАЛАУ (Чектер, Жүкқұжаттар, Тауарлар)",
                swal_catalog_warn_title: "НАЗАР АУДАРЫҢЫЗ!",
                swal_catalog_warn_text: "Ескі чектер жылдам буферден біржолата жойылады. Сенімдісіз бе?",
                swal_catalog_warn_confirm: "ИӘ, КАТАЛОГТЫ ҒАНА ҚАЛПЫНА КЕЛТІРУ<br>(Жүкқұжаттар, Тауарлар)",

                // Қалпына келтіру терезесі
                swal_restore_title: "ДЕРЕКТЕРДІ ҚАЛПЫНА КЕЛТІРУ",
                swal_restore_text: "Уақытша мұрағаттан қандай деректерді қайтару керектігін таңдаңыз.",
                swal_restore_catalog_btn: "ТЕК КАТАЛОГ (Тауарлар мен Жүкқұжаттар)",
                swal_restore_all_btn: "БАРЛЫҒЫН ҚАЛПЫНА КЕЛТІРУ<br>(Чектер, Жүкқұжаттар, Тауарлар)",
                smart_merge_title: "Қалпына келтіру",
                smart_merge_text1: "Таңдалған мұрағат:", 
                smart_merge_text2: "Тек өшірілген жазбалар қайтарылады. Дубльдер болмайды.",
                smart_merge_btn: "Бастау",
                smart_merge_loading_title: "Күте тұрыңыз...",
                smart_merge_loading_text: "Бетті жаппаңыз.<br>Қалпына келтіру жүріп жатыр.",
                smart_merge_success_title: "Дайын!",
                smart_merge_success_text: "Қалпына келтірілді (жол саны):",
                pay_market_full: "МАРКЕТТЕР",
                report_market_commission: "Маркет комиссиясы",
                report_market_logistics: "Логистика",
                report_market_net: "Төлеуге",
                swal_cancel: "БАС ТАРТУ",
                mapper_edit: "⚙️ Баптауды өзгерту",
                mapper_attr: "Қосымша атрибут",
                mapper_skip: "Өткізіп жіберу",
                mapper_empty: "Бос баған",
                mapper_err_dup: "Қате: Сіз бір рөлді бірнеше бағанға тағайындадыңыз!",
                mapper_err_missing: "Қате: «Саны» және «Бағасы» бағандарын міндетті түрде көрсетіңіз!",
                mapper_title: "Бағандарды баптау",
                mapper_btn_apply: "БАПТАУЛАРДЫ САҚТАУ",
                mapper_code: "Код / Артикул",
                mapper_barcode: "Штрихкод",
                mapper_brand: "Бренд",
                mapper_desc: "Атауы",
                mapper_qty: "Саны",
                mapper_price: "Бағасы",
                mapper_cbm: "Көлемі (CBM)",
                mapper_weight: "Салмағы (кг)",
                export_title: "ЭКСПОРТТЫ БАПТАУ",
                upload_template: "📄 Бос үлгіні жүктеу (.xml, .xlsx)",
                generate_price: "БАҒА ПАРАҒЫН ЖАСАУ",
                dict_title: "Мәнді таңдаңыз", 
                dict_placeholder: "Іздеу немесе қолмен енгізу...",
                dict_total: "Барлық қолжетімді нұсқалар:",
                dict_search_in: "Ішінен іздеу:",
                dict_not_found: "Анықтамалықтан табылмады.",
                dict_use_custom: "Қолдану",
                dict_start_typing: "Мәтінді енгізуді бастаңыз",
                dict_and_more: "...және тағы",
                dict_options: "нұсқа.",
                dict_title: "Мәнді таңдаңыз", 
                dict_placeholder: "Іздеу немесе қолмен енгізу...",
                dict_total: "Барлық қолжетімді нұсқалар:",
                dict_search_in: "Ішінен іздеу:",
                dict_not_found: "Анықтамалықтан табылмады.",
                dict_use_custom: "Қолдану",
                dict_start_typing: "Мәтінді енгізуді бастаңыз",
                dict_and_more: "...және тағы",
                dict_options: "нұсқа.",
                map_title: "БАҒАНДАРДЫ САЛЫСТЫРУ:",
                grp_db: "Дерекқор өрістері",
                grp_kaspi: "Каспи анықтамалығы",
                grp_custom: "Өз мәні",
                opt_skip: "-- Жүктемеу --",
                opt_search: "Анықтамалықтан іздеу",
                opt_manual: "Қолмен енгізу...",
                f_barcode: "Штрихкод / SKU",
                f_name: "Атауы",
                f_price: "Бағасы",
                f_qty: "Партия қалдығы",
                f_weight: "Салмағы, кг",
                f_volume: "Көлемі, м3",
                prompt_enter: "Өріс үшін мәнді енгізіңіз",
                download_template: "Бос үлгіні жүктеу (.xml, .xlsx)"
            }
        };

        // --- ГЛОБАЛЬНЫЙ АВТОПЕРЕВОДЧИК ИНТЕРФЕЙСА (Исправленный) ---

// Флаг, который усыпляет шпиона во время ручного переключения
window.isAutoTranslating = false;

// 1. Перехватываем вашу функцию applyLanguage, чтобы шпион ей не мешал
const originalApplyLanguage = typeof applyLanguage === 'function' ? applyLanguage : null;

if (originalApplyLanguage) {
    window.applyLanguage = function(lang) {
        window.isAutoTranslating = true; // Усыпляем шпиона
        window.appCurrentLang = lang;    // Запоминаем, какой язык вы выбрали
        
        originalApplyLanguage(lang);     // Запускаем ваш родной перевод
        
        // Будим шпиона через полсекунды, когда перевод точно закончился
        setTimeout(() => { window.isAutoTranslating = false; }, 500); 
    };
}

// 2. Сам шпион
const domObserver = new MutationObserver((mutations) => {
    // Если сейчас идет ручной перевод по кнопке - шпион ничего не делает
    if (window.isAutoTranslating) return;

    let hasNewElements = false;
    for (let mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            hasNewElements = true;
            break;
        }
    }

    if (hasNewElements && originalApplyLanguage) {
        clearTimeout(window.translateTimeout);
        window.translateTimeout = setTimeout(() => {
            
            // Пытаемся узнать текущий язык из нашей переменной
            let lang = window.appCurrentLang;
            
            // Если переменная пустая (например, при первом входе), смотрим на активную кнопку
            if (!lang) {
                const activeBtn = document.querySelector('.lang-btn.active');
                if (activeBtn) {
                    lang = activeBtn.id.includes('kz') ? 'kz' : 'ru';
                } else {
                    lang = 'ru'; // резервный вариант
                }
            }

            // Отключаем шпиона, переводим окно и включаем обратно
            window.isAutoTranslating = true;
            domObserver.disconnect();
            
            originalApplyLanguage(lang); 
            
            domObserver.observe(document.body, { childList: true, subtree: true });
            window.isAutoTranslating = false;
            
        }, 50); // Ждем 50 мс, чтобы окно успело полностью отрисоваться
    }
});

// Запускаем слежку при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    domObserver.observe(document.body, { childList: true, subtree: true });
});

        // 1. Читаем адресную строку
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');

        // ОФИЦИАЛЬНО ОБЪЯВЛЯЕМ ПЕРЕМЕННУЮ РАНЬШЕ ВСЕХ
        let currentLang;

        // 2. Проверяем, пришел ли язык из Notion
        if (langParam === 'kz' || langParam === 'ru') {
            currentLang = langParam; 
            localStorage.setItem('pos_lang', langParam); // Сохраняем в кэш
            
            // Опционально: стираем "?lang=kz" из адресной строки
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            // Если кассир зашел по обычной ссылке без параметра, достаем язык из памяти
            currentLang = localStorage.getItem('pos_lang') || 'ru';
        }

        // Мгновенный перевод стартового окна
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof translations === 'undefined' || !translations[currentLang]) return;
            
            document.querySelectorAll('#google-screen [data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[currentLang][key]) {
                    el.innerHTML = translations[currentLang][key];
                }
            });
        });

        // === БРОНИРОВАННЫЙ ДВИЖОК ЗАПРОСОВ (smartFetch) ===
        window.smartFetch = async function(url, payload, cacheKey, maxRetries = 3) {
            for (let i = 0; i < maxRetries; i++) {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(payload),
                        redirect: 'follow'
                    });

                    // 1. Сначала читаем ответ как обычный текст
                    const text = await response.text();
                    
                    // 2. Защита от бага Гугла: если пришел HTML (начинается с <) — выбрасываем ошибку, чтобы пойти на следующий круг
                    if (text.trim().startsWith('<')) {
                        throw new Error('Сервер вернул HTML вместо JSON');
                    }

                    // 3. Если это не HTML, парсим данные
                    const data = JSON.parse(text);

                    // 4. Успех! Тихо сохраняем в резервный кэш
                    if (data && data.success) {
                        localStorage.setItem(cacheKey, text);
                    }
                    
                    return data; 
                    
                } catch (error) {
                    console.warn(`Попытка ${i + 1} из ${maxRetries} для ${payload.action} не удалась:`, error.message);
                    
                    // Если это не последняя попытка — ждем полсекунды и пробуем снова
                    if (i < maxRetries - 1) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                }
            }

            // === ПЛАН Б: ИНТЕРНЕТ ИЛИ ГУГЛ УПАЛ, ДОСТАЕМ ИЗ КЭША ===
            console.warn(`Достаем данные для ${payload.action} из локального кэша.`);
            const cachedText = localStorage.getItem(cacheKey);
            
            if (cachedText) {
                try {
                    return JSON.parse(cachedText);
                } catch (e) {
                    console.error('Ошибка чтения кэша', e);
                }
            }
            
            return null; // Отдаем пустоту только если нет ни связи, ни кэша
        };

        // =======================================================
        // 🚚 ПАКЕТНАЯ ОТПРАВКА И ОФЛАЙН-ОЧЕРЕДЬ (QUEUE MANAGER)
        // =======================================================

        // 1. Функция добавления любой задачи в кузов (очередь)
        window.addToOfflineQueue = function(task) {
            let queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
            queue.push(task);
            localStorage.setItem('offlineQueue', JSON.stringify(queue));
            
            window.updateQueueBadge(); // Обновляем красную шестеренку на экране
            
            // Если интернет есть — пытаемся сразу отправить пакет
            if (navigator.onLine) {
                window.syncOfflineQueue();
            }
        };

        // 2. Функция визуального счетчика (красная шестеренка)
        window.updateQueueBadge = function() {
            let queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
            const badge = document.getElementById('queue-counter');
            const settingsBtn = document.getElementById('btn-settings');
            
            if (badge && settingsBtn) {
                if (queue.length > 0) {
                    badge.innerText = queue.length; 
                    badge.style.display = 'inline-block';
                    settingsBtn.style.background = 'var(--bg-danger-dim)'; 
                    settingsBtn.style.borderColor = 'var(--accent-red)'; 
                    settingsBtn.style.color = 'var(--accent-red)';
                } else {
                    badge.style.display = 'none';
                    settingsBtn.style.background = 'var(--bg-panel)'; 
                    settingsBtn.style.borderColor = 'var(--border-light)'; 
                    settingsBtn.style.color = 'var(--text-main)';
                }
            }
        };

        // 3. Главная функция отправки "грузовика" на сервер
        window.isSyncing = false; // Защита от двойной отправки (throttle)

        window.syncOfflineQueue = async function() {
            if (window.isSyncing || !navigator.onLine) return;
            
            let queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
            if (queue.length === 0) return;

            window.isSyncing = true;
            
            // ==========================================
            // Включаем пульсацию индикатора
            // ==========================================
            // const badge = document.getElementById('твой_id_индикатора'); // Укажи ID элемента!
            const badge = document.getElementById('sync-icon'); // Берем именно шестеренку!
            if (badge) badge.classList.add('syncing-active');

            const payload = {
                action: "batch_sync",
                api_key: CLIENT_API_KEY,
                tasks: queue
            };

            try {
                const res = await fetch(GATEWAY_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                });

                const text = await res.text();

                if (text.trim().startsWith('<')) {
                    throw new Error("Сервер вернул HTML вместо JSON. Гугл перегружен.");
                }

                const response = JSON.parse(text);

                if (response && response.success) {
                    localStorage.setItem('offlineQueue', '[]');
                    window.updateQueueBadge();
                }

            } catch (err) {
                console.error("Связь оборвалась в пути или таймаут:", err.message);
            } finally {
                window.isSyncing = false;
                
                // ==========================================
                // Выключаем пульсацию индикатора
                // ==========================================
                if (badge) badge.classList.remove('syncing-active');
            }
        };

        // 4. Слушатель: Автоматическая отправка при появлении интернета
        window.addEventListener('online', () => {
            console.log("🌐 Интернет появился! Запускаем пакетную синхронизацию...");
            setTimeout(window.syncOfflineQueue, 2000); // Ждем 2 секунды, чтобы сеть стабилизировалась
        });

        // 5. Запасной фоновый таймер (страховка)
        setInterval(() => {
            let queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
            if (queue.length > 0 && navigator.onLine && !window.isSyncing) {
                console.log("🕒 Сработал запасной таймер: отправляем накопившиеся данные...");
                window.syncOfflineQueue();
            }
        }, 10000);

        // Запускаем проверку при загрузке страницы
        document.addEventListener("DOMContentLoaded", () => {
            window.updateQueueBadge();
        });
        
        // Загружаем сохраненную тему
        let currentTheme = localStorage.getItem('pos_theme') || 'dark';
        if (currentTheme === 'light') { document.body.classList.add('light-theme'); }

        function toggleTheme() {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('pos_theme', isLight ? 'light' : 'dark');
        }

        window.suppliersList = JSON.parse(localStorage.getItem('suppliers_cache') || '[]');

        // Глобальный массив для хранения списка поставщиков
        window.suppliers = [];

        // === ОБНОВЛЕННАЯ ФУНКЦИЯ ПОСТАВЩИКОВ ===
        window.loadSuppliers = async function() {
            if (typeof GATEWAY_URL === 'undefined' || typeof CLIENT_API_KEY === 'undefined') return;
            
            const payload = { action: 'getSuppliers', api_key: CLIENT_API_KEY };
            
            // Вызываем наше ядро (передаем URL, пакет данных и имя ящика для кэша)
            const data = await window.smartFetch(GATEWAY_URL, payload, 'suppliersCache');
            
            if (data && data.success && Array.isArray(data.suppliers)) {
                window.suppliers = data.suppliers;
            }
        };

        // Запускаем при инициализации
        window.loadSuppliers();

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

// ==========================================
// ГЛОБАЛЬНАЯ ЛОГИКА NUMPAD ДЛЯ QUICK EDIT
// ==========================================
window.currentQeInput = null;

// 1. Активация поля и показ Numpad
// Добавляем глобальный флаг выделения
window.qeNeedsClear = false;

window.setQeActive = function(el, event) {
    // 1. Проверяем, открыт ли блок прихода
    const receiveBlock = document.getElementById('qe-receive-block');
    const isReceiveMode = receiveBlock && window.getComputedStyle(receiveBlock).display !== 'none';
    if (isReceiveMode) return;

    if (event) event.stopPropagation();

    // 2. --- ПРАВИЛЬНАЯ ПРОВЕРКА НА ПК ---
    // Вызываем кастомную клаву ТОЛЬКО на устройствах с тачскрином
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const numpad = document.getElementById('custom-numpad');
    if (numpad && isTouchDevice) {
        numpad.style.display = 'grid';
    }

    // 3. --- ЭТО ДОЛЖНО РАБОТАТЬ ВЕЗДЕ (И НА ПК, И НА МОБИЛКЕ) ---
    // Убираем подсветку со старых полей
    document.querySelectorAll('.qe-active-input').forEach(input => {
        input.classList.remove('qe-active-input');
    });
    
    // Подсвечиваем текущее поле (даем зеленую рамку)
    window.currentQeInput = el;
    el.classList.add('qe-active-input');

    // Нативное выделение текста синим цветом
    setTimeout(() => {
        el.setSelectionRange(0, el.value.length);
    }, 10);

    // Флаг очистки: теперь он сработает и на ПК!
    window.qeNeedsClear = true;
};

// 2. Скрытие Numpad при клике в пустоту
window.closeQeNumpad = function() {
    const numpad = document.getElementById('custom-numpad');
    if (numpad) numpad.style.display = 'none'; // Прячем клаву
    
    if (window.currentQeInput) {
        window.currentQeInput.classList.remove('qe-active-input');
        window.currentQeInput = null;
    }
};

// 3. Обработка нажатий на цифры (с тысячными разделителями)
window.qeNumpad = function(val, event) {
    if (event) event.stopPropagation();
    if (!window.currentQeInput) return;
    
    // 1. Берем текущее значение и сразу убираем пробелы, чтобы работать с чистыми цифрами
    let currentVal = window.currentQeInput.value.toString().replace(/\s/g, '');
    
    // 2. Если поле только что выбрали и нажали цифру — стираем старое значение
    if (window.qeNeedsClear && val !== 'C' && val !== 'DEL') {
        currentVal = '';
    }
    // Сбрасываем флаг после любого действия на клавиатуре
    window.qeNeedsClear = false;
    
    // 3. Убираем ведущий ноль при вводе
    if (currentVal === '0' && val !== 'C' && val !== 'DEL') {
        currentVal = '';
    }
    
    // 4. Обработка нажатий кнопок
    if (val === 'C') {
        currentVal = '';
    } else if (val === 'DEL') {
        currentVal = currentVal.slice(0, -1);
    } else {
        currentVal = currentVal + val;
    }

    // 5. Форматируем обратно с пробелами по стандартам и выводим
    if (currentVal === '') {
        window.currentQeInput.value = ''; // Если удалили всё, оставляем пустое поле
    } else {
        window.currentQeInput.value = Number(currentVal).toLocaleString('ru-RU').replace(/,/g, ' ');
    }
};

// 4. Умная проверка текстового поля
window.checkScannerStatus = function(el) {
    // Закрываем Numpad, если он был открыт
    window.closeQeNumpad(); 
    
    // Проверяем, запущен ли сканер (предполагаем, что у вас есть переменная или элемент, указывающий на это)
    const scannerContainer = document.getElementById('quagga-scanner-container');
    const isScannerActive = scannerContainer && scannerContainer.style.display !== 'none';

    if (isScannerActive) {
        // Делаем поле недоступным для ввода, чтобы не вылезла системная клава
        el.blur();
        alert("Внимание: Активен режим сканирования.\nДважды нажмите кнопку на Bluetooth-сканере для вызова клавиатуры или закройте сканер.");
    }
};

// Вспомогательная функция отрисовки списка поставщиков
window.renderSupplierList = function() {
    const container = document.getElementById('qe-supplier-dropdown');
    if (!container) return;
    
    const suppliers = window.suppliersList || [];
    
    // Динамически получаем перевод из словаря, используя глобальные переменные языка
    const newBtnText = translations[currentLang].qe_supplier_new || "+ Новый поставщик";
    
    // Формируем вертикальный список поставщиков (display: block и рамка снизу)
    let html = suppliers.map(s => `
        <div onclick="window.selectSupplier('${s}')" style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; display: block; text-align: left;">
            ${s}
        </div>
    `).join('');
    
    // Добавляем кнопку "+ Новый поставщик" в конец списка
    html += `
        <div onclick="window.selectSupplier('NEW')" style="padding: 12px; color: #ff9800; cursor: pointer; display: block; text-align: left; font-weight: bold;">
            ${newBtnText}
        </div>
    `;
    
    container.innerHTML = html;
};

window.openQuickEditModal = function(id) {
    function formatNumberSpaces(num) {
    if (num === null || num === undefined || num === '') return '';
    return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ');
}
    const item = db.find(i => String(i.id) === String(id));
    if (!item) return;

    // Удаляем старое окно, если есть
    const existingModal = document.getElementById('quickEditModal');
    if (existingModal) existingModal.remove();

    // 1. ОПРЕДЕЛЕНИЕ ЯЗЫКА (из localStorage или переменных)
    const savedLang = localStorage.getItem('pos_lang');
    const lang = savedLang || window.currentLang || (typeof currentLang !== 'undefined' ? currentLang : 'ru');
    
    // Получаем словарь (используем 'kz' или 'ru')
    const dict = (typeof translations !== 'undefined' && translations[lang]) 
        ? translations[lang] 
        : (typeof translations !== 'undefined' && translations['ru'] ? translations['ru'] : {});
    
    const t = (key) => dict[key] || key;

    // 2. ПОДГОТОВКА ДАННЫХ (с защитой от кавычек)
    const uniqueCats = [...new Set(db.map(i => i.category).filter(Boolean))];
    
    // Функция, которая превращает кавычки в безопасный код, чтобы не сломать HTML
    const escapeHtml = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    let currentCatText = (!item.category || item.category === '0') ? t('qe_no_category') : item.category;
    let currentCatValue = (!item.category || item.category === '0') ? '0' : item.category;

    // Собираем пункты списка
    let customDropdownHtml = `<div data-val="0" data-text="${escapeHtml(t('qe_no_category'))}" onclick="window.handleQeCatClick(this)" style="padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(128,128,128,0.2);">${escapeHtml(t('qe_no_category'))}</div>`;
    
    uniqueCats.forEach(cat => {
        if (cat !== '0' && cat !== 'Без категории') {
            const safeCat = escapeHtml(cat);
            customDropdownHtml += `<div data-val="${safeCat}" data-text="${safeCat}" onclick="window.handleQeCatClick(this)" style="padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(128,128,128,0.2);">${safeCat}</div>`;
        }
    });
    
    customDropdownHtml += `<div data-val="new" data-text="${escapeHtml(t('qe_new_category'))}" onclick="window.handleQeCatClick(this)" style="padding: 10px; cursor: pointer; color: #4caf50; font-weight: bold;">${escapeHtml(t('qe_new_category'))}</div>`;

    const minStockVal = item.min_stock !== undefined ? item.min_stock : 1;
    const currentStock = Number(item.stock) || 0;
    const formattedPrice = Number(item.price || 0).toLocaleString('ru-RU');

    // Собираем пункты списка поставщиков
    let supplierDropdownHtml = '';
    const supplierList = (Array.isArray(window.suppliers) && window.suppliers.length > 0) ? window.suppliers : [];

    supplierList.forEach(sup => {
        const safeSup = escapeHtml(sup);
        supplierDropdownHtml += `<div data-val="${safeSup}" data-text="${safeSup}" onclick="window.handleQeSupplierClick(this)" style="padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(128,128,128,0.2);">${safeSup}</div>`;
    });
    supplierDropdownHtml += `<div data-val="new" data-text="${escapeHtml(t('qe_supplier_new') || 'Новый поставщик')}" onclick="window.handleQeSupplierClick(this)" style="padding: 10px; cursor: pointer; color: #ff9800; font-weight: bold;">${escapeHtml(t('qe_supplier_new') || 'Новый поставщик')}</div>`;

    // 3. HTML И СТИЛИ С ПОДДЕРЖКОЙ СВЕТЛОЙ ТЕМЫ
    const modalHtml = `
        <div id="quickEditModal" onclick="if(event.target.id === 'quickEditModal') window.closeQeNumpad()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; justify-content: center; align-items: flex-start; padding-top: 3vh; font-family: 'Roboto', sans-serif;">
            
            <style>
                .no-spinners::-webkit-outer-spin-button,
                .no-spinners::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                .no-spinners { -moz-appearance: textfield; }
                
                /* Класс для затемнения верхней части */
                .form-disabled { opacity: 0.3; pointer-events: none; transition: 0.3s; filter: grayscale(100%); }
                
                /* --- ТЁМНАЯ ТЕМА (ПО УМОЛЧАНИЮ) --- */
                #quickEditModal .qe-container { background: #1e1e1e; color: #ffffff; border: 1px solid #333333; }
                #quickEditModal input, #quickEditModal select { background: #000000; color: #ffffff; border: 1px solid #333333; border-radius: 4px; padding: 8px; font-size: 15px; box-sizing: border-box; outline: none; }
                #quickEditModal input:focus, #quickEditModal select:focus { border-color: #2e7d32; }
                #quickEditModal label { font-size: 10px; color: #888888; text-transform: uppercase; margin-bottom: 2px; display: block; letter-spacing: 0.5px; }
                .np-btn { background: #2a2a2a; color: #ffffff; border: 1px solid #444444; border-radius: 6px; height: 45px; font-size: 20px; font-weight: bold; cursor: pointer; user-select: none; }
                .np-btn-action { background: #333333; color: #ff9800; }
                .qe-active-input { border-color: #2e7d32 !important; box-shadow: 0 0 8px rgba(46, 125, 50, 0.4); }
                /* Стили кастомного выпадающего списка (Тёмная) */
                .custom-dropdown-trigger { background: #000000; color: #ffffff; border: 1px solid #333333; }
                .custom-dropdown-list { background: #1e1e1e; border: 1px solid #333333; }

                /* --- СВЕТЛАЯ ТЕМА (АВТОМАТИЧЕСКИ ПРИ .light-theme НА BODY) --- */
                body.light-theme #quickEditModal .qe-container { background: #ffffff !important; color: #18181b !important; border-color: #e4e4e7 !important; }
                body.light-theme #quickEditModal input, 
                body.light-theme #quickEditModal select { background: #f4f4f5 !important; color: #000000 !important; border-color: #d4d4d8 !important; }
                body.light-theme #quickEditModal label { color: #71717a !important; }
                body.light-theme #quickEditModal .np-btn { background: #e4e4e7 !important; color: #18181b !important; border-color: #d4d4d8 !important; }
                body.light-theme #quickEditModal .np-btn-action { background: #d4d4d8 !important; color: #e65100 !important; }
                /* Стили кастомного выпадающего списка (Светлая) */
                body.light-theme #quickEditModal .custom-dropdown-trigger { background: #f4f4f5 !important; color: #000000 !important; border-color: #d4d4d8 !important; }
                body.light-theme #quickEditModal .custom-dropdown-list { background: #ffffff !important; border-color: #d4d4d8 !important; }
            </style>

            <div class="qe-container" style="padding: 15px; border-radius: 8px; width: 90%; max-width: 350px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                
                <!-- === НАЧАЛО ОБЕРТКИ (qe-top-section) === -->
                <div id="qe-top-section" style="transition: opacity 0.3s;">
                    <h3 data-i18n="qe_title" style="margin-top: 0; margin-bottom: 12px; font-size: 15px; text-align: center; text-transform: uppercase; border-bottom: 1px solid rgba(128,128,128,0.2); padding-bottom: 8px; letter-spacing: 1px;">${t('qe_title')}</h3>
                    
                    <div style="margin-bottom: 10px;">
                        <label data-i18n="qe_name">${t('qe_name')}</label>
                        <input type="text" id="qe-name" value="${escapeHtml(item.name || '')}" style="width: 100%;">
                        <div data-i18n="qe_name_hint" style="font-size: 9px; color: #2e7d32; margin-top: 3px; letter-spacing: 0.3px;">${t('qe_name_hint')}</div>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label data-i18n="qe_category">${t('qe_category')}</label>
                        
                        <!-- КАСТОМНЫЙ ВЫПАДАЮЩИЙ СПИСОК -->
                        <div style="position: relative; width: 100%;">
                            <input type="hidden" id="qe-category" value="${escapeHtml(currentCatValue)}">
                            <div id="qe-category-trigger" class="custom-dropdown-trigger" onclick="window.toggleCustomDropdown()" style="width: 100%; border-radius: 4px; padding: 8px; font-size: 15px; box-sizing: border-box; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                                <span id="qe-category-display" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(currentCatText)}</span>
                                <span id="qe-category-arrow" style="font-size: 12px; display: inline-block; transition: transform 0.2s ease;">▼</span>
                            </div>
                            <div id="qe-category-dropdown" class="custom-dropdown-list" style="display: none; position: absolute; top: 100%; left: 0; width: 100%; max-height: 45vh; overflow-y: auto; border-radius: 4px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5); margin-top: 4px;">
                                ${customDropdownHtml}
                            </div>
                            <div id="qe-new-category-wrapper" style="display: none; width: 100%; gap: 5px;">
                                <input type="text" id="qe-new-category" placeholder="Введите название..." style="flex: 1; width: 100%;">
                                <button type="button" id="qe-cancel-new-cat" onclick="window.cancelNewCategory()" style="background: #c62828; color: #fff; border: none; border-radius: 4px; padding: 0 12px; font-weight: bold; cursor: pointer;">✖</button>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <label data-i18n="qe_barcode" style="display: block; font-size: 10px; margin-bottom: 2px;">${t('qe_barcode')}</label>
                        <div style="display: flex; margin-bottom: 8px;">
                            <input type="text" id="qe-barcode" value="${item.barcode || ''}" placeholder="${t('qe_barcode_placeholder')}" inputmode="numeric" maxlength="13" onfocus="this.select()" onclick="this.select()" oninput="window.formatNtInput(this)" style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0; border-right: none; background: var(--bg-card); border-top: 1px solid var(--border-main); border-bottom: 1px solid var(--border-main); border-left: 1px solid var(--border-main); color: var(--text-main); padding: 12px; font-size: 15px; box-sizing: border-box; transition: all 0.2s ease;">
                            <button type="button" onclick="window.startQuaggaScanner()" style="padding: 0 15px; border: 1px solid var(--border-main); background: var(--bg-overlay); border-top-right-radius: 4px; border-bottom-right-radius: 4px; color: var(--text-main); font-size: 18px; cursor: pointer; transition: all 0.2s ease;">📷</button>
                        </div>
                        
                        <div id="quagga-scanner-container" style="display: none; position: relative; width: 100%; height: 180px; background: #000; border-radius: 4px; overflow: hidden; border: 1px solid #444;">
                            <div id="quagga-video-target" style="width: 100%; height: 100%;"></div>
                            <div style="position: absolute; top: 50%; left: 10%; width: 80%; height: 2px; background: rgba(255, 0, 0, 0.7); box-shadow: 0 0 8px rgba(255, 0, 0, 1); z-index: 5; transform: translateY(-50%); pointer-events: none;"></div>
                            <button type="button" data-i18n="qe_close" onclick="window.stopQuaggaScanner()" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); color: #fff; border: 1px solid #555; border-radius: 4px; padding: 4px 10px; font-size: 12px; z-index: 10;">${t('qe_close')}</button>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px; margin-bottom: 15px;">
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2px;">
                                <label data-i18n="qe_price" style="margin-bottom: 0;">${t('qe_price')}</label>
                                <span style="font-size: 10px; color: #2e7d32; font-weight: bold;"><span data-i18n="qe_current">${t('qe_current')}</span>: ${formattedPrice}</span>
                        </div>
                            <!-- Добавили formatNumberSpaces сюда -->
                            <input type="text" class="no-spinners" id="qe-price" value="${formattedPrice}" inputmode="none" onclick="window.setQeActive(this, event)" style="width: 100%;">
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2px;">
                                <label data-i18n="qe_min_stock" style="margin-bottom: 0;">${t('qe_min_stock')}</label>
                                <span style="font-size: 10px; color: #2e7d32; font-weight: bold;"><span data-i18n="qe_fact">${t('qe_fact')}</span>: ${currentStock}</span>
                            </div>
                            <!-- И добавили formatNumberSpaces сюда -->
                            <input type="text" class="no-spinners" id="qe-minstock" value="${formatNumberSpaces(minStockVal)}" inputmode="none" onclick="window.setQeActive(this, event)" style="width: 100%;">
                        </div>
                    </div>
                </div>
                <!-- === КОНЕЦ ОБЕРТКИ (qe-top-section) === -->

                <!-- === НОВЫЙ БЛОК: ОФОРМЛЕНИЕ ПРИХОДА === -->
            <div id="qe-receive-block" style="display: none; padding: 12px; background: rgba(46,125,50,0.05); border: 1px solid #2e7d32; border-radius: 6px; margin-bottom: 15px;">
                <h4 data-i18n="qe_receive_title" style="margin: 0 0 10px 0; font-size: 12px; text-align: center; color: #4CAF50; text-transform: uppercase;">${t('qe_receive_title')}</h4>
                
                <!-- ПОСТАВЩИК -->
                <label data-i18n="qe_supplier" style="font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 2px; display: block;">${t('qe_supplier')}</label>
                <div style="position: relative; width: 100%; margin-bottom: 10px;">
                    <input type="text" id="qe-supplier-input" placeholder="Выберите поставщика" readonly onclick="window.openFullscreenSupplier()" style="width: 100%; background: #000; color: #fff; border: 1px solid #333; padding: 8px; border-radius: 4px; font-size: 15px; box-sizing: border-box; cursor: pointer;">
                </div>

                <!-- ПОЛЯ КОЛИЧЕСТВА И ЦЕНЫ -->
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <label data-i18n="qe_receive_qty" style="font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 2px; display: block;">${t('qe_receive_qty')}</label>
                        <input type="text" id="qe-receive-qty" value="1" inputmode="none" onclick="window.activateReceiveField(this, event)" style="width: 100%; text-align: center; background: #000; color: #fff; border: 1px solid #333; padding: 8px; border-radius: 4px;">
                    </div>
                    <div style="flex: 1;">
                        <label data-i18n="qe_receive_price" style="font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 2px; display: block;">${t('qe_receive_price')}</label>
                        <input type="text" id="qe-receive-price" value="0" inputmode="none" onclick="window.activateReceiveField(this, event)" style="width: 100%; text-align: center; background: #000; color: #fff; border: 1px solid #333; padding: 8px; border-radius: 4px;">
                    </div>
                </div>

                <!-- ВНУТРЕННИЙ NUMPAD ДЛЯ ПРИХОДА -->
                <div id="receive-numpad" style="display: none; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 15px;">
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('1', event)">1</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('2', event)">2</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('3', event)">3</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('4', event)">4</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('5', event)">5</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('6', event)">6</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('7', event)">7</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('8', event)">8</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('9', event)">9</button>
                    <button type="button" class="np-btn np-btn-action" style="height: 40px;" onclick="window.receiveNumpad('C', event)">C</button>
                    <button type="button" class="np-btn" style="height: 40px;" onclick="window.receiveNumpad('0', event)">0</button>
                    <button type="button" class="np-btn np-btn-action" style="height: 40px;" onclick="window.receiveNumpad('DEL', event)">⌫</button>
                </div>

                <!-- КНОПКИ ПРИХОДА -->
                <div style="display: flex; gap: 8px;">
                    <button type="button" id="btn-submit-receive" data-i18n="qe_btn_submit" style="flex: 2; padding: 10px; border: none; background: #2e7d32; color: #fff; border-radius: 4px; font-weight: bold; cursor: pointer;">${t('qe_btn_submit')}</button>
                    <button type="button" id="btn-cancel-receive" data-i18n="qe_btn_back" style="flex: 1; padding: 10px; border: none; background: #c62828; color: #fff; border-radius: 4px; font-weight: bold; cursor: pointer;">${t('qe_btn_back')}</button>
                </div>
            </div>
            <!-- === КОНЕЦ БЛОКА ПРИХОДА === -->

                        <!-- ОСНОВНАЯ КЛАВИАТУРА (ДЛЯ ЦЕНЫ И ОСТАТКА) -->
                <div id="custom-numpad" style="display: none; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 15px;">
                    <button type="button" class="np-btn" onclick="window.qeNumpad('1', event)">1</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('2', event)">2</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('3', event)">3</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('4', event)">4</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('5', event)">5</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('6', event)">6</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('7', event)">7</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('8', event)">8</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('9', event)">9</button>
                    <button type="button" class="np-btn np-btn-action" onclick="window.qeNumpad('C', event)">C</button>
                    <button type="button" class="np-btn" onclick="window.qeNumpad('0', event)">0</button>
                    <button type="button" class="np-btn np-btn-action" onclick="window.qeNumpad('DEL', event)">⌫</button>
                </div>

                        <!-- НИЖНИЕ КНОПКИ (Сохранить, ПРИХОД, Закрыть) -->
                <div id="qe-bottom-buttons" style="display: flex; gap: 8px;">
                    <button type="button" data-i18n="qe_save" onclick="window.saveQuickEdit('${item.id}')" style="flex: 2; padding: 10px; border: none; background: #2e7d32; color: #fff; border-radius: 4px; font-weight: bold; font-size: 14px; text-transform: uppercase; cursor: pointer;">${t('qe_save')}</button>
                    
                    <!-- Кнопка открытия прихода -->
                    <button type="button" id="btn-open-receive" data-i18n="qe_btn_open_receive" style="flex: 1; padding: 12px; border: none; background: #ff9800; color: #fff; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer;">${t('qe_btn_open_receive')}</button>
                    
                    <button type="button" onclick="document.getElementById('quickEditModal').remove()" style="flex: 1; padding: 10px; border: none; background: #c62828; color: #fff; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer;">✖</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Сбрасываем состояния прихода при каждом открытии окна
    const receiveBlock = document.getElementById('qe-receive-block');
    const numpad = document.getElementById('custom-numpad'); // Берем из твоего меморандума
    const topSection = document.getElementById('qe-top-section');

    if (receiveBlock) receiveBlock.style.display = 'none';
    if (numpad) numpad.style.display = 'none';
    if (topSection) topSection.classList.remove('form-disabled');
    window.activeQeFieldId = null; // Сбрасываем глобальный стейт фокуса

    // --- ПРИНУДИТЕЛЬНЫЙ ПЕРЕВОД ПЛЕЙСХОЛДЕРА ПРИ ОТКРЫТИИ ОКНА ---
    try {
        const mainSupplierInput = document.getElementById('qe-supplier-input');
        if (mainSupplierInput) {
            mainSupplierInput.placeholder = translations[currentLang].modal_choose_supplier;
        }
    } catch(e) {}
    // 📌 НАШ КОД: Запускаем проверку цвета штрихкода при открытии
    window.formatNtInput(document.getElementById('qe-barcode'));
};

// Открывает/закрывает наш кастомный список
window.toggleCustomDropdown = function() {
    // === ФИКС: Прячем цифровую клавиатуру при клике на Категорию ===
const numpad = document.getElementById('custom-numpad');
if (numpad) {
    numpad.style.display = 'none';
}
// ================================================================
    const dropdown = document.getElementById('qe-category-dropdown');
    const arrow = document.getElementById('qe-category-arrow');
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
};

// Обработчик клика ТОЛЬКО для модального окна быстрых правок
window.handleQeCatClick = function(element) {
    const value = element.getAttribute('data-val');
    const text = element.getAttribute('data-text');
    
    const dropdown = document.getElementById('qe-category-dropdown');
    const trigger = document.getElementById('qe-category-trigger');
    const display = document.getElementById('qe-category-display');
    const hiddenInput = document.getElementById('qe-category');
    const newCatWrapper = document.getElementById('qe-new-category-wrapper');
    const newCatInput = document.getElementById('qe-new-category');
    
    if (value === 'new') {
        if (trigger) trigger.style.display = 'none';
        if (dropdown) dropdown.style.display = 'none';
        
        if (newCatWrapper) newCatWrapper.style.display = 'flex';
        if (hiddenInput) hiddenInput.value = 'new';
        
        if (newCatInput) newCatInput.focus();
    } else {
        if (display) display.innerText = text;
        if (hiddenInput) hiddenInput.value = value;
        if (dropdown) dropdown.style.display = 'none';
    }
    // ДОБАВЬ ЭТОТ КОД ДЛЯ СБРОСА СТРЕЛКИ:
    const arrow = document.getElementById('qe-category-arrow');
    if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
    }
};

// Кнопка отмены "крестик" для новой категории
window.cancelNewCategory = function() {
    const wrapper = document.getElementById('qe-new-category-wrapper');
    const trigger = document.getElementById('qe-category-trigger');
    const input = document.getElementById('qe-new-category');
    const display = document.getElementById('qe-category-display');
    const hiddenInput = document.getElementById('qe-category');
    const defaultTextElement = document.querySelector('[data-val="0"]');
    
    if (wrapper) wrapper.style.display = 'none';
    if (trigger) trigger.style.display = 'flex';
    if (input) input.value = '';
    if (hiddenInput) hiddenInput.value = '0';
    
    if (display && defaultTextElement) {
        display.innerText = defaultTextElement.getAttribute('data-text');
    }    
};

// ==========================================
// ИСПРАВЛЕННЫЙ ВИДЕО-СКАНЕР QUAGGA2
// ==========================================

window.startQuaggaScanner = function() {
    const container = document.getElementById('quagga-scanner-container');
    const target = document.getElementById('quagga-video-target');
    
    if (!container || !target) return;
    
    if (container.style.display === 'block') {
        window.stopQuaggaScanner();
        return;
    }
    
    container.style.display = 'block';

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: target,
            constraints: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: "environment" // Задняя камера
            }
        },
        locator: {
        patchSize: "medium",
        halfSample: true,
        area: { // Перенесли сюда
            top: "40%",
            bottom: "40%",
            left: "0%",
            right: "0%"
        }
        },
        numOfWorkers: navigator.hardwareConcurrency ? Math.min(navigator.hardwareConcurrency, 4) : 2,
        decoder: {
            // Возвращаем все основные кассовые форматы
            readers: [
                "ean_reader", 
                "ean_8_reader", 
                "upc_reader", 
                "upc_e_reader", 
                "code_128_reader"
            ] 
        },
        locate: true
    }, function(err) {
        if (err) {
            console.error("Ошибка Quagga:", err);
            alert("Ошибка доступа к камере: " + err.message);
            window.stopQuaggaScanner();
            return;
        }
        
        const videoEl = target.querySelector('video');
        if (videoEl) {
            videoEl.style.width = '100%';
            videoEl.style.height = '100%';
            videoEl.style.objectFit = 'cover';
            videoEl.setAttribute('playsinline', 'true');
        }
        
        Quagga.start();
    });

    Quagga.onDetected(window.handleQuaggaDetection);
};

window.handleQuaggaDetection = function(result) {
    if (!result || !result.codeResult || !result.codeResult.code) return;
    
    const code = result.codeResult.code;

    // Простая проверка: если код не пустой и длиннее 3 символов
    if (code && code.length >= 3) {
        const barcodeInput = document.getElementById('qe-barcode');
        if (barcodeInput) {
            barcodeInput.value = code;
            
            // Выключаем камеру и сбрасываем фокус
            window.stopQuaggaScanner();
            barcodeInput.blur();
        }
    }
};

window.stopQuaggaScanner = function() {
    const container = document.getElementById('quagga-scanner-container');
    const target = document.getElementById('quagga-video-target');
    
    try {
        Quagga.stop();
        Quagga.offDetected(window.handleQuaggaDetection);
    } catch (e) {
        // Игнорируем ошибки при повторной остановке
    }
    
    if (target) target.innerHTML = '';
    if (container) container.style.display = 'none';
};

// Переменные для защиты от случайных ложных считываний
let quaggaScanCount = 0;
let lastScannedCode = "";

// 2. Обработка момента, когда камера увидела штрихкод
window.handleQuaggaDetection = function(result) {
    if (!result || !result.codeResult || !result.codeResult.code) return;
    
    const code = result.codeResult.code;

    // Ждем 2 одинаковых подтверждения подряд для исключения ошибок
    if (code === lastScannedCode) {
        quaggaScanCount++;
    } else {
        quaggaScanCount = 1;
        lastScannedCode = code;
    }

    if (quaggaScanCount >= 3) {
        const barcodeInput = document.getElementById('qe-barcode');
        if (barcodeInput) {
            barcodeInput.value = code;
            window.stopQuaggaScanner();
            
            // Просто сбрасываем фокус, не пытаясь программно открыть "Цену"
            barcodeInput.blur();
        }
    }
};

// 3. Полная остановка и закрытие сканера
window.stopQuaggaScanner = function() {
    const container = document.getElementById('quagga-scanner-container');
    const target = document.getElementById('quagga-video-target');
    
    try {
        Quagga.stop();
        Quagga.offDetected(window.handleQuaggaDetection);
    } catch (e) {
        // Сканер уже был остановлен
    }
    
    if (target) target.innerHTML = '';
    if (container) container.style.display = 'none';
    
    quaggaScanCount = 0;
    lastScannedCode = "";
};

// Вспомогательная функция: сжимает гигантское фото до 1200px и подготавливает для распознавания
function processImageForScan(file) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Ограничиваем максимальную ширину до 1200px (идеально для алгоритмов сканирования)
            const MAX_WIDTH = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            // Рисуем сглаженное изображение
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
        };
        img.src = URL.createObjectURL(file);
    });
}

// 🎯 ФУНКЦИЯ МОМЕНТАЛЬНОГО СНИМКА И РАСПОЗНАВАНИЯ
window.captureAndDecode = async function() {
    const videoEl = document.querySelector('#qe-reader-view video');
    const barcodeInput = document.getElementById('qe-barcode');
    
    if (!videoEl) {
        alert("Камера еще не готова.");
        return;
    }

    // 1. Захватываем текущий кадр с видео на виртуальный холст
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth || 640;
    canvas.height = videoEl.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    // 2. Обрабатываем снимок
    canvas.toBlob(async (blob) => {
        if (!blob) return;

        try {
            let code = null;

            // ШАГ А: Пробуем молниеносный нативный движок браузера (Chrome / Safari iOS 17+)
            if ('BarcodeDetector' in window) {
                try {
                    const detector = new BarcodeDetector({
                        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code']
                    });
                    const bitmap = await createImageBitmap(blob);
                    const barcodes = await detector.detect(bitmap);
                    if (barcodes.length > 0) {
                        code = barcodes[0].rawValue;
                    }
                } catch (e) {
                    console.log("Fallback to JS decoder", e);
                }
            }

            // ШАГ Б: Резервное распознавание со снимка через библиотеку
            if (!code && html5QrCode) {
                const file = new File([blob], "snapshot.png", { type: "image/png" });
                code = await html5QrCode.scanFile(file, false);
            }

            if (code) {
                barcodeInput.value = code;
                window.stopScanner();
            } else {
                alert("Штрихкод на снимке не распознан. Поправьте фокус и нажмите еще раз.");
            }
        } catch (err) {
            alert("Не удалось считать код со снимка. Попробуйте еще раз.");
        }
    }, "image/png");
};

// Функция закрытия сканера
window.stopScanner = function() {
    const scannerDiv = document.getElementById('scanner-container');
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            if (scannerDiv) {
                scannerDiv.style.display = 'none';
                scannerDiv.innerHTML = '';
            }
        }).catch(() => {
            if (scannerDiv) {
                scannerDiv.style.display = 'none';
                scannerDiv.innerHTML = '';
            }
        });
    } else if (scannerDiv) {
        scannerDiv.style.display = 'none';
        scannerDiv.innerHTML = '';
    }
};

// Функция аккуратного закрытия камеры
window.stopScanner = function() {
    const scannerDiv = document.getElementById('scanner-container');
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            if (scannerDiv) scannerDiv.style.display = 'none';
        }).catch(err => console.error(err));
    } else if (scannerDiv) {
        scannerDiv.style.display = 'none';
    }
};

// Функция-помощник для безопасного считывания данных (чтобы обходить скрытые окна-дубликаты)
function getLatestValue(id) {
    const elements = document.querySelectorAll('#' + id);
    if (elements.length === 0) return '';
    // Берем значение из последнего созданного элемента (самого актуального окна)
    return elements[elements.length - 1].value || '';
}

// Функция для защиты от фантомных окон на iOS и адаптивной верстке
window.getLatestValue = function(idPrefix) {
    const elements = document.querySelectorAll(`[id="${idPrefix}"]`);
    for (let el of elements) {
        // Проверяем, видимо ли поле на экране
        if (el.offsetParent !== null) { 
            return el.value || '';
        }
    }
    // Если видимого нет, пытаемся взять хотя бы из первого попавшегося
    return elements.length > 0 ? (elements[0].value || '') : '';
};

window.saveQuickEdit = function(id) {
    const item = db.find(i => String(i.id) === String(id));
    if (!item) {
        console.error("Ошибка: Товар не найден!");
        return;
    }
    
    // Адаптивная проверка режима (Приемка или Редактирование)
    const receiveBlocks = document.querySelectorAll('#qe-receive-block');
    let isReceiveMode = false;
    receiveBlocks.forEach(b => { if (b.offsetParent !== null) isReceiveMode = true; });

    let payload = {};

    if (isReceiveMode) {
        // ==========================================
        // ВЕТКА А: ПРИХОД (с защитой полей для iOS)
        // ==========================================
        const rawQty = window.getLatestValue('qe-receive-qty');
        const rawPrice = window.getLatestValue('qe-receive-price');
        const rawSupplier = window.getLatestValue('qe-supplier-input');
        
        const qty = parseInt(String(rawQty).replace(/\D/g, ''), 10) || 0;
        const price = parseInt(String(rawPrice).replace(/\D/g, ''), 10) || 0;
        
        let supplier = (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].modal_unknown_supplier) ? translations[currentLang].modal_unknown_supplier : "Неизвестный поставщик";
        
        if (rawSupplier && rawSupplier.trim() !== '') {
            supplier = rawSupplier.trim(); 
        }

        if (qty <= 0) {
            alert("Пожалуйста, заполните количество корректно.");
            return; 
        }

        const requestFingerprint = "income_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        
        payload = {
            action: "income",
            api_key: CLIENT_API_KEY, 
            currency: "KZT", 
            vat: 0, 
            fingerprint: requestFingerprint,
            data: [{
                doc_no: "AUTO-" + Date.now(), 
                supplier: supplier,
                item_id: String(item.id),
                item_name: item.name,
                qty: qty,
                cost: price, 
                // === ЖЕСТКИЙ ФИЛЬТР КАТЕГОРИИ ИЗ СТАРОЙ БАЗЫ ===
                category: (!item.category || String(item.category).trim() === '0' || String(item.category).trim().toLowerCase() === 'не выбрано') ? "Без категории" : item.category,
                // ===============================================
                cbm: 0,
                weight: 0
            }]
        };

        item.stock = (parseFloat(item.stock) || 0) + qty; 

    } else {
        // ==========================================
        // ВЕТКА Б: РЕДАКТИРОВАНИЕ (с защитой полей)
        // ==========================================
        const rawName = window.getLatestValue('qe-name');
        const rawPrice = window.getLatestValue('qe-price');
        const rawCategory = window.getLatestValue('qe-category');
        const rawBarcode = window.getLatestValue('qe-barcode');
        const rawMinStock = window.getLatestValue('qe-minstock');

        const newName = rawName.trim();
        
        if (newName === "" && item.name !== "" && item.name !== "Без названия") {
            alert("Сработала защита: скрипт попытался сохранить пустое имя. Попробуйте еще раз.");
            return; 
        }

        const newPrice = parseFloat(String(rawPrice).replace(/\s/g, '').replace(',', '.')) || 0;
        const newMinStock = parseFloat(String(rawMinStock).replace(/\s/g, '').replace(',', '.')) || 0;

        // === НОВЫЙ ЖЕСТКИЙ ФИЛЬТР КАТЕГОРИИ ПРИ РЕДАКТИРОВАНИИ ===
        let newCategory = String(rawCategory || '').trim();
        if (newCategory === 'new') {
            newCategory = window.getLatestValue('qe-new-category').trim();
        }
        
        if (!newCategory || newCategory === '0' || newCategory.toLowerCase() === 'не выбрано') {
            newCategory = "Без категории"; 
        }
        // =========================================================

        payload = {
            action: "update_single_item",
            api_key: CLIENT_API_KEY,
            itemId: String(item.id),
            data: {
                item_name: newName,
                price: newPrice,
                category: newCategory,
                min_stock: newMinStock,
                barcode: rawBarcode.trim()
            }
        };

        item.name = newName; 
        item.item_name = newName; 
        item.price = newPrice; 
        item.category = newCategory; 
        item.min_stock = newMinStock; 
        item.barcode = rawBarcode.trim();
    }

    // ==========================================
    // ОТПРАВКА НА СЕРВЕР
    // ==========================================
    console.log("Улетает на сервер:", payload);
    // === СОХРАНЯЕМ ИЗМЕНЕНИЯ В КЭШ, ЧТОБЫ ОНИ НЕ ИСЧЕЗЛИ ===
    if (typeof db !== 'undefined') {
        localStorage.setItem('db_cache', JSON.stringify(db));
    }
    // =======================================================

    document.querySelectorAll('#quickEditModal').forEach(m => m.remove());
    if (typeof render === 'function') render();
    document.querySelectorAll('#quickEditModal').forEach(m => m.remove());
    document.querySelectorAll('[data-tippy-root], .tippy-box, .dropdown-menu').forEach(t => t.remove());

    // Отправляем задачу диспетчеру очереди
    if (typeof window.addToOfflineQueue === 'function') {
        window.addToOfflineQueue(payload);
    } else {
        console.error("Диспетчер не найден!");
    }
    
    const numpad = document.getElementById('custom-numpad');
    if (numpad) numpad.style.display = 'none';
};

window.saveNewProduct = function() {
    // 1. Собираем данные из полей ввода
    const barcode = document.getElementById('nt-barcode').value.trim();
    const name = document.getElementById('nt-name').value.trim();
    
    // Берем поставщика
    const supplier = document.getElementById('nt-supplier-input').value.trim() || "Не указан";
    
    // === НОВЫЙ ЖЕСТКИЙ ФИЛЬТР КАТЕГОРИИ ===
    let category = document.getElementById('nt-category-input').value.trim();
    if (!category || category === '0' || category.toLowerCase() === 'не выбрано') {
        category = "Без категории";
    }
    // =====================================
    
    // Очищаем цифры от пробелов
    const qty = parseInt(document.getElementById('nt-qty').value.replace(/\D/g, ''), 10) || 0;
    const priceIn = parseInt(document.getElementById('nt-price-in').value.replace(/\D/g, ''), 10) || 0;
    const priceOut = parseInt(document.getElementById('nt-price-out').value.replace(/\D/g, ''), 10) || 0;

    // 2. Базовая валидация (ТЕПЕРЬ С ПЕРЕВОДОМ)
    if (!name) {
        alert(translations[currentLang].msg_barcode_req);
        return;
    }
    
    if (qty <= 0) {
        alert(translations[currentLang].msg_qty_req);
        return;
    }

    // 3. Формируем пакет данных (payload)
    const requestFingerprint = "new_item_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const generatedItemId = "SKU-" + Date.now().toString(36).toUpperCase(); // 📌 ГЕНЕРИРУЕМ УНИКАЛЬНЫЙ ID например:SKU-LZZ12X45
    
    const payload = {
        action: "income",
        api_key: typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : "",
        currency: "KZT",
        vat: 0, 
        fingerprint: requestFingerprint,
        data: [
            {
                doc_no: "AUTO-NEW-" + Date.now(),
                supplier: supplier,
                item_id: generatedItemId, // 📌 Отправляем сгенерированный ID
                barcode: barcode,         // 📌 Отправляем штрихкод отдельным полем
                item_name: name,
                qty: qty,
                cost: priceIn,
                price: priceOut,
                category: category,
                cbm: 0,
                weight: 0
            }
        ]
    };

    // Блокируем кнопку (ТЕПЕРЬ С ПЕРЕВОДОМ)
    const saveBtn = document.getElementById('saveNewProductBtn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerText = translations[currentLang].btn_saving;
    }

    // 4. Отправляем запрос на бэкенд
    fetch(typeof GATEWAY_URL !== 'undefined' ? GATEWAY_URL : "", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    })
    .then(res => res.json())
    .then(response => {
        if (response && response.error) {
            alert(translations[currentLang].msg_server_err + response.error); // ПЕРЕВОД
        } else {
            // 5. Оптимистичное обновление UI: добавляем товар в кэш
            if (typeof db !== 'undefined') {
                db.push({
                    id: generatedItemId, // 📌 Сохраняем сгенерированный ID в локальный кэш
                    barcode: barcode,    // 📌 Штрихкод остается штрихкодом
                    name: name,
                    category: category,
                    price: priceOut,
                    cost: priceIn,
                    stock: qty
                });
                // === ДОБАВЛЯЕМ ЭТУ СТРОКУ, ЧТОБЫ ТОВАР НЕ СТИРАЛСЯ ДО СИНХРОНИЗАЦИИ ===
                localStorage.setItem('db_cache', JSON.stringify(db));
            }
            
            // Если есть функция обновления витрины
            if (typeof render === 'function') render();
            
            // Закрываем модалку
            if (typeof toggleIncomeModule === 'function') toggleIncomeModule();
            
            // Очищаем форму для следующего раза
            document.getElementById('nt-barcode').value = '';
            document.getElementById('nt-name').value = '';
            document.getElementById('nt-qty').value = '0';
            document.getElementById('nt-price-in').value = '0';
            document.getElementById('nt-price-out').value = '0';
        }
    })
    .catch(err => {
        alert(translations[currentLang].msg_conn_err + err.message); // ПЕРЕВОД
    })
    .finally(() => {
        // Возвращаем кнопку в исходное состояние (ТЕПЕРЬ С ПЕРЕВОДОМ)
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerText = translations[currentLang].btn_save_ready; 
        }
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

                    localStorage.setItem('DRIVE_DATA', JSON.stringify(res.driveData));

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

async function load(isFullSync = false) {
    const savedUid = localStorage.getItem('user_uid') || (typeof currentUser !== 'undefined' && currentUser ? currentUser.uid : '');
    const savedRole = localStorage.getItem('user_role') || '';
    const cacheKey = 'totals_cache_' + (savedUid || 'anon');
    const localTimestamp = localStorage.getItem('db_timestamp') || "0"; 

    // 1. МГНОВЕННАЯ ЗАГРУЗКА ИЗ КЭША
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
        if (db && db.length > 0 && typeof render === 'function') render();
    } catch (e) { console.error("Ошибка чтения кэша", e); }

    if (!navigator.onLine) return; 
    
    if (typeof currentUser === 'undefined' || !currentUser) return;

    // === БЛОК 1: МИКРО-ПИНГ ===
    // Выполняем ТОЛЬКО если есть кэш и если это НЕ экстренная полная загрузка
    if (!isFullSync && localStorage.getItem('db_cache')) {
        try {
            const pingPayload = { action: 'ping', api_key: typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : "" };
            const pingRes = await fetch(typeof APPS_SCRIPT_URL !== 'undefined' ? APPS_SCRIPT_URL : "", {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(pingPayload),
                redirect: 'follow'
            });
            const pingText = await pingRes.text();
            
            if (!pingText.trim().startsWith('<')) {
                const pingData = JSON.parse(pingText);
                if (pingData.success && pingData.timestamp) {
                    if (localTimestamp === pingData.timestamp) {
                        console.log("✅ База актуальна, загрузка отменена.");
                        return; 
                    }
                    window._pendingTimestamp = pingData.timestamp; 
                }
            }
        } catch (pingErr) {
            console.warn("⚠️ Ошибка пинга:", pingErr);
        }
    }
    
    // === БЛОК 2: ЗАГРУЗКА БАЗЫ ИЛИ ДЕЛЬТЫ ===
    let fetchSuccess = false;
    let data = null;
    
    // Если isFullSync (долгий тап) = true, то время сбрасывается на "0" и сервер отдает 100% базы
    const timeToSend = isFullSync ? "0" : localTimestamp;
    
    const fetchUrl = `${typeof APPS_SCRIPT_URL !== 'undefined' ? APPS_SCRIPT_URL : ""}?action=getInitialData&api_key=${typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : ""}&t=${Date.now()}&uid=${savedUid}&role=${savedRole}&last_sync=${timeToSend}`;

    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetch(fetchUrl, { redirect: 'follow' });
            const text = await res.text(); 
            if (text.trim().startsWith('<')) throw new Error('Сервер вернул HTML вместо JSON');
            
            data = JSON.parse(text);
            fetchSuccess = true;
            break; 
        } catch (err) {
            console.warn(`Попытка ${i + 1} из 3 для загрузки базы не удалась:`, err.message);
            if (i < 2) await new Promise(resolve => setTimeout(resolve, 500)); 
        }
    }

    if (!fetchSuccess || !data) {
        console.error("Не удалось обновить базу с сервера.");
        return; 
    }

    // === БЛОК 3: УМНОЕ СЛИЯНИЕ (SMART MERGE) ===
    try {
        if (data.items) {
            if (isFullSync || localTimestamp === "0" || !db || db.length === 0) {
                // Если мы нажали долгий тап (isFullSync) или кэш пуст — просто берем всю базу
                db = data.items;
                console.log("📥 Полная загрузка базы: " + db.length + " товаров.");
            } else {
                // Если это обычный тап (Дельта) — обновляем только измененные товары
                let updatedCount = data.items.length;
                if (updatedCount > 0) {
                    let dbMap = new Map(db.map(item => [item.id, item])); 
                    data.items.forEach(newItem => {
                        dbMap.set(newItem.id, newItem); 
                    });
                    db = Array.from(dbMap.values()); 
                    console.log(`🔄 Дельта-синхронизация: обновлено ${updatedCount} товаров.`);
                } else {
                    console.log("🔄 Дельта-синхронизация: изменений в товарах нет.");
                }
            }
            localStorage.setItem('db_cache', JSON.stringify(db)); 
        }

        if (data.staff) {
            staffList = data.staff;
            localStorage.setItem('staff_cache', JSON.stringify(staffList));
        }
        if (data.synonyms && Object.keys(data.synonyms).length > 0) invoiceSynonyms = data.synonyms;
        if (data.suppliers) {
            window.suppliersList = data.suppliers;
            localStorage.setItem('suppliers_cache', JSON.stringify(data.suppliers));
        }
        
        const t = data.totals || { cash: 0, qr_kaspi: 0, installment: 0, pos_terminal: 0, transfer: 0 };
        document.getElementById('sum-cash').innerText = (t.cash || 0).toLocaleString() + ' ₸';
        document.getElementById('sum-qr').innerText   = (t.qr_kaspi || t.qr || 0).toLocaleString() + ' ₸';
        document.getElementById('sum-red').innerText  = (t.installment || t.red || 0).toLocaleString() + ' ₸';
        document.getElementById('sum-card').innerText = (t.pos_terminal || t.pos || t.card || 0).toLocaleString() + ' ₸';
        document.getElementById('sum-trans').innerText= (t.transfer || 0).toLocaleString() + ' ₸';
        
        if (typeof render === 'function') render(); 
        
        localStorage.setItem(cacheKey, JSON.stringify(t));

        if (window._pendingTimestamp) {
            localStorage.setItem('db_timestamp', window._pendingTimestamp);
            delete window._pendingTimestamp;
        } else if (isFullSync) {
            // При экстренной загрузке обновляем локальное время на текущее
            localStorage.setItem('db_timestamp', new Date().getTime().toString());
        }
    } catch (e) { 
        console.error("Ошибка обработки полученных данных", e); 
    }
}

async function refreshPosData(isSilent = false, isFullSync = false) {
    if (!navigator.onLine) {
        // Выдаем ошибку только если обновление запрошено вручную
        if (isSilent !== true) {
            alert(translations[currentLang].msg_no_internet);
        }
        return;
    }
    
    const btn = document.getElementById('btn-sync-data');
    
    // Включаем анимацию ТОЛЬКО если это ручное обновление (не тихий режим)
    if (!isSilent && btn) {
        btn.classList.add('sync-spin'); 
    }
    
    try { 
        // ПЕРЕДАЕМ ПАРАМЕТР ДАЛЬШЕ В ФУНКЦИЮ ЗАГРУЗКИ
        await load(isFullSync); 
    } finally { 
        // Выключаем анимацию ТОЛЬКО если мы её включали
        if (!isSilent && btn) {
            setTimeout(() => { btn.classList.remove('sync-spin'); }, 600); 
        }
    }
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
            if (!p) return;

            const inC = cart.find(x => x.id === id);
            
            const roundedPrice = Math.round(Number(p.price) || 0);
            const roundedCost = Math.round(Number(p.cost) || 0);
            
            const currentStock = parseFloat(p.stock) || 0;
            const minStock = parseFloat(p.min_stock) || 1;

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
                    stock: currentStock,
                    min_stock: minStock
                });
            }
            
            if (navigator.vibrate) {
                navigator.vibrate(40);
            }

            const clickedElement = typeof event !== 'undefined' && event ? (event.currentTarget || event.target.closest('.c-item')) : null;
            if (clickedElement && clickedElement.classList.contains('c-item')) {
                const originalBg = clickedElement.style.background;
                clickedElement.style.background = 'var(--bg-success-dim)'; 
                clickedElement.style.transition = 'none'; 
                
                setTimeout(() => {
                    clickedElement.style.transition = 'background 0.3s'; 
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
                
                // === ПРОВЕРКА КРИТИЧЕСКОГО ОСТАТКА ДЛЯ ОТРИСОВКИ КНОПКИ ===
                let remainingStock = item.stock - item.qty;
                let rowBgColor = "var(--bg-panel)";
                let rowBorder = "1px solid var(--border-main)";
                let kaspiBtnHtml = "";

                let minStockLevel = item.min_stock !== undefined ? item.min_stock : 1;
                
                if (remainingStock <= minStockLevel) {
                    rowBgColor = "var(--bg-danger-dim)"; 
                    rowBorder = "2px solid var(--accent-red)"; 
                    
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

                    // 1. Делаем кнопку сплошной красной с белым текстом
                    btnElem.style.background = 'var(--accent-red)';
                    btnElem.style.color = '#ffffff';
                    btnElem.style.border = '2px solid var(--accent-red)';
                    
                    // 2. Выделяем количество и "НЕ ПРОДАВАТЬ!" ярко-желтым цветом
                    btnElem.innerHTML = `⚠️ ${translations[currentLang].kaspi_danger} <span style="color: #ffd700; font-size: 1.1em; font-weight: 900; margin-left: 4px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${qty} ${translations[currentLang].kaspi_pcs}</span>`;
                    
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
                // Отправляем чек в новый кузов диспетчера
                if (typeof window.addToOfflineQueue === 'function') {
                    window.addToOfflineQueue(p);
                }

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

    function openSettings() { 
    // 1. Открываем само окно настроек
    document.getElementById('settings-modal').style.display = 'flex'; 

    // 2. Управляем видимостью кнопки "База"
    const driveBtn = document.getElementById('btn-settings-drive');
    if (driveBtn) {
        const userStr = localStorage.getItem('offline_user');
        let isManager = false;
        
        if (userStr) {
            const user = JSON.parse(userStr);
            const userId = String(user.uid || user.id || user.role || "").toUpperCase();
            // Ищем паттерн Mxx (например, M01, M02)
            isManager = /M\d+/.test(userId); 
        }
        
        // Если менеджер — кнопка видима (flex), если продавец — скрыта (none)
        driveBtn.style.display = isManager ? 'flex' : 'none'; 
    }
}
        function closeSettings() { document.getElementById('settings-modal').style.display = 'none'; }

window.forceAppUpdate = function() {
    const statusIcon = document.getElementById('update-status');
    if (statusIcon) statusIcon.innerText = '⏳'; 
    
    try {
        // 1. Выжигаем ТОЛЬКО память кассы (товары, суммы, метки времени).
        // sessionStorage мы больше не трогаем, чтобы не сломать Google Auth!
        localStorage.clear();
    } catch (e) { 
        console.warn("Ошибка при очистке:", e);
    } finally {
        // 2. Безопасная перезагрузка без потери исходной ссылки
        window.location.replace(window.location.href.split('#')[0]);
    }
};

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

    let fullQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    let queue = fullQueue.filter(item => item.tx_type === 'sale' || item.cart);
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

    // Добавляем теги для конкретных маркетов внутри списка
    const methodNames = { 
        'cash': translations[currentLang].pay_cash, 
        'qr_kaspi': 'QR', 
        'installment': 'Red', 
        'pos_terminal': translations[currentLang].pay_card, 
        'transfer': translations[currentLang].pay_trans, 
        'kaspi_market': 'KASPI',   // <-- Заготовка
        'halyk_market': 'HALYK',   // <-- Заготовка
        'ozon_market': 'OZON',     // <-- Заготовка
        'market': translations[currentLang].pay_market_full || 'МАРКЕТЫ' 
    };
    
    // Раскрашиваем теги в фирменные цвета площадок
    const methodColors = { 
        'cash': 'var(--pay-cash)', 
        'qr_kaspi': 'var(--pay-qr)', 
        'installment': 'var(--pay-red)', 
        'pos_terminal': 'var(--pay-card)', 
        'transfer': 'var(--pay-trans)', 
        'kaspi_market': '#f24e1e', // Красный Каспи
        'halyk_market': '#007054', // Зеленый Халык
        'ozon_market': '#005bff',  // Синий Озон
        'market': 'var(--pay-market)' 
    };
    const uiStr = { sale: translations[currentLang].report_sales, ret: translations[currentLang].report_returns, avg: translations[currentLang].report_avg || 'ср:' };
    // ОТСЕКАЕМ РЕЗЕРВЫ (Они еще не стали деньгами и не должны идти в отчет)
    reportDataToRender = reportDataToRender.filter(tx => tx.type !== 'reserve' && tx.type !== 'unreserve');
    
    // ==========================================
    // ШАГ 1: ЖЕЛЕЗОБЕТОННАЯ МАТЕМАТИКА
    // ==========================================
    let cardSums = { cash: 0, qr_kaspi: 0, pos_terminal: 0, installment: 0, transfer: 0, market: 0 };
    let totalAllNet = 0;
    let footSalesQty = 0, footSalesSum = 0, footRetQty = 0, footRetSum = 0;

    reportDataToRender.forEach(tx => {
        let isRet = (tx.type === 'return' || tx.type === 'refund');
        let m = tx.methodCode || 'cash';
        let mGroup = m.includes('market') ? 'market' : m; // Умная группировка всех маркетов
        
        let txSum = 0, txQty = 0;
        tx.cart.forEach(c => {
            let q = Math.abs(c.qty);
            let s = q * Math.abs(c.price);
            txQty += q;
            txSum += s;
        });

        // Если это маркет, берем чистую выплату (или считаем её как страховку)
        let txNet = txSum;
        if (mGroup === 'market') {
            let tCom = tx.marketCommission || 0;
            let tLog = tx.marketLogistics || 0;
            txNet = tx.netPayoutTotal !== undefined ? tx.netPayoutTotal : (txSum - tCom - tLog);
        }

        let sign = isRet ? -1 : 1;
        if (cardSums[mGroup] !== undefined) cardSums[mGroup] += (txNet * sign);
        else cardSums[mGroup] = (txNet * sign);
        
        totalAllNet += (txNet * sign);

        if (reportState.method === 'all' || reportState.method === mGroup) {
            if (isRet) { footRetQty += txQty; footRetSum += txNet; } 
            else { footSalesQty += txQty; footSalesSum += txNet; }
        }
    });

    document.getElementById('rep-sum-all').innerText = totalAllNet.toLocaleString() + ' ₸';
    document.getElementById('rep-sum-cash').innerText = (cardSums.cash || 0).toLocaleString() + ' ₸';
    document.getElementById('rep-sum-qr').innerText = (cardSums.qr_kaspi || 0).toLocaleString() + ' ₸';
    document.getElementById('rep-sum-card').innerText = (cardSums.pos_terminal || 0).toLocaleString() + ' ₸';
    document.getElementById('rep-sum-red').innerText = (cardSums.installment || 0).toLocaleString() + ' ₸';
    document.getElementById('rep-sum-trans').innerText = (cardSums.transfer || 0).toLocaleString() + ' ₸';
    
    // Обновляем новую карточку
    const marketCardSum = document.getElementById('rep-sum-market');
    if (marketCardSum) marketCardSum.innerText = (cardSums.market || 0).toLocaleString() + ' ₸';

    if (!reportDataToRender || reportDataToRender.length === 0) {
        repList.innerHTML = `<div style="text-align:center; color:var(--text-muted); margin-top:30px; font-size: 13px;">${translations[currentLang].msg_no_data}</div>`;
        totalsBox.innerHTML = '';
        return;
    }

    // ==========================================
    // ШАГ 2: НАРЕЗКА СПИСКА
    // ==========================================
    let htmlString = '';
    let viewTx = reportDataToRender;
    
    // Фильтр по способу оплаты с учетом группировки маркетов
    if (reportState.method !== 'all') {
        viewTx = viewTx.filter(tx => {
            let grp = (tx.methodCode || 'cash').includes('market') ? 'market' : (tx.methodCode || 'cash');
            return grp === reportState.method;
        });
    }

    let isSaleMode = reportState.type === 'sale';
    viewTx = viewTx.filter(tx => isSaleMode ? (tx.type !== 'return' && tx.type !== 'refund') : (tx.type === 'return' || tx.type === 'refund'));

    let sumColor = isSaleMode ? 'var(--accent-green)' : 'var(--accent-red)';
    let signPrefix = isSaleMode ? '' : '-';

    if (reportState.view === 'items') {
        let agg = {};
        
        viewTx.forEach(tx => {
            let mGroup = (tx.methodCode || 'cash').includes('market') ? 'market' : (tx.methodCode || 'cash');
            tx.cart.forEach(c => {
                let key = reportState.method === 'all' ? `${c.name}_${mGroup}` : c.name;
                
                if (!agg[key]) agg[key] = { name: c.name, method: mGroup, qty:0, sum:0, sellers:{}, rawGross:0, totalCom:0, totalLog:0 };
                if (!agg[key].sellers[tx.seller]) agg[key].sellers[tx.seller] = { qty:0, sum:0 };
                
                let q = Math.abs(c.qty); 
                let s = q * Math.abs(c.price);
                
                let cCom = c.commission || 0;
                let cLog = c.logistics || 0;
                let cNet = mGroup === 'market' ? (c.netPayout !== undefined ? c.netPayout : (s - cCom - cLog)) : s;
                
                agg[key].qty += q; 
                agg[key].sum += cNet;         
                agg[key].rawGross += s;       
                agg[key].totalCom += cCom;    
                agg[key].totalLog += cLog;    
                
                agg[key].sellers[tx.seller].qty += q; 
                agg[key].sellers[tx.seller].sum += cNet;
            });
        });

        let sorted = Object.values(agg).sort((a,b) => b.sum - a.sum);
        
        sorted.forEach(item => {
            let mColor = methodColors[item.method] || 'var(--text-muted)';
            let methodTag = reportState.method === 'all' ? ` <span class="acc-method-tag" style="color:${mColor}; font-size:10px;">[${methodNames[item.method]}]</span>` : '';
            
            let detHtml = '';
            
            // ВНЕДРЕНЫ ДИНАМИЧЕСКИЕ ПЕРЕВОДЫ ДЛЯ ТЕКСТА
            if (item.method === 'market' && (item.totalCom > 0 || item.totalLog > 0)) {
                let strCom = translations[currentLang].report_market_commission || "Комиссия маркета";
                let strLog = translations[currentLang].report_market_logistics || "Логистика";
                let strNet = translations[currentLang].report_market_net || "К выплате";
                
                // Авто-перевод без добавления в словарь
                let strGross = currentLang === 'kz' ? "Бастапқы сома" : "Исходная сумма";
                let strTotal = currentLang === 'kz' ? "Жиыны" : "Итого"; 

                detHtml += `<div class="acc-detail-row" style="color: var(--text-muted); font-size: 11px;"><span>${strGross}:</span><span>${item.rawGross.toLocaleString()}</span></div>`;
                if (item.totalCom > 0) detHtml += `<div class="acc-detail-row" style="color: var(--accent-red); font-size: 11px;"><span>↳ ${strCom}</span><span>-${item.totalCom.toLocaleString()}</span></div>`;
                if (item.totalLog > 0) detHtml += `<div class="acc-detail-row" style="color: var(--accent-red); font-size: 11px;"><span>↳ ${strLog}</span><span>-${item.totalLog.toLocaleString()}</span></div>`;
                detHtml += `<div class="acc-detail-row" style="font-weight: bold; border-top: 1px dashed var(--border-main); margin-top: 4px; padding-top: 4px; margin-bottom: 8px;"><span>${strTotal} ${strNet.toLowerCase()}:</span><span style="color:${sumColor}">${item.sum.toLocaleString()}</span></div>`;
            }

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
            let mGroup = (tx.methodCode || 'cash').includes('market') ? 'market' : (tx.methodCode || 'cash');
            let mColor = methodColors[mGroup] || 'var(--text-muted)';
            let methodTag = reportState.method === 'all' ? ` <span style="color:${mColor}; font-size:10px;">[${methodNames[mGroup]}]</span>` : '';

            let detHtml = '';
            tx.cart.forEach(c => {
                let q = Math.abs(c.qty); let s = q * Math.abs(c.price);
                txSum += s; txQty += q;
                detHtml += `<div class="acc-detail-row"><span>${c.name}</span><span style="color:${sumColor}">${q} x ${Math.abs(c.price).toLocaleString()}</span></div>`;
            });

            if (mGroup === 'market') {
                let tCom = tx.marketCommission || 0;
                let tLog = tx.marketLogistics || 0;
                let tNet = tx.netPayoutTotal !== undefined ? tx.netPayoutTotal : (txSum - tCom - tLog);
                
                let strCom = translations[currentLang].report_market_commission || "Комиссия маркета";
                let strLog = translations[currentLang].report_market_logistics || "Логистика";
                let strNet = translations[currentLang].report_market_net || "К выплате";

                if (tCom > 0) detHtml += `<div class="acc-detail-row" style="color: var(--accent-red); font-size: 11px;"><span>↳ ${strCom}</span><span>-${tCom.toLocaleString()}</span></div>`;
                if (tLog > 0) detHtml += `<div class="acc-detail-row" style="color: var(--accent-red); font-size: 11px;"><span>↳ ${strLog}</span><span>-${tLog.toLocaleString()}</span></div>`;
                
                detHtml += `<div class="acc-detail-row" style="font-weight: bold; border-top: 1px dashed var(--border-main); margin-top: 4px; padding-top: 4px;"><span>${strNet}</span><span style="color:${sumColor}">${tNet.toLocaleString()}</span></div>`;
                
                txSum = tNet;
            }

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
    
    document.querySelectorAll('.method-card').forEach(c => c.className = 'method-card');
    if (element) element.classList.add(activeClass);
    
    const toggles = document.getElementById('rep-toggles-row');
    if (toggles) toggles.style.display = 'flex';
    
    clearReportSearch();
    renderReport(); 
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
            // 4. Кнопка "Внести приход" (Связываем с главной функцией сохранения)
            // Обработка кнопки "Внести приход" (Защита от потери ID на мобилках)
                if (event.target && event.target.closest('#btn-submit-receive')) {
                    event.preventDefault();
                    
                    let itemId = null;
                    // Ищем все кнопки сохранения (включая скрытые)
                    const saveBtns = document.querySelectorAll('[data-i18n="qe_save"]');
                    
                    for (let btn of saveBtns) {
                        const onclickText = btn.getAttribute('onclick');
                        if (onclickText) {
                            // Вытаскиваем ID товара прямо из текста функции
                            const match = onclickText.match(/saveQuickEdit\(\s*['"]?([^'"\)]+)['"]?\s*\)/);
                            if (match && match[1]) {
                                itemId = match[1];
                                break;
                            }
                        }
                    }

                    if (typeof window.saveQuickEdit === 'function') {
                        if (itemId) {
                            window.saveQuickEdit(itemId);
                        } else {
                            alert('Ошибка: Не удалось найти ID товара для оформления прихода!');
                        }
                    }
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

        function toggleExportModule() {
            const modal = document.getElementById('export-modal');
            if (modal.style.display === 'none' || modal.style.display === '') {
                modal.style.display = 'flex';
            } else {
                modal.style.display = 'none';
                document.getElementById('templateFileInput').value = '';
                document.getElementById('templateFileName').innerText = '📄 Загрузить пустой шаблон (.xlsx)';
                document.getElementById('exportMapperArea').style.display = 'none';
                document.getElementById('generateExportBtn').style.display = 'none';
            }
        }

// Обработка загрузки файла шаблона Kaspi
async function handleTemplateUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileNameSpan = document.getElementById('templateFileName');
    fileNameSpan.innerText = '⏳ Обработка: ' + file.name;
    fileNameSpan.style.color = "var(--accent-blue)";

    const reader = new FileReader();
    
    reader.onload = async function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // 1. Ищем лист attributes
            let targetSheet = workbook.SheetNames.find(name => name.toLowerCase() === 'attributes');
            if (!targetSheet) {
                targetSheet = workbook.SheetNames.length > 1 ? workbook.SheetNames[1] : workbook.SheetNames[0];
            }
            const sheet = workbook.Sheets[targetSheet];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

            // --- НЕЗАВИСИМЫЕ ДЕТЕКТОРЫ ---
            let requirements = [];
            let systemKeys = [];
            let humanNames = [];
            const humMarkers = ["артикул", "модель", "бренд", "цена"];
            const sysMarkers = ["merchant_sku", "model", "brand", "price"];

            for (let i = 0; i < Math.min(jsonData.length, 20); i++) {
                const rowText = jsonData[i].join(" ").toLowerCase();
                if (!rowText.trim()) continue;

                let humMatch = 0;
                humMarkers.forEach(m => { if (rowText.includes(m)) humMatch++; });
                if (humMatch >= 2) { humanNames = jsonData[i]; continue; }

                let sysMatch = 0;
                sysMarkers.forEach(m => { if (rowText.includes(m)) sysMatch++; });
                if (sysMatch >= 2) { systemKeys = jsonData[i]; continue; }

                if (rowText.includes("обязательное") || rowText.includes("обязат.")) {
                    requirements = jsonData[i]; continue;
                }
            }

            if (humanNames.length === 0 || systemKeys.length === 0) {
                alert("Ошибка: Не удалось распознать структуру шаблона Kaspi.");
                fileNameSpan.innerText = '📄 Загрузить пустой шаблон (.xml, .xlsx)';
                fileNameSpan.style.color = "var(--text-main)";
                return;
            }

            // 2. Читаем лист справочников values
            let valuesSheetName = workbook.SheetNames.find(name => name.toLowerCase() === 'values');
            let valuesData = [];
            if (valuesSheetName) {
                valuesData = XLSX.utils.sheet_to_json(workbook.Sheets[valuesSheetName], { defval: "" });
            }

            // 3. ПОДКЛЮЧЕНИЕ К БАЗЕ ЧЕРЕЗ ВАШ ДВИЖОК
            fileNameSpan.innerText = '⏳ Подключение к базе данных...';
            
            try {
                // Используем глобальный URL из конфига (предполагается, что это SCRIPT_URL или APP_URL)
                // Если переменная URL у вас называется по-другому, поправьте её здесь
                const url = window.SCRIPT_URL; 
                
                // Формируем точный запрос с ключом
                const payload = { 
                    action: 'getKaspiExportData',
                    api_key: CLIENT_API_KEY 
                };
                const cacheKey = 'kaspi_dynamic_keys_cache';
                
                // Вызываем ваш бронированный метод smartFetch
                const dbResponse = await window.smartFetch(url, payload, cacheKey, 3);

                if (dbResponse && dbResponse.success) {
                    fileNameSpan.innerText = '✅ Шаблон и база готовы';
                    fileNameSpan.style.color = "var(--accent-green)";
                    renderMapperUI(systemKeys, humanNames, valuesData, requirements, dbResponse.dynamicKeys);
                } else {
                    throw new Error(dbResponse ? dbResponse.error : 'Нет ответа от сервера');
                }
                
            } catch (serverError) {
                console.warn("Не удалось подтянуть ключи из базы:", serverError);
                fileNameSpan.innerText = '⚠️ Шаблон готов (Без связи с БД)';
                fileNameSpan.style.color = "var(--accent-orange)";
                
                // Рисуем интерфейс с пустым массивом ключей, если сервер не ответил
                renderMapperUI(systemKeys, humanNames, valuesData, requirements, []);
            }

        } catch (err) {
            console.error(err);
            alert("Ошибка чтения файла: " + err.message);
            fileNameSpan.innerText = '📄 Загрузить пустой шаблон (.xml, .xlsx)';
            fileNameSpan.style.color = "var(--text-main)";
        }
    };
    
    event.target.value = '';
    reader.readAsArrayBuffer(file);
}

// Глобальный объект для хранения словарей Каспи
window.kaspiDicts = {};

// --- КРОШЕЧНЫЙ ПОМОЩНИК ПЕРЕВОДА (Без локальных словарей!) ---
// Читает данные только из вашей глобальной базы.
function t(key, defaultText) {
    // Берем текущий язык из переменной, которую ставит наш Шпион, или из памяти
    let lang = window.appCurrentLang || localStorage.getItem('lang') || localStorage.getItem('language') || 'ru';
    
    // Если глобальный словарь существует и в нем есть перевод — отдаем его
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    
    // Если перевода нет (или словарь еще грузится) — отдаем русский оригинал
    return defaultText;
}

// 1. ОТРИСОВКА ИНТЕРФЕЙСА (Берет переводы из глобальной базы)
function renderMapperUI(systemKeys, humanNames, valuesData, requirements, dynamicKeys) {
    const mapperArea = document.getElementById('exportMapperArea');
    mapperArea.innerHTML = ''; 

    // 1. Базовые системные поля (Оставляем как есть, с переводами)
    const internalFields = [
        { id: '', name: t('opt_skip', '-- Не выгружать --') },
        { id: 'barcode', name: t('f_barcode', 'Штрихкод / SKU') },
        { id: 'name', name: t('f_name', 'Название') },
        { id: 'price', name: t('f_price', 'Цена') },
        { id: 'qty', name: t('f_qty', 'Остаток партии') },
        { id: 'weight', name: t('f_weight', 'Вес, кг') },
        { id: 'volume', name: t('f_volume', 'Объем, м3') }
    ];

    // 2. Динамически добавляем атрибуты из вашей базы (JSON)
    if (dynamicKeys && Array.isArray(dynamicKeys) && dynamicKeys.length > 0) {
        dynamicKeys.forEach(key => {
            // Добавляем пометку "(из БД)", чтобы кассир понимал источник данных
            internalFields.push({ id: `json_${key}`, name: `${key} (из БД)` });
        });
    }

    let html = `<h4 style="margin-bottom: 10px; color: var(--text-muted); font-size: 13px;" data-i18n="map_title">${t('map_title', 'СОПОСТАВЛЕНИЕ КОЛОНОК:')}</h4>`;

    for (let i = 0; i < humanNames.length; i++) {
        const sysKey = systemKeys[i];
        const humName = humanNames[i];
        
        if (!humName && !sysKey) continue; 

        const safeHumName = humName || 'Без названия';
        const cleanColNameForData = safeHumName.replace(/"/g, '&quot;');

        const reqText = (requirements && requirements[i]) ? String(requirements[i]).toLowerCase() : '';
        const isRequired = reqText.includes('обязательн') && !reqText.includes('необязательн');
        const reqAsterisk = isRequired ? '<span style="color: #ef4444; margin-left: 4px;">*</span>' : '';
        const borderStyle = isRequired ? 'border-left: 4px solid #ef4444;' : 'border-left: 4px solid var(--accent-blue, #3b82f6);';

        let allUniqueValues = [];
        if (valuesData && valuesData.length > 0 && humName) {
            for (let row of valuesData) {
                if (row[humName] && !allUniqueValues.includes(row[humName])) {
                    allUniqueValues.push(row[humName]);
                }
            }
        }
        window.kaspiDicts[i] = allUniqueValues;

        let examplesHtml = '';
        if (allUniqueValues.length > 0) {
            const examples = allUniqueValues.slice(0, 3);
            let examplesText = examples.join('<br>');
            if (allUniqueValues.length > 3) {
                examplesText += '<br><span style="color:#888;">...</span>';
            }
            examplesHtml = `<div style="font-size: 11px; color: var(--accent-blue); margin-top: 6px; white-space: normal; line-height: 1.4;"><i>${examplesText}</i></div>`;
        }

        // Запрашиваем переводы для групп и кнопок
        let optionsHtml = `<optgroup label="${t('grp_db', 'Поля из базы данных')}">`;
        optionsHtml += internalFields.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
        optionsHtml += `</optgroup>`;

        if (allUniqueValues.length > 0) {
            optionsHtml += `<optgroup label="${t('grp_kaspi', 'Справочник Каспи')}">`;
            if (allUniqueValues.length <= 50) {
                optionsHtml += allUniqueValues.map(val => `<option value="static_${val}">📌 ${val}</option>`).join('');
            } else {
                optionsHtml += `<option value="open_dict">🔍 ${t('opt_search', 'Найти в справочнике')} (${allUniqueValues.length})...</option>`;
            }
            optionsHtml += `</optgroup>`;
        } else {
            optionsHtml += `<optgroup label="${t('grp_custom', 'Свое значение')}">`;
            optionsHtml += `<option value="custom_input">✏️ ${t('opt_manual', 'Ввести вручную...')}</option>`;
            optionsHtml += `</optgroup>`;
        }

        html += `
        <div class="mapper-row" style="display: flex; gap: 10px; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; padding: 10px 10px 10px 6px; background: var(--bg-panel); border: 1px solid var(--border-light); ${borderStyle} border-radius: 6px; transition: background 0.2s ease;">
            <div style="flex: 1; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; padding-bottom: 4px; margin-top: 4px;">
                <div style="font-size: 13px; font-weight: bold;">${safeHumName}${reqAsterisk}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${sysKey || '-'}</div>
                ${examplesHtml}
            </div>
            <div style="flex-shrink: 0; width: 140px;">
                <select class="mapper-select" data-col-index="${i}" data-sys-key="${sysKey}" data-col-name="${cleanColNameForData}" onchange="handleSelectChange(this)" style="width: 100%; padding: 6px; background: var(--bg-body); color: var(--text-main); border: 1px solid var(--border-main); border-radius: 4px; font-size: 13px; outline: none;">
                    ${optionsHtml}
                </select>
            </div>
        </div>
        `;
    }

    mapperArea.innerHTML = html;
    mapperArea.style.display = 'flex';
    document.getElementById('generateExportBtn').style.display = 'block'; 
}

// 2. ДИСПЕТЧЕР КЛИКОВ (Новая функция для надежной обработки действий)
function handleSelectChange(selectElem) {
    const val = selectElem.value;
    const colIndex = selectElem.getAttribute('data-col-index');
    const colName = selectElem.getAttribute('data-col-name');
    
    // Если выбрали открытие модалки
    if (val === 'open_dict') {
        selectElem.value = ''; // Сбрасываем значение селекта
        openDictionaryModal(colIndex, colName); // Открываем модалку
    } 
    // Если выбрали системный ручной ввод
    else if (val === 'custom_input') {
        selectElem.value = ''; 
        const customVal = prompt(`Введите значение для поля "${colName}":`);
        if (customVal && customVal.trim() !== '') {
            const valId = `static_${customVal.trim()}`;
            let opt = document.createElement('option');
            opt.value = valId;
            opt.innerHTML = `✏️ ${customVal.trim()}`;
            opt.style.background = '#fefce8';
            opt.style.color = '#854d0e';
            selectElem.appendChild(opt);
            selectElem.value = valId;
        }
    }
    
    // В самом конце всегда обновляем цвета и блокировки
    updateSelectStates();
}

// 3. КОНТРОЛЬ ЦВЕТОВ И БЛОКИРОВОК (Очищенная функция)
function updateSelectStates() {
    const selects = document.querySelectorAll('.mapper-select');
    const selectedValues = Array.from(selects)
        .map(s => s.value)
        .filter(v => v !== '' && !v.startsWith('static_'));

    selects.forEach(select => {
        const row = select.closest('.mapper-row');
        row.style.background = select.value !== '' ? 'rgba(40, 167, 69, 0.15)' : 'var(--bg-panel)'; 

        Array.from(select.options).forEach(opt => {
            if (opt.value === '' || opt.value.startsWith('static_') || opt.value === 'open_dict' || opt.value === 'custom_input') {
                opt.disabled = false; 
            } else if (selectedValues.includes(opt.value) && select.value !== opt.value) {
                opt.disabled = true;  
            } else {
                opt.disabled = false; 
            }
        });
    });
}

// 3. ОКНО УМНОГО СПРАВОЧНИКА (С автономным микро-переводчиком)
let currentModalColIndex = -1;

// Вспомогательная функция перевода "на лету"
function t(key) {
    let lang = 'ru'; 
    if (typeof currentLang !== 'undefined') lang = currentLang;
    else if (localStorage.getItem('lang')) lang = localStorage.getItem('lang');
    else if (localStorage.getItem('language')) lang = localStorage.getItem('language');

    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }

    const localDict = {
        ru: {
            dict_title: "Выберите значение", 
            dict_placeholder: "Поиск или ввод вручную...",
            dict_total: "Всего доступно вариантов:",
            dict_search_in: "Поиск среди:",
            dict_not_found: "В справочнике не найдено.",
            dict_use_custom: "Использовать",
            dict_start_typing: "Начните вводить текст",
            dict_and_more: "...и ещё",
            dict_options: "вариантов"
        },
        kz: {
            dict_title: "Мәнді таңдаңыз", 
            dict_placeholder: "Іздеу немесе қолмен енгізу...",
            dict_total: "Барлық қолжетімді нұсқалар:",
            dict_search_in: "Ішінен іздеу:",
            dict_not_found: "Анықтамалықтан табылмады.",
            dict_use_custom: "Қолдану",
            dict_start_typing: "Мәтінді енгізуді бастаңыз",
            dict_and_more: "...және тағы",
            dict_options: "нұсқа"
        }
    };
    return (localDict[lang] && localDict[lang][key]) ? localDict[lang][key] : localDict['ru'][key];
}

function createDictionaryModal() {
    if (document.getElementById('kaspiDictModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'kaspiDictModal';
    // Изменили выравнивание на flex-start (прижали к верху) и добавили safe-area-inset-top для защиты от челки/динамического острова на iPhone
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:999999; flex-direction:column; align-items:center; justify-content:flex-start; padding-top:env(safe-area-inset-top, 20px); padding-left:10px; padding-right:10px; box-sizing:border-box; backdrop-filter:blur(3px);';
    
    // Увеличили max-height и немного уплотнили отступы
    modal.innerHTML = `
        <div id="dictModalContent" style="background:var(--bg-body, #1e1e1e); color:var(--text-main, #fff); width:100%; max-width:400px; border-radius:10px; display:flex; flex-direction:column; max-height:90vh; margin-top:10px; box-sizing:border-box;">
            <div style="padding:12px 15px; border-bottom:1px solid var(--border-main, #444); display:flex; justify-content:space-between; align-items:center;">
                <b id="dictModalTitle" style="font-size:15px;">${t('dict_title')}</b>
                <span onclick="closeDictionaryModal()" style="font-size:24px; cursor:pointer; color:#888; line-height:1;">&times;</span>
            </div>
            <div style="padding:10px 15px; padding-bottom:5px; border-bottom:1px solid var(--border-main, #444);">
                <input type="text" id="dictModalSearch" placeholder="${t('dict_placeholder')}" oninput="filterDictionary()" style="width:100%; padding:10px; border:1px solid var(--accent-blue, #3b82f6); background:var(--bg-panel, #2a2a2a); color:var(--text-main, #fff); border-radius:6px; font-size:15px; outline:none; box-sizing:border-box;">
                <div id="dictModalCountInfo" style="font-size:11px; color:var(--text-muted, #888); margin-top:6px; margin-bottom:4px; text-align:right;">
                    <span id="dictModalCountText">${t('dict_total')}</span> <span id="dictTotalCount">0</span>
                </div>
            </div>
            <ul id="dictModalList" style="list-style:none; padding:0; margin:0; overflow-y:auto; flex:1; max-height:none; overscroll-behavior:contain;"></ul>
        </div>
    `;
    
    modal.onclick = (e) => {
        if (e.target.id === 'kaspiDictModal') closeDictionaryModal();
    };
    
    document.body.appendChild(modal);

    // УМНОЕ СКРЫТИЕ КЛАВИАТУРЫ: Срабатывает при касании списка
    const listElem = document.getElementById('dictModalList');
    listElem.addEventListener('touchstart', () => {
        document.getElementById('dictModalSearch').blur();
    }, { passive: true });
}

function openDictionaryModal(colIndex, colName) {
    createDictionaryModal();
    currentModalColIndex = parseInt(colIndex);
    document.getElementById('dictModalTitle').innerText = colName;
    document.getElementById('dictModalSearch').value = '';
    document.getElementById('kaspiDictModal').style.display = 'flex';
    filterDictionary();
}

function closeDictionaryModal() {
    const modal = document.getElementById('kaspiDictModal');
    if (modal) modal.style.display = 'none';
}

function filterDictionary() {
    const query = document.getElementById('dictModalSearch').value.toLowerCase().trim();
    const list = document.getElementById('dictModalList');
    const countText = document.getElementById('dictModalCountText');
    const totalCount = document.getElementById('dictTotalCount');
    const dict = window.kaspiDicts[currentModalColIndex] || [];
    
    list.innerHTML = '';
    
    if (countText && totalCount) {
        countText.innerText = query === '' ? t('dict_total') : t('dict_search_in');
        totalCount.innerText = dict.length;
    }
    
    let allFiltered = dict;

    if (query !== '') {
        allFiltered = dict.filter(val => String(val).toLowerCase().includes(query));
        
        allFiltered.sort((a, b) => {
            const strA = String(a).toLowerCase();
            const strB = String(b).toLowerCase();
            const getScore = (str) => {
                if (str.startsWith(query)) return 1; 
                if (new RegExp(`(^|\\s|_|-)${query}`).test(str)) return 2; 
                return 3; 
            };
            const scoreA = getScore(strA);
            const scoreB = getScore(strB);
            
            if (scoreA !== scoreB) return scoreA - scoreB;
            return strA.localeCompare(strB);
        });
    }

    const displayLimit = 100;
    const filteredToDisplay = allFiltered.slice(0, displayLimit);
    
    if (filteredToDisplay.length === 0) {
        if (query.length > 0) {
            list.innerHTML = `
                <li style="padding:15px; text-align:center; color:#888;">
                    <div style="margin-bottom: 10px;">${t('dict_not_found')}</div>
                    <button onclick="selectDictionaryValue('${query.replace(/'/g, "\\'")}', true)" style="padding:10px 15px; background:#eab308; color:#854d0e; border:none; border-radius:6px; font-weight:bold; width:100%; font-size:14px; cursor:pointer;">
                        ✏️ ${t('dict_use_custom')} "${query}"
                    </button>
                </li>`;
        } else {
            list.innerHTML = `<li style="padding:15px; text-align:center; color:#888;">${t('dict_start_typing')}</li>`;
        }
        return;
    }

    filteredToDisplay.forEach(val => {
        const regex = new RegExp(`(${query})`, "gi");
        const highlighted = query ? String(val).replace(regex, "<mark style='background:#fef08a; color:#854d0e;'>$1</mark>") : val;
        
        const li = document.createElement('li');
        li.style.cssText = 'padding:15px; border-bottom:1px solid var(--border-light, #333); cursor:pointer; font-size:14px;';
        li.innerHTML = highlighted;
        li.onclick = () => selectDictionaryValue(val, false);
        list.appendChild(li);
    });

    if (allFiltered.length > displayLimit) {
        const extraCount = allFiltered.length - displayLimit;
        const li = document.createElement('li');
        li.style.cssText = 'padding:15px; text-align:center; color:var(--text-muted, #888); font-size:13px; font-style:italic; background:rgba(0,0,0,0.2);';
        li.innerHTML = `${t('dict_and_more')} ${extraCount} ${t('dict_options')}.`;
        list.appendChild(li);
    }
}

function selectDictionaryValue(value, isCustom) {
    if (!value) return;
    const select = document.querySelector(`select[data-col-index="${currentModalColIndex}"]`);
    if (select) {
        const valId = `static_${value}`;
        let opt = select.querySelector(`option[value="${valId}"]`);
        
        if (!opt) {
            opt = document.createElement('option');
            opt.value = valId;
            opt.innerHTML = isCustom ? `✏️ ${value}` : `📌 ${value}`;
            opt.style.background = isCustom ? '#fefce8' : '#e0f2fe';
            opt.style.color = isCustom ? '#854d0e' : '#0369a1';
            select.appendChild(opt);
        }
        select.value = valId;
        updateSelectStates();
    }
    closeDictionaryModal();
}

// НОВАЯ ФУНКЦИЯ: Сброс при пустом поле ввода
function handleInputBlur(inputElem, colIndex) {
    if (inputElem.value.trim() === '') {
        const selectElem = document.querySelector(`select[data-col-index="${colIndex}"]`);
        if (selectElem && selectElem.value === 'custom_input') {
            selectElem.value = ''; // Возвращаем на "Не выгружать"
            updateSelectStates();
        }
    }
}

// НОВАЯ ФУНКЦИЯ: Активация ручного ввода по клику на подсказку
function activateCustomInput(colIndex) {
    const selectElem = document.querySelector(`select[data-col-index="${colIndex}"]`);
    if (selectElem) {
        selectElem.value = 'custom_input';
        updateSelectStates();
    }
}

        // Глобальное хранилище состояния (чтобы передать данные от Фазы 1 к Фазе 2)
        let tempInvoiceState = null;

        async function processInvoiceFile() {
            const fileInput = document.getElementById('invoiceFileInput');
            if (!fileInput.files.length) return alert(translations[currentLang].inc_no_file);

            parsedInvoiceData = []; 
            invoiceGroups = {}; 
            
            // Берем только первый файл для Smart Flow (обычно накладные грузят по одной)
            const file = fileInput.files[0];
            let file_doc_no = 'UNKNOWN';
            let file_supplier = 'UNKNOWN';

            const b64Promise = new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
            const originalBase64 = await b64Promise;

            const dataPromise = new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => resolve(new Uint8Array(e.target.result));
                reader.readAsArrayBuffer(file);
            });
            const arrayBuffer = await dataPromise;

            const markers = (invoiceSynonyms['supplier_keywords'] || ["the seller", "vendor", "supplier", "поставщик"]);
            
            function isSynonymLocal(cellValue, targetKey) {
                if (!cellValue) return false;
                const cleanCell = String(cellValue).replace(/\s+/g, '').toLowerCase();
                const synonymsList = (invoiceSynonyms[targetKey] || []).map(s => s.replace(/\s+/g, '').toLowerCase());
                return synonymsList.some(syn => syn !== "" && cleanCell.includes(syn));
            }

            try {
                const workbook = XLSX.read(arrayBuffer, {type: 'array'});
                // Ищем первый непустой лист
                let rows = [];
                let sheetName = '';
                for (let sName of workbook.SheetNames) {
                    let sRows = XLSX.utils.sheet_to_json(workbook.Sheets[sName], {header: 1});
                    if (sRows && sRows.length > 0) {
                        rows = sRows;
                        sheetName = sName;
                        break;
                    }
                }
                if (rows.length === 0) throw new Error("Пустой файл");

                // Поиск поставщика и номера документа (оставляем вашу логику)
                for (let i = 0; i < Math.min(10, rows.length); i++) {
                    let row = rows[i] || [];
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
                        if (isSynonymLocal(row[j], 'invoice_no')) {
                            let val = String(row[j+1] || '').trim();
                            if (val && val !== 'UNKNOWN') file_doc_no = val;
                        }
                    }
                }

                if (file_supplier === 'UNKNOWN') file_supplier = translations[currentLang].inc_sup_unknown || 'Не указан'; 
                if (file_doc_no === 'UNKNOWN' || file_doc_no === '') {
                    let now = new Date();
                    file_doc_no = `IN-${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
                }

                // Поиск шапки таблицы
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
                    let headerRow = rows[headerRowIdx] || []; 
                    let colMap = { code: -1, barcode: -1, brand: -1, desc: -1, qty: -1, price: -1, cbm: -1, weight: -1 };
                    let unmappedCols = []; // Сюда соберем всё, что система не узнала

                    for (let j = 0; j < headerRow.length; j++) {
                        let val = String(headerRow[j] || '').replace(/[\r\n]+/g, ' ').trim();
                        if (!val || val.toLowerCase().includes('total') || val.toLowerCase().includes('итого')) continue;
                        
                        let v = val.toLowerCase();
                        let isMapped = false;

                        if (colMap.code === -1 && (isSynonymLocal(val, 'id') || v === 'код' || v === 'id' || v === 'артикул')) { colMap.code = j; isMapped = true; }
                        else if (colMap.barcode === -1 && (isSynonymLocal(val, 'barcode') || v === 'sku' || v === 'штрихкод' || v === 'barcode')) { colMap.barcode = j; isMapped = true; }
                        else if (colMap.qty === -1 && (isSynonymLocal(val, 'qty') || v === 'кол' || v === 'кол-во' || v === 'qty' || v === 'количество')) { colMap.qty = j; isMapped = true; }
                        else if (colMap.price === -1 && (isSynonymLocal(val, 'price') || v === 'цена' || v === 'price')) { colMap.price = j; isMapped = true; }
                        else if (colMap.brand === -1 && (isSynonymLocal(val, 'brand') || v === 'бренд' || v === 'brand')) { colMap.brand = j; isMapped = true; }
                        else if (colMap.desc === -1 && (isSynonymLocal(val, 'name') || v === 'наименование' || v === 'название' || v === 'model')) { colMap.desc = j; isMapped = true; }
                        else if (colMap.cbm === -1 && isSynonymLocal(val, 'cbm')) { colMap.cbm = j; isMapped = true; }
                        else if (colMap.weight === -1 && isSynonymLocal(val, 'weight')) { colMap.weight = j; isMapped = true; }

                        if (!isMapped) {
                            unmappedCols.push({ index: j, name: val });
                        }
                    }

                    // Сохраняем стейт для Фазы 2
                    tempInvoiceState = { rows, firstDataRowIdx, headerRow, colMap, file_doc_no, file_supplier, originalBase64, fileName: file.name, unmappedCols };

                    // Генерируем UI Маппера
                    generateMapperUI(unmappedCols, headerRow);

                } else {
                    alert(translations[currentLang].inc_err_sheet_no_table);
                }
            } catch (err) {
                console.error(err);
                alert(translations[currentLang].inc_file_corrupted);
            }
        }

        function generateMapperUI(unmappedCols, headerRow) {
            const container = document.getElementById('mapperRowsContainer');
            container.innerHTML = '';

            const rows = tempInvoiceState.rows;
            const startIdx = tempInvoiceState.firstDataRowIdx;
            const colMap = tempInvoiceState.colMap; 

            let indexToSystemKey = {};
            for (let key in colMap) {
                if (colMap[key] !== -1) {
                    indexToSystemKey[colMap[key]] = key;
                }
            }

            headerRow.forEach((colName, index) => {
                if (!colName || String(colName).trim() === '') return;

                let previews = [];
                for (let i = startIdx; i < Math.min(startIdx + 20, rows.length); i++) {
                    let val = String(rows[i][index] || '').trim();
                    if (val !== '' && previews.length < 3) {
                        previews.push(val);
                    }
                }
                
                // Выводим примеры каждый с новой строки
                let previewText = previews.length > 0 
                    ? previews.map(p => `<div style="margin-top:2px; color:var(--text-muted); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">- ${p}</div>`).join('')
                    : `<div style="opacity:0.6; font-size:11px; margin-top:2px;">${translations[currentLang]?.mapper_empty || 'Пустая колонка'}</div>`;

                // Проверяем, узнала ли система колонку по словарю (чтобы потом покрасить в зеленый)
                let isRecognized = (indexToSystemKey[index] !== undefined);
                let guessedKey = indexToSystemKey[index];

                // Если система не узнала колонку: смотрим, есть ли в ней данные
                if (!guessedKey) {
                    if (previews.length === 0) {
                        guessedKey = 'skip'; // Если пустая -> сразу ставим "Пропустить"
                    } else {
                        guessedKey = 'attribute'; // Если есть данные -> предлагаем сохранить в JSON
                    }
                }

                // Убрали (JSON) из названия
                const options = [
                    { val: 'attribute', label: `➕ ${translations[currentLang]?.mapper_attr || 'Доп. атрибут'}` },
                    { val: 'skip', label: `❌ ${translations[currentLang]?.mapper_skip || 'Пропустить'}` },
                    { val: 'disabled', label: '──────────' },
                    { val: 'code', label: translations[currentLang]?.mapper_code || 'Код / Артикул' },
                    { val: 'barcode', label: translations[currentLang]?.mapper_barcode || 'Штрихкод' },
                    { val: 'brand', label: translations[currentLang]?.mapper_brand || 'Бренд' },
                    { val: 'desc', label: translations[currentLang]?.mapper_desc || 'Наименование' },
                    { val: 'qty', label: `❗️ ${translations[currentLang]?.mapper_qty || 'Кол-во'}` },
                    { val: 'price', label: `❗️ ${translations[currentLang]?.mapper_price || 'Цена'}` },
                    { val: 'cbm', label: translations[currentLang]?.mapper_cbm || 'Объем (CBM)' },
                    { val: 'weight', label: translations[currentLang]?.mapper_weight || 'Вес (кг)' }
                ];

                let optionsHtml = options.map(opt => {
                    if (opt.val === 'disabled') return `<option disabled>${opt.label}</option>`;
                    let selected = (guessedKey === opt.val) ? 'selected' : '';
                    return `<option value="${opt.val}" ${selected}>${opt.label}</option>`;
                }).join('');

                let labelColor = isRecognized ? 'var(--accent-green, #4caf50)' : 'var(--text-main)';
                let titlePrefix = isRecognized ? '✓ ' : '';

                // Адаптивная верстка: flex: 0 0 60% (левая часть) и flex: 0 0 40% (правая часть)
                let rowHtml = `
                    <div class="mapper-row" data-col-index="${index}" data-col-name="${colName}" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                        <div style="flex: 0 0 60%; padding-right: 10px; overflow: hidden;">
                            <div class="mapper-col-title" data-orig-name="${colName}" style="font-weight: bold; font-size: 13px; word-break: break-word; transition: all 0.2s ease;">${colName}</div>
                            <div style="font-style: italic;">${previewText}</div>
                        </div>
                        <div style="flex: 0 0 40%;">
                            <select class="mapper-select" onchange="updateMapperOptions()" style="width: 100%; padding: 12px 8px; min-height: 44px; background: var(--bg-body); color: var(--text-main); border: 1px solid var(--border-main); border-radius: 6px; font-size: 14px; outline: none; text-overflow: ellipsis;">
                                ${optionsHtml}
                            </select>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', rowHtml);
            });

            if (document.getElementById('parseInvoiceBtn')) document.getElementById('parseInvoiceBtn').style.display = 'none';
            document.getElementById('dataMapperArea').style.display = 'flex';
            document.getElementById('invoicePreviewArea').style.display = 'none';
            setTimeout(() => {
                if (typeof updateMapperOptions === 'function') {
                    updateMapperOptions();
                }
            }, 50);
        }

        function applyUserMapping() {
            if (!tempInvoiceState) return;
            const { rows, firstDataRowIdx, file_doc_no, file_supplier, originalBase64, fileName } = tempInvoiceState;
            
            // СБРОС КАРТЫ: Начинаем с чистого листа, доверяем только интерфейсу
            let colMap = { code: -1, barcode: -1, brand: -1, desc: -1, qty: -1, price: -1, cbm: -1, weight: -1 };
            let jsonCols = []; // Изменили название для логики: сюда пойдет всё для JSON

            let hasDuplicates = false;
            const mapperRows = document.querySelectorAll('.mapper-row');
            mapperRows.forEach(row => {
                const colIdx = parseInt(row.getAttribute('data-col-index'));
                const colName = row.getAttribute('data-col-name');
                const action = row.querySelector('.mapper-select').value;

                if (action !== 'skip') {
                    // Если колонку не пропустили — она железно идет в JSON
                    jsonCols.push({ index: colIdx, name: colName });
                    
                    // Если это еще и системная роль (не просто атрибут), то привязываем ее
                    if (action !== 'attribute') {
                        if (colMap[action] !== -1) hasDuplicates = true;
                        colMap[action] = colIdx;
                    }
                }
            });

            if (hasDuplicates) {
                return alert(translations[currentLang]?.mapper_err_dup || 'Ошибка: Вы назначили одну и ту же роль сразу нескольким колонкам!');
            }

            // ВАЛИДАЦИЯ (теперь требуем только Количество и Цену)
            if (colMap.qty === -1 || colMap.price === -1) {
                return alert(translations[currentLang]?.mapper_err_missing || 'Ошибка: Обязательно укажите колонки «Кол-во» и «Цена»!');
            }

            parsedInvoiceData = [];
            invoiceGroups[file_doc_no] = { supplier: file_supplier, items: [], originalFiles: [{ fileName, fileBase64: originalBase64 }] };

            let lastCode = "UNKNOWN", lastBrand = "", lastDesc = "";
            
            // ОСНОВНОЙ ЦИКЛ ПАРСИНГА
            for (let i = firstDataRowIdx; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.length === 0) continue;

                let actualCodeIdx = colMap.code !== -1 ? colMap.code : colMap.barcode;
                let codeCell = actualCodeIdx !== -1 ? String(row[actualCodeIdx] || '').trim() : '';
                let rawBarcode = colMap.barcode !== -1 ? String(row[colMap.barcode] || '').trim() : ''; // <-- Убрали codeCell в конце
                
                let qty = parseFloat(row[colMap.qty]);
                let price = parseFloat(row[colMap.price]);
                let brandStr = colMap.brand !== -1 ? String(row[colMap.brand] || '').trim() : '';
                let descStr = colMap.desc !== -1 ? String(row[colMap.desc] || '').trim() : '';

                if (codeCell === "" && (!isNaN(qty) || !isNaN(price))) {
                    codeCell = lastCode; brandStr = brandStr || lastBrand; descStr = descStr || lastDesc;
                } else if (codeCell !== "") {
                    if (codeCell.toUpperCase().includes('TOTAL')) break;
                    lastCode = codeCell; lastBrand = brandStr; lastDesc = descStr;
                } else {
                    break; 
                }

                if (!isNaN(qty) && !isNaN(price)) {
                    let finalNameParts = [];
                    if (brandStr && !descStr.toUpperCase().includes(brandStr.toUpperCase())) finalNameParts.push(brandStr.toUpperCase());
                    if (descStr) finalNameParts.push(descStr);
                    let finalName = finalNameParts.join(' ').trim() || codeCell;

                    // Упаковка JSON (теперь включает вообще все полезные колонки)
                    let attributesObj = {};
                    jsonCols.forEach(col => {
                        let val = String(row[col.index] || '').trim();
                        if (val) attributesObj[col.name] = val;
                    });
                    let finalAttributes = Object.keys(attributesObj).length > 0 ? JSON.stringify(attributesObj) : "";

                    const itemData = {
                        doc_no: file_doc_no, category: file_doc_no, supplier: file_supplier,
                        item_id: codeCell, barcode: rawBarcode, item_name: finalName,
                        qty: qty, cost: price,
                        cbm: colMap.cbm !== -1 ? (parseFloat(String(row[colMap.cbm]).replace(',', '.')) || "") : "",
                        weight: colMap.weight !== -1 ? (parseFloat(String(row[colMap.weight]).replace(',', '.')) || "") : "",
                        attributes: finalAttributes,
                        staff_id: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.uid : 'Auto-Import'
                    };

                    parsedInvoiceData.push(itemData);
                    invoiceGroups[file_doc_no].items.push(itemData);
                }
            }

            // РЕНДЕР ИТОГОВОЙ ТАБЛИЦЫ
            document.getElementById('invoiceMetadata').innerHTML = `
                <span style="color:var(--text-muted); font-size:13px;">${translations[currentLang].inc_lbl_sup}</span> 
                <span style="color:var(--accent-yellow); font-weight:bold; font-size:14px;">${file_supplier}</span> 
                <span style="color:var(--border-light); margin:0 10px;">|</span> 
                <span style="color:var(--text-muted); font-size:13px;">${translations[currentLang].inc_lbl_doc}</span> 
                <span style="color:var(--accent-yellow); font-weight:bold;">${file_doc_no}</span> 
                <span style="color:var(--border-light); margin:0 10px;">|</span> 
                <span style="color:var(--text-muted); font-size:13px;">${translations[currentLang].inc_lbl_items}</span> 
                <span style="color:var(--accent-yellow); font-weight:bold; font-size:14px;">${parsedInvoiceData.length}</span>
            `;
            
            document.getElementById('invoiceTableBody').innerHTML = parsedInvoiceData.map(item => `
                <tr style="border-bottom:1px solid var(--border-light); color:var(--text-main);">
                    <td style="padding:5px;">${item.item_id}</td>
                    <td style="padding:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
                        ${item.item_name}
                        ${item.attributes ? `<br><span style="font-size:10px; color:var(--text-muted);">+ ${Object.keys(JSON.parse(item.attributes)).length} атрибутов</span>` : ''}
                    </td>
                    <td style="padding:5px; text-align:right;">${Number(item.qty).toLocaleString('ru-RU')}</td>
                    <td style="padding:5px; text-align:right;">${item.cbm || '-'}</td>
                    <td style="padding:5px; text-align:right;">${item.weight || '-'}</td>
                    <td style="padding:5px; text-align:right; font-weight:bold;">${Number(item.cost).toLocaleString('ru-RU')}</td>
                </tr>`).join('');
            
            document.getElementById('dataMapperArea').style.display = 'none';
            document.getElementById('invoicePreviewArea').style.display = 'flex';
        }

        function updateMapperOptions() {
            const allSelects = document.querySelectorAll('.mapper-select');
            
            // 1. Собираем все занятые роли
            let selectedRoles = [];
            allSelects.forEach(select => {
                let val = select.value;
                if (val !== 'attribute' && val !== 'skip' && val !== 'disabled') {
                    selectedRoles.push(val);
                }
            });

            // 2. Проходим по всем спискам и меняем UI
            allSelects.forEach(select => {
                let currentVal = select.value;
                
                select.style.fontWeight = 'bold';
                select.style.transition = 'all 0.2s ease';
                
                // --- БРОНЕБОЙНЫЙ ПОИСК ЛЕВОЙ КОЛОНКИ ---
                // Ищем родительскую строку (div с классом mapper-row)
                const row = select.closest('.mapper-row');
                let leftTitle = null;
                let origName = '';

                if (row) {
                    // Берем оригинальное имя прямо из атрибута строки
                    origName = row.getAttribute('data-col-name') || '';
                    // Находим заголовок по структуре
                    if (row.children[0] && row.children[0].children[0]) {
                        leftTitle = row.children[0].children[0];
                    }
                }

                // --- БЛОК 1: ПРОПУСТИТЬ ---
                if (currentVal === 'skip') {
                    select.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                    select.style.borderColor = 'rgba(244, 67, 54, 0.4)';
                    select.style.color = 'var(--text-main)'; 
                    
                    if (leftTitle) {
                        leftTitle.style.color = '#d32f2f'; // Ярко-красный
                        leftTitle.style.textDecoration = 'line-through';
                        leftTitle.innerText = origName; 
                    }
                    
                // --- БЛОК 2: ДОП. АТРИБУТ ---
                } else if (currentVal === 'attribute') {
                    select.style.backgroundColor = 'rgba(33, 150, 243, 0.15)';
                    select.style.borderColor = 'rgba(33, 150, 243, 0.5)';
                    select.style.color = 'var(--text-main)';
                    
                    if (leftTitle) {
                        leftTitle.style.color = '#1976d2'; // Голубой
                        leftTitle.style.textDecoration = 'none';
                        leftTitle.innerText = origName; 
                    }
                    
                // --- БЛОК 3: СИСТЕМНЫЕ КОЛОНКИ (Выбрано) ---
                } else {
                    select.style.backgroundColor = 'rgba(76, 175, 80, 0.15)';
                    select.style.borderColor = 'rgba(76, 175, 80, 0.5)';
                    select.style.color = 'var(--text-main)';
                    
                    if (leftTitle) {
                        leftTitle.style.color = '#2e7d32'; // Ярко-зеленый
                        leftTitle.style.textDecoration = 'none';
                        leftTitle.innerText = '✅ ' + origName; 
                    }
                }

                // --- ФИКС БЕЛОГО ТЕКСТА ВНУТРИ СПИСКА ---
                let options = select.querySelectorAll('option');
                options.forEach(opt => {
                    if (opt.value === 'attribute' || opt.value === 'skip' || opt.value === 'disabled') {
                        opt.style.backgroundColor = '';
                        opt.style.color = '#222';
                        return;
                    }
                    if (selectedRoles.includes(opt.value) && opt.value !== currentVal) {
                        opt.disabled = true;
                        opt.style.backgroundColor = '#ecf0f1';
                        opt.style.color = '#95a5a6';
                    } else {
                        opt.disabled = false;
                        opt.style.backgroundColor = ''; 
                        opt.style.color = '#222';
                    }
                });
            });
        }

        function showMapperArea() {
            document.getElementById('dataMapperArea').style.display = 'flex';
            document.getElementById('invoicePreviewArea').style.display = 'none';
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

                    group.items.forEach(item => item.file_code = fp);

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
                const now = new Date();
                const localTime = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU');
                const cmdId = 'BM-' + Math.random().toString(36).substring(7).toUpperCase();

                const commandTx = {
                    action: 'bulk_markup', // Тот самый ключ для бэкенда
                    tx_id: cmdId,
                    created_at: localTime,
                    category: targetMarkupCategory,
                    markup_type: isPercent ? 'percent' : 'fix',
                    value: value
                };

                // Отправляем команду в новый кузов диспетчера
                if (typeof window.addToOfflineQueue === 'function') {
                    window.addToOfflineQueue(commandTx);
                }
                
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

        // ==========================================
// ЛОГИКА КАСТОМНОГО NUMPAD ДЛЯ QUICK EDIT
// ==========================================

let activeQeFieldId = 'qe-price';

function setQeActiveField(fieldId) {
    activeQeFieldId = fieldId;
    
    // Сбрасываем стили у всех 3-х полей
    const fields = ['qe-title', 'qe-price', 'qe-barcode'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.border = '1px solid #444';
    });

    // Подсвечиваем активное
    const activeEl = document.getElementById(activeQeFieldId);
    if (activeEl) {
        activeEl.style.border = '2px solid #007bff';
        
        // Позволяем вводить текст с системной клавиатуры ТОЛЬКО в поле "Наименование"
        if (fieldId === 'qe-title') {
            activeEl.removeAttribute('readonly');
            activeEl.focus();
        } else {
            document.getElementById('qe-title').setAttribute('readonly', 'true');
        }
    }
}

function qeAddDigit(digit, e) {
    if (e) e.preventDefault();
    if (activeQeFieldId === 'qe-title') return;
    const input = document.getElementById(activeQeFieldId);
    if (input) {
        input.value += digit;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

function qeDelDigit(e) {
    if (e) e.preventDefault();
    if (activeQeFieldId === 'qe-title') return;
    const input = document.getElementById(activeQeFieldId);
    if (input && input.value.length > 0) {
        input.value = input.value.slice(0, -1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

function qeClearField(e) {
    if (e) e.preventDefault();
    if (activeQeFieldId === 'qe-title') return;
    const input = document.getElementById(activeQeFieldId);
    if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

function initQeNumpad() {
    setQeActiveField('qe-price');
}

    let tokenClient;
    let clientAccessToken = ''; // НОВАЯ ПЕРЕМЕННАЯ: сохраняем токен клиента для Установщика

    // 1. Детектор встроенных браузеров
    function isBadInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        return (ua.indexOf('Telegram') > -1 || ua.indexOf('Instagram') > -1 || ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1);
    }

    // Функция ждет, пока Google полностью скачается

    // Детектор видимости страницы
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                console.log("Приложение развернуто из фона. Сброс блокировок.");
                isAuthPending = false;
            }
        });

function initGoogleAuth() {
    try {
        if (isBadInAppBrowser()) {
            // Твоя заглушка для встроенных браузеров
            document.getElementById('google-screen').innerHTML = `...`;
            return;
        }

        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID, 
            scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive',
            
            callback: (tokenResponse) => {
                isAuthPending = false; 
                
                if (tokenResponse && tokenResponse.access_token) {
                    clientAccessToken = tokenResponse.access_token;
                    
                    const googleScreen = document.getElementById('google-screen');
                    
                    // Отрисовка с подстановкой текста из словаря и сохранением data-i18n для смены языка на лету
                    googleScreen.innerHTML = `
                        <h2 data-i18n="auth_checking" style="color: var(--accent-yellow); margin-bottom: 15px;">${translations[currentLang].auth_checking}</h2>
                        <p data-i18n="auth_connecting" style="color: var(--text-main);">${translations[currentLang].auth_connecting}</p>
                    `;

                    let currentEmail = "";

                    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: { Authorization: 'Bearer ' + clientAccessToken }
                    })
                    .then(async (res) => {
                        const text = await res.text();
                        if (!res.ok) throw new Error(`Ошибка Google Auth ${res.status}: ${text}`);
                        try { return JSON.parse(text); } 
                        catch { throw new Error(`Google вернул не JSON:\n${text}`); }
                    })
                    .then(userInfo => {
                        currentEmail = userInfo.email; 
                        return fetch(GATEWAY_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                            body: JSON.stringify({ action: 'check_status', email: currentEmail })
                        }); 
                    })
                    .then(async (res) => {
                        const text = await res.text();
                        try { return JSON.parse(text); } 
                        catch { throw new Error("Сервер GAS вернул не JSON:\n" + text); }
                    })
                    .then(serverResult => {
                        if (serverResult.success === false && serverResult.error) {
                            throw new Error(serverResult.error);
                        }

                        if (serverResult.status === "NEW_USER" || serverResult.status === "NEW_CLIENT") {
                            if (typeof showInstallerForm === 'function') {
                                showInstallerForm(currentEmail); 
                            } else {
                                throw new Error("Функция установки showInstallerForm не найдена в коде!");
                            }
                        } else if (serverResult.status === "EXISTING_CLIENT") {
                            if (serverResult.api_key) {
                                localStorage.setItem('CLIENT_API_KEY', serverResult.api_key);
                                CLIENT_API_KEY = serverResult.api_key; 
                            }
                            googleScreen.style.display = 'none';
                            document.getElementById('pin-screen').style.display = 'flex'; 
                        } else if (serverResult.status === "BLOCKED") {
                            throw new Error(translations[currentLang].auth_blocked);
                        } else {
                            throw new Error("Неизвестный статус от сервера: " + JSON.stringify(serverResult));
                        }
                    })
                    .catch(err => {
                        console.error("КРИТИЧЕСКАЯ ОШИБКА:", err);
                        
                        // Отрисовка ошибки с учетом словаря
                        googleScreen.innerHTML = `
                            <div style="color: #ff6b6b; padding: 20px; text-align: left; background: #1a1a1a; border-radius: 8px; border: 1px solid #333;">
                                <h2 data-i18n="auth_error_title" style="margin-top: 0;">${translations[currentLang].auth_error_title}</h2>
                                <pre style="white-space: pre-wrap; font-size: 13px; background: #000; padding: 10px; border-radius: 4px; color: #ffb3b3;">${err.message}</pre>
                                <button onclick="window.location.reload(true)" data-i18n="auth_retry" style="margin-top: 15px; padding: 10px 20px; background: #ff6b6b; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                                    ${translations[currentLang].auth_retry}
                                </button>
                            </div>
                        `;
                    });
                }
            }
        });
    } catch (e) {
        console.error("Ошибка инициализации:", e);
    }
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

            <!-- 1. НОВАЯ КАРТОЧКА: Отказ в лицензии -->
            <div id="license-error-card" style="display: none; background: var(--bg-card); border: 1px solid var(--accent-red); padding: 15px; border-radius: 8px; margin-top: 15px; text-align: left;">
                <div style="font-size: 24px; margin-bottom: 10px;">🛑</div>
                <h3 data-i18n="setup_license_error_title" style="color: var(--accent-red); margin-bottom: 5px;"></h3>
                <p data-i18n="setup_license_error_desc" style="color: var(--text-main); font-size: 14px; margin-bottom: 10px;"></p>
                <ul style="color: var(--text-muted); font-size: 12px; margin-left: 20px; line-height: 1.5;">
                    <li data-i18n="setup_license_error_step1"></li>
                    <li data-i18n="setup_license_error_step2"></li>
                </ul>
            </div>

            <!-- 2. СТАРАЯ КАРТОЧКА: Ошибка сети -->
            <div id="network-error-card" style="display: none; margin-top: 15px; padding: 15px; background-color: rgba(255, 170, 0, 0.08); border: 1px solid rgba(255, 170, 0, 0.3); border-radius: 8px; text-align: left; box-sizing: border-box;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 10px;">⚠️</span>
                    <strong style="color: #ffb74d; font-size: 14px; letter-spacing: 0.3px;" data-i18n="setup_network_error_title"></strong>
                </div>
                <p style="color: #e0e0e0; font-size: 13px; margin: 0 0 12px 0; line-height: 1.4;" data-i18n="setup_network_error_desc"></p>
                <ul style="color: #aaaaaa; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.5;">
                    <li style="margin-bottom: 4px;" data-i18n="setup_network_error_step1"></li>
                    <li style="margin-bottom: 4px;" data-i18n="setup_network_error_step2"></li>
                    <li data-i18n="setup_network_error_step3"></li>
                </ul>
            </div>
            
            <!-- Подвал -->
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
    const btn = document.getElementById('btn-start-setup');
    if (!btn) return;

    // 1. БЛОКИРУЕМ КНОПКУ (от двойных кликов)
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // 2. === ПОЛНАЯ ОЧИСТКА ИНТЕРФЕЙСА ОТ ПРОШЛЫХ ОШИБОК ===
    const networkCard = document.getElementById('network-error-card');
    if (networkCard) networkCard.style.display = 'none';

    const licenseCard = document.getElementById('license-error-card');
    if (licenseCard) licenseCard.style.display = 'none';
    
    const errEl = document.getElementById('setupError');
    if (errEl) {
        errEl.innerHTML = '';
        errEl.style.display = 'none';
    }
    // ========================================================

    // 3. СЧИТЫВАЕМ ДАННЫЕ
    const storeName = document.getElementById('setup-store-name').value.trim() || 'Мой Магазин';
    const planType = document.getElementById('setup-plan-type').value;

    // 4. ПРОВЕРКА ТОКЕНА
    if (!clientAccessToken) {
        console.error("❌ Ошибка: Нет clientAccessToken");
        showSetupError("Ошибка доступа к Диску. Попробуйте обновить страницу и войти заново.");
        btn.disabled = false; // Оживляем кнопку
        btn.style.opacity = '1';
        return;
    }

    const extractId = (url) => {
        if (!url) return null;
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        return match ? match[1] : url.trim();
    };

    // 5. ПРОВЕРКА ID ШАБЛОНОВ
    console.log("🔍 Проверка ID шаблонов...");
    const tradeId = extractId(typeof TEMPLATE_TRADE_URL !== 'undefined' ? TEMPLATE_TRADE_URL : '');
    const configId = extractId(typeof TEMPLATE_CONFIG_URL !== 'undefined' ? TEMPLATE_CONFIG_URL : '');

    if (!tradeId || !configId) {
        console.error("❌ Ошибка: Неверный формат ссылок на шаблоны", {tradeId, configId});
        showSetupError("Системная ошибка: Неверный формат ссылок на шаблоны.");
        btn.disabled = false; // Оживляем кнопку
        btn.style.opacity = '1';
        return;
    }

    console.log("✅ Все проверки пройдены, начинаем проверку лицензии и создание папок!");

    try {
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ru';
        const dict = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};

        // === НОВЫЙ БЛОК: ПРОВЕРКА ЛИЦЕНЗИИ ПЕРЕД УСТАНОВКОЙ ===
        btn.innerHTML = `⚙️ <span style="font-size: 14px;">${lang === 'kk' ? 'Лицензияны тексеру...' : 'Проверка лицензии...'}</span>`;
        
        const checkRes = await fetch(GATEWAY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                action: 'checkLicense',
                email: email,
                storeName: storeName
            })
        });

        if (!checkRes.ok) throw new Error("NetworkError: Сбой сервера при проверке базы.");
        const checkResult = await checkRes.json();

        // Если статус 'error'
        if (checkResult.status === 'error') {
            if (checkResult.message === 'already_exists') {
                
                // 1. Показываем карточку
                const licenseCard = document.getElementById('license-error-card');
                if (licenseCard) licenseCard.style.display = 'block';
                
                // 2. Оживляем кнопку для новой попытки
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.innerHTML = dict.setup_btn_retry || (lang === 'kz' || lang === 'kk' ? 'Қайталау' : 'Повторить попытку');
                
                return; // 🛑 ЖЕСТКО БЛОКИРУЕМ ДАЛЬНЕЙШЕЕ СОЗДАНИЕ ПАПОК
            } else {
                throw new Error(`Ошибка базы данных: ${checkResult.message}`);
            }
        }
        
        // Если статус 'success' (новое подключение или 'resume' после сбоя) — идем дальше
        // =======================================================

        btn.innerHTML = `⚙️ <span style="font-size: 14px;">${dict.setup_process_folder || 'Создание...'}</span>`;
            
        // 1. НАХОДИМ ИЛИ СОЗДАЕМ КОРНЕВУЮ ПАПКУ
            const rootFolderName = `POS_System_Data - ${storeName}`;
            const rootId = await getOrCreateDriveFolder(rootFolderName, clientAccessToken);

            btn.innerHTML = `⚙️ <span style="font-size: 14px;">${translations[currentLang].setup_process_struct}</span>`;
            
            // 2. НАХОДИМ ИЛИ СОЗДАЕМ ПОДПАПКИ СТРОГО ПО ОЧЕРЕДИ
            let folderIds = {};

            // ДОБАВЬТЕ ЭТУ СТРОКУ: Кладем ID корневой папки в объект
            folderIds['POS_Root'] = rootId; 

            const subfolders = ['POS_Backups', 'POS_Images', 'POS_Invoices', 'POS_Secret_Backups'];

            for (const name of subfolders) {
                folderIds[name] = await getOrCreateDriveFolder(name, clientAccessToken, rootId);
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
        // 🚨 ВЫВОДИМ РЕАЛЬНУЮ ОШИБКУ В КОНСОЛЬ
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ru';
        const dict = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};

        // 1. Оживляем кнопку
        const actionBtn = document.getElementById('btn-start-setup');
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.removeAttribute('disabled');
            actionBtn.style.opacity = '1';
            actionBtn.style.pointerEvents = 'auto';
            actionBtn.innerHTML = dict.setup_btn_retry || (lang === 'kz' || lang === 'kk' ? 'Қайталау' : 'Повторить попытку');
        }

        // 2. УБРАЛИ 'TypeError', теперь ловим ТОЛЬКО реальные проблемы с сетью
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            const card = document.getElementById('network-error-card');
            if (card) {
                card.style.display = 'block';
                
                const title = card.querySelector('[data-i18n="setup_network_error_title"]');
                const desc = card.querySelector('[data-i18n="setup_network_error_desc"]');
                const step1 = card.querySelector('[data-i18n="setup_network_error_step1"]');
                const step2 = card.querySelector('[data-i18n="setup_network_error_step2"]');
                const step3 = card.querySelector('[data-i18n="setup_network_error_step3"]');

                if (title) title.innerHTML = dict.setup_network_error_title || '⚠️ Нет связи с Google Диском';
                if (desc) desc.innerHTML = dict.setup_network_error_desc || 'Сбой сети';
                if (step1) step1.innerHTML = dict.setup_network_error_step1 || 'Проверьте интернет';
                if (step2) step2.innerHTML = dict.setup_network_error_step2 || 'Отключите антивирус';
                if (step3) step3.innerHTML = dict.setup_network_error_step3 || 'Смените браузер';
            }
        } else {
            // 3. Выводим все остальные (скрытые) ошибки стандартным способом
            if (typeof showSetupError === 'function') {
                showSetupError("Системный сбой: " + error.message);
            }
        }
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

let isAuthPending = false;
let lastLoginClickTime = 0; // НОВОЕ: переменная для фиксации времени клика

// Детектор возврата из кэша браузера (bfcache)
window.addEventListener('pageshow', (event) => {
    // Если страница восстановлена из "замороженного" состояния
    if (event.persisted) {
        console.log("Страница восстановлена из кэша. Жесткая перезагрузка...");
        window.location.reload(true);
    }
});

// Детектор видимости (оставляем, он спасает при выходе из фона)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        isAuthPending = false;
    }
});

function loginWithGoogle(event) {
    // 1. Блокируем стандартное поведение браузера (чтобы телефон не пытался обновить страницу сам)
    if (event) event.preventDefault();
    if (window.event) window.event.preventDefault();

    try {
        const now = Date.now();
        const btnSpan = document.querySelector('#login-btn span');

        // 2. Если скрипт Гугла еще качается в фоне
        if (typeof tokenClient === 'undefined' || !tokenClient) {
            if (btnSpan) btnSpan.innerText = "Ожидание Google...";
            
            // Через 2 секунды просто возвращаем текст обратно. БЕЗ ПЕРЕЗАГРУЗКИ.
            setTimeout(() => {
                if (btnSpan && typeof translations !== 'undefined' && translations[currentLang]) {
                    btnSpan.innerText = translations[currentLang].btn_google || "ВОЙТИ ЧЕРЕЗ GOOGLE";
                } else if (btnSpan) {
                    btnSpan.innerText = "ВОЙТИ ЧЕРЕЗ GOOGLE";
                }
            }, 2000);
            return; 
        }

        // 3. Защита от двойного клика
        if (isAuthPending) {
            if (now - lastLoginClickTime < 3000) {
                return; // Игнорируем частые нажатия
            }
            // Если прошло больше 3 секунд, а окно не открылось (например, сработал блокировщик рекламы)
            // Просто сбрасываем флаг, чтобы кассир мог нажать еще раз. БЕЗ ПЕРЕЗАГРУЗКИ.
            isAuthPending = false; 
        }

        // 4. Мгновенно вызываем Гугл, чтобы браузер не потерял "жест пользователя"
        tokenClient.requestAccessToken();

        // 5. Меняем визуал кнопки
        isAuthPending = true; 
        lastLoginClickTime = now; 
        
        if (btnSpan && typeof translations !== 'undefined' && translations[currentLang]) {
            btnSpan.innerText = translations[currentLang].auth_opening || "Запуск...";
        }

    } catch (err) {
        // Если телефон жестко заблокировал всплывающее окно, покажем ошибку на экране, а не будем втихую перезагружать!
        alert("Блокировка окна: " + err.message);
        isAuthPending = false;
        
        const btnSpan = document.querySelector('#login-btn span');
        if (btnSpan && typeof translations !== 'undefined' && translations[currentLang]) {
            btnSpan.innerText = translations[currentLang].btn_google || "ВОЙТИ ЧЕРЕЗ GOOGLE";
        }
    }
}

    // Сброс фокуса при сканировании штрихкода внутри модального окна
document.addEventListener('keydown', function(e) {
    if (e.target && e.target.id === 'qe-barcode' && e.key === 'Enter') {
        e.preventDefault(); 
        e.target.blur(); // Убираем курсор из поля, чтобы разблокировать экранную клавиатуру
    }
});
// =========================================================
// ЖЕСТКИЙ СБРОС BLUETOOTH-КЛАВИАТУРЫ В SAFARI (БЕЗ ТАЙМЕРОВ)
// =========================================================

document.addEventListener('click', function(e) {
    const el = e.target;
    
    // Работаем только с полями ввода в модальном окне
    if (el && el.tagName === 'INPUT' && el.closest('#quickEditModal')) {
        
        // 1. Убираем курсор
        el.blur();
        
        // 2. Секретный трюк iOS: временно делаем поле "только для чтения".
        // Это заставляет Safari полностью забыть про то, что к телефону 
        // подключен Bluetooth-сканер (аппаратная клавиатура).
        el.readOnly = true;
        
        // 3. Возвращаем нормальный режим и бьем фокусом.
        // Так как всё происходит синхронно в момент реального касания пальцем (click),
        // Safari не блокирует команду и 100% выводит виртуальную клавиатуру.
        el.readOnly = false;
        el.focus();
    }
});

// === ЛОГИКА БЛОКА ОФОРМЛЕНИЯ ПРИХОДА ===
document.addEventListener('click', function(e) {
    
    // 1. Открытие блока прихода (предположим, у кнопки открытия id="btn-open-receive")
    // ЗАМЕНИ 'btn-open-receive' на реальный ID твоей кнопки!
    if (e.target && e.target.closest('#btn-open-receive')) {
        document.getElementById('qe-receive-block').style.display = 'block';
        document.getElementById('qe-top-section').classList.add('form-disabled'); // Затемняем верх
    }

    // 2. Клик по полям Количество или Цена закупа
    if (e.target && (e.target.id === 'qe-receive-qty' || e.target.id === 'qe-receive-price')) {
        // Передаем управление твоей системной переменной из меморандума
        window.activeQeFieldId = e.target.id; 
        
        // Показываем твою системную клавиатуру
        const numpad = document.getElementById('custom-numpad');
        if (numpad) numpad.style.display = 'grid'; 

        // Подсвечиваем активное поле
        document.querySelectorAll('#modal-quick-edit input').forEach(inp => inp.style.borderColor = '#444');
        e.target.style.borderColor = '#4CAF50';
    }

    // 3. Кнопка "Назад" в блоке прихода
    // --- ЕДИНЫЙ БЛОК ДЛЯ КНОПКИ "НАЗАД" В ПРИХОДЕ ---
    if (e.target && e.target.closest('#btn-cancel-receive')) {
        e.preventDefault();
        document.getElementById('qe-receive-block').style.display = 'none';
        
        // Прячем нижнюю клавиатуру
        const numpad = document.getElementById('custom-numpad');
        if (numpad) numpad.style.display = 'none';
        
        // Возвращаем футер с кнопками
        const bottomButtons = document.getElementById('qe-bottom-buttons');
        if (bottomButtons) bottomButtons.style.display = 'flex';
        
        document.getElementById('qe-top-section').classList.remove('form-disabled');
        window.activeQeFieldId = null;
    }
});

// === ЛОГИКА ДЛЯ НОВОГО БЛОКА ПРИХОДА ===

// Добавляем глобальный флаг для подмодального окна
window.receiveNeedsClear = false; 

// 1. Активация полей (Количество / Цена)
window.activateReceiveField = function(el, event) {
    // 1. Блокируем всплытие клика, но НЕ блокируем работу самого инпута!
    if (event) {
        // Удалили event.preventDefault(); — именно он убивал значения на ПК
        event.stopPropagation();
    }
    
    // Прячем основную нижнюю клаву
    const mainNumpad = document.getElementById('custom-numpad');
    if (mainNumpad) mainNumpad.style.display = 'none';

    window.activeQeFieldId = el.id;
    window.receiveNeedsClear = true; // Команда стереть при первом вводе
    
    // Показываем внутреннюю клаву прихода ТОЛЬКО на мобилках
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        const receiveNumpad = document.getElementById('receive-numpad');
        if (receiveNumpad) receiveNumpad.style.display = 'grid'; 
    }
    
    // Подсветка активного поля
    document.querySelectorAll('#qe-receive-block input').forEach(inp => inp.style.borderColor = '#333');
    el.style.borderColor = '#4CAF50';

    // Выделение текста синим цветом для ПК
    setTimeout(() => {
        if (el.value) {
            el.setSelectionRange(0, el.value.length);
        }
    }, 10);
};

// 2. Ввод цифр с разделением на тысячи
window.receiveNumpad = function(val, e) {
    if (e && e.preventDefault) e.preventDefault(); // Добавил проверку на наличие e, на всякий случай
    if (!window.activeQeFieldId) return;
    
    const targetInput = document.getElementById(window.activeQeFieldId);
    if (!targetInput) return;

    // Убираем пробелы, чтобы работать с чистыми цифрами
    let currentVal = targetInput.value.replace(/\s/g, ''); 
    
    // <-- ДОБАВЛЕНО: Если это первое нажатие (и это не удаление), сбрасываем старое значение
    if (window.receiveNeedsClear && val !== 'C' && val !== 'DEL') {
        currentVal = '0';
    }
    window.receiveNeedsClear = false; // <-- ДОБАВЛЕНО: Сразу выключаем флаг, чтобы следующие цифры дописывались

    if (val === 'C') {
        currentVal = '0';
    } else if (val === 'DEL') {
        currentVal = currentVal.length > 1 ? currentVal.slice(0, -1) : '0';
    } else {
        currentVal = currentVal === '0' ? val : currentVal + val;
    }

    // Форматируем обратно с пробелами по стандартам
    targetInput.value = Number(currentVal).toLocaleString('ru-RU').replace(/,/g, ' ');
};

// 3. Логика кастомного списка поставщиков
// Открывает/закрывает кастомный список поставщиков
window.toggleSupplierDropdown = function() {
    const dropdown = document.getElementById('qe-supplier-dropdown');
    const arrow = document.getElementById('qe-supplier-arrow');
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
};

// Обработчик клика для выбора поставщика или нажатия "Новый"
window.handleQeSupplierClick = function(element) {
    const value = element.getAttribute('data-val');
    const text = element.getAttribute('data-text');
    
    const dropdown = document.getElementById('qe-supplier-dropdown');
    const trigger = document.getElementById('qe-supplier-trigger');
    const display = document.getElementById('qe-supplier-display');
    const hiddenInput = document.getElementById('qe-supplier');
    const newSupplierWrapper = document.getElementById('qe-new-supplier-wrapper');
    const newSupplierInput = document.getElementById('qe-new-supplier-input');
    
    if (value === 'new') {
        // Прячем кнопку и список
        if (trigger) trigger.style.display = 'none';
        if (dropdown) dropdown.style.display = 'none';
        
        // Показываем поле ввода
        if (newSupplierWrapper) newSupplierWrapper.style.display = 'flex';
        if (hiddenInput) hiddenInput.value = 'new';
        
        if (newSupplierInput) newSupplierInput.focus();
    } else {
        // Подставляем выбранное значение
        if (display) display.innerText = text;
        if (hiddenInput) hiddenInput.value = text; // Сохраняем текст, а не value, так как в базу пишем имя
        if (dropdown) dropdown.style.display = 'none';
    }

    // Сброс стрелки
    const arrow = document.getElementById('qe-supplier-arrow');
    if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
    }
};

// Кнопка отмены "крестик" для нового поставщика
window.cancelNewSupplier = function() {
    const wrapper = document.getElementById('qe-new-supplier-wrapper');
    const trigger = document.getElementById('qe-supplier-trigger');
    const input = document.getElementById('qe-new-supplier-input');
    const display = document.getElementById('qe-supplier-display');
    const hiddenInput = document.getElementById('qe-supplier');
    // Ищем дефолтную строку именно внутри списка поставщиков
    const defaultTextElement = document.querySelector('#qe-supplier-dropdown [data-val="0"]'); 
    
    if (wrapper) wrapper.style.display = 'none';
    if (trigger) trigger.style.display = 'flex';
    if (input) input.value = '';
    if (hiddenInput) hiddenInput.value = '0';
    
    if (display && defaultTextElement) {
        display.innerText = defaultTextElement.getAttribute('data-text');
    }    
};

window.selectSupplier = function(val) {
    document.getElementById('qe-supplier-dropdown').style.display = 'none';
    document.getElementById('qe-supplier-arrow').style.transform = 'rotate(0deg)';
    
    if (val === 'NEW') {
        document.getElementById('qe-supplier-trigger').style.display = 'none';
        const wrapper = document.getElementById('qe-new-supplier-wrapper');
        const input = document.getElementById('qe-new-supplier-input');
        
        wrapper.style.display = 'flex';
        input.focus();
        
        // Увеличенный таймаут для iOS и принудительная прокрутка
        setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'end' });
            
            // Если модалка имеет свой скролл, принудительно опускаем его в самый низ
            const modalContent = document.getElementById('quickEditModal'); 
            if (modalContent) {
                modalContent.scrollTop = modalContent.scrollHeight;
            }
        }, 500); 
    } else {
        document.getElementById('qe-supplier-display').innerText = val;
        document.getElementById('qe-supplier-hidden').value = val;
    }
};

// 1. Создаем физическое пространство для выезда системной клавиатуры
window.onSupplierFocus = function() {
    const modal = document.getElementById('quickEditModal');
    if (modal) {
        // Добавляем плавность и сдвигаем окно вверх на 180px (можно регулировать)
        modal.style.transition = 'transform 0.3s ease';
        modal.style.transform = 'translateY(-180px)'; 
    }
};

// Убираем пространство, когда системная клавиатура прячется
window.onSupplierBlur = function() {
    const modal = document.getElementById('quickEditModal');
    if (modal) {
        // Возвращаем окно на место
        modal.style.transform = 'translateY(0)'; 
    }
};

// 4. Глобальный перехват открытия/закрытия блока для управления футером
document.addEventListener('click', function(e) {
    // Если нажали ПРИХОД (открываем блок)
    if (e.target && e.target.id === 'btn-open-receive') {
        document.getElementById('qe-receive-block').style.display = 'block';
        document.getElementById('qe-bottom-buttons').style.display = 'none'; // ПРЯЧЕМ ФУТЕР
        document.getElementById('qe-top-section').classList.add('form-disabled');
    }
});

// Отрисовка и фильтрация списка
window.renderCustomSupplierDropdown = function(filterText = '') {
    const dropdown = document.getElementById('qe-supplier-dropdown');
    if (!dropdown) return;
    
    // Если массив поставщиков пуст или не загружен
    const suppliers = window.suppliers || [];
    const lowerFilter = filterText.toLowerCase();
    
    // Оставляем только те элементы, которые содержат введенный текст
    const filtered = suppliers.filter(s => s.toLowerCase().includes(lowerFilter));
    
    // Если ничего не найдено, показываем заглушку
    if (filtered.length === 0) {
        dropdown.innerHTML = `<div style="padding: 12px; color: #888; text-align: center; font-size: 13px;">Совпадений нет. Будет добавлен новый контрагент.</div>`;
        return;
    }
    
    // Рисуем список
    dropdown.innerHTML = filtered.map(s => `
        <div onclick="window.selectCustomSupplier('${s}')" style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; display: block; text-align: left; color: #fff;">
            ${s}
        </div>
    `).join('');
};

// Функция срабатывает при каждом нажатии клавиши
window.filterSuppliers = function() {
    const input = document.getElementById('qe-supplier-input');
    window.renderCustomSupplierDropdown(input.value);
    document.getElementById('qe-supplier-dropdown').style.display = 'block';
};

// ==========================================
// ЛОГИКА ПОИСКА ПОСТАВЩИКА И ФИКС ДЛЯ iOS
// ==========================================

let vvRaf = 0;

function updateViewport() {
    const modalEl = document.getElementById('supplier-fullscreen-modal');
    if (!window.visualViewport || !modalEl || modalEl.style.display === 'none') return;
    
    const vv = window.visualViewport;
    modalEl.style.setProperty('--vv-offset', vv.offsetTop + 'px');
    modalEl.style.height = vv.height + 'px';
}

function scheduleUpdate() {
    cancelAnimationFrame(vvRaf);
    vvRaf = requestAnimationFrame(updateViewport);
}

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleUpdate);
    window.visualViewport.addEventListener("scroll", scheduleUpdate);
}

// ==========================================
// 1. ОТКРЫТИЕ ОКНА ПОСТАВЩИКОВ
// ==========================================
window.openFullscreenSupplier = function() {
    document.documentElement.classList.add("lock");
    document.body.classList.add("lock");
    
    // МГНОВЕННО открываем ВСЕ копии окна (и для ПК, и для телефона)
    document.querySelectorAll('#supplier-fullscreen-modal').forEach(modal => {
        modal.style.display = 'flex';
    });
    
    // Очищаем ВСЕ поля поиска
    document.querySelectorAll('#fullscreen-supplier-search').forEach(input => {
        input.value = '';
    });
    
    // Устанавливаем переводы
    try {
        document.querySelectorAll('#qe-supplier-input').forEach(input => {
            input.placeholder = translations[currentLang].modal_choose_supplier;
        });
        document.querySelectorAll('#fullscreen-supplier-search').forEach(input => {
            input.placeholder = translations[currentLang].modal_search_supplier;
        });
    } catch(e) {}
    
    // Запускаем фильтр
    window.filterFullscreenSuppliers(); 
    if (typeof scheduleUpdate === 'function') scheduleUpdate();
    
    setTimeout(() => {
        // Умно ставим фокус только в то поле поиска, которое сейчас видимо на экране
        const visibleSearch = Array.from(document.querySelectorAll('#fullscreen-supplier-search')).find(i => i.offsetParent !== null);
        if (visibleSearch) visibleSearch.focus();
    }, 100);
};

// ==========================================
// 2. ФИЛЬТРАЦИЯ И ОТРИСОВКА СПИСКА
// ==========================================
window.filterFullscreenSuppliers = function() {
    console.log("🔍 [TEST] Функция фильтрации запустилась!"); 

    const listContainers = document.querySelectorAll('#fullscreen-supplier-list');
    console.log("📦 [TEST] Контейнеров найдено:", listContainers.length); 

    const searchInputs = document.querySelectorAll('#fullscreen-supplier-search');
    const addNewBtns = document.querySelectorAll('#fullscreen-add-new-btn');
    
    if (listContainers.length === 0) {
        console.log("❌ [TEST] ОШИБКА: Контейнер для списка не найден в HTML!");
        return;
    }

    // Читаем текст только из видимого поля поиска
    let filterText = '';
    for (let input of searchInputs) {
        if (input.offsetParent !== null) { 
            filterText = input.value.trim();
            break;
        }
    }
    
    const lowerFilter = filterText.toLowerCase();
    const suppliers = (window.suppliers || []).map(String);
    console.log("👥 [TEST] Поставщиков в памяти:", suppliers.length);
    
    const filtered = suppliers.filter(s => s.toLowerCase().includes(lowerFilter));
    filtered.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    
    // Генерируем HTML списка
    const htmlStr = filtered.map(s => {
        const safeStr = s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `<div class="supp-list-item" onclick="window.selectFullscreenSupplier('${safeStr}', false)" style="padding: 12px 0; font-size: 15px; cursor: pointer;">${s}</div>`;
    }).join('');

    // Вставляем список во ВСЕ контейнеры
    listContainers.forEach(container => {
        container.innerHTML = htmlStr;
    });

    // Настраиваем ВСЕ кнопки добавления нового поставщика
    addNewBtns.forEach(btn => {
        if (filterText.length > 0) {
            btn.style.display = 'block';
            const addText = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang].modal_add_supplier : "Добавить";
            btn.innerHTML = `${addText} "<b>${filterText}</b>"`;
            btn.onclick = function() { window.selectFullscreenSupplier(filterText, true); };
        } else {
            btn.style.display = 'none';
        }
    });
};

// ==========================================
// 3. ВЫБОР ПОСТАВЩИКА И ЗАКРЫТИЕ
// ==========================================
window.selectFullscreenSupplier = function(val, isAddingNew) {
    val = val ? val.trim() : '';
    if (!val) return;

    // Вписываем поставщика во ВСЕ инпуты карточки товара
    document.querySelectorAll('#qe-supplier-input').forEach(targetInput => {
        targetInput.value = val;
        targetInput.dispatchEvent(new Event('input'));
        targetInput.dispatchEvent(new Event('change'));
    });

    const searchInputs = document.querySelectorAll('#fullscreen-supplier-search');

    if (isAddingNew === true) {
        // Если добавляем нового - очищаем поиск и закрываем все окна
        searchInputs.forEach(input => input.value = ''); 
        
        if (typeof window.closeFullscreenSupplier === 'function') {
            window.closeFullscreenSupplier();
        } else {
            document.querySelectorAll('#supplier-fullscreen-modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    } else {
        // Если просто кликнули по списку - подставляем в строку поиска
        searchInputs.forEach(input => input.value = val);
        window.filterFullscreenSuppliers();
    }
};
// ==========================================
// 4. ЗАКРЫТИЕ ОКНА ПОСТАВЩИКОВ
// ==========================================
window.closeFullscreenSupplier = function() {
    // Разблокируем фон экрана
    document.documentElement.classList.remove("lock");
    document.body.classList.remove("lock");
    
    // Прячем ВСЕ копии окна (и мобильные, и десктопные)
    document.querySelectorAll('#supplier-fullscreen-modal').forEach(modal => {
        modal.style.display = 'none';
    });
};
// --- ДИНАМИЧЕСКОЕ ФОРМАТИРОВАНИЕ ТЫСЯЧ ПРИ ВВОДЕ С ПК ---
document.addEventListener('input', function(e) {
    // Проверяем, что ввод происходит именно в наших числовых полях
    const isNumberField = e.target && (
        e.target.id === 'qe-price' || 
        e.target.id === 'qe-minstock' || 
        e.target.id === 'qe-receive-price' || 
        e.target.id === 'qe-receive-qty'
    );

    if (isNumberField) {
        // Вырезаем всё, кроме цифр
        let rawDigits = e.target.value.replace(/\D/g, '');
        
        if (rawDigits) {
            // Форматируем красивыми пробелами (например, 1 500 000)
            e.target.value = Number(rawDigits).toLocaleString('ru-RU').replace(/,/g, ' ');
        } else {
            e.target.value = '';
        }
    }
});
// --- ПРИНУДИТЕЛЬНАЯ ОЧИСТКА ПРИ ПЕРВОМ ВВОДЕ С ФИЗИЧЕСКОЙ КЛАВИАТУРЫ ---
document.addEventListener('keydown', function(e) {
    // Проверяем, что клик в инпуте, и что пользователь нажал цифру
    if (e.target && e.target.tagName === 'INPUT' && /\d/.test(e.key)) {
        // Если стоит команда стереть при первом вводе
        if (window.qeNeedsClear || window.receiveNeedsClear) {
            e.target.value = ''; // Стираем старое значение
            window.qeNeedsClear = false;
            window.receiveNeedsClear = false;
        }
    }
});

function switchIncomeTab(tabName) {
    const btnImport = document.getElementById('tab-btn-import');
    const btnNew = document.getElementById('tab-btn-new');
    const tabImport = document.getElementById('tab-import');
    const tabNew = document.getElementById('tab-new-product');

    if (tabName === 'import') {
        tabImport.style.display = 'block';
        tabNew.style.display = 'none';
        
        // Меняем классы
        btnImport.className = 'modal-tab active';
        btnNew.className = 'modal-tab inactive';
    } else {
        tabImport.style.display = 'none';
        tabNew.style.display = 'block';
        
        // Меняем классы
        btnImport.className = 'modal-tab inactive';
        btnNew.className = 'modal-tab active';
    }
}

// Функция открытия/закрытия списка (с вращением стрелки)
window.toggleNtCategoryDropdown = function(event) {
    if (event) event.stopPropagation();
    
    const dropdown = document.getElementById('nt-category-dropdown');
    const arrow = document.getElementById('nt-category-arrow');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'translateY(-50%) rotate(180deg)';
        window.renderNtCategories();
    }
};

// Выбор существующей категории
window.selectNtCategory = function(event, catName) {
    if (event) event.stopPropagation(); // Блокируем лишние срабатывания
    
    const input = document.getElementById('nt-category-input');
    const arrow = document.getElementById('nt-category-arrow');
    
    if (input) {
        input.readOnly = true;
        input.value = catName;
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));
    }
    
    const dropdown = document.getElementById('nt-category-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
};

// Сброс списка и стрелки при тапе в любую пустую область экрана
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('nt-category-dropdown');
    const input = document.getElementById('nt-category-input');
    const arrow = document.getElementById('nt-category-arrow');
    
    if (dropdown && dropdown.style.display === 'block') {
        if (e.target !== dropdown && e.target !== input && e.target !== arrow) {
            dropdown.style.display = 'none';
            if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
        }
    }
});

window.renderNtCategories = function() {
    const dropdown = document.getElementById('nt-category-dropdown');
    if (!dropdown) return;

    if (typeof db === 'undefined' || !Array.isArray(db)) {
        dropdown.innerHTML = `<div style="padding: 12px; color: #ff5252; text-align: center;">Данные загружаются...</div>`;
        return;
    }

    let uniqueCategories = [...new Set(db.map(i => i.category).filter(Boolean))];
    // Убираем системные пустышки
    uniqueCategories = uniqueCategories.filter(cat => cat !== '0' && cat !== 'Без категории' && cat !== 'Не выбрано');
    uniqueCategories.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    let html = '';

    // 1. КНОПКА "НОВАЯ КАТЕГОРИЯ"
    const newCatText = (typeof t === 'function') ? t('qe_new_category_btn') || '+ Новая категория' : '+ Новая категория';
    html += `
        <div onclick="window.selectNtNewCategory(event)" 
             style="padding: 14px 15px; font-size: 15px; cursor: pointer; border-bottom: 1px solid var(--accent-green); color: var(--accent-green); font-weight: bold; transition: background 0.2s;" 
             onmouseover="this.style.background='var(--bg-overlay)'" 
             onmouseout="this.style.background='transparent'">
            ${newCatText}
        </div>
    `;

    // Пункт "Без категории" удален. 

    // 2. ОСТАЛЬНЫЕ КАТЕГОРИИ
    if (uniqueCategories.length > 0) {
        html += uniqueCategories.map(cat => {
            const safeCat = cat.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            return `
                <div onclick="window.selectNtCategory(event, '${safeCat}')" 
                     style="padding: 14px 15px; font-size: 15px; cursor: pointer; border-bottom: 1px solid var(--border-light); color: var(--text-main); transition: background 0.2s;" 
                     onmouseover="this.style.background='var(--bg-overlay)'" 
                     onmouseout="this.style.background='transparent'">
                    ${cat}
                </div>
            `;
        }).join('');
    }

    dropdown.innerHTML = html;
};

// Выбор "Новая категория"
window.selectNtNewCategory = function(event) {
    if (event) event.stopPropagation(); // Блокируем всплытие клика
    
    const input = document.getElementById('nt-category-input');
    const arrow = document.getElementById('nt-category-arrow');
    
    if (input) {
        input.readOnly = false;
        input.value = '';
        input.placeholder = 'Введите название...';
        input.focus();
    }
    
    const dropdown = document.getElementById('nt-category-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    // Возвращаем стрелку на место
    if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
};

// Обновленная функция выбора существующей категории
window.selectNtCategory = function(event, catName) {
    if (event) event.stopPropagation(); // Блокируем всплытие клика
    
    const input = document.getElementById('nt-category-input');
    const arrow = document.getElementById('nt-category-arrow');
    
    if (input) {
        input.readOnly = true;
        input.value = catName; // Теперь сюда точно попадет текст, а не событие
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));
    }
    
    const dropdown = document.getElementById('nt-category-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    // Возвращаем стрелку на место
    if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
};

// Перехватываем оригинальную функцию поставщика
const originalSelectSupplier = window.selectFullscreenSupplier;

window.selectFullscreenSupplier = function(val, isAddingNew) {
    // 1. СНАЧАЛА забираем значение в наше новое окно (если оно открыто)
    const incomeModal = document.getElementById('income-modal');
    const ntInput = document.getElementById('nt-supplier-input');
    
    if (incomeModal && incomeModal.style.display !== 'none' && ntInput) {
        // Убеждаемся, что пришел текст
        let finalVal = typeof val === 'string' ? val.trim() : String(val || '').trim();
        
        if (finalVal) {
            ntInput.value = finalVal;
            ntInput.dispatchEvent(new Event('input'));
            ntInput.dispatchEvent(new Event('change'));
        }
    }
    
    // 2. ЗАТЕМ вызываем твою старую логику (чтобы она закрыла окно)
    // Оборачиваем в try-catch: если она не найдет свое старое поле, 
    // касса не зависнет и продолжит работать.
    try {
        if (typeof originalSelectSupplier === 'function') {
            originalSelectSupplier(val, isAddingNew);
        }
    } catch (e) {
        console.warn("Оригинальная функция поставщика проигнорировала отсутствие старого окна.");
    }
};

// ==========================================
// НЕЗАВИСИМЫЕ МОДУЛИ ДЛЯ ОКНА "НОВЫЙ ТОВАР"
// ==========================================

// 1. Своя функция вызова клавиатуры

// 2. Своя функция вызова сканера
window.startNtScanner = function() {
    const container = document.getElementById('quagga-scanner-container');
    const target = document.getElementById('quagga-video-target');
    const incomeModal = document.getElementById('income-modal');
    
    if (!container || !target || !incomeModal) return;
    
    // Переносим камеру внутрь новой модалки
    if (container.parentNode !== incomeModal) {
        incomeModal.appendChild(container);
    }
    
    // Задаем стили окна сканера напрямую, чтобы он не пропал
    container.style.position = 'absolute';
    container.style.top = '10%';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.width = '90%';
    container.style.maxWidth = '400px';
    container.style.zIndex = '999999';
    container.style.background = '#000';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';

    // Закрываем, если уже открыто
    if (container.style.display === 'block') {
        window.stopNtScanner();
        return;
    }
    
    container.style.display = 'block';

    // Инициализация ядра Quagga
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: target,
            constraints: { facingMode: "environment" } // Задняя камера
        },
        decoder: { 
            readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader", "code_128_reader"] 
        }
    }, function(err) {
        if (err) {
            console.error("Ошибка камеры:", err);
            window.stopNtScanner();
            return;
        }
        const videoEl = target.querySelector('video');
        if (videoEl) {
            videoEl.style.width = '100%';
            videoEl.style.height = '100%';
            videoEl.style.objectFit = 'cover';
        }
        Quagga.start();
    });

    Quagga.onDetected(window.handleNtQuaggaDetection);
};

// 3. Свой перехватчик результата сканирования
window.handleNtQuaggaDetection = function(result) {
    if (!result || !result.codeResult || !result.codeResult.code) return;
    const code = result.codeResult.code;
    
    if (code && code.length >= 3) {
        const barcodeInput = document.getElementById('nt-barcode'); // Шлем сразу в наше поле!
        if (barcodeInput) {
            barcodeInput.value = code;
            barcodeInput.dispatchEvent(new Event('input'));
            barcodeInput.dispatchEvent(new Event('change'));
            
            window.stopNtScanner();
            barcodeInput.blur();
        }
    }
};

// 4. Остановка камеры
window.stopNtScanner = function() {
    const container = document.getElementById('quagga-scanner-container');
    try {
        Quagga.stop();
        Quagga.offDetected(window.handleNtQuaggaDetection);
    } catch (e) {}
    if (container) container.style.display = 'none';
};

// ==========================================
// НЕЗАВИСИМЫЕ МОДУЛИ ДЛЯ ОКНА "НОВЫЙ ТОВАР"
// ==========================================

// 1. Вызов встроенной клавиатуры
window.setNtActive = function(el, event) {
    if (event) event.stopPropagation();

    // Снимаем подсветку со всех полей и ставим на текущее
    document.querySelectorAll('.qe-active-input').forEach(input => input.classList.remove('qe-active-input'));
    window.currentQeInput = el; // Привязываем родную функцию qeNumpad к нашему полю
    el.classList.add('qe-active-input'); 
    
    setTimeout(() => { el.setSelectionRange(0, el.value.length); }, 10);
    window.qeNeedsClear = true;

    // Вызываем нашу встроенную клаву
    const numpad = document.getElementById('nt-custom-numpad');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (numpad && isTouchDevice) {
        numpad.style.display = 'grid';
    }
};

// 2. Вызов встроенного сканера
window.startNtScanner = function() {
    const container = document.getElementById('nt-scanner-container');
    const target = document.getElementById('nt-video-target');
    
    if (!container || !target) return;
    
    // Скрываем, если открыт
    if (container.style.display === 'block') {
        window.stopNtScanner();
        return;
    }
    
    container.style.display = 'block';

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: target,
            constraints: { 
                // Убираем жесткое требование задней камеры, чтобы работало везде!
                facingMode: "environment" 
            }
        },
        decoder: { 
            readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader", "code_128_reader"] 
        }
    }, function(err) {
        if (err) {
            console.error("Ошибка камеры:", err);
            alert("Не удалось запустить камеру. Проверьте разрешения.");
            window.stopNtScanner();
            return;
        }
        
        const videoEl = target.querySelector('video');
        if (videoEl) {
            videoEl.style.width = '100%';
            videoEl.style.height = '100%';
            videoEl.style.objectFit = 'cover';
        }
        Quagga.start();
    });

    Quagga.onDetected(window.handleNtQuaggaDetection);
};

// 3. Обработка штрихкода
window.handleNtQuaggaDetection = function(result) {
    if (!result || !result.codeResult || !result.codeResult.code) return;
    const code = result.codeResult.code;
    
    if (code && code.length >= 3) {
        const barcodeInput = document.getElementById('nt-barcode');
        if (barcodeInput) {
            barcodeInput.value = code;
            barcodeInput.dispatchEvent(new Event('input'));
            barcodeInput.dispatchEvent(new Event('change'));
            
            window.stopNtScanner();
        }
    }
};

// 4. Остановка камеры
window.stopNtScanner = function() {
    const container = document.getElementById('nt-scanner-container');
    const target = document.getElementById('nt-video-target');
    
    try {
        Quagga.stop();
        Quagga.offDetected(window.handleNtQuaggaDetection);
    } catch (e) {}
    
    if (target) target.innerHTML = '';
    if (container) container.style.display = 'none';
};
// Фильтр и форматирование полей "Нового товара"
window.formatNtInput = function(el) {
    if (!el) return;
    
    // Оставляем только цифры
    let rawDigits = String(el.value).replace(/\D/g, ''); 
    
    // Программный ограничитель на 13 символов (страховка для быстрых сканеров)
    if (rawDigits.length > 13) {
        rawDigits = rawDigits.slice(0, 13);
    }
    
    // Логика зависит от поля, в котором мы находимся
    if (el.id === 'nt-barcode' || el.id === 'qe-barcode') {
        // === ЛОГИКА ДЛЯ ШТРИХКОДА (Светофор) ===
        el.value = rawDigits; // Возвращаем чистые цифры без пробелов
        
        if (rawDigits.length === 8 || rawDigits.length === 13) {
            el.style.setProperty('border-color', 'var(--accent-green, #4CAF50)', 'important');
            el.style.setProperty('background-color', 'var(--bg-success-dim, rgba(76, 175, 80, 0.15))', 'important');
        } else {
            el.style.setProperty('border-color', 'var(--border-main, #ccc)', 'important');
            el.style.setProperty('background-color', 'var(--bg-card, #fff)', 'important');
        }
    } else {
        // === ЛОГИКА ДЛЯ ДЕНЕГ И КОЛИЧЕСТВА (Тысячные пробелы) ===
        if (rawDigits !== '') {
            // Превращаем '1000' в '1 000'
            el.value = Number(rawDigits).toLocaleString('ru-RU').replace(/,/g, ' ');
        } else {
            el.value = '';
        }
    }
};

// Перехват старой клавиатуры, чтобы она тоже форматировала наши новые поля
if (!window.qeNumpadPatchedForNt) {
    const originalQeNumpad = window.qeNumpad;
    if (originalQeNumpad) {
        window.qeNumpad = function(val, event) {
            originalQeNumpad(val, event); // Выполняем стандартный ввод цифры
            
            // Если сейчас активно наше новое поле - сразу применяем к нему форматирование
            if (window.currentQeInput && window.currentQeInput.id.startsWith('nt-')) {
                window.formatNtInput(window.currentQeInput);
            }
        };
        window.qeNumpadPatchedForNt = true; // Защита от двойного перехвата
    }
}
// ========================================================
// РАДАР ОБНОВЛЕНИЙ 
// ========================================================

// 1. "Мозг" - Радар, который ищет обновления
async function checkForAppUpdates() {
    try {
        const response = await fetch(`config.js?t=${Date.now()}`);
        if (!response.ok) return;

        const text = await response.text();
        // Ищем версию в файле
        const match = text.match(/const\s+APP_VERSION\s*=\s*["']([^"']+)["']/);
        
        if (match && match[1]) {
            const serverVersion = match[1];
            
            // Сравниваем с текущей
            if (serverVersion !== APP_VERSION) {
                showUpdatePrompt(serverVersion); // Даем команду показать плашку
            }
        }
    } catch (error) {
        console.warn("Радар обновлений: ошибка проверки файла.", error);
    }
}

// 2. "Руки" - Отрисовка плашки
function showUpdatePrompt(newVersion) {
    if (document.getElementById('update-prompt-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'update-prompt-banner';
    banner.style.cssText = `
        position: relative; width: 100%; 
        background: var(--accent-blue, #38bdf8); 
        color: #ffffff; 
        text-align: center; padding: 10px; font-size: 14px; z-index: 9999;
        display: flex; justify-content: center; align-items: center; gap: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    
    banner.innerHTML = `
        <div>
            <span>🚀 ${translations[currentLang]['update_available'] || 'Доступна новая версия системы'}</span> 
            <b>(${newVersion})</b>
        </div>
        <button onclick="window.location.reload(true)" style="
            background: var(--bg-panel); 
            color: var(--text-main); 
            border: 1px solid var(--border-light); 
            padding: 6px 14px; border-radius: 6px; cursor: pointer; 
            font-weight: bold; font-size: 13px; transition: 0.2s;">
            <span>${translations[currentLang]['update_btn'] || 'Обновить кассу'}</span>
        </button>
    `;
    applyLanguage(currentLang);
    
    document.body.prepend(banner);
}

setInterval(checkForAppUpdates, 15 * 60 * 1000);

/**
 * Ищет папку по имени. Если parentId указан, ищет строго внутри родителя.
 * Возвращает ID найденной папки или создает новую.
 */
async function getOrCreateDriveFolder(folderName, accessToken, parentId = null) {
    let query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
    if (parentId) {
        query += ` and '${parentId}' in parents`;
    }
    
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id, name)`;

    // 1. Пытаемся найти
    const searchRes = await fetch(searchUrl, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });

    if (!searchRes.ok) throw new Error(`NetworkError: Ошибка при поиске папки ${folderName}`);
    const searchData = await searchRes.json();

    // Если папка уже есть — просто отдаем её ID
    if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id; 
    }

    // 2. Если не нашли — создаем
    const metadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
    };
    if (parentId) metadata.parents = [parentId];

    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
    });

    if (!createRes.ok) throw new Error(`NetworkError: Ошибка при создании папки ${folderName}`);
    const createData = await createRes.json();
    return createData.id;
}

function openDriveBase() {
    // ЗАХЛОПЫВАЕМ МЕНЮ НАСТРОЕК ПЕРЕД ОТКРЫТИЕМ
    if (typeof closeSettings === 'function') closeSettings(); 

    let driveStr = localStorage.getItem('DRIVE_DATA');
    
    if (!driveStr) {
        alert("Данные базы не найдены. Пожалуйста, перезайдите в кассу (введите ПИН-код).");
        return;
    }
    
    document.getElementById('drive-base-modal').style.display = 'flex';
}

async function handleDriveClick(btnElement, dataKey, expectedName) {
    let driveData = JSON.parse(localStorage.getItem('DRIVE_DATA') || '{}');
    let targetId = driveData[dataKey];

    // ВАРИАНТ А: Папка есть. Открываем мгновенно.
    if (targetId) {
        let url = expectedName === 'file' 
            ? `https://docs.google.com/spreadsheets/d/${targetId}/edit`
            : `https://drive.google.com/drive/folders/${targetId}`;
        window.open(url, '_blank');
        return;
    }

    // ВАРИАНТ Б: Папки нет. Запускаем "Тихое создание".
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = '⏳ <span style="font-size: 11px;">СОЗДАНИЕ...</span>';
    btnElement.style.pointerEvents = 'none'; // Блокируем от двойного клика

    try {
        const token = localStorage.getItem('CLIENT_API_KEY');
        // Будущий запрос к вашему GAS-серверу для автосоздания
        const response = await fetch(GATEWAY_URL, { 
            method: 'POST',
            body: JSON.stringify({
                api_key: token,
                action: 'recoverFolder',
                folder_type: dataKey
            })
        });
        
        const res = await response.json();
        
        if (res.success && res.newId) {
            // Сохраняем новый ID в память и сразу открываем
            driveData[dataKey] = res.newId;
            localStorage.setItem('DRIVE_DATA', JSON.stringify(driveData));
            
            let url = expectedName === 'file' 
                ? `https://docs.google.com/spreadsheets/d/${res.newId}/edit`
                : `https://drive.google.com/drive/folders/${res.newId}`;
            window.open(url, '_blank');
        } else {
            alert("Ошибка при создании папки: " + (res.error || "Неизвестная ошибка сервера"));
        }
    } catch (error) {
        console.error(error);
        alert("Ошибка связи с сервером при восстановлении папки.");
    } finally {
        // Возвращаем кнопку в исходное состояние
        btnElement.innerHTML = originalHtml;
        btnElement.style.pointerEvents = 'auto';
    }
}

function closeDriveModal() {
    document.getElementById('drive-base-modal').style.display = 'none';
}

// Вспомогательная функция для безопасного извлечения перевода внутри JS
function getSwalText(key) {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ru';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    return key; // Возврат ключа, если перевод не найден
}

// ==========================================
// 1. КНОПКА ОЧИСТКИ БАЗЫ
// ==========================================
window.startDatabaseClear = function() {
    if (typeof closeDriveModal === 'function') closeDriveModal();
    
    Swal.fire({
        title: translations[currentLang]['swal_clear_title'],
        text: translations[currentLang]['swal_clear_text'],
        background: 'var(--bg-panel, #ffffff)',
        color: 'var(--text-main, #333333)',
        showDenyButton: true, 
        showCancelButton: true,
        confirmButtonText: translations[currentLang]['swal_clear_all_btn'],
        denyButtonText: translations[currentLang]['swal_clear_ops_btn'],
        cancelButtonText: translations[currentLang]['swal_cancel'],
        
        // НОВЫЕ ЦВЕТА 
        confirmButtonColor: '#4285F4', // Синий (Главное действие)
        denyButtonColor: '#757575',    // Серый (Вторичное действие)
        cancelButtonColor: '#EA4335',  // Красный (Отмена)
        
        customClass: {
            actions: 'swal-actions-vertical' 
        }
    }).then((result) => {
        if (result.isConfirmed || result.isDenied) {
            const clearType = result.isConfirmed ? 'all' : 'ops';
            
            Swal.fire({
                title: '...', 
                allowOutsideClick: false,
                background: 'var(--bg-panel, #ffffff)',
                color: 'var(--text-main, #333333)',
                didOpen: () => { Swal.showLoading(); }
            });

            const payload = {
                action: "database_clear",
                type: clearType, 
                api_key: typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : ""
            };
            
            window.smartFetch(GATEWAY_URL, payload, 'cache_db_clear').then(response => {
                if (response && response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'OK',
                        background: 'var(--bg-panel, #ffffff)',
                        color: 'var(--text-main, #333333)',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire('Error', response?.message || 'Error', 'error');
                }
            });
        }
    });
};

// ==========================================
// 2. КНОПКА ВОССТАНОВЛЕНИЯ БАЗЫ
// ==========================================
window.startDatabaseRestore = function() {
    if (typeof closeDriveModal === 'function') closeDriveModal();
    
    // Настоящий, глубокий красный цвет (без ухода в оранжевый)
    const trueRed = '#D32F2F'; 
    
    // === ОКНО 1: ВЫБОР МЕТОДА ===
    Swal.fire({
        title: translations[currentLang]['swal_restore_title'] || 'ВОССТАНОВЛЕНИЕ ДАННЫХ',
        text: translations[currentLang]['swal_restore_text'] || 'Выберите, какие данные нужно вернуть из временного архива.',
        background: 'var(--bg-panel, #ffffff)',
        color: 'var(--text-main, #333333)',
        
        showDenyButton: true, 
        showCancelButton: true,
        
        confirmButtonText: translations[currentLang]['swal_restore_all_btn'] || 'ВОССТАНОВИТЬ ВСЁ<br>(Чеки, Накладные, Товары)',
        denyButtonText: translations[currentLang]['swal_restore_catalog_btn'] || 'ТОЛЬКО КАТАЛОГ<br>(Товары и Накладные)', 
        cancelButtonText: translations[currentLang]['swal_cancel'] || 'Отмена',
        
        confirmButtonColor: '#4285F4', // Синий
        denyButtonColor: '#4285F4',    // Синий
        cancelButtonColor: trueRed,    // Истинный красный
        
        customClass: {
            actions: 'swal-actions-vertical',
            confirmButton: 'swal-btn-multiline',
            denyButton: 'swal-btn-multiline'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            executeRestoreRequest('all');
        } else if (result.isDenied) {
            
            // === ОКНО 2: ПРЕДУПРЕЖДЕНИЕ ===
            Swal.fire({
                title: translations[currentLang]['swal_catalog_warn_title'] || 'Внимание!',
                text: translations[currentLang]['swal_catalog_warn_text'] || 'Старые чеки будут навсегда удалены из быстрого буфера. Вы уверены?',
                
                showDenyButton: false, 
                showCancelButton: true,
                
                confirmButtonText: translations[currentLang]['swal_catalog_warn_confirm'] || 'Да, восстановить только каталог<br>(Накладные и Товары)', 
                cancelButtonText: translations[currentLang]['swal_cancel'] || 'Отмена',
                
                confirmButtonColor: '#4285F4', // Синий
                cancelButtonColor: trueRed,    // Истинный красный
                
                background: 'var(--bg-panel, #ffffff)',
                color: 'var(--text-main, #333333)',
                customClass: {
                    actions: 'swal-actions-vertical',
                    confirmButton: 'swal-btn-multiline' 
                },
                didOpen: () => {
                    // Аппаратное уничтожение средней кнопки, если CSS пытается её показать
                    const denyBtn = Swal.getDenyButton();
                    if (denyBtn) {
                        denyBtn.style.setProperty('display', 'none', 'important');
                    }
                }
            }).then((warnResult) => {
                if (warnResult.isConfirmed) {
                    executeRestoreRequest('catalog');
                }
            });
        }
    });

    // === ВНУТРЕННЯЯ ФУНКЦИЯ ЗАПРОСА ===
    function executeRestoreRequest(restoreType) {
        Swal.fire({
            title: '...',
            allowOutsideClick: false,
            background: 'var(--bg-panel, #ffffff)',
            color: 'var(--text-main, #333333)',
            didOpen: () => { Swal.showLoading(); }
        });

        const payload = {
            action: "database_restore",
            type: restoreType, 
            api_key: typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : ""
        };
        
        window.smartFetch(GATEWAY_URL, payload, 'cache_db_restore').then(response => {
            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    background: 'var(--bg-panel, #ffffff)',
                    color: 'var(--text-main, #333333)',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire('Error', response?.message || 'Error', 'error');
            }
        });
    }
};

// --- 1. Открытие окна и запуск поиска ---
async function openDeepRestoreModal() {
    // 1. Управление модальными окнами
    const baseModal = document.getElementById('drive-base-modal');
    if (baseModal) baseModal.style.display = 'none';

    const deepModal = document.getElementById('deep-restore-modal');
    if (deepModal) deepModal.style.display = 'flex'; 

    // 2. Включаем спиннер, очищаем старый список
    document.getElementById('deep-restore-loader').style.display = 'block';
    const listContainer = document.getElementById('deep-restore-list');
    listContainer.style.display = 'none';
    listContainer.innerHTML = '';

    // 3. Получаем API ключ
    const token = localStorage.getItem('CLIENT_API_KEY') || (typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : "");

    const payload = JSON.stringify({
        api_key: token,
        action: 'get_available_backups'
    });

    const maxRetries = 2;       // Количество повторных попыток
    const timeoutMs = 5000;     // Тайм-аут ожидания: 5 секунд
    let res = null;

    // 4. Цикл с защитой от таймаута и холодного старта
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(GATEWAY_URL, {
                method: 'POST',
                body: payload,
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const text = await response.text();

            // Проверка на HTML-ответ от Google (Cold Start)
            if (text.trim().startsWith('<')) {
                if (attempt < maxRetries) {
                    await new Promise(r => setTimeout(r, 500));
                    continue;
                }
                throw new Error("Сервер вернул некорректный ответ (HTML вместо JSON)");
            }

            res = JSON.parse(text);
            break; // Успешно получили и распарсили JSON — выходим из цикла

        } catch (err) {
            clearTimeout(timeoutId);

            // Если сработал наш таймер на 5 секунд
            if (err.name === 'AbortError') {
                if (attempt < maxRetries) {
                    continue; // Пробуем снова
                }
                throw new Error("Сервер не ответил вовремя. Попробуйте еще раз.");
            }

            // Если это последняя попытка или фатальная сетевая ошибка
            if (attempt === maxRetries) {
                throw err;
            }
        }
    }

    // 5. Обработка результата
    try {
        if (res && res.success) {
            renderBackupsList(res.data);
        } else {
            throw new Error((res && (res.message || res.error)) || "Неизвестная ошибка сервера");
        }
    } catch (error) {
        document.getElementById('deep-restore-loader').style.display = 'none';
        listContainer.style.display = 'flex';
        listContainer.innerHTML = `<div style="color: #EA4335; text-align: center; padding: 15px;">❌ Ошибка доступа к архиву: <br>${error.message}</div>`;
    }
}

// --- 2. Закрытие окна ---
function closeDeepRestoreModal() {
    const deepModal = document.getElementById('deep-restore-modal');
    if (deepModal) deepModal.style.display = 'none';
}

// --- 3. Отрисовка найденных файлов ---
function renderBackupsList(files) {
    document.getElementById('deep-restore-loader').style.display = 'none';
    const listContainer = document.getElementById('deep-restore-list');
    listContainer.style.display = 'flex';

    // Если папка пуста
    if (!files || files.length === 0) {
        listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 15px;">Архив пуст. Резервные копии не найдены.</div>';
        return;
    }

    // Если файлы есть, собираем из них кнопки
    let html = '';
    files.forEach(function(file) {
        html += `
        <button onclick="startSmartMerge('${file.id}', '${file.cleanName}')" style="background: var(--bg-panel); color: var(--text-main); padding: 14px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; border: 1px solid var(--border-light); cursor: pointer; display: flex; align-items: center; justify-content: space-between; text-align: left; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: background 0.2s;">
            <span style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 18px;">📅</span> 
                ${file.cleanName}
            </span>
        </button>`;
    });
    
    listContainer.innerHTML = html;
}

// --- 4. Запуск умного слияния (Smart Merge) ---
window.startSmartMerge = function(fileId, fileDate) {
    if (typeof closeDeepRestoreModal === 'function') closeDeepRestoreModal();

    Swal.fire({
        title: translations[currentLang]['smart_merge_title'],
        html: `${translations[currentLang]['smart_merge_text1']} <b>${fileDate}</b>.<br><br><span style="font-size: 13px; color: var(--text-muted, #999);">${translations[currentLang]['smart_merge_text2']}</span>`,
        background: 'var(--bg-panel, #ffffff)',
        color: 'var(--text-main, #333333)',
        showCancelButton: true,
        confirmButtonText: translations[currentLang]['smart_merge_btn'],
        cancelButtonText: translations[currentLang]['swal_cancel'] || 'Отмена',
        confirmButtonColor: '#4285F4',
        cancelButtonColor: '#EA4335'
    }).then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire({
                title: translations[currentLang]['smart_merge_loading_title'],
                html: translations[currentLang]['smart_merge_loading_text'],
                allowOutsideClick: false,
                background: 'var(--bg-panel, #ffffff)',
                color: 'var(--text-main, #333333)',
                didOpen: () => { Swal.showLoading(); }
            });

            const token = localStorage.getItem('CLIENT_API_KEY') || (typeof CLIENT_API_KEY !== 'undefined' ? CLIENT_API_KEY : "");
            
            const payload = {
                action: "smart_merge",
                file_id: fileId,
                api_key: token
            };
            
            fetch(GATEWAY_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                if (response && response.success) {
                    refreshPosData(true);
                    Swal.fire({
                        title: translations[currentLang]['smart_merge_success_title'],
                        text: `${translations[currentLang]['smart_merge_success_text']} ${response.restored_count}`,
                        background: 'var(--bg-panel, #ffffff)',
                        color: 'var(--text-main, #333333)',
                        confirmButtonColor: '#4285F4'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response?.message || response?.error || 'Server error',
                        background: 'var(--bg-panel, #ffffff)',
                        color: 'var(--text-main, #333333)'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Network Error', 
                    text: error.message, 
                    background: 'var(--bg-panel, #ffffff)',
                    color: 'var(--text-main, #333333)'
                });
            });
        }
    });
};
// ===================================================================
// АВТОМАТИЗАЦИЯ СИНХРОНИЗАЦИИ (УМНЫЙ ГИБРИД)
// ===================================================================

// 1. Фоновый пульс: проверяем базу каждую 1 минуту (60 000 мс)
setInterval(() => {
    // Выполняем только если есть интернет и кассир авторизован
    if (navigator.onLine && typeof currentUser !== 'undefined' && currentUser) {
        console.log("⏳ Фоновый пульс: проверка обновлений...");
        refreshPosData(true); // true = тихий режим, без блокировки экрана
    }
}, 60000);

// 2. Пробуждение браузера: проверка при возврате на вкладку кассы
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        if (navigator.onLine && typeof currentUser !== 'undefined' && currentUser) {
            console.log("👀 Кассир вернулся во вкладку: проверка обновлений...");
            refreshPosData(true);
        }
    }
});
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
    const syncBtn = document.getElementById('btn-sync-data');
    if (!syncBtn) return;

    let pressTimer;
    let isLongPress = false;

    // Отключаем меню браузера при долгом нажатии
    syncBtn.addEventListener('contextmenu', e => e.preventDefault());

    const startPress = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return; 
        
        isLongPress = false;
        syncBtn.style.opacity = '0.5'; 

        pressTimer = setTimeout(() => {
            isLongPress = true;
            console.log("Экстренная ПОЛНАЯ загрузка базы...");
            
            // === НОВЫЙ ВИЗУАЛЬНЫЙ ЭФФЕКТ: ВСПЫШКА ВСЕГО ЭКРАНА ===
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100vw';
            flash.style.height = '100vh';
            flash.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'; // Красный, полупрозрачный
            flash.style.zIndex = '999999'; // Поверх всего
            flash.style.pointerEvents = 'none'; // Чтобы не мешал нажимать
            flash.style.transition = 'opacity 0.4s ease-out';
            document.body.appendChild(flash);

            // Плавно растворяем вспышку
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 400); // Удаляем элемент после анимации
            }, 100);

            if (typeof refreshPosData === 'function') refreshPosData(false, true);
        }, 1500); 
    };

    const endPress = (e) => {
        syncBtn.style.opacity = '1'; 
        clearTimeout(pressTimer);
        
        if (!isLongPress) {
            console.log("Быстрая ДЕЛЬТА-синхронизация...");
            if (typeof refreshPosData === 'function') refreshPosData(false, false);
        }
    };

    syncBtn.addEventListener('pointerdown', startPress);
    syncBtn.addEventListener('pointerup', endPress);
    syncBtn.addEventListener('pointerout', () => {
        syncBtn.style.opacity = '1';
        clearTimeout(pressTimer);
    }); 
    syncBtn.addEventListener('pointercancel', () => {
        syncBtn.style.opacity = '1';
        clearTimeout(pressTimer);
    });
});
// Генерация итогового прайс-листа для Kaspi
async function generateExportFile() {
    const btn = document.getElementById('generateExportBtn');
    const originalText = btn.innerText;
    
    btn.innerText = '⏳ Загрузка товаров из базы...';
    btn.disabled = true;

    try {
        // 1. Считываем схему интерфейса
        const selects = document.querySelectorAll('.mapper-select');
        const mappingConfig = [];
        let maxColIndex = 0;

        const row1 = []; // Человеческие названия колонок
        const row2 = []; // Системные ключи Kaspi

        selects.forEach(select => {
            const colIndex = parseInt(select.getAttribute('data-col-index'));
            if (colIndex > maxColIndex) maxColIndex = colIndex;
            
            mappingConfig.push({ index: colIndex, ourSource: select.value });
            
            row1[colIndex] = select.getAttribute('data-col-name').replace(/&quot;/g, '"');
            row2[colIndex] = select.getAttribute('data-sys-key') || '';
        });

        // 2. Скачиваем свежие товары через smartFetch
        const url = window.SCRIPT_URL; 
        const payload = { action: 'getKaspiItemsData', api_key: CLIENT_API_KEY };
        const dbResponse = await window.smartFetch(url, payload, 'kaspi_items_temp', 3);

        if (!dbResponse || !dbResponse.success) {
            throw new Error(dbResponse ? dbResponse.error : "Сервер не ответил");
        }

        const items = dbResponse.items;
        btn.innerText = '⏳ Формирование файла...';

        // 3. Собираем таблицу для Excel
        const exportData = [];
        
        // Добавляем 3 обязательные строки шапки Kaspi
        exportData.push(row1);
        exportData.push(row2);
        exportData.push(row2.map(() => "")); // Третья строка (требования) часто пустая, Kaspi читает по 2-й

        // 4. Заполняем товары
        items.forEach(item => {
            const row = new Array(maxColIndex + 1).fill('');
            let hasData = false;

            mappingConfig.forEach(config => {
                const source = config.ourSource;
                let value = '';

                if (source === 'barcode') value = item.barcode;
                else if (source === 'name') value = item.name;
                else if (source === 'price') value = item.price;
                else if (source === 'qty') value = item.qty;
                else if (source.startsWith('json_')) {
                    const key = source.replace('json_', '');
                    if (item.attributes && item.attributes[key]) {
                        value = item.attributes[key];
                    }
                } else if (source.startsWith('static_')) {
                    value = source.replace('static_', '');
                }

                row[config.index] = value;
                if (value) hasData = true; // Отмечаем, если в строке есть хоть какие-то данные
            });

            // Добавляем в файл, только если строка не полностью пустая
            if (hasData) {
                exportData.push(row);
            }
        });

        // 5. Создаем и скачиваем файл (Используем библиотеку SheetJS)
        const ws = XLSX.utils.aoa_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");

        // Формируем имя файла с текущей датой
        const dateStr = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `Kaspi_Export_${dateStr}.xlsx`);
        
        alert("✅ Прайс успешно сгенерирован и начал скачиваться!");

    } catch (err) {
        console.error("Ошибка при генерации прайса:", err);
        alert("Ошибка: " + err.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}