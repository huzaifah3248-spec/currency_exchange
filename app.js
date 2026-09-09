const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const msg = document.querySelector(".msg");

for (const select of dropdowns) {
    for (const currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name ==="from-currency" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to-currency" && currencyCode === "PKR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);

    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);});
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    let amtVal = amountInput.value.trim();
    if (amtVal === "" || Number(amtVal) < 1) {
       amtVal = 1;
       amountInput.value = 1;
    }

    try {
        const URL = `${BASE_URL}/${fromCurrency.toLowerCase()}.json`;
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Unable to fetch exchange rate");
        }

        const data = await response.json();
        const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
        const totalExchanged = (rate * Number(amtVal)).toFixed(2);
        msg.innerText = `Exchange Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}`;
        msg.innerText += `\nTotal Exchanged: ${totalExchanged} ${toCurrency}`;
    } catch (error) {
        msg.innerText = "Could not load the exchange rate. Please try again.";
    }
});