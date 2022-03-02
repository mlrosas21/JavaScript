let cantidadNotas = 0;
let promedioNotas = 0;
let total = 0;

do {
    var nota = prompt("Ingrese una nota")
    total += parseFloat(nota);
    cantidadNotas++;
    promedioNotas = total / cantidadNotas;
    var confirm = prompt("¿Desea continuar agregando notas? Y/N").toUpperCase()
} while (confirm != "N")

if(promedioNotas >= 7) {
    console.log(`¡Felicitaciones! Promocionó la cursada con un promedio final de ${promedioNotas}`)
} else if (promedioNotas < 7 && promedioNotas >= 4){
    console.log(`Aprobó la cursada con un promedio final de ${promedioNotas}`)
} else {
    console.log(`Lamentablemente reprobó la cursada; su promedio final fue ${promedioNotas}`)
}