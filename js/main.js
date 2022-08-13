const html = document.querySelector("html")
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const seccionInicio = document.querySelector("#seccionInicio");
const seccionAgregarPalabra = document.querySelector("#seccionAgregarPalabra");
const seccionJuego = document.querySelector("#seccionJuego");

const pantalla = document.querySelector("#pantalla")

function first() {
    mainMenuFc()
    setTimeout(() => {
        pantalla.classList.remove("primeraPantalla")
    }, 1000);
}

function mainMenuFc(){
    
    main.classList.add("centradoCol")
    main.classList.remove("inicioCol")

    seccionInicio.style.display = "flex";
    seccionJuego.style.display = "none";
    seccionAgregarPalabra.style.display = "none";

    header.classList.remove("header-movil")
    main.classList.remove("main-movil")
    footer.classList.remove("footer-movil")

    const buttonInicioJuego = document.querySelector("#inicioJuego");
    const buttonagregarPalabra = document.querySelector("#agregarPalabra");

    buttonInicioJuego.addEventListener("click", () => {animation(iniciarJuegoFc)});
    buttonagregarPalabra.addEventListener("click", () => {animation(agregarPalabraFc)});
}

function animation(varFunction){
    pantalla.classList.add("pantallaEntrada")
    setTimeout(() => {
        varFunction()
    }, 500);
    setTimeout(() => {
        pantalla.classList.remove("pantallaEntrada")
    }, 1000);
}

window.addEventListener("load", first)