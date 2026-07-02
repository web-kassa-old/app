// Файл глобальных настроек (config.js)

const APP_VERSION = "5.5.11"; // Меняйте версию только здесь

// 1. Ссылки на роутер и шлюз (единые для всех арендаторов)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOp6fzexVQwUHVNmL50hF62pz20TW9nNoTL1SKyBEVGb095SVh_h6kNdyOIaMdroyW/exec"; 
const GATEWAY_URL = "https://script.google.com/macros/s/AKfycbw2C9Pf7IM063RUK7niLCKxlmobGvW4s78FoX-vXRLHe_n-nScJajt4DuljfoJoNVN1/exec";

// 2. Динамический перехват уникального ключа клиента (Tenant ID)
const urlParams = new URLSearchParams(window.location.search);
const urlApiKey = urlParams.get('api_key');

if (urlApiKey) {
    // Сохраняем ключ в локальное хранилище
    localStorage.setItem('CLIENT_API_KEY', urlApiKey);
    
    // Очищаем адресную строку браузера
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
}

// 3. Инициализация константы для работы приложения
const CLIENT_API_KEY = localStorage.getItem('CLIENT_API_KEY') || "TEST_STORE_001";

// Проверка на отсутствие ключа
if (!CLIENT_API_KEY) {
    console.error("Ошибка аутентификации: Ключ арендатора не найден. Обратитесь к администратору.");
}
