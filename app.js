const base_url = "https://v6.exchangerate-api.com/v6/a4b0a44415f7fb5199bbdd7f/latest"

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("form button");
const fromCrr = document.querySelector(".from select");
const toCrr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for(crrCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = crrCode;
        newOption.value = crrCode;
        if (select.name === "from" && crrCode === "USD"){
            newOption.selected = "selected"
        }
        else if (select.name === "to" && crrCode === "INR"){
            newOption.selected = "selected"
        }
        
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExcangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0){
        amtVal = 1;
        amount.value = "1";
    }

    const URL_from = `${base_url}/${fromCrr.value.toUpperCase()}`;
    
        let response = await fetch(URL_from);
        let data = await response.json();

        let rate = data.conversion_rates[toCrr.value.toUpperCase()];
        console.log(rate);
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCrr.value} = ${finalAmount} ${toCrr.value}`
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExcangeRate();
})


window.addEventListener("load" , () => {
    updateExcangeRate();
});