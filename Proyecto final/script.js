class Libro{
    constructor(titulo, autor, estado, update) {
        this.titulo = titulo
        this.autor = autor
        this.estado = estado
        this.update = update
    }
}


let arrayLibros = []
let formulario = document.getElementById("idForm")

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(formulario)
    let estadoLibro = formulario.querySelector('input[name=estadoLibro]:checked').value
    let ahora = new Date(Date.now())
    let fechaActual = ahora.toLocaleDateString()
    let libro = new Libro(datForm.get("tituloLibro"), datForm.get("autorLibro"), estadoLibro, fechaActual) 
    arrayLibros.push(libro)
    formulario.reset()
})

let botonColeccion = document.getElementById("btnMostrarColeccion")
let coleccionLibros = document.getElementById("coleccionLibros")

botonColeccion.addEventListener ('click', () => {
    coleccionLibros.innerHTML = ' '
    arrayLibros.forEach((libro, indice) => { 
        coleccionLibros.innerHTML += `
        <div class="card h-100" id="libro${indice}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${libro.titulo}</h5>
                <p class="card-text">Autor: ${libro.autor}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Añadido el ${libro.update}</small>
            </div>
        </div>`
    })
})