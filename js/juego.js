let palabraClave, letraIzq, puntos, juegoTerminado, guionesBajo, letraUsada, letraErrada, letra, buscarLetra, index

const letraDesacierto = document.querySelector("#letraDesacierto")
const letraAcierto = document.querySelector("#letraAcierto")

const buttonJuegoNuevo = document.querySelector("#juegoNuevo")
const buttonDesistir = document.querySelector("#desistir")

const mensajePantalla = document.querySelector("#mensajePantalla")
const palabraIncognita = document.querySelector("#palabraIncognita")

const logo = document.querySelector("#logo")

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

buttonJuegoNuevo.addEventListener("click", () => {animation(iniciarJuegoFc)});
buttonDesistir.addEventListener("click", () => {animation(mainMenuFc)});

const fila1 = document.querySelector("#fila1");
const fila2 = document.querySelector("#fila2");
const fila3 = document.querySelector("#fila3");

const arr1 = ["Q","W","E","R","T","Y","U","I","O","P"];
const arr2 = ["A","S","D","F","G","H","J","K","L","Ñ"];
const arr3 = ["Z","X","C","V","B","N","M"];

function crearPalabraClave(){

    fila1.innerHTML = ""
    fila2.innerHTML = ""
    fila3.innerHTML = ""

    for(let i = 0; i < arr1.length; i++){
        let div = document.createElement("div")
        div.classList.add("tecladoLetra")
        div.classList.add("centradoCol")
        div.textContent = arr1[i]
        div.id = arr1[i]
        div.addEventListener("click", checkLetraTeclado)
        fila1.appendChild(div)
    }

    for(let i = 0; i < arr2.length; i++){
        let div = document.createElement("div")
        div.classList.add("tecladoLetra")
        div.classList.add("centradoCol")
        div.textContent = arr2[i]
        div.id = arr2[i]
        div.addEventListener("click", checkLetraTeclado)
        fila2.appendChild(div)
    }

    for(let i = 0; i< arr3.length; i++){
        let div = document.createElement("div")
        div.classList.add("tecladoLetra")
        div.classList.add("centradoCol")
        div.textContent = arr3[i]
        div.id = arr3[i]
        div.addEventListener("click", checkLetraTeclado)
        fila3.appendChild(div)
    }
}

function iniciarJuegoFc(){
    
    main.classList.add("inicioCol")
    main.classList.remove("centradoCol")

    seccionInicio.style.display = "none";
    seccionJuego.style.display = "flex";
    seccionAgregarPalabra.style.display = "none";

    let mdH = window.matchMedia("(max-height: 570px)");

    if(mdH.matches){
        header.classList.add("header-movil")
        main.classList.add("main-movil")
        footer.classList.add("footer-movil")
    } else {
        header.classList.remove("header-movil")
        main.classList.remove("main-movil")
        footer.classList.remove("footer-movil")
    }

    palabraClave = eleccionPalabraRandom();
    letraIzq = palabraClave.length
    puntos = 0
    juegoTerminado = false
    letraUsada = []
    letraErrada = []
    mensajePantalla.style.display = "none"
    palabraIncognita.style.display = "none"
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarAhorcado(puntos)
    dibujarGuionesBajo()
    crearPalabraClave()

    guionesBajo = document.querySelectorAll(".guionBajo")

    window.addEventListener("teclaPulsada", checkClavePC); 
}

function checkLetraTeclado(){
    let data = (this.textContent).charCodeAt(0)

    if(!juegoTerminado){
        if(data >= 65 && data <= 90 || data >= 97 && data <= 122 || data == 209 || data == 241){
            letra = (this.textContent).toUpperCase();
            this.classList.add("pressed")
            checkLetra()
        }
    }
}

function checkClavePC(e){
    if(!juegoTerminado){
        
        if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 192){
            letra = (e.key).toUpperCase();
            checkLetra()
            let letterDiv = document.querySelector("#"+letra)
            letterDiv.classList.add("pressed")
        }
    }
}

