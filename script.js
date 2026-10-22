/* =========================================================
   Нур — скрипты сайта
   Всё работает без фреймворков и без сборки.
   ========================================================= */

/* ---------- Данные: русские названия 114 сур ----------
   Арабские названия и количество аятов берутся из API.
   Порядок в массиве = номер суры (индекс + 1). */
const surahNamesRu = [
  "Аль-Фатиха", "Аль-Бакара", "Али Имран", "Ан-Ниса", "Аль-Маида",
  "Аль-Ан‘ам", "Аль-А‘раф", "Аль-Анфаль", "Ат-Тауба", "Юнус",
  "Худ", "Юсуф", "Ар-Ра‘д", "Ибрахим", "Аль-Хиджр",
  "Ан-Нахль", "Аль-Исра", "Аль-Кахф", "Марьям", "Та Ха",
  "Аль-Анбийа", "Аль-Хаджж", "Аль-Му’минун", "Ан-Нур", "Аль-Фуркан",
  "Аш-Шу‘ара", "Ан-Намль", "Аль-Касас", "Аль-‘Анкабут", "Ар-Рум",
  "Лукман", "Ас-Саджда", "Аль-Ахзаб", "Саба", "Фатыр",
  "Я Син", "Ас-Саффат", "Сад", "Аз-Зумар", "Гафир",
  "Фуссылят", "Аш-Шура", "Аз-Зухруф", "Ад-Духан", "Аль-Джасия",
  "Аль-Ахкаф", "Мухаммад", "Аль-Фатх", "Аль-Худжурат", "Каф",
  "Аз-Зарият", "Ат-Тур", "Ан-Наджм", "Аль-Камар", "Ар-Рахман",
  "Аль-Вакы‘а", "Аль-Хадид", "Аль-Муджадаля", "Аль-Хашр", "Аль-Мумтахана",
  "Ас-Сафф", "Аль-Джума", "Аль-Мунафикун", "Ат-Тагабун", "Ат-Таляк",
  "Ат-Тахрим", "Аль-Мульк", "Аль-Калам", "Аль-Хакка", "Аль-Ма‘ариж",
  "Нух", "Аль-Джинн", "Аль-Муззаммиль", "Аль-Муддассир", "Аль-Кыяма",
  "Аль-Инсан", "Аль-Мурсалят", "Ан-Наба", "Ан-Нази‘ат", "‘Абаса",
  "Ат-Таквир", "Аль-Инфитар", "Аль-Мутаффифин", "Аль-Иншикак", "Аль-Бурудж",
  "Ат-Тарик", "Аль-А‘ля", "Аль-Гашия", "Аль-Фаджр", "Аль-Баляд",
  "Аш-Шамс", "Аль-Лайль", "Ад-Духа", "Аш-Шарх", "Ат-Тин",
  "Аль-‘Алак", "Аль-Кадр", "Аль-Баййина", "Аз-Зальзаля", "Аль-‘Адият",
  "Аль-Кари‘а", "Ат-Такасур", "Аль-‘Аср", "Аль-Хумаза", "Аль-Филь",
  "Курайш", "Аль-Ма‘ун", "Аль-Каусар", "Аль-Кафирун", "Ан-Наср",
  "Аль-Масад", "Аль-Ихлас", "Аль-Фаляк", "Ан-Нас"
];

/* ---------- Данные: города для времени намаза ----------
   ntId — id города в API Namaztimes.kz (https://namaztimes.kz/ru/dev/23).
          Если он указан, время берётся оттуда (Астана и Алматы — id из документации).
   Остальные города рассчитывает сервис Aladhan по координатам (lat, lon).
   Aladhan также служит запасным вариантом, если Namaztimes.kz недоступен.
   method — метод расчёта Aladhan: 14 — ДУМ России, 13 — Диянет, 4 — Умм аль-Кура, 3 — Всемирная лига мусульман. */
