const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector(".div5");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const msg = document.querySelector(".div4");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");   
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode == "USD"){
            newOption.selected = true;
        }

        if(select.name === "to" && currCode == "INR"){
            newOption.selected = true;
        }
        select.append(newOption); 
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

        const info = document.querySelector(".info");
        info.innerHTML = `Convert ${fromCurr.value} to ${toCurr.value} at the real exchange rate`;
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let container = element.closest("div").parentElement; 
    let img = container.querySelector(".flag img");
    img.src = newSrc;
};

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".a1 input");
    let amtVal = amount.value;
    if(amtVal == " " || amtVal < 1){
        amtVal = 100;
        amount.value = 100;
    }
    
    const URL = `https://api.frankfurter.dev/v1/latest?base=${fromCurr.value.toLowerCase()}&symbols=${toCurr.value.toLowerCase()}`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates;
    rateVal = Object.values(rate)[0];

    let finalAmt = amtVal*rateVal;
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
    
    const msgTo = document.querySelector(".a2 input");
    msgTo.value = finalAmt;
    msgTo.innerText=`${finalAmt}`;


});

