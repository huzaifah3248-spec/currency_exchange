const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

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

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let amount = document.getElementById(".amount input").value;
    let amtVal =amount.value.trim();
    if (amtVal === "" || amtVal < 1) {
       amtVal = 1;
       amt.value = 1;
    }
});