const cities = [
  { group: "Казахстан", name: "Астана",  ntId: 8359, lat: 51.1694, lon: 71.4491, tz: "Asia/Almaty", method: 3 },
  { group: "Казахстан", name: "Алматы",  ntId: 8408, lat: 43.2220, lon: 76.8512, tz: "Asia/Almaty", method: 3 },

  { group: "Россия", name: "Москва",          lat: 55.7558, lon: 37.6173, tz: "Europe/Moscow",      method: 14 },
  { group: "Россия", name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351, tz: "Europe/Moscow",      method: 14 },
  { group: "Россия", name: "Казань",          lat: 55.7887, lon: 49.1221, tz: "Europe/Moscow",      method: 14 },
  { group: "Россия", name: "Уфа",             lat: 54.7388, lon: 55.9721, tz: "Asia/Yekaterinburg", method: 14 },
  { group: "Россия", name: "Грозный",         lat: 43.3180, lon: 45.6949, tz: "Europe/Moscow",      method: 14 },
  { group: "Россия", name: "Махачкала",       lat: 42.9849, lon: 47.5047, tz: "Europe/Moscow",      method: 14 },

  { group: "Другие страны", name: "Минск",   lat: 53.9006, lon: 27.5590, tz: "Europe/Minsk",    method: 3 },
  { group: "Другие страны", name: "Ташкент", lat: 41.2995, lon: 69.2401, tz: "Asia/Tashkent",   method: 3 },
  { group: "Другие страны", name: "Баку",    lat: 40.4093, lon: 49.8671, tz: "Asia/Baku",       method: 3 },
  { group: "Другие страны", name: "Стамбул", lat: 41.0082, lon: 28.9784, tz: "Europe/Istanbul", method: 13 },
  { group: "Другие страны", name: "Мекка",   lat: 21.3891, lon: 39.8579, tz: "Asia/Riyadh",     method: 4 }
];

/* Области Казахстана, города которых подгружаются из API Namaztimes.kz
   (https://namaztimes.kz/ru/api/cities?id={slug}). Чтобы добавить область,
   допишите сюда её slug из списка городов на сайте Namaztimes.kz. */
const namaztimesRegions = [
  { slug: "almaty", group: "Алматинская область", tz: "Asia/Almaty" }
];

/* Месяцы по хиджре (для даты из API) */
const hijriMonths = [
  "Мухаррам", "Сафар", "Раби аль-авваль", "Раби ас-сани", "Джумада аль-уля", "Джумада ас-сани",
  "Раджаб", "Шаабан", "Рамадан", "Шавваль", "Зуль-каада", "Зуль-хиджа"
];

/* ---------- Вспомогательные функции для localStorage ----------
   Оборачиваем в try/catch: в приватном режиме браузер может запретить хранилище. */
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ничего страшного */ }
}

/* =========================================================
   1. Тема: светлая / тёмная с сохранением
   ========================================================= */
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  // В тёмной теме показываем солнце (переключить на светлую), в светлой — луну
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
  );
}

applyTheme(storageGet("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  storageSet("theme", next);
});

/* =========================================================
   2. Мобильное меню (бургер)
   ========================================================= */
const burger = document.getElementById("burger");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}

burger.addEventListener("click", () => {
  setMenu(!nav.classList.contains("open"));
});

// Закрываем меню по клавише Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Закрываем меню по клику вне его
document.addEventListener("click", (e) => {
  if (nav.classList.contains("open") && !nav.contains(e.target) && !burger.contains(e.target)) setMenu(false);
});

/* =========================================================
   3. Плавная прокрутка к разделам
   ========================================================= */
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
    if (target.id === "quran" && !reader.hidden) closeReader(); // из режима чтения — обратно к списку
    setMenu(false); // после перехода закрываем мобильное меню
  });
});

/* =========================================================
   3а. Подсветка текущего раздела в меню
   ========================================================= */
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" }); // «активный» раздел — тот, что пересекает середину экрана

navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

/* =========================================================
   4. Коран: список сур, поиск, чтение аятов
   Арабский текст (Tanzil) и русский перевод (Э. Кулиев) лежат в локальных файлах папки quran/.
   Если какого-то файла нет (или в нём нет перевода), недостающее загружается из открытого API AlQuran Cloud.
   В коде нет ни одного аята — всё приходит из файлов или с сервера.
   ========================================================= */
const QURAN_API = "https://api.alquran.cloud/v1";
const QURAN_LOCAL = "quran/";

const quranSection = document.getElementById("quran");
const surahListView = document.getElementById("surah-list-view");
const surahSearch = document.getElementById("surah-search");
const surahStatus = document.getElementById("surah-status");
const surahListEl = document.getElementById("surah-list");

