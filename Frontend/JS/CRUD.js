document.addEventListener("DOMContentLoaded", () => {
    fetch("/stores")
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.createElement("div");
            storeContainer.classList.add("store-container");
            document.body.appendChild(storeContainer);

            const paginationContainer = document.createElement("div");
            paginationContainer.classList.add("pagination-container");
            document.body.appendChild(paginationContainer);

            const itemsPerPage = 12;
            let currentPage = 1;

            function renderPage(page) {
                storeContainer.innerHTML = "";
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedItems = data.slice(start, end);

                paginatedItems.forEach(store => {
                    let storeBox = document.createElement("div");
                    storeBox.classList.add("store-box");
                    storeBox.innerHTML = `
                        <h3>${store.name}</h3>
                        <p><strong>Område:</strong> ${store.district ?? "Okänt"}</p>
                        <a href="https://${store.url}" target="_blank">${store.url ? "Besök butik" : "Ingen webbsida"}</a>
                    `;
                    storeContainer.appendChild(storeBox);
                });

                renderPagination();
            }

            function renderPagination() {
                paginationContainer.innerHTML = "";
                const totalPages = Math.ceil(data.length / itemsPerPage);

                if (currentPage > 1) {
                    const prevButton = document.createElement("button");
                    prevButton.textContent = currentPage - 1;
                    prevButton.classList.add("page-button");
                    prevButton.addEventListener("click", () => {
                        currentPage--;
                        renderPage(currentPage);
                    });
                    paginationContainer.appendChild(prevButton);
                }

                const currentButton = document.createElement("button");
                currentButton.textContent = currentPage;
                currentButton.classList.add("page-button", "active");
                paginationContainer.appendChild(currentButton);

                if (currentPage < totalPages) {
                    const nextButton = document.createElement("button");
                    nextButton.textContent = currentPage + 1;
                    nextButton.classList.add("page-button");
                    nextButton.addEventListener("click", () => {
                        currentPage++;
                        renderPage(currentPage);
                    });
                    paginationContainer.appendChild(nextButton);
                }
            }

            renderPage(currentPage);
        })
        .catch(error => console.error("Fel vid hämtning av data:", error));
});