let palabra;
let intentos = 6;
const apiKey = 'ProgramandoPY24';

const API = "https://api.api-ninjas.com/v1/randomword";

function init(){
    console.log('Esto se ejecuta solo cuando se carga la página web');
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    
    // Mostrar el contador de intentos cuando empieza el juego
    actualizarContador();
}

window.addEventListener('load', () => {
    fetch(API).then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener la palabra aleatoria');
        }
        return response.json();
    })
    .then(data => {
        const palabrasFiltradas = data.filter(word => word.length === 6);
        if (palabrasFiltradas.length === 0) {
            throw new Error('No se encontraron palabras de 6 letras');
        }
        palabra = palabrasFiltradas[Math.floor(Math.random() * palabrasFiltradas.length)].toUpperCase();
        init();
    })
    .catch(error => {
        console.error('Error al obtener la palabra aleatoria:', error);
    });
});

function leerIntento(){
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase(); 
    return intento;
}

function intentar(){
    const intentoUsuario = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (intentoUsuario[i] === palabra[i]){ // Verde
            SPAN.innerHTML = intentoUsuario[i];
            SPAN.style.backgroundColor = '#139A43';
        } else if (palabra.includes(intentoUsuario[i])) {  // Amarillo
            SPAN.innerHTML = intentoUsuario[i];
            SPAN.style.backgroundColor = '#F4D35E';
        } else {  // Gris
            SPAN.innerHTML = intentoUsuario[i];
            SPAN.style.backgroundColor = '#9DA3A4';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    if (intentoUsuario === palabra) {
        terminar("<h1>¡GANASTE!😀</h1>");
        return;
    }

    intentos--;

    // Contador de intentos que se va poder ver en la pantalla
    actualizarContador();

    if (intentos === 0){
        terminar(`<h1>¡PERDISTE!😖</h1><p>La palabra correcta era: ${palabra}</p>`);
        return;
    }
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const button = document.getElementById("guess-button");
    button.disabled = true; 
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function actualizarContador() {
    const contadorElemento = document.getElementById('intentos-restantes');
    contadorElemento.textContent = `Intentos restantes: ${intentos}`;
}