const reader = document.getElementById("surah-reader");
const readerTitle = document.getElementById("reader-title");
const readerMeta = document.getElementById("reader-meta");
const readerBismillah = document.getElementById("reader-bismillah");
const ayahStatus = document.getElementById("ayah-status");
const ayahListEl = document.getElementById("ayah-list");
const backButton = document.getElementById("back-to-list");
const prevButton = document.getElementById("prev-surah");
const nextButton = document.getElementById("next-surah");

let surahs = [];                // список сур: { number, nameAr, nameRu, ayahs }
const surahCache = new Map();   // уже загруженные суры: номер → { ayahs, bismillah }
let currentSurah = null;        // номер открытой суры
let useLocalQuran = true;       // станет false, если локальных файлов нет
let readerPushed = false;       // добавляли ли мы запись в историю браузера при открытии суры

/* ----- Вспомогательные функции ----- */

// Убираем огласовки и знаки Корана, чтобы сравнивать арабские слова
function stripDiacritics(text) {
  return text.replace(/[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
}

// Приводим арабский текст к простому виду (для поиска и проверок)
function normalizeArabic(text) {
  return stripDiacritics(text).replace(/[\u0671\u0622\u0623\u0625]/g, "\u0627");
}

// Приводим русский текст к простому виду: без регистра, дефисов, пробелов и апострофов
function normalizeRussian(text) {
  return text.toLowerCase().replace(/ё/g, "е").replace(/[\s\-‘’'`ʻ]/g, "");
}

// Склонение: 1 аят, 2 аята, 5 аятов
function ayahWord(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "аят";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "аята";
  return "аятов";
}

// У арабских названий в данных есть слово «сура» в начале — убираем его
function cleanArabicName(name) {
  const words = name.trim().split(/\s+/);
  if (words.length > 1 && stripDiacritics(words[0]) === "سورة") words.shift();
  return words.join(" ");
}

function scrollToQuran() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  quranSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

// Номер суры из адреса вида #quran/2 (0, если адрес другой)
function surahFromHash() {
  const match = /^#quran\/(\d{1,3})$/.exec(location.hash);
  const number = match ? Number(match[1]) : 0;
  return number >= 1 && number <= 114 ? number : 0;
}

/* ----- Загрузка данных ----- */

// Запрос к API AlQuran Cloud с таймаутом
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const json = await response.json();
    if (json.code !== 200 || !json.data) throw new Error("Неверный ответ сервера");
    return json;
  } finally {
    clearTimeout(timer);
  }
}

// Запрос к локальному файлу из папки quran/
async function getLocalJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}

// Список сур: сначала локальный файл, потом API
async function loadSurahListData() {
  if (useLocalQuran) {
    try {
      const local = await getLocalJson(QURAN_LOCAL + "surahs.json");
      if (Array.isArray(local) && local.length === 114) return local;
    } catch (error) { /* локальных файлов нет — берём из API */ }
    useLocalQuran = false;
  }
  const json = await fetchJson(QURAN_API + "/surah");
  return json.data;
}

// Тексты суры: { ar: [...], ru: [...] или null, bismillah: "..." или undefined }
// Арабский текст берётся из локального файла quran/N.json. Перевод — оттуда же,
// а если его в файле нет, загружается из API. Если локальных файлов нет, всё берётся из API.
async function fetchSurahTexts(number) {
  if (useLocalQuran) {
    try {
      const local = await getLocalJson(QURAN_LOCAL + number + ".json");
      if (Array.isArray(local.ar) && local.ar.length) {
        let ru = Array.isArray(local.ru) && local.ru.length === local.ar.length ? local.ru : null;
        if (!ru) ru = await fetchTranslation(number, local.ar.length);
        return { ar: local.ar, ru, bismillah: typeof local.bismillah === "string" ? local.bismillah : undefined };
      }
    } catch (error) { /* файла нет — берём всё из API */ }
  }
  // Арабский текст и перевод — два запроса одновременно
  const [arabic, russian] = await Promise.all([
    fetchJson(QURAN_API + "/surah/" + number + "/quran-uthmani"),
    fetchJson(QURAN_API + "/surah/" + number + "/ru.kuliev")
  ]);
  return {
    ar: arabic.data.ayahs.map((a) => a.text),
    ru: russian.data.ayahs.map((a) => a.text)
  };
}

// Русский перевод из API; если не получилось — null (тогда покажем только арабский текст)
async function fetchTranslation(number, expectedCount) {
  try {
    const json = await fetchJson(QURAN_API + "/surah/" + number + "/ru.kuliev");
    const ru = json.data.ayahs.map((a) => a.text);
    return ru.length === expectedCount ? ru : null;
  } catch (error) {
    return null;
  }
}

/* ----- Индикатор загрузки и сообщения ----- */
function showLoader(box, text) {
  box.className = "loader-box";
  box.innerHTML = '<span class="spinner" aria-hidden="true"></span><span></span>';
  box.lastChild.textContent = text;
}

function showMessage(box, text) {
  box.className = "loader-box";
  box.textContent = text;
}

function clearStatus(box) {
  box.className = "loader-box";
  box.textContent = "";
}

function showError(box, text, retry) {
  box.className = "loader-box error";
  box.textContent = text + " ";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-outline";
  button.textContent = "Повторить";
  button.addEventListener("click", retry);
  box.appendChild(button);
}

/* ----- Список сур ----- */
async function loadSurahList() {
  showLoader(surahStatus, "Загружаем список сур…");
  try {
    const data = await loadSurahListData();
    surahs = data.map((s) => ({
      number: s.number,
      nameAr: cleanArabicName(s.name),
      nameRu: surahNamesRu[s.number - 1] || s.englishName,
      ayahs: s.numberOfAyahs
    }));
    clearStatus(surahStatus);
    filterSurahs();

    // Если страницу открыли по ссылке вида #quran/2 — сразу показываем эту суру
    const fromHash = surahFromHash();
    if (fromHash) openSurah(fromHash, "none");
  } catch (error) {
    showError(surahStatus, "Не удалось загрузить список сур. Проверьте подключение к интернету.", loadSurahList);
  }
}

function renderSurahList(list) {
  surahListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach((surah) => {
    const li = document.createElement("li");
    li.className = "surah-item";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.number = String(surah.number);

    const num = document.createElement("span");
    num.className = "surah-num";
    num.textContent = surah.number;

    const names = document.createElement("span");
    names.className = "surah-names";
    const ru = document.createElement("span");
    ru.className = "surah-ru";
    ru.textContent = surah.nameRu;
    const count = document.createElement("span");
    count.className = "surah-count";
    count.textContent = surah.ayahs + " " + ayahWord(surah.ayahs);
    names.append(ru, count);

    const ar = document.createElement("span");
    ar.className = "surah-ar";
    ar.lang = "ar";
    ar.dir = "rtl";
    ar.textContent = surah.nameAr;

    button.append(num, names, ar);
    li.appendChild(button);
    fragment.appendChild(li);
  });

  surahListEl.appendChild(fragment);
}

// Поиск по номеру, русскому или арабскому названию
function filterSurahs() {
  const query = surahSearch.value.trim();
  let result = surahs;

  if (query) {
    if (/^\d+$/.test(query)) {
      result = surahs.filter((s) => s.number === Number(query));
    } else {
      const ruQuery = normalizeRussian(query);
      const arQuery = normalizeArabic(query).replace(/\s/g, "");
      result = surahs.filter((s) =>
        normalizeRussian(s.nameRu).includes(ruQuery) ||
        normalizeArabic(s.nameAr).replace(/\s/g, "").includes(arQuery)
      );
    }
  }

  renderSurahList(result);
  if (surahs.length && result.length === 0) {
    showMessage(surahStatus, "Сура не найдена. Попробуйте другое название или номер от 1 до 114.");
  } else if (surahs.length) {
    clearStatus(surahStatus);
  }
}

surahSearch.addEventListener("input", filterSurahs);

// Клик по суре в списке (делегирование событий)
surahListEl.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-number]");
  if (button) openSurah(Number(button.dataset.number), "push");
});

