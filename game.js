let dinero = 0
let maquinas = 1

function actualizar(){
document.getElementById("money").innerText = "Dinero: "+dinero
}

setInterval(()=>{

dinero += maquinas

actualizar()

},1000)

function comprarMaquina(){

if(dinero >= 50){

dinero -= 50
maquinas++

let nueva = document.createElement("div")

nueva.className = "maquina"

nueva.style.left = Math.random()*500+"px"
nueva.style.top = Math.random()*300+"px"

document.getElementById("mapa").appendChild(nueva)

}

}