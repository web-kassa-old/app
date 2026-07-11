// Файл глобальных настроек (config.js)

const APP_VERSION = "5.6.02"; // Меняйте версию только здесь

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

// Динамически берем ключ из памяти телефона (он сохраняется туда после логина через Google)
let CLIENT_API_KEY = localStorage.getItem('CLIENT_API_KEY') || "";
