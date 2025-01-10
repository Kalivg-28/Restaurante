const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "chodachi"
});
connection.connect((error) => {
    if (error) {
      console.error('Error al conectar a la base de datos:', error);
      return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
  
  
  });
  module.exports = connection;