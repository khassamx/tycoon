let money = 0
let machines = 0
let speed = 1000

function update(){

document.getElementById("money").innerText = "Dinero: "+money

document.getElementById("stats").innerText =
"Máquinas: "+machines

}

function tap(){

money += 1
update()

}

function buyMachine(){

if(money >= 50){

money -= 50
machines++

}

update()

}

function upgrade(){

if(money >= 100){

money -= 100
speed -= 50

}

update()

}

setInterval(()=>{

money += machines
update()

},1000)