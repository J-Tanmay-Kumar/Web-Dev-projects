const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")



for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }

    select.addEventListener("change",(evt)=> {
        updateflag(evt.target); 
    });
}

const updateflag= (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}   

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal)
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json()
    console.log(data)

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    console.log(rate)

    let finalAmount = amtVal * rate
    let msg =document.body.querySelector(".msg")
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
})