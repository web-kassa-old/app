// Файл глобальных настроек (config.js)

const APP_VERSION = "5.5.46"; // Меняйте версию только здесь

// 1. Ссылки на роутер и шлюз (единые для всех арендаторов)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOp6fzexVQwUHVNmL50hF62pz20TW9nNoTL1SKyBEVGb095SVh_h6kNdyOIaMdroyW/exec"; 
const GATEWAY_URL = APPS_SCRIPT_URL; // <-- Теперь они одинаковые!

// 2. Ключ авторизации Google
const GOOGLE_CLIENT_ID = "1071015264018-s100se0ek42af15rm9vhq260b3lr7qer.apps.googleusercontent.com";

// === 3. ДАННЫЕ ДЛЯ УСТАНОВЩИКА ===
// Вставляй сюда полные ссылки на твои шаблоны
const TEMPLATE_TRADE_URL = "https://docs.google.com/spreadsheets/d/1FVBka2zyM50hSGKE59kyhcZwolMzUq57nkOiwbchaTg/edit?gid=1354673204#gid=1354673204";
const TEMPLATE_CONFIG_URL = "https://docs.google.com/spreadsheets/d/18J1wePHlRtqcmOA86fHxGwb38s70sJEmZafL2mvUR1I/edit?gid=1992649776#gid=1992649776";
const ADMIN_EMAIL = "muratanel7@gmail.com"; 

// 4. Динамический перехват уникального ключа клиента (Tenant ID)
const urlParams = new URLSearchParams(window.location.search);
const urlApiKey = urlParams.get('api_key');

if (urlApiKey) {
    // Сохраняем ключ в локальное хранилище
    localStorage.setItem('CLIENT_API_KEY', urlApiKey);
    
    // ВАЖНО: Убрана очистка адресной строки!
    // Теперь iOS при сохранении "На экран Домой" запомнит ссылку вместе с ключом арендатора.
}

// 5. Инициализация константы
// Убираем жесткий fallback на "TEST_STORE_001", чтобы не "отравлять" базу
const CLIENT_API_KEY = localStorage.getItem('CLIENT_API_KEY') || null;

// Если ключа нет, мы не предупреждаем, а просто ждем авторизации
if (!CLIENT_API_KEY) {
    console.log("Ключ арендатора не найден. Ожидание авторизации...");
} else if (CLIENT_API_KEY === "TEST_STORE_001") {
    console.warn("Внимание: В памяти найден устаревший тестовый ключ. Рекомендуется сброс.");
}
