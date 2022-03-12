const quitarAcentos = (cadena) => {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };

    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}

const quitarPuntuacion = (cadena) => {
    const signos_puntuacion = { ',': ' ', '.': ' ', ':': ' ', ';': ' ' };
    let cadena_final = cadena;
    Object.keys(signos_puntuacion).forEach(signo => {
        cadena_final = cadena_final.replaceAll(signo, signos_puntuacion[signo]);
    });
    return cadena_final;
}

const limpiarTexto = (cadena) => {
    let texto_limpio = quitarPuntuacion(cadena)
    texto_limpio = quitarAcentos(texto_limpio)
    return texto_limpio.toLowerCase();
}

const waitFor = ms => new Promise(
    resolve => setTimeout(resolve, ms)
)

module.exports = {quitarAcentos, quitarPuntuacion, limpiarTexto, waitFor}