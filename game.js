let money=0;
let machines=[]; // {level,x,y}
let workers=0;

const prices={1:50,5:100,10:200};
const upgradePrice=200;

/* cargar progreso */
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

/* guardar progreso */
function saveGame(){
    localStorage.setItem("khasamTycoon", JSON.stringify({money,machines,workers}));
}

/* actualizar UI */
function updateUI(){
    document.getElementById("oro").innerText="💰 "+Math.floor(money);
}

/* TAP */
function tap(){
    money+=1;
    updateUI();
}

/* comprar CPU */
function buyCPU(amount){
    let price=prices[amount];
    if(money>=price){
        money-=price;
        for(let i=0;i<amount;i++){
            let x=Math.random()*400;
            let y=Math.random()*400;
            machines.push({level:1,x,y});
        }
        renderMachines();
        updateUI();
    }
}

/* renderizar CPUs y cajas */
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

    // cajas sincronizadas
    for(let i=0;i<3;i++){
        let caja=document.createElement("div");
        caja.className="caja";
        caja.style.top=50+Math.random()*400+"px";
        factory.appendChild(caja);
    }
}

/* crear partículas */
function spawnParticles(x,y){
    for(let i=0;i<10;i++){
        let p=document.createElement("div");
        p.className="particle";
        p.style.left=x+"px";
        p.style.top=y+"px";
        p.style.setProperty("--dx",(Math.random()*60-30)+"px");
        p.style.setProperty("--dy",(Math.random()*60-30)+"px");
        document.getElementById("factory").appendChild(p);
        setTimeout(()=>{p.remove();},800);
    }
}

/* fusionar máquinas */
function mergeMachines(){
    let levels={};
    machines.forEach(m=>{levels[m.level]=(levels[m.level]||0)+1;});
    for(let lvl in levels){
        if(levels[lvl]>=3){
            // eliminar 3 CPUs
            let removed=0;
            machines=machines.filter(m=>{
                if(m.level==lvl && removed<3){
                    removed++;
                    return false;
                }
                return true;
            });
            // nueva CPU
            let x=Math.random()*400;
            let y=Math.random()*400;
            machines.push({level:parseInt(lvl)+1,x,y});
            renderMachines();
            // efecto de fusión + partículas
            let factory=document.getElementById("factory");
            let lastCPU=factory.lastChild;
            lastCPU.classList.add("merge-effect");
            spawnParticles(x+25,y+25); // partículas centradas
            setTimeout(()=>{ lastCPU.classList.remove("merge-effect"); },800);
            break;
        }
    }
}

/* producción automática + workers */
setInterval(()=>{
    let income=0;
    machines.forEach(m=>{
        income+=Math.pow(3,m.level-1);
    });
    money+=income+workers;
    updateUI();
},1000);

/* autoguardado */
setInterval(saveGame,5000);

/* iniciar juego */
loadGame();
updateUI();