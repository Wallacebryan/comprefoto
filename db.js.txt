const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fotografos_marketplace'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado ao banco de dados');
});

module.exports = connection;