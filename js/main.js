// elementos del index
const inicio = document.querySelector("#inicio");
const trivia = document.querySelector("#trivia");
const pregunta = document.querySelector("#pregunta");
const imgPregunta = document.querySelector("#imgPregunta");
const opcionA = document.querySelector("#A");
const opcionB = document.querySelector("#B");
const opcionC = document.querySelector("#C");
const contador = document.querySelector("#contador");
const tiempo = document.querySelector("#tiempo");
const progreso = document.querySelector("#progreso");
const puntajeDiv = document.querySelector("#puntaje");



//preguntas y respuestas
let preguntas = [
    {
        pregunta : "Quién ganó el mundial de fútbol de 1950?",
        imgSrc : "img/mundial.jpg",
        opcionA : "Uruguay",
        opcionB : "Alemania",
        opcionC : "Brasil",
        correcta : "A"
    },{
        pregunta : "En que año nació Diego Maradona?",
        imgSrc : "img/maradona.jpg",
        opcionA : "1958",
        opcionB : "1960",
        opcionC : "1963",
        correcta : "B"
    },{
        pregunta : "Los Beatles estaban formados por: John, Paul, Ringo y ...",
        imgSrc : "img/beatles.jpg",
        opcionA : "Fred",
        opcionB : "Michael",
        opcionC : "George",
        correcta : "C"
    }
];





//variables

const ultimaPregunta = preguntas.length - 1;
let preguntaActual = 0;
let cuenta = 0;
const tiempoPorPregunta = 10; 
const indicadorDeTiempo = 150;
const tiempoActual = indicadorDeTiempo / tiempoPorPregunta;
let temporizador;
let puntaje = 0;



// seleccion de preguntas
function mostrarPregunta(){
    let preg = preguntas[preguntaActual];
    
    pregunta.innerHTML = "<p>"+ preg.pregunta +"</p>";
    imgPregunta.innerHTML = "<img src="+ preg.imgSrc +">";
    opcionA.innerHTML = preg.opcionA;
    opcionB.innerHTML = preg.opcionB;
    opcionC.innerHTML = preg.opcionC;
}

inicio.addEventListener("click",iniciotrivia);

// comienzo de la trivia
function iniciotrivia(){
    inicio.style.display = "none";
    mostrarPregunta();
    trivia.style.display = "block";
    progresoPregunta();
    aumentoContador();
    temporizador = setInterval(aumentoContador,1000);
}


function progresoPregunta(){
    for(let numPreg = 0; numPreg <= ultimaPregunta; numPreg++){
        progreso.innerHTML += "<div class='prog' id="+ numPreg +"></div>";
    }
}

// contador 

function aumentoContador(){
    if(cuenta <= tiempoPorPregunta){
        contador.innerHTML = cuenta;
        tiempo.style.width = cuenta * tiempoActual + "px";
        cuenta++
    }else{
        cuenta = 0;
        respuestaIncorrecta();
        if(preguntaActual < ultimaPregunta){
            preguntaActual++;
            mostrarPregunta();
        }else{
            clearInterval(temporizador);
            puntajeFinal();
        }
    }
}

// Funcion para mostrar respuesta correcta o incorrecta

function chequearRespuesta(respuesta){
    if( respuesta == preguntas[preguntaActual].correcta){
        puntaje++;
        respuestaCorrecta();
    }else{
        respuestaIncorrecta();
    }
    cuenta = 0;
    if(preguntaActual < ultimaPregunta){
        preguntaActual++;
        mostrarPregunta();
    }else{
        clearInterval(temporizador);
        puntajeFinal();
    }
}

// respuesta correcta
function respuestaCorrecta(){
    document.getElementById(preguntaActual).style.backgroundColor = "#0f0";
}

// respuesta incorrecta
function respuestaIncorrecta(){
    document.getElementById(preguntaActual).style.backgroundColor = "#f00";
}


function puntajeFinal() {
    puntajeDiv.style.display = "block"
    const puntajeTotal = Math.round(100 * puntaje/preguntas.length)

    let img = (puntajeTotal >= 80) ? "img/mas80.png" :
              (puntajeTotal >= 40) ? "img/mas40.png" :
              (puntajeTotal >= 20) ? "img/mas20.png" :
              "img/menos20.png";

    Swal.fire({
        title: "Tu puntaje es:",
        text: puntajeTotal + "%",
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 350,
        imageAlt: "Custom image",
     })
}