/* ----- Загрузка текста суры ----- */

// Если данные пришли из API, первый аят многих сур начинается с басмалы. Отделяем её от аята,
// чтобы показать отдельной строкой (в 1-й суре басмала — это 1-й аят, в 9-й её нет).
// В локальных файлах басмала уже хранится отдельно, и эта функция не нужна.
function extractBismillah(number, ayahs) {
  if (number === 1 || number === 9) return "";

  const words = ayahs[0].ar.split(" ");
  const start = words.slice(0, 4).join(" ");
  if (words.length > 4 && normalizeArabic(start) === "بسم الله الرحمن الرحيم") {
    ayahs[0].ar = words.slice(4).join(" ");
    return start;
  }
  return "";
}

async function loadSurahText(number) {
  if (surahCache.has(number)) return surahCache.get(number);

  const texts = await fetchSurahTexts(number);
  if (!texts.ar.length || (texts.ru && texts.ru.length !== texts.ar.length)) {
    throw new Error("Количество аятов в текстах не совпадает");
  }

  const ayahs = texts.ar.map((ar, i) => ({ number: i + 1, ar, ru: texts.ru ? texts.ru[i] : "" }));

  // На случай, если басмала попала и в начало русского перевода первого аята
  if (texts.ru && number !== 1 && number !== 9) {
    ayahs[0].ru = ayahs[0].ru.replace(/^Во имя Аллаха,?\s+Милостивого,?\s+Милосердного[!.]?\s*/i, "");
  }

  const bismillah = texts.bismillah !== undefined ? texts.bismillah : extractBismillah(number, ayahs);
  const data = { ayahs, bismillah, translationMissing: !texts.ru };

  // Если перевод не загрузился, не запоминаем результат — чтобы «Повторить» попробовало ещё раз
  if (!data.translationMissing) surahCache.set(number, data);
  return data;
}

