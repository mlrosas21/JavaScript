let formulario = document.getElementById("formJugador")

let arrayJugadores = []

class Jugador {
    constructor(nombre, posicion, dorsal){
        this.nombre = nombre
        this.posicion = posicion
        this.dorsal = dorsal
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(e.target)
    let mapDorsales = arrayJugadores.map(jugador => jugador.dorsal)
    let dorsalJugador = datForm.get('dorsalJugador')
    let nombreJugador = datForm.get('nombreJugador')
    nombreJugador == 'Diego Armando Maradona' ? nombreJugador = nombreJugador.toUpperCase() : nombreJugador = nombreJugador.toLowerCase()
    if (!mapDorsales.includes(dorsalJugador)) {
        let jugador = new Jugador(nombreJugador, datForm.get('posicionJugador'), dorsalJugador)
        arrayJugadores.push(jugador)
        formulario.reset()
    } else {
        console.error('Dorsal ya ingresada')
    }
})

let btnJugadores = document.getElementById("btnLogJugadores")

btnJugadores.addEventListener('click', () => {
    console.log(...arrayJugadores)
    console.log()
})


let btnPrimerJugador = document.getElementById("btnPrimerJugador")

btnPrimerJugador.addEventListener('click', () => {
    let [a,] = arrayJugadores
    console.log(a)
})