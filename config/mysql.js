const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.SQL_HOST || 'localhost',
  user     : process.env.SQL_USER || 'root',
  password : process.env.SQL_PASS || '',
  database : process.env.SQL_DATABASE || 'wa_bot'
});

// const connection = mysql.createConnection({
//   host     : process.env.SQL_HOST || 'localhost',
//   user     : process.env.SQL_USER || 'me',
//   password : process.env.SQL_PASS || 'secret',
//   database : process.env.SQL_DATABASE || 'my_db'
// });

const connect = () => connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Conexion correcta con tu base de datos MySQL ID: ' + connection.threadId);
});

const destroy = () => connection.destroy(function(err) {
  if (err) {
    console.error('error destoying: ' + err.stack);
    return;
  }
  console.log('Conexion cerrada')
});

module.exports = {connect, connection, destroy}