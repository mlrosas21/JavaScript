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
    console.log(radioIva.id)
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

/*
// Agregar productos
do{
    let nombreProducto = prompt("Ingrese el nombre del art??culo")
    while (nombreProducto == null) {
        nombreProducto = prompt("Por favor, ingrese un nombre")
    }
    let precioNeto = parseFloat(prompt(`Ingrese el precio del art??culo ${nombreProducto}`))
    while(isNaN(precioNeto)) {
        precioNeto = parseFloat(prompt("Entrada no v??lida, por favor ingrese un monto"))
    }
    let ivaProducto = parseFloat(prompt(`Ingrese el IVA que aplica al producto ${nombreProducto}`))
    while(ivaProducto != 10.5 && ivaProducto != 21 && ivaProducto != 0) {
        ivaProducto = parseFloat(prompt("Por favor, ingrese un tipo de IVA v??lido"))
    }
    productos.push(new Producto(nombreProducto, precioNeto, ivaProducto))
    netoTotal += precioNeto
    sumaIva += precioNeto * (ivaProducto/100) 
    sumaFinal += precioNeto * (1+(ivaProducto/100))
    var confirm = prompt("??Desea continuar agregando precios? Y/N").toUpperCase()
} while (confirm != "N")

console.log(`Usted ha ingresado ${productos.length} productos: \n`)
for (let prod of productos) {
    console.log(`\t Producto ${prod.nombre}. Precio neto es $${prod.precioNeto}. IVA: $${prod.iva}. Precio final: $${prod.precioFinal}`)
}
console.log(`\n El neto total suma $${netoTotal} y le corresponde un IVA de $${sumaIva}`)


const seccionProductos = document.getElementById("seccionProductos");

productos.forEach(prod => {
    seccionProductos.innerHTML += `<li>
        <h4>${prod.nombre.toUpperCase()}</h4> <br>
        Precio neto: $ ${prod.precioNeto} <br>
        IVA: $ ${prod.iva} (${prod.tipoIva}%) <br>
        <strong> Precio final: $${prod.precioFinal} </strong> </li>
    `
}) */

const seccionIva = document.getElementById("iva"); 

// Calculo IVA 21%
let sumaIva21 = 0;
let filterIva21 = productos.filter(prod => prod.tipoIva == 21);
for (let producto of filterIva21) {
    sumaIva21 += producto.iva;
}

// Calculo IVA 10.5%
let sumaIva105 = 0;
let filterIva105 = productos.filter(prod => prod.tipoIva == 10.5);
for (let producto of filterIva105) {
    sumaIva105 += producto.iva;
}


// Detalle IVA discriminado
seccionIva.innerHTML += ` <h3>
    IVA 21%: $${sumaIva21} <br>
    IVA 10.5%: $${sumaIva105} </h3>
`

const seccionTotal = document.getElementById("total");

// Totales
seccionTotal.innerHTML += ` <h3>
    Precio neto: $${netoTotal} <br>
    Total IVA: $${sumaIva} <br>
    Precio final: $${sumaFinal} </h3>
`
