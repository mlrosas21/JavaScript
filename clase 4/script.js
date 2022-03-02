
let calculoIva = monto => monto * .21

let sumaIva = 0;
let netoTotal = 0;
let productos = [];

class Producto {
    constructor(nombre, precioNeto) {
        this.nombre = nombre;
        this.precioNeto = precioNeto;
        this.iva = precioNeto * 0.21;
        this.precioFinal = precioNeto * 1.21;
    }
}

do{
    let nombreProducto = prompt("Ingrese el nombre del artículo")
    let precioNeto = parseFloat(prompt(`Ingrese el precio del artículo ${nombreProducto}`))
    while(isNaN(precioNeto)) {
        precioNeto = parseFloat(prompt("Entrada no válida, por favor ingrese un monto"))
    }
    productos.push(new Producto(nombreProducto, precioNeto))
    netoTotal += precioNeto
    sumaIva += calculoIva(precioNeto)
    var confirm = prompt("¿Desea continuar agregando precios? Y/N").toUpperCase()
} while (confirm != "N")

console.log(`Usted ha ingresado ${productos.length} productos: \n`)
for (const prod of productos) {
    console.log(`\t Producto ${prod.nombre}. Precio neto es $${prod.precioNeto}. IVA: $${prod.iva}. Precio final: $${prod.precioFinal}`)
}
console.log(`\n El neto total suma $${netoTotal} y le corresponde un IVA de $${sumaIva}`)


