document.addEventListener("DOMContentLoaded", () => {
    fetch("/stores") 
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.createElement("div");
            storeContainer.innerHTML = "<h2>Butiker i Jönköping</h2><ul id='store-list'></ul>";
            document.body.appendChild(storeContainer);

            const storeList = document.getElementById("store-list");

            data.forEach(store => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${store.name}</strong> - Område: ${store.district ?? "Okänt"}<br>
                    <a href="https://${store.url}" target="_blank">${store.url ? "Besök butik" : "Ingen webbsida"}</a>
                `;
                storeList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Fel vid hämtning av data:", error));
});
