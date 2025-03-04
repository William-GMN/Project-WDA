document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/stores")
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.getElementById("store-container");
            const paginationContainer = document.querySelector(".pagination-container");
            const areaSelect = document.getElementById("area-select");

            const itemsPerPage = 12;
            let currentPage = 1;

            const areas = ["all", ...new Set(data.data.map(store => store.district).filter(Boolean))];
            areaSelect.innerHTML = "";
            areas.forEach(area => {
                const option = document.createElement("option");
                option.value = area;
                option.textContent = area.charAt(0).toUpperCase() + area.slice(1);
                areaSelect.appendChild(option);
            });

            areaSelect.addEventListener("change", () => {
                currentPage = 1;
                renderPage(storeContainer, paginationContainer, data.data, currentPage, itemsPerPage, areaSelect);
            });

            renderPage(storeContainer, paginationContainer, data.data, currentPage, itemsPerPage, areaSelect);
        })
        .catch(error => console.error("Fel vid hämtning av data:", error));
});

function renderPage(storeContainer, paginationContainer, data, page, itemsPerPage, areaSelect) {
    storeContainer.innerHTML = "";
    const selectedArea = areaSelect.value;
    
    let filteredData = selectedArea === "all" ? data : data.filter(store => store.district === selectedArea);

    const start = (page - 1) * itemsPerPage;
    const paginatedItems = filteredData.slice(start, start + itemsPerPage);

    paginatedItems.forEach(store => {
        let storeBox = createStoreBox(store);
        storeContainer.appendChild(storeBox);
    });

    renderPagination(paginationContainer, filteredData, page, itemsPerPage, storeContainer, areaSelect);
}

function createStoreBox(store) {
    let storeBox = document.createElement("div");
    storeBox.classList.add("store-box");
    storeBox.innerHTML = `
        <h3>${store.name}</h3>
        <p><strong>Område:</strong> ${store.district ?? "Okänt"}</p>
        <a href="https://${store.url}" target="_blank">${store.url ? "Besök butik" : "Ingen webbsida"}</a>
    `;
    return storeBox;
}

function renderPagination(container, filteredData, currentPage, itemsPerPage, storeContainer, areaSelect) {
    container.innerHTML = "";
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (currentPage > 1) {
        const prevButton = createPaginationButton(currentPage - 1, storeContainer, filteredData, itemsPerPage, areaSelect);
        container.appendChild(prevButton);
    }

    const currentButton = createPaginationButton(currentPage, storeContainer, filteredData, itemsPerPage, areaSelect, true);
    container.appendChild(currentButton);

    if (currentPage < totalPages) {
        const nextButton = createPaginationButton(currentPage + 1, storeContainer, filteredData, itemsPerPage, areaSelect);
        container.appendChild(nextButton);
    }
}

function createPaginationButton(page, storeContainer, filteredData, itemsPerPage, areaSelect, isActive = false) {
    const button = document.createElement("button");
    button.textContent = page;
    button.classList.add("page-button");
    if (isActive) {
        button.classList.add("active");
    }
    button.addEventListener("click", () => {
        renderPage(storeContainer, document.querySelector(".pagination-container"), filteredData, page, itemsPerPage, areaSelect);
    });
    return button;
}