/* ----- Чтение суры ----- */
function renderAyahs(data) {
  ayahListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  data.ayahs.forEach((ayah) => {
    const li = document.createElement("li");
    li.className = "ayah";

    const num = document.createElement("span");
    num.className = "ayah-num";
    num.textContent = ayah.number;

    // Арабский текст: Amiri, справа налево
    const ar = document.createElement("p");
    ar.className = "arabic";
    ar.lang = "ar";
    ar.dir = "rtl";
    ar.textContent = ayah.ar;

    li.append(num, ar);

    // Русский перевод (если загрузился)
    if (ayah.ru) {
      const ru = document.createElement("p");
      ru.className = "translation";
      ru.textContent = ayah.ru;
      li.appendChild(ru);
    }
    fragment.appendChild(li);
  });

  ayahListEl.appendChild(fragment);
}

// Подписи кнопок «предыдущая / следующая сура»
function updateSurahNav(number) {
  const prev = surahs[number - 2];
  const next = surahs[number];
  prevButton.disabled = !prev;
  nextButton.disabled = !next;
  prevButton.textContent = prev ? "Предыдущая: " + prev.nameRu : "Предыдущая сура";
  nextButton.textContent = next ? "Следующая: " + next.nameRu : "Следующая сура";
}

/* route — как менять адрес страницы:
   "push"    — добавить запись в историю (открытие из списка, кнопка «Назад» вернёт к списку),
   "replace" — заменить текущую запись (переход на соседнюю суру),
   "none"    — адрес уже правильный (открытие по ссылке или по кнопке «Назад» браузера). */
async function openSurah(number, route = "push") {
  const surah = surahs[number - 1];
  if (!surah) return;
  currentSurah = number;

  if (route === "push") {
    history.pushState({ surah: number }, "", "#quran/" + number);
    readerPushed = true;
  } else if (route === "replace") {
    history.replaceState({ surah: number }, "", "#quran/" + number);
  }

  // Переключаем вид: список → чтение
  surahListView.hidden = true;
  reader.hidden = false;

  readerTitle.textContent = "Сура " + surah.number + ". " + surah.nameRu + " ";
  const titleAr = document.createElement("span");
  titleAr.className = "surah-ar";
  titleAr.lang = "ar";
  titleAr.dir = "rtl";
  titleAr.textContent = surah.nameAr;
  readerTitle.appendChild(titleAr);
  readerMeta.textContent = surah.ayahs + " " + ayahWord(surah.ayahs);

  readerBismillah.hidden = true;
  ayahListEl.innerHTML = "";
  updateSurahNav(number);
  showLoader(ayahStatus, "Загружаем аяты…");
  scrollToQuran();
  readerTitle.focus({ preventScroll: true });

  try {
    const data = await loadSurahText(number);
    if (currentSurah !== number) return; // пользователь уже перешёл на другую суру

    clearStatus(ayahStatus);
    if (data.bismillah) {
      readerBismillah.textContent = data.bismillah;
      readerBismillah.hidden = false;
    }
    renderAyahs(data);
    if (data.translationMissing) {
      showError(ayahStatus, "Русский перевод не загрузился, показан только арабский текст.", () => openSurah(number, "none"));
    }
  } catch (error) {
    if (currentSurah !== number) return;
    showError(ayahStatus, "Не удалось загрузить аяты. Проверьте подключение к интернету.", () => openSurah(number, "none"));
  }
}

