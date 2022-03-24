const fs = require('fs');
const { limpiarTexto } = require("./texto");
const importUsersToExcel = require('./importService');
const exportUsersToExcel = require("./exportService");
const mysqlConnection = require('../config/mysql');

const procesarText = (texto, timestamp, aGuardarDesdeGrupo) => {

    const palabras_clave = ['hola', 'articulo', 'dia', 'ejemplo', 'proyecto', 'libre', 'proskin', 'bot', 'envia', 'ok', 'vamos', 'zona', 'tarde', 'busco', 'renta', 'lugar', 'ofrezco'];

    // const palabras_para_guardar = ['ofrezco', 'rento', 'vendo', 'nuevo'];   // POR EL MOMENTO Y EN ESTE EJEMPLO FUNCIONA SOLO CON UNA U OTRA (FALTA MEJORAR LOGICA PARA LAS BUSQUEDAS / GUARDADO DE DATOS.)

    const archivo_leido = importUsersToExcel('platica.csv');
  
    let texto_limpio = limpiarTexto(texto);
    
    let ejemplo = [];

    if (palabras_clave.some(substring => texto_limpio.includes(substring))) {
        palabras_clave.forEach(palabra => {
            if(texto_limpio.includes(palabra)){
                ejemplo.push(palabra);
            }
            texto_limpio = texto_limpio.replaceAll(palabra, "*" + palabra.toUpperCase() + "*");
        });
        return {tipo: 'encontrado', palabras: ejemplo, mensaje: texto_limpio};
    }
    if (palabras_para_guardar.some(substring => texto_limpio.includes(substring))) {
        palabras_para_guardar.forEach(palabra => {
            if(texto_limpio.includes(palabra)){
                ejemplo.push(palabra);
            }
            texto_limpio = texto_limpio.replaceAll(palabra, "*" + palabra.toUpperCase() + "*");
        });
        let message_to_save = [
            ...archivo_leido,
            {
                timestamp: timestamp,
                num: aGuardarDesdeGrupo,
                message: texto_limpio
            }
        ];

        let workSheetColumnNames = [
            "timestamp",
            "num",
            "message"
        ];
        let workSheetName = "Prueba";
        let filePath = "platica.csv";
        exportUsersToExcel(message_to_save, workSheetColumnNames, workSheetName, filePath);
        fs.appendFile('platica.txt', "[" + timestamp + "]" + aGuardarDesdeGrupo + ": " + texto_limpio + "\r\n", function (err) {
            if (err) return console.log(err);
            // console.log('successfully appended "' + texto_limpio.toUpperCase() + "\r\n" + '"');
        });


        return {tipo: 'guardar', palabras: ejemplo, mensaje: texto_limpio};
    }
    return {tipo: '', palabras: ejemplo, mensaje: texto_limpio};
}

function query(connection, palabra, callback) {
    let query = "SELECT * FROM `mensajes` WHERE mensajes.mensaje like ?"; 
    console.log(query);
    let data;
    connection.query(query, '%' + palabra + '%', function(err, rows, fields) {
        if(err){
            throw err;
        }
        return callback(JSON.stringify(rows));
    });
}

module.exports = {procesarText, query};