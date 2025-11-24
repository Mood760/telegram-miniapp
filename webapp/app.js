const tg = window.Telegram.WebApp;
tg.expand();

// تحميل التطبيقات من ملف JSON
fetch("apps.json")
.then(res => res.json())
.then(data => {
    renderApps(data);
});

function renderApps(data){
    const allContainer = document.getElementById("all-apps");
    const popularContainer = document.getElementById("popular");

    data.forEach(app => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div>
            <strong>${app.name}</strong><br>
            <small>${app.description}</small>
          </div>
          <a href="${app.download}" target="_blank">
            <button>تحميل ⬇️</button>
          </a>
        `;

        allContainer.appendChild(card);

        if(app.popular){
            popularContainer.appendChild(card.cloneNode(true));
        }
    });
}
