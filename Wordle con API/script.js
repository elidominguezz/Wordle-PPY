let palabra; // Definir la variable palabra en el ámbito global
let intentos = 6;
const apiKey = 'ProgramandoPY24';

const API = "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";

function init(){
    console.log('Esto se ejecuta solo cuando se carga la página web');
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
}

window.addEventListener('load', () => {
    fetch(API).then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener la palabra aleatoria');
        }
        return response.json();
    })
    .then(data => {
        palabra = data[0]; // Asignar la palabra aleatoria obtenida
        init(); // Llamar a la función init después de obtener la palabra
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
