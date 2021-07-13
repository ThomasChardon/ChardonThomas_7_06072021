const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    insecureAuth : true
  // ,multipleStatements: true,
});


connection.connect(function(err) {
    if (err) {
      console.error('Connexion à MySQL échouée ! Error connecting: ' + err.stack);
      return;
    } else

    console.log('Connexion à MySQL réussie ! Connected as id ' + connection.threadId);
});

// connection.query('SELECT titre nom_du_post, date_creation from Posts AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     const tableau = JSON.stringify(rows);
//     // console.log('The solution is: ', rows);
//     console.log('The solution is: ', tableau);
// });

//marche
// connection.query('SELECT titre nom_du_post from Posts AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   // console.log('The solution is: ', rows[0].solution);
//   console.log('The solution is: ', rows);
// });

//   connection.end(function(err) {
//     if (err) throw err;
// });

module.exports = connection;