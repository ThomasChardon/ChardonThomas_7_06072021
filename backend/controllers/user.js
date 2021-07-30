const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../database");
const User = require('../models/Users');


exports.verifToken = (req, res, next) => {
    // console.log(req.body);
    try {
      const token = req.body.token; 
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        console.log("jwt ok - verif token");
        res.status(200).json({reponse : "Connexion maintenue"})
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};

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
        if (req.body.password === "") {
          console.log("mot de passe vide");
          return res.status(401).json({ error: 'Le mot de passe que vous avez entré est vide' });
        }
        bcrypt.compare(req.body.password, results[0].user_password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          else {
            console.log("Utilisateur et mot de passe OK");
            res.status(200).json({
              userId: results[0].id,
              token: jwt.sign(
                { userId: results[0].id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
                )
              });
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
  
  exports.mdpOublie = (req, res, next) => {
    var sql    = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.usermail);
    connection.query(sql, function (err, results) {
      if (err) throw err;
    let longueur = results.length
    if(longueur > 0){
      // user trouvé
      const nouveauMDP = "nouveauMDP"; // a modifier pour variable
      bcrypt.hash(nouveauMDP, 10) 
        .then(hash => {
        const motdepasse = hash
        var post  = {user_password: motdepasse };
        var query = connection.query('UPDATE Users SET ?  WHERE user_name = ?', [post, results[0].user_mail], function (error, results, fields) {
        if (error) throw error;
        else {
          console.log("Requete jouée : ");
          console.log(query.sql); // INSERT INTO Users SET `user_name` = 'user', `user_mail` = 'mail', user_password = le mot de passe
          // res.status(201).json({ message: 'Mot de passe envoyé !' })
        }
      // Neat!
      });
    });
      // créer mot de passe, le hacher, modifier dans la bdd, l'envoyer
      console.log(results);
      // res.status(200).json()
    } else {
        console.log("Requete aboutie sans succes !");
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
    })

  };
  
  exports.updateProfile = (req, res, next) => {
    console.log(req.body);
    //voir les champs
    var sql    = 'SELECT * FROM Users where id = ' + connection.escape(req.body.userId);
    connection.query(sql, function (err, results) {
      if (err) throw err;
    let longueur = results.length
    if(longueur > 0){
      // user trouvé
      if (req.body.username) { //si on modifie le nom d'utilisateur
        var donnees  = {user_name: req.body.username };
      }
      if (req.body.usermail) { //si on modifie le ail
        var donnees  = {user_mail: req.body.usermail };
      }
      connection.query('UPDATE Users SET ?  WHERE user_name = ?', [donnees, connection.escape(req.body.userId)], function (error, results, fields) {
        if (error) throw error;
        else {
          //si pas d'erreur update ok ?
          console.log("update ok !");
        }
      })
    } else {
        console.log("Requete aboutie sans succes !");
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
    })

  };
  
  
  