function checkLetra(){
    
    if(!letraUsada.includes(letra)){

        buscarLetra = 0
        index = palabraClave.indexOf(letra, buscarLetra)
        
        if(index != -1){
            letraUsada.push(letra)
            while(index != -1){
                letraIzq--
                guionesBajo[index].textContent = letra
                buscarLetra = index +1
                index = palabraClave.indexOf(letra, buscarLetra)
            }
        }else{
            letraUsada.push(letra)
            letraErrada.push(letra)
            letraDesacierto.textContent = letraErrada.join(' ')
            puntos++
            dibujarAhorcado(puntos)
        }
        seGano()
    }
}

function eleccionPalabraRandom(){
    return listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
}

function dibujarGuionesBajo(){

    letraAcierto.innerHTML = ""
    letraDesacierto.innerHTML = "&nbsp;"

    for(let i=0; i<palabraClave.length; i++){
        let div = document.createElement("div")
        div.classList.add("guionBajo")
        div.classList.add("centradoCol")
        letraAcierto.appendChild(div)
    }
}

function dibujarAhorcado(puntos){

    ctx.beginPath();
    ctx.lineWidth = 6
    const root = document.querySelector(':root');
    const rootStyle = getComputedStyle(root);
    true? ctx.strokeStyle = rootStyle.getPropertyValue('--darkred'): ctx.strokeStyle = rootStyle.getPropertyValue('--lightred');

    switch(puntos) {

        case 0:
            
            ctx.moveTo(25, 350);
            ctx.lineTo(325, 350);
            
            ctx.moveTo(105, 0);
            ctx.lineTo(105, 350);
            ctx.moveTo(135, 350);
            ctx.lineTo(105, 320);
            ctx.moveTo(75, 350);
            ctx.lineTo(105, 320);
            
            ctx.moveTo(155, 0);
            ctx.lineTo(105, 50);
            ctx.moveTo(257, 3);
            ctx.lineTo(103, 3);
            
            ctx.moveTo(255, 0);
            ctx.lineTo(255, 50);
            break;

        case 1:
            
            ctx.arc(255, 80, 30,2*Math.PI,0)
            break;

        case 2:
            
            ctx.moveTo(255, 185);
            ctx.lineTo(255, 110);
            break;

        case 3:
            
            ctx.moveTo(275, 230);
            ctx.lineTo(255, 185);
            break;

        case 4:
            
            ctx.moveTo(235, 230);
            ctx.lineTo(255, 185);
            break;

        case 5:
            
            ctx.moveTo(275, 170);
            ctx.lineTo(255, 120);
            break;

        case 6:
            
            ctx.moveTo(235, 170);
            ctx.lineTo(255, 120);
            break;
    }
    ctx.stroke()
}

function seGano(){

    if(letraIzq == 0){
        mjeFinal(victoria=true, palabraClave)
        juegoTerminado = true

    } else if (puntos == 6){
        mjeFinal(victoria=false, palabraClave)
        juegoTerminado = true
    }    
}

function mjeFinal(victoria){
    mensajePantalla.style.display = "flex"
    if(victoria){
        mensajePantalla.classList.remove("red")
        mensajePantalla.classList.add("green")
        mensajePantalla.textContent = `Ganaste, Felicidades!` 
    } else {
        mensajePantalla.classList.remove("green")
        mensajePantalla.classList.add("red")
        mensajePantalla.textContent = `Fin del Juego ` 

        palabraIncognita.style.display = "flex"
        palabraIncognita.textContent = `Palabra: ${palabraClave} `
    }
}

const buttonModoOscuro = document.querySelector("#checkModo")

buttonModoOscuro.addEventListener("click", () => {

    let modoActual = document.documentElement.getAttribute("data-theme");
    if(modoActual == "light"){
        modoActual="dark";
        logo.style.fill = "rgb(239, 241, 250)"
    } else {
        modoActual="light";
        logo.style.fill = "rgb(187, 20, 20)"
    }
    document.documentElement.setAttribute("data-theme", modoActual);
    redibujarAhorcado();
})

function redibujarAhorcado(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i <= puntos; i++){
        dibujarAhorcado(i);
    }
}