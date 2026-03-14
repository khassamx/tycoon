let money=0;
let machines=[]; // {level:1,x,y}
let workers=0;

const prices={1:50,5:100,10:200};
const upgradePrice=200;

// cargar progreso
function loadGame(){
    let save=localStorage.getItem("khasamTycoon");
    if(save){
        let data=JSON.parse(save);
        money=data.money;
        machines=data.machines||[];
        workers=data.workers||0;
        renderMachines();
    }
}

// guardar progreso
function saveGame(){
    let data={money,machines,workers};
    localStorage.setItem("khasamTycoon",JSON.stringify(data));
}

// actualizar UI
function updateUI(){
    document.getElementById("oro").innerText="💰 "+Math.floor(money);
}

// TAP
function tap(){
    money+=1;
    updateUI();
}

// comprar CPU
function buyCPU(amount){
    let price=prices[amount];
    if(money>=price){
        money-=price;
        for(let i=0;i<amount;i++){
            let x=Math.random()*400;
            let y=Math.random()*300;
            machines.push({level:1,x,y});
        }
        renderMachines();
        updateUI();
    }
}

// renderizar máquinas
function renderMachines(){
    let factory=document.getElementById("factory");
    factory.innerHTML="";
    machines.forEach((m,index)=>{
        let cpuDiv=document.createElement("div");
        cpuDiv.className="cpu level"+m.level;
        cpuDiv.style.left=m.x+"px";
        cpuDiv.style.top=m.y+"px";
        cpuDiv.innerText="🖥";
        factory.appendChild(cpuDiv);
    });
    // cajas moviéndose
    for(let i=0;i<3;i++){
        let caja=document.createElement("div");
        caja.className="caja";
        caja.style.top=50+Math.random()*300+"px";
        factory.appendChild(caja);
    }
}

// fusionar máquinas (3 iguales)
function mergeMachines(){
    let levels={};
    machines.forEach(m=>{levels[m.level]=(levels[m.level]||0)+1;});
    for(let lvl in levels){
        if(levels[lvl]>=3){
            machines=machines.filter(m=>m.level!=lvl);
            let x=Math.random()*400;
            let y=Math.random()*300;
            machines.push({level:parseInt(lvl)+1,x,y});
            renderMachines();
            break;
        }
    }
}

// producción automática + IA workers
setInterval(()=>{
    let income=0;
    machines.forEach(m=>{
        income+=Math.pow(3,m.level-1); // cada nivel produce más
    });
    money+=income;
    // workers generan + dinero
    money+=workers;
    updateUI();
},1000);

// autoguardado cada 5 segundos
setInterval(saveGame,5000);

// cargar al inicio
loadGame();
updateUI();