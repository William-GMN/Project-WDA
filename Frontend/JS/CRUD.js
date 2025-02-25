document.addEventListener("DOMContentLoaded", () => {
    fetch("/stores") 
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.createElement("div");
            storeContainer.classList.add("store-container");
            document.body.appendChild(storeContainer);

            data.forEach(store => {
                let storeBox = document.createElement("div");
                storeBox.classList.add("store-Box");
                storeBox.innerHTML = `
                    <h3>${store.name}</h3>
                    <p><strong>Område:</strong> ${store.district ?? "Okänt"}</p>
                    <a href="https://${store.url}" target="_blank">${store.url ? "Besök butik" : "Ingen webbsida"}</a>
                `;
                storeContainer.appendChild(storeBox);
            });
        })
        .catch(error => console.error("Fel vid hämtning av data:", error));
});
