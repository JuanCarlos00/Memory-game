// Objetos de cada personaje
// (Images powered by Gema)

const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png",
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png",
    },
    {
        nombre: "Cenicienta",
        ruta: "img/Cenicienta.png",
    },
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png",
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png",
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png",
    },
    {
        nombre: "Kaa",
        ruta: "img/Kaa.png",
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png",
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png",
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png",
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png",
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png",
    },
]

const game = document.getElementById("game")
const rejilla = document.createElement("section")
const winner = document.getElementById("winner")

rejilla.setAttribute("class","rejilla")
game.appendChild(rejilla)

const song = document.getElementById("song")
const click = document.getElementById("click")
const bounce = document.getElementById("bounce")
const win = document.getElementById("win")
const fail = document.getElementById("fail")

var contador = 0
var primerSel = ""
var segundoSel = ""
var selPrevio = null
var eliminados = 0
var segundos = 120

var start = document.getElementById("start")
var reloj = document.getElementById("reloj")
var gameover = document.getElementById("game-over")

// Función para barajar los div con cada personaje

function baraja(){
    const personajesDoble = arrayPersonajes.concat(arrayPersonajes).sort(() => 0.5 - Math.random())

    personajesDoble.forEach(personaje => {
        const {nombre, ruta} = personaje

        const tarjeta = document.createElement("div")
        tarjeta.classList.add("tarjeta")
        tarjeta.dataset.name = nombre

        const anverso = document.createElement("div")
        anverso.classList.add("anverso")

        const reverso = document.createElement("div")
        reverso.classList.add("reverso")

        reverso.style.backgroundImage = `url(${ruta})`

        rejilla.appendChild(tarjeta)
        tarjeta.appendChild(anverso)
        tarjeta.appendChild(reverso)
    })
    gameover.style.opacity = "0"
    winner.classList.remove("open")
    rejilla.classList.remove("out")
    rejilla.classList.add("start")
    start.style.display = "none"
    reloj.style.display = "initial"
    reloj.style.color = "#ffd700"
    song.play()
    eliminados = 0
}

// Función de inicio de juego y reloj cuenta atrás

function startGame(){

    var s = parseInt(segundos % 60)
    var ss = ("0" + s).slice(-2)
    var m = parseInt(segundos / 60)
    var mm = ("0" + m).slice(-2)
    document.getElementById("reloj").innerHTML = mm + ":" + ss
    

    if (eliminados === 24) {
        return
    }

    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        },1000)
    } else {
       gameOver()
    }
    segundos--;

    if (segundos < 10) {
        reloj.style.color = "#ff0000";
    }
}

// Función para ejecutar la lógica de partida perdida

function gameOver(){
    segundos = 121
    song.pause()
    song.currentTime = 0
    fail.play()
    rejilla.classList.add("out")
    gameover.style.opacity = "1"
    gameover.style.display = "initial"
    start.style.display = "initial"
    reloj.style.display = "none"
    setTimeout(function(){
        while(rejilla.firstChild){
            rejilla.removeChild(rejilla.firstChild)
        }
    }, 1000)
}

// Evento click para seleccionar cada personaje

rejilla.addEventListener("click",function(evento){
    click.currentTime = 0
    click.play()

    var seleccionado = evento.target

    if (seleccionado.nodeName === "SECTION" || 
    seleccionado.parentNode === selPrevio ||
    seleccionado.parentNode.classList.contains("eliminado")) {
        return
    }
    if (contador < 2) {
        contador++
        if (contador === 1) {
            primerSel = seleccionado.parentNode.dataset.name
            seleccionado.parentNode.classList.add("seleccionado")
            selPrevio = seleccionado.parentNode
        } else {
            segundoSel = seleccionado.parentNode.dataset.name
            seleccionado.parentNode.classList.add("seleccionado")
        }
// console.log(primerSel)
// console.log(segundoSel)
        if (primerSel !="" && segundoSel !=""){
            if(primerSel === segundoSel){
                bounce.currentTime = 0
                bounce.play()
                setTimeout(eliminar, 600)
                setTimeout(resetSel, 600)
                contEliminados()
            } else {
                setTimeout(resetSel, 600)
                selPrevio = null
            }
        }
    }
})

// Función para eliminar los elementos coincidentes

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado")
    seleccionados.forEach(elemento =>{
        elemento.classList.add("eliminado")
    })
}

// Función para resetear los seleccionados después de 2 intentos

var resetSel = function() {
    contador = 0
    primerSel = ""
    segundoSel = ""

    var seleccionados = document.querySelectorAll(".seleccionado")
    seleccionados.forEach(elemento =>{
        elemento.classList.remove("seleccionado")
    })
}

// Función para contar los eliminados y cuando lleguen a 24, ejecutar la lógica de partida ganada

var contEliminados = function (){
    eliminados = document.querySelectorAll(".eliminado").length + 2
    // console.log(eliminados)
    if (eliminados === 24){
        winner.classList.add("open")
        win.currentTime = 0
        win.play()
        segundos = 120
        song.pause()
        song.currentTime = 0
        rejilla.classList.add("out")
        start.style.display = "initial"
        reloj.style.display = "none"
        setTimeout(function(){
            while(rejilla.firstChild){
                rejilla.removeChild(rejilla.firstChild)
            }
        }, 1000)
    }
}

