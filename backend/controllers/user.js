const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../database");
const User = require('../models/Users');

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10) 
    .then(hash => {
      const motdepasse = hash
      var post  = {user_name: req.body.username, user_mail: req.body.usermail, user_password: motdepasse };
      var query = connection.query('INSERT INTO Users SET ?', post, function (error, results, fields) {
      if (error) throw error;
      else {
        console.log("Requete jouée : ");
        console.log(query.sql); // INSERT INTO Users SET `user_name` = 'user', `user_mail` = 'mail', user_password = le mot de passe
        res.status(201).json({ message: 'Utilisateur créé !' })
      }
  // Neat!
    });
  });
};

exports.login = (req, res, next) => {
  var sql    = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.username);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if(longueur > 0){
      if (req.body.username.toLowerCase() == results[0].user_mail) {
        bcrypt.compare(req.body.password, results[0].user_password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          else {
            console.log("Utilisateur et mot de passe OK");
            res.status(200).json({
              userId: results[0].user_name,
              token: jwt.sign(
                  { userId: results[0].user_name },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
            });
            // res.send(results);// jswt !!
          }
        })
        .catch(error => res.status(500).json({ error }));
      }
    } else {
      console.log("Requete aboutie sans succes !");
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
  });
};



