const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../database");
const User = require('../models/Users');

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         email: req.body.email,
//         password: hash
//       });
//       user.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error })); 
// };

// exports.login = (req, res, next) => {
exports.signup = (req, res, next) => {
  console.log(req.body);
  var post  = {user_name: "test", user_mail: req.body.username, user_password: req.body.password, };
  var query = connection.query('INSERT INTO Users SET ?', post, function (error, results, fields) {
  if (error) throw error;
  else {
    console.log("Requete jouée : ");
    console.log(query.sql); // INSERT INTO Users SET `user_name` = 'user', `user_mail` = 'mail', user_password = le mot de passe
    res.status(201).json({ message: 'Utilisateur créé !' })
  }
  // Neat!
  });



  // var sql    = 'INSERT INTO Users SET ?', post ;
  // // var sql    = 'INSERT INTO Users (user_name, user_password) VALUES ('Thomas@gmail.com', 'Thomas')' + connection.escape(req.body.username);
  // connection.query(sql, function (err, results) {

  //   if (err) throw err;
  //     let longueur = results.length
  //       if(longueur > 0){
  //         console.log("Requete aboutie avec succes");
  //         if (req.body.username.toLowerCase() == results[0].user_mail) {
  //           console.log("Utilisateur ok");
  //           //check mot de passe + voir re render
  //           // console.log("Le champs result (BDD) user mail :");
  //           // console.log(results[0].user_mail);
  //           // console.log("Le champs result (BDD) user password :");
  //           // console.log(results[0].user_password);
  //           res.send(results);
  //         }
  //       } else {
  //         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  //       }
  //   });
  };

exports.login = (req, res, next) => {
  var sql    = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.username);
  connection.query(sql, function (err, results) {

    if (err) throw err;
      let longueur = results.length
        if(longueur > 0){
          console.log("Requete aboutie avec succes");
          if (req.body.username.toLowerCase() == results[0].user_mail) {
            console.log("Utilisateur ok");
            //check mot de passe + voir re render
            // console.log("Le champs result (BDD) user mail :");
            // console.log(results[0].user_mail);
            // console.log("Le champs result (BDD) user password :");
            // console.log(results[0].user_password);
            res.send(results);
          }
        } else {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
    });





    // User.findOne({ email: req.body.email })
    // .then(user => {
    //   if (!user) {
    //     return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    //   }
    //   bcrypt.compare(req.body.password, user.password)
    //     .then(valid => {
    //       if (!valid) {
    //         return res.status(401).json({ error: 'Mot de passe incorrect !' });
    //       }
    //       res.status(200).json({
    //         userId: user._id,
    //         token: jwt.sign(
    //             { userId: user._id },
    //             'RANDOM_TOKEN_SECRET',
    //             { expiresIn: '24h' }
    //           )
    //       });
    //     })
    //     .catch(error => res.status(500).json({ error }));
    // })
    // .catch(error => res.status(500).json({ error }));
};