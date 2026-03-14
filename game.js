let money = 0
let cpu = 0
let cpuLevel = 1

const prices = {

1:50,
5:100,
10:200

}

/* cargar progreso */

function loadGame(){

let save = localStorage.getItem("khasamTycoon")

if(save){

let data = JSON.parse(save)

money = data.money
cpu = data.cpu
cpuLevel = data.cpuLevel

spawnCPU(cpu)

}

}

/* guardar progreso */

function saveGame(){

let data = {

money:money,
cpu:cpu,
cpuLevel:cpuLevel

}

localStorage.setItem("khasamTycoon",JSON.stringify(data))

}

/* actualizar UI */

function updateUI(){

document.getElementById("oro").innerText = "💰 "+Math.floor(money)

}

/* tap */

function tap(){

money += 1

updateUI()

}

/* comprar cpu */

function buyCPU(amount){

let price = prices[amount]

if(money >= price){

money -= price

cpu += amount

spawnCPU(amount)

}

updateUI()

}

/* crear cpu */

function spawnCPU(amount){

for(let i=0;i<amount;i++){

let cpuDiv = document.createElement("div")

cpuDiv.className = "cpu"

cpuDiv.innerText = "🖥"

document.getElementById("factory").appendChild(cpuDiv)

}

}

/* mejorar cpu */

function upgradeCPU(){

let price = 200

if(money >= price){

money -= price

cpuLevel++

}

updateUI()

}

/* producción automática */

setInterval(()=>{

money += cpu * cpuLevel

updateUI()

},1000)

/* autoguardado */

setInterval(()=>{

saveGame()

},5000)

/* cargar al iniciar */

loadGame()

updateUI()