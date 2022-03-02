let sumaIva = 0;
let netoTotal = 0;
let productos = [];

class Producto {
    constructor(nombre, precioNeto, tipoIva) {
        this.nombre = nombre;
        this.precioNeto = precioNeto;
        this.tipoIva = tipoIva;
        this.iva = precioNeto * (this.tipoIva/100);
        this.precioFinal = precioNeto * (1 + (this.tipoIva/100));
    }
}

// Agregar productos
do{
    let nombreProducto = prompt("Ingrese el nombre del artículo")
    let precioNeto = parseFloat(prompt(`Ingrese el precio del artículo ${nombreProducto}`))
    while(isNaN(precioNeto)) {
        precioNeto = parseFloat(prompt("Entrada no válida, por favor ingrese un monto"))
    }
    let ivaProducto = parseFloat(prompt(`Ingrese el IVA que aplica al producto ${nombreProducto}`))
    while(ivaProducto != 10.5 && ivaProducto != 21 && ivaProducto != 0) {
        ivaProducto = parseFloat(prompt("Por favor, ingrese un tipo de IVA válido"))
    }
    productos.push(new Producto(nombreProducto, precioNeto, ivaProducto))
    netoTotal += precioNeto
    sumaIva += precioNeto * (ivaProducto/100) 
    var confirm = prompt("¿Desea continuar agregando precios? Y/N").toUpperCase()
} while (confirm != "N")

console.log(`Usted ha ingresado ${productos.length} productos: \n`)
for (let prod of productos) {
    console.log(`\t Producto ${prod.nombre}. Precio neto es $${prod.precioNeto}. IVA: $${prod.iva}. Precio final: $${prod.precioFinal}`)
}
console.log(`\n El neto total suma $${netoTotal} y le corresponde un IVA de $${sumaIva}`)


// Ordenar productos según precio
let confirmSort = prompt('¿Desea ordenarlos por precio final? Y/N').toUpperCase()
while (confirmSort != "N" && confirmSort != "Y"){
    confirmSort = prompt('Entrada inválida. Por favor, ingrese Y/N').toUpperCase()
}
if(confirmSort == "Y"){
    let sortCriteria = prompt('¿Desea ordenarlos de forma descendente o ascendente? Ingrese DESC/ASC según corresponda').toUpperCase()
    while(sortCriteria != "DESC" && sortCriteria != "ASC"){
        sortCriteria = prompt('Ingrese ASC/DESC según corresponda').toUpperCase()
    }
    if(sortCriteria == 'ASC'){
        let prodAsc = productos.sort((a,b) => a.precioFinal - b.precioFinal);
        console.log(`\n Productos ordenados por precio final, de forma ASCENDENTE: `)
        for (let prod of prodAsc) {
            console.log(`\t Producto ${prod.nombre}. Precio neto es $${prod.precioNeto}. IVA: $${prod.iva}. Precio final: $${prod.precioFinal}`)
        }
    } else {
        let prodDesc = productos.sort((a,b) => b.precioFinal - a.precioFinal)
        console.log(`\n Productos ordenados por precio final, de forma DESCENDENTE: `)
        for (let prod of prodDesc) {
            console.log(`\t Producto ${prod.nombre}. Precio neto es $${prod.precioNeto}. IVA: $${prod.iva}. Precio final: $${prod.precioFinal}`)
        }
    }
}

// Filtrar por tipo de IVA
let confirmFilter = prompt("¿Desea filtrar por tipo de IVA? Y/N").toUpperCase()
while (confirmFilter != "N" && confirmFilter != "Y") {
    confirmFilter = prompt("Entrada no válida. Por favor, ingrese Y/N si desea filtrar por tipo de IVA")
}
if (confirmFilter == "Y") {
    let tipoIvaFiltro = parseFloat(prompt("Ingrese el tipo de IVA por el que desea filtrar"))
    while(tipoIvaFiltro != 10.5 && tipoIvaFiltro != 21 && tipoIvaFiltro != 0) {
        tipoIvaFiltro = parseFloat(prompt("Por favor, ingrese un tipo de IVA válido"))
    }
    let resultFilter = productos.filter(prod => prod.tipoIva == tipoIvaFiltro)
    console.log(resultFilter)
    for (let producto of resultFilter) {
        console.log(`\n Productos con IVA ${tipoIvaFiltro}%: `)
        console.log(`\t Producto ${producto.nombre}. Precio neto es $${producto.precioNeto}. IVA: $${producto.iva}. Precio final: $${producto.precioFinal}`)
    }
}



