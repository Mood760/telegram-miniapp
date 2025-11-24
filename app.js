function loadApps() {
  fetch("apps.json")
    .then(res => res.json())
    .then(apps => {
      const container = document.getElementById("appsContainer");
      const countSpan = document.getElementById("appsCount");

      countSpan.textContent = apps.length;

      apps.forEach(app => {
        const card = document.createElement("div");
        card.className = "app-card";

        card.innerHTML = `
          <img src="${app.icon}" alt="${app.name}">
          <div class="card-body">
            <h5>${app.name}</h5>
            <p class="version">${app.version || ""}</p>
            ${app.tag ? `<span class="tag-badge">${app.tag}</span>` : ""}
          </div>
          <div class="card-body">
            <a href="${app.downloadUrl}" target="_blank" class="download-btn">
              <p>Download</p>
            </a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading apps.json", err);
    });
}
