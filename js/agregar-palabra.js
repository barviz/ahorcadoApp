const inputText = document.querySelector("#agregarPalabraInput");
const agregarPalabraConfirm = document.querySelector("#agregarPalabraConfirm")
const buttonGuardar = document.querySelector("#agregarPalabraGuardar");
const buttonCancelar = document.querySelector("#agregarPalabraCancelar");

function agregarPalabraFc(){
    
    seccionInicio.style.display = "none";
    seccionJuego.style.display = "none";
    seccionAgregarPalabra.style.display = "flex";

    main.classList.remove("inicioCol")
    main.classList.add("centradoCol")

    agregarPalabraConfirm.innerHTML = ""
    agregarPalabraConfirm.classList.remove("color-red")
    agregarPalabraConfirm.classList.remove("color-green")
    inputText.value = ""
    let tempInput = ""
    let expresion = /[A-Z]/i;

    inputText.addEventListener("input", (e) => {  
        if(e.data == null){
        } 
        else if(expresion.test(e.data)){
            tempInput = inputText.value
        } else {
            inputText.value = tempInput
        }
    })
}

buttonCancelar.addEventListener("click", () => {animation(mainMenuFc)});

buttonGuardar.addEventListener("click", () => {    
    agregarPalabraConfirm.textContent = ""
    agregarPalabraConfirm.classList.remove("color-red")
    agregarPalabraConfirm.classList.remove("color-green")
    setTimeout(() => {
        if(inputText.value != ""){
            if(inputText.value.length <= 10){
                listaPalabras.push((inputText.value).toUpperCase())
                agregarPalabraConfirm.textContent = `Agregaste la palabra: ${(inputText.value).toUpperCase()}`
                agregarPalabraConfirm.classList.remove("color-red")
                agregarPalabraConfirm.classList.add("color-green")
                inputText.value = "";
                setTimeout(() => {
                    animation(iniciarJuegoFc)}, 2500);
            } else {
                agregarPalabraConfirm.textContent = `La palabra supera las 10 letras`
                agregarPalabraConfirm.classList.add("color-red")
                agregarPalabraConfirm.classList.remove("color-green")
                inputText.value = "";
            }
        }
    }, 1);
})