// Закрываем чтение и показываем список (адрес страницы здесь не меняется)
function closeReader() {
  const number = currentSurah;
  currentSurah = null;
  readerPushed = false;
  reader.hidden = true;
  surahListView.hidden = false;

  // Возвращаем фокус на суру, которую только что читали
  const button = surahListEl.querySelector('[data-number="' + number + '"]');
  if (button) button.focus();
  else scrollToQuran();
}

// Кнопка «Назад к списку сур»
function backToList() {
  if (readerPushed) {
    // Суру открыли из списка: возвращаемся на предыдущую запись истории, остальное сделает popstate
    readerPushed = false;
    history.back();
  } else {
    // Суру открыли по прямой ссылке: просто возвращаем адрес #quran
    history.replaceState(null, "", "#quran");
    closeReader();
  }
}

backButton.addEventListener("click", backToList);
prevButton.addEventListener("click", () => openSurah(currentSurah - 1, "replace"));
nextButton.addEventListener("click", () => openSurah(currentSurah + 1, "replace"));

// Кнопки «Назад» и «Вперёд» браузера
window.addEventListener("popstate", () => {
  const number = surahFromHash();
  if (number) {
    if (reader.hidden || number !== currentSurah) openSurah(number, "none");
  } else if (!reader.hidden) {
    closeReader();
  }
});

loadSurahList();

/* =========================================================
   5. Текущая дата и время
   ========================================================= */
const dateEl = document.getElementById("current-date");
const timeEl = document.getElementById("current-time");

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});
const timeFormat = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit", minute: "2-digit", second: "2-digit"
});

function updateClock() {
  const now = new Date();
  const dateText = dateFormat.format(now);
  dateEl.textContent = dateText.charAt(0).toUpperCase() + dateText.slice(1); // только первая буква заглавная
  timeEl.textContent = timeFormat.format(now);
}

updateClock();
setInterval(updateClock, 1000);

/* =========================================================
   6. Время намаза: выбор города и загрузка расписания
   Источники: API Namaztimes.kz (города Казахстана) и Aladhan (остальные города
   и запасной вариант). Результат за день кэшируется в localStorage,
   чтобы не делать лишних запросов к API.
   ========================================================= */
const citySelect = document.getElementById("city-select");
const prayerBody = document.getElementById("prayer-body");
const prayerStatus = document.getElementById("prayer-status");
const prayerCaption = document.getElementById("prayer-caption");
const prayerNext = document.getElementById("prayer-next");
const prayerHijri = document.getElementById("prayer-hijri");

const cityByKey = new Map();   // ключ города → описание
const groupEls = new Map();    // название группы → <optgroup>
let currentPrayer = null;      // данные для отображения: { rows, hijri, tz }
let loadToken = 0;             // чтобы медленный ответ не перезаписал новый выбор

function cityKey(city) {
  return city.ntId ? "nt" + city.ntId : "aladhan-" + city.name;
}

// Добавляем город в выпадающий список (внутри группы)
function addCity(city) {
  const key = cityKey(city);
  if (cityByKey.has(key)) return;
  cityByKey.set(key, city);

  let group = groupEls.get(city.group);
  if (!group) {
    group = document.createElement("optgroup");
    group.label = city.group;
    citySelect.appendChild(group);
    groupEls.set(city.group, group);
  }
  const option = document.createElement("option");
  option.value = key;
  option.textContent = city.name;
  group.appendChild(option);
}

cities.forEach(addCity);

// Восстанавливаем последний выбранный город
const savedCityKey = storageGet("cityKey");
if (savedCityKey && cityByKey.has(savedCityKey)) citySelect.value = savedCityKey;

/* ----- Вспомогательные функции ----- */

// Запрос JSON с таймаутом
async function getJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

