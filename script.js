// URL pro získání dat
const API_URL = "https://data.kurzy.cz/json/meny/b[6].json";
const REFRESH_INTERVAL = 60000; // 60 sekund

// Funkce pro získání dat z API
async function fetchCurrencyData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Chyba při načítání dat");
        const data = await response.json();
        renderCurrencyTable(data.kurzy);
    } catch (error) {
        console.error(error);
        document.getElementById("currency-table-body").innerHTML =
            `<tr><td colspan="4">Nepodařilo se načíst data.</td></tr>`;
    }
}

// Funkce pro vykreslení tabulky
function renderCurrencyTable(currencies) {
    const tbody = document.getElementById("currency-table-body");
    tbody.innerHTML = ""; // Vymazání starých dat

    Object.entries(currencies).forEach(([key, currency]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${currency.nazev}</td>
            <td>${currency.jednotka}</td>
            <td>${currency.dev_stred}</td>
            <td><a href="${currency.url}" target="_blank">Detail</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Pravidelná aktualizace dat
setInterval(fetchCurrencyData, REFRESH_INTERVAL);

// Načtení dat při prvním načtení stránky
fetchCurrencyData();
