const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
}

let allAppsData = [];

// تحميل البيانات
fetch("apps.json")
  .then(res => res.json())
  .then(data => {
    allAppsData = data;
    renderLists(data);
  })
  .catch(err => console.error("Error loading apps.json", err));

/* ====== رسم القوائم ====== */
function renderLists(data) {
  const popularContainer = document.getElementById("popularApps");
  const allContainer = document.getElementById("allApps");

  popularContainer.innerHTML = "";
  allContainer.innerHTML = "";

  // الأكثر تحميلاً
  data.filter(app => app.popular).forEach(app => {
    const card = document.createElement("div");
    card.className = "popular-card";
    card.onclick = () => openDetails(app);

    card.innerHTML = `
      <div class="popular-info">
        <div class="popular-name">${app.name}</div>
        <div class="popular-downloads">${app.downloads} تحميل</div>
      </div>
      <div class="popular-icon">
        ${app.icon ? `<img src="${app.icon}" alt="${app.name}">` : "📱"}
      </div>
    `;

    popularContainer.appendChild(card);
  });

  // كل التطبيقات
  data.forEach(app => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.onclick = () => openDetails(app);

    card.innerHTML = `
      <div class="app-left">
        <div class="app-arrow">‹</div>
        <div class="app-info">
          ${app.isNew ? `<span class="badge-new">جديد</span>` : ""}
          <div class="app-name">${app.name}</div>
          <div class="app-sub">${app.subtitle || ""}</div>
        </div>
      </div>
      <div class="app-icon">
        ${app.icon ? `<img src="${app.icon}" alt="${app.name}">` : "📱"}
      </div>
    `;

    allContainer.appendChild(card);
  });
}

/* ====== شيت التفاصيل ====== */
const detailsSheet = document.getElementById("detailsSheet");
const detailsName = document.getElementById("detailsName");
const detailsVersion = document.getElementById("detailsVersion");
const detailsPlatform = document.getElementById("detailsPlatform");
const detailsDownloads = document.getElementById("detailsDownloads");
const detailsDescription = document.getElementById("detailsDescription");
const detailsIcon = document.getElementById("detailsIcon");
const detailsLink = document.getElementById("detailsLink");

function openDetails(app) {
  detailsName.textContent = app.name;
  detailsVersion.textContent = app.version || "";
  detailsPlatform.textContent = app.platform || "iOS";
  detailsDownloads.textContent = app.downloads || 0;
  detailsDescription.textContent = app.description || app.subtitle || "";
  if (app.icon) {
    detailsIcon.src = app.icon;
  } else {
    detailsIcon.removeAttribute("src");
  }
  detailsLink.href = app.downloadUrl || "#";

  detailsSheet.classList.add("open");
}

// إغلاق الشيت بالسحب من الخلفية (لمسة خارجية لو حاب تضيف لاحقاً)
detailsSheet.addEventListener("click", (e) => {
  if (e.target === detailsSheet) {
    detailsSheet.classList.remove("open");
  }
});

/* ====== البحث ====== */
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();
  const filtered = filterApps(value);
  renderLists(filtered);
});

function filterApps(query) {
  if (!query) return allAppsData;
  const q = normalize(query);
  return allAppsData.filter(app =>
    normalize(app.name).includes(q) ||
    normalize(app.subtitle || "").includes(q)
  );
}

function normalize(str) {
  return (str || "").toString().toLowerCase();
}
