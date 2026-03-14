let money = 0

let cpu = 0

let cpuLevel = 1

const prices = {

1:50,
5:100,
10:200

}

function updateUI(){

document.getElementById("oro").innerText = "💰 "+Math.floor(money)

}

function tap(){

money += 1

updateUI()

}

function buyCPU(amount){

let price = prices[amount]

if(money >= price){

money -= price

cpu += amount

spawnCPU(amount)

}

updateUI()

}

function spawnCPU(amount){

for(let i=0;i<amount;i++){

let cpuDiv = document.createElement("div")

cpuDiv.className = "cpu"

cpuDiv.innerText = "🖥"

document.getElementById("factory").appendChild(cpuDiv)

}

}

function upgradeCPU(){

let price = 200

if(money >= price){

money -= price

cpuLevel++

}

updateUI()

}

setInterval(()=>{

money += cpu * cpuLevel

updateUI()

},1000)