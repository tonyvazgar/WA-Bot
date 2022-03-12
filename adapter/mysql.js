const {connection} = require('../config/mysql')
const DATABASE_NAME = process.env.SQL_DATABASE || 'db_test'

getData = (message = '', callback) => connection.query(
    `SELECT * FROM ${DATABASE_NAME}.initial WHERE keywords LIKE '%${message}%'  LIMIT 1`,
    (error, results
        ) => {
    const [response] = results
    const key = response?.option_key || null
    callback(key)
});


getReply = (option_key = '', callback) => connection.query(
    `SELECT * FROM ${DATABASE_NAME}.response WHERE option_key = '${option_key}'  LIMIT 1`,
    (error, results
        ) => {
    const [response] = results;
    console.log(response)
    const value = {
        replyMessage:response?.replyMessage || '',
        trigger:response?.trigger || '',
        media:response?.media || ''
    }
    callback(value)
});

getDataDB = (message = '', callback) => connection.query(
    `SELECT * FROM ${DATABASE_NAME}.mensajes WHERE  mensajes.mensaje LIKE '%${message}%'`,
    (error, results
        ) => {
    const [response] = results
    const key = response?.mensaje || null
    callback(results)
});

module.exports = {getData, getReply, getDataDB}