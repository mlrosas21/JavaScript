const DateTime = luxon.DateTime

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

let formulario = document.getElementById("idForm")

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(formulario)
    let estadoLibro = formulario.querySelector('input[name=estadoLibro]:checked').value
    const now = DateTime.now()
    let fechaActual = now.toLocaleString()
    let libro = new Libro(datForm.get("tituloLibro"), datForm.get("autorLibro"), estadoLibro, fechaActual, datForm.get("commentLibro")) 
    arrayLibros.push(libro)
    localStorage.setItem('libros', JSON.stringify(arrayLibros))
    Toastify({
        text: "Libro añadido exitosamente",
        duration: 3000
        }).showToast();
    formulario.reset()
})

let botonColeccion = document.getElementById("btnMostrarColeccion")
let coleccionLibros = document.getElementById("coleccionLibros")
let barraDeProgreso = document.getElementById("progressBar")

// Mostrar colección
botonColeccion.addEventListener ('click', () => {
    coleccionLibros.innerHTML = ' '
    barraDeProgreso.innerHTML = ' '
    arrayLibros.forEach((libro, indice) => { 
        coleccionLibros.innerHTML += `
        <div class="card h-105 p-0 col-4" id="libro${indice}" style="width: 20rem">
            <div class="card-header">
                <span class="badge bg-${libro.estado == "leido" ? "success" : "secondary"}">${libro.estado.toUpperCase()}</span>
            </div>
            <div class="card-body">
                <h4 class="card-title"><u>${libro.titulo}</u></h5>
                <h5 class="card-text">Autor: ${libro.autor}</h3>
                <p><small>${libro.comment}</small></p>
            </div>
            <div class="mx-5 mb-2 text-center gap-2">
                <button class="btn btn-sm btn-dark">Editar</button>
                <button class="btn btn-sm btn-danger" id="btnRemoveCard">Eliminar</button>
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
    // Porcentaje leidos
    let filtroLeidos = arrayLibros.filter(libro => libro.estado == "leido")
    let numeroLeidos = filtroLeidos.length
    let numeroTotalColeccion = arrayLibros.length
    let porcentajeProgresoLectura = (numeroLeidos/numeroTotalColeccion) * 100
    barraDeProgreso.innerHTML += `
    <h4>Progreso de lecturas</h4>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: ${porcentajeProgresoLectura}%;"></div>
    </div>
    `

    
})

let botonEliminarColeccion = document.getElementById("btnEliminarColeccion")

botonEliminarColeccion.addEventListener('click', () => {
    swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminada, no se podrá recuperar la colección",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            swal("¡Colección eliminada!", {
                icon: "success",
            })
            localStorage.removeItem('libros')
        }
    })
})