// Текущая дата в часовом поясе города в формате ДД-ММ-ГГГГ (так просит Aladhan)
function dateInZone(tz) {
  return new Date().toLocaleDateString("en-GB", { timeZone: tz }).replace(/\//g, "-");
}

// Текущее время в городе в минутах от начала суток
function minutesNowInZone(tz) {
  const parts = new Date().toLocaleTimeString("en-GB", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

// "05:12" → 312
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// "6:55" или "06:55 (MSK)" → "06:55"
function formatTime(value) {
  const match = /^(\d{1,2}):(\d{2})/.exec(String(value).trim());
  if (!match) throw new Error("Неверный формат времени: " + value);
  return match[1].padStart(2, "0") + ":" + match[2];
}

// Дата по хиджре: (1440, 4, 18) → "18 Раби ас-сани 1440 г."
function formatHijri(year, month, day) {
  const name = hijriMonths[Number(month) - 1];
  if (!name) return "";
  return Number(day) + " " + name + " " + year + " г.";
}

// Сколько осталось: 125 → "2 ч 05 мин"
function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? h + " ч " + String(m).padStart(2, "0") + " мин" : m + " мин";
}

// Кэш на один день: хранится вместе с датой, на следующий день игнорируется
function cacheGet(key, date) {
  try {
    const saved = JSON.parse(storageGet(key));
    return saved && saved.date === date ? saved.data : null;
  } catch (e) {
    return null;
  }
}
function cacheSet(key, date, data) {
  storageSet(key, JSON.stringify({ date, data }));
}

/* ----- Источник 1: Namaztimes.kz ----- */
async function fetchNamaztimes(city) {
  const json = await getJson("https://namaztimes.kz/api/praytimes?id=" + city.ntId + "&type=json");
  const p = json.praytimes;
  if (!p || !p.bamdat) throw new Error("Неверный ответ Namaztimes.kz");

  const [year, month, day] = String(json.islamic_date).split("-");
  // Соответствие полей API: bamdat — Фаджр, kun — восход, besin — Зухр,
  // ekindi — Аср (позднее время, ханафитский мазхаб), aqsham — Магриб, quptan — Иша
  return {
    source: "Namaztimes.kz",
    hijri: formatHijri(year, month, day),
    rows: [
      { label: "Фаджр (рассвет)",     time: formatTime(p.bamdat), prayer: true },
      { label: "Восход солнца",       time: formatTime(p.kun),    prayer: false },
      { label: "Зухр (полдень)",      time: formatTime(p.besin),  prayer: true },
      { label: "Аср (после полудня)", time: formatTime(p.ekindi), prayer: true },
      { label: "Магриб (закат)",      time: formatTime(p.aqsham), prayer: true },
      { label: "Иша (ночь)",          time: formatTime(p.quptan), prayer: true }
    ]
  };
}

/* ----- Источник 2: Aladhan ----- */
async function fetchAladhan(city) {
  const url =
    "https://api.aladhan.com/v1/timings/" + dateInZone(city.tz) +
    "?latitude=" + city.lat +
    "&longitude=" + city.lon +
    "&method=" + city.method +
    "&timezonestring=" + encodeURIComponent(city.tz);
  const json = await getJson(url);
  const t = json.data.timings;
  const h = json.data.date && json.data.date.hijri;

  return {
    source: "Aladhan",
    hijri: h ? formatHijri(h.year, h.month.number, h.day) : "",
    rows: [
      { label: "Фаджр (рассвет)",     time: formatTime(t.Fajr),    prayer: true },
      { label: "Восход солнца",       time: formatTime(t.Sunrise), prayer: false },
      { label: "Зухр (полдень)",      time: formatTime(t.Dhuhr),   prayer: true },
      { label: "Аср (после полудня)", time: formatTime(t.Asr),     prayer: true },
      { label: "Магриб (закат)",      time: formatTime(t.Maghrib), prayer: true },
      { label: "Иша (ночь)",          time: formatTime(t.Isha),    prayer: true }
    ]
  };
}

/* ----- Отображение: таблица, ближайший намаз, дата по хиджре ----- */
function renderPrayer() {
  if (!currentPrayer) return;
  const { rows, hijri, tz } = currentPrayer;
  const nowMin = minutesNowInZone(tz);

  // Ближайший намаз — первый, время которого ещё не наступило; если все прошли — завтрашний Фаджр
  const prayers = rows.filter((r) => r.prayer);
  let next = prayers.find((r) => toMinutes(r.time) > nowMin);
  let tomorrow = false;
  if (!next) {
    next = prayers[0];
    tomorrow = true;
  }

  prayerBody.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row === next && !tomorrow) tr.className = "next";
    if (!row.prayer) tr.className = "muted"; // восход — не намаз

    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = row.label;

    const td = document.createElement("td");
    td.textContent = row.time;

    tr.append(th, td);
    prayerBody.appendChild(tr);
  });

  const diff = toMinutes(next.time) - nowMin + (tomorrow ? 1440 : 0);
  prayerNext.textContent =
    "Ближайший намаз: " + next.label.split(" (")[0] + " в " + next.time +
    (tomorrow ? " (завтра)" : "") + ", через " + formatDuration(diff);
  prayerHijri.textContent = hijri ? "Дата по хиджре: " + hijri : "";
}

