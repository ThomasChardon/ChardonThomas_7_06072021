const mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  insecureAuth: true
});

connection.connect(function (err) {
  if (err) {
    console.error('Connexion à MySQL échouée ! Error connecting: ' + err.stack);
    return;
  } else

    console.log('Connexion à MySQL réussie ! Connected as id ' + connection.threadId);
});

module.exports = connection;