let dinero = 0
let produccion = 0

function actualizar(){
document.getElementById("money").innerText = dinero
}

function ganar(){
dinero += 1
actualizar()
}

function comprar(){
if(dinero >= 50){
dinero -= 50
produccion += 1
}
}

setInterval(()=>{
dinero += produccion
actualizar()
},1000)

async function guardar(){
await fetch("/save",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({dinero:dinero})
})
}

setInterval(guardar,5000)

async function cargar(){
let r = await fetch("/load")
let data = await r.json()
dinero = data.dinero
actualizar()
}

cargar()