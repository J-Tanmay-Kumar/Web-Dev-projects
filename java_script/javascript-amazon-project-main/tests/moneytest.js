import money from "../scripts/utils/money.js";
console.log("test Suite:money")
console.log('converting cents into dollars')
if (money(2095)==='20.95'){
    console.log("passed")
}else{
    console.log('Failed')
}
console.log('rounds to the edge case')
if(money(2000.5)==='20.01'){
    console.log('Passed')
}else{
    console.log('failed')
}

console.log(money(2000.5))