// Обновляем подсветку и обратный отсчёт каждые 30 секунд
setInterval(renderPrayer, 30000);

function showPrayerError(text) {
  currentPrayer = null;
  prayerBody.innerHTML = "";
  prayerNext.textContent = "";
  prayerHijri.textContent = "";
  prayerStatus.textContent = text;
}

/* ----- Загрузка расписания для выбранного города ----- */
async function loadPrayerTimes() {
  const city = cityByKey.get(citySelect.value);
  if (!city) return;
  storageSet("cityKey", citySelect.value);

  const token = ++loadToken;
  prayerStatus.textContent = "Загружаем время намаза…";
  prayerCaption.textContent = "Время намаза: " + city.name;

  const today = dateInZone(city.tz);
  const cacheKey = "prayer:" + citySelect.value;
  let result = cacheGet(cacheKey, today);
  let usedFallback = false;

  if (!result) {
    try {
      result = city.ntId ? await fetchNamaztimes(city) : await fetchAladhan(city);
      cacheSet(cacheKey, today, result);
    } catch (error) {
      // Если Namaztimes.kz не ответил, а у города есть координаты — считаем через Aladhan
      if (city.ntId && city.lat !== undefined) {
        try {
          result = await fetchAladhan(city);
          usedFallback = true;
        } catch (fallbackError) { /* покажем ошибку ниже */ }
      }
    }
  }

  if (token !== loadToken) return; // пользователь уже выбрал другой город

  if (!result) {
    showPrayerError("Не удалось загрузить время намаза. Проверьте подключение к интернету и выберите город ещё раз.");
    return;
  }

  currentPrayer = { rows: result.rows, hijri: result.hijri, tz: city.tz };
  renderPrayer();
  prayerStatus.textContent = usedFallback
    ? "Namaztimes.kz сейчас недоступен, время рассчитано сервисом Aladhan. Город: " + city.name + ", " + today.replace(/-/g, ".") + "."
    : "Расписание для города: " + city.name + ", " + today.replace(/-/g, ".") + ". Источник: " + result.source + ".";
}

citySelect.addEventListener("change", loadPrayerTimes);

/* ----- Города областей из API Namaztimes.kz ----- */

// Ответ может быть объектом { id: "Название" } или массивом объектов — обрабатываем оба варианта
function parseCityList(data) {
  let list = [];
  if (Array.isArray(data)) {
    list = data.map((item) => ({ id: item.id, name: item.name }));
  } else if (data && typeof data === "object") {
    const source = Array.isArray(data.city) ? data.city : null;
    list = source
      ? source.map((item) => ({ id: item.id, name: item.name }))
      : Object.entries(data).map(([id, name]) => ({ id, name }));
  }
  return list.filter((c) => Number.isFinite(Number(c.id)) && typeof c.name === "string" && c.name);
}

async function loadRegionCities() {
  for (const region of namaztimesRegions) {
    const cacheKey = "cities:" + region.slug;
    try {
      // Список городов почти не меняется — кэшируем на 7 дней
      let list = null;
      try {
        const saved = JSON.parse(storageGet(cacheKey));
        if (saved && Date.now() - saved.time < 7 * 24 * 3600 * 1000) list = saved.list;
      } catch (e) { /* кэша нет */ }

      if (!list) {
        list = parseCityList(await getJson("https://namaztimes.kz/ru/api/cities?id=" + region.slug + "&type=json"));
        storageSet(cacheKey, JSON.stringify({ time: Date.now(), list }));
      }

      list.forEach((c) => addCity({ group: region.group, name: c.name, ntId: Number(c.id), tz: region.tz }));
    } catch (error) {
      /* Список областей — необязательная часть: если не загрузился, остальные города работают */
    }
  }

  // Если последний выбранный город был из области — выбираем его теперь, когда список появился
  const saved = storageGet("cityKey");
  if (saved && cityByKey.has(saved) && citySelect.value !== saved) {
    citySelect.value = saved;
    loadPrayerTimes();
  }
}

loadPrayerTimes();
loadRegionCities();

/* =========================================================
   8. Год в подвале
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
