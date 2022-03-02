function quitarAcentos(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}
function quitarPuntuacion(cadena) {
    const signos_puntuacion = { ',': ' ', '.': ' ', ':': ' ', ';': ' ' };
    let cadena_final = cadena;
    Object.keys(signos_puntuacion).forEach(signo => {
        cadena_final = cadena_final.replaceAll(signo, signos_puntuacion[signo]);
    });
    return cadena_final;
}

function limpiarTexto(cadena) {
    let texto_limpio = quitarPuntuacion(cadena);
    texto_limpio = quitarAcentos(texto_limpio);
    return texto_limpio.toLowerCase();
}

const palabras_clave = ['hola', 'articulo', 'tratamiento', 'lugar', 'editada', 'libre', 'proskin', 'depilacion', 'tratamiento'];

let message = "hola WIKIPEDÍA. ES, UNA; ENCICLOPEDIA LIBRE,NOTA 2​ POLÍGLOTA Y EDITADA DE MANERA COLABORATIVA. ES UN lugar PROYECTO DE CREAR UNA ENCICLOPEDIA: LIBRE EN LA RED. CADA UNO PUEDE APORTAR SUS CONOCIMIENTOS SOBRE CUALQUIER TEMA PARA CREAR UNA BASE DE DATOS CON TODA LA SABIDURÍA HUMANA. todoesto es un poco de una prueba que se hace en proskin, un lugar muy ameno donde hay varios tratamientos, tales como depilaciones, cavitaciones y otras cosas."


console.log(message);
message = limpiarTexto(message);
console.log('');
console.log(message);


if (palabras_clave.some(substring => message.includes(substring))) {
    palabras_clave.forEach(palabra => {
        message = message.replaceAll(palabra, "*" + palabra + "*");
    })
}
console.log('');
console.log(message);