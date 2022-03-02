let sumaIva = 0;
let netoTotal = 0;
let productos = [];
let sumaFinal = 0;

class Producto {
    constructor(nombre, precioNeto, tipoIva) {
        this.nombre = nombre;
        this.precioNeto = precioNeto;
        this.tipoIva = tipoIva;
        this.iva = precioNeto * (this.tipoIva/100);
        this.precioFinal = precioNeto * (1 + (this.tipoIva/100));
    }
}

// Agregar productos via form
let formProducto = document.getElementById("formProducto")
let nombreProducto = document.getElementById("inputNombreProducto")
let precioNetoProducto = document.getElementById("inputPrecioNeto")
let tipoIvaProducto = document.getElementById("inputTipoIva") 


formProducto.addEventListener('submit', (e) => {
    e.preventDefault()
    let dataForm = new FormData(e.target)
    let formPrecioNeto = dataForm.get('formPrecioNeto')
    let radioIva = formProducto.querySelector('input[name=tipoIvaCheck]:checked');
    let tipoIva;
    switch(radioIva.id){
        case 'radioIva21':
            tipoIva = 21
            break;
        case 'radioIva105':
            tipoIva = 10.5
            break;
        case 'radioIva0':
            tipoIva = 0
            break;
    }
    productos.push(new Producto(dataForm.get('formNombreProd'), formPrecioNeto, tipoIva))
    netoTotal += formPrecioNeto
    sumaIva += formPrecioNeto * (tipoIva/100) 
    sumaFinal += formPrecioNeto * (1+(tipoIva/100))
    formProducto.reset()
})

// Mostrar productos
const botonMostrarProductos = document.getElementById("showProductos")

botonMostrarProductos.addEventListener('click', () => {
    seccionProductos.innerHTML = ' '
    productos.forEach(prod => {
        seccionProductos.innerHTML += `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre.toUpperCase()}</h4>
          <p class="card-text">Precio neto: $ ${prod.precioNeto}</p>
          <p class="card-text">IVA: $ ${prod.iva} (${prod.tipoIva}%) </p>
          <p class="card-text"><strong> Precio final: $${prod.precioFinal} </strong> </p>
        </div>
      </div>
      `
    })
})
