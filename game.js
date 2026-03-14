let money = 0
let cpu = 0
let cpuLevel = 1

function updateUI(){

document.getElementById("oro").innerText = "💰 "+Math.floor(money)

}

function buyCPU(amount){

let price = GAME_CONFIG.cpu_base_price * amount

if(money >= price){

money -= price
cpu += amount

spawnCPU(amount)

}

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

if(money >= GAME_CONFIG.upgrade_price){

money -= GAME_CONFIG.upgrade_price
cpuLevel++

}

}

setInterval(()=>{

money += cpu * GAME_CONFIG.cpu_income * cpuLevel

updateUI()

},1000)