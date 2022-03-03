class Libro{
    constructor(titulo, autor, estado, update, comment) {
        this.titulo = titulo
        this.autor = autor
        this.estado = estado
        this.update = update
        this.comment = comment
    }
}


let arrayLibros = []
if(localStorage.getItem('libros') !== null) {
    arrayLibros = JSON.parse(localStorage.getItem('libros'))
} 

console.log(arrayLibros)

let formulario = document.getElementById("idForm")

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(formulario)
    let estadoLibro = formulario.querySelector('input[name=estadoLibro]:checked').value
    let ahora = new Date(Date.now())
    let fechaActual = ahora.toLocaleDateString()
    let libro = new Libro(datForm.get("tituloLibro"), datForm.get("autorLibro"), estadoLibro, fechaActual, datForm.get("commentLibro")) 
    arrayLibros.push(libro)
    localStorage.setItem('libros', JSON.stringify(arrayLibros))
    formulario.reset()
})

let botonColeccion = document.getElementById("btnMostrarColeccion")
let coleccionLibros = document.getElementById("coleccionLibros")

botonColeccion.addEventListener ('click', () => {
    coleccionLibros.innerHTML = ' '
    arrayLibros.forEach((libro, indice) => { 
        coleccionLibros.innerHTML += `
        <div class="card h-100 p-0" id="libro${indice}" style="width: 20rem">
            <div class="card-header">
                <mark><em>${libro.estado.toUpperCase()}</em></mark>
            </div>
            <div class="card-body">
                <h4 class="card-title"><u>${libro.titulo}</u></h5>
                <h5 class="card-text">Autor: ${libro.autor}</h3>
                <p><small>${libro.comment}</small></p>
            </div>
            <div class="mx-5 mb-2 text-center">
                <button class="btn btn-sm btn-dark">Editar</button>
                <button class="btn btn-sm btn-danger">Remover</button>
            </div>
            <div class="card-footer">
                <small class="text-muted">Añadido el ${libro.update}</small>
            </div>
        </div>`

        if (libro.estado == "por leer") {
            document.getElementById(`libro${indice}`).style["border"] = "2px solid #ff0000"
        } else if (libro.estado == "leido") {
            document.getElementById(`libro${indice}`).style["border"] = "2px solid #008209"
        }
    })
})