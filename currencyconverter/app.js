const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
updateExchangeRate();
})
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name=== "from" && currCode === "USD"){
        newOption.selected = "selected";
        }else if(select.name=== "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click", (evt)=>{
 evt.preventDefault();
 updateExchangeRate();
});
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
 let amtVal = amount.value;
 if(amtVal === "" || amtVal<0){
    amtVal = 1;
    amount.value=1;
 }
// console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase() );
 const url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
 let response = await fetch(url);
 let data = await response.json();
 let rate =  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 console.log(rate);
 let finalamount = amtVal*rate;
 msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
}