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

exports.login = (req, res, next) => {
  console.log("Le champs requête : " + req);
  var sql    = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.username);
  connection.query(sql, function (err, results, fields) {
      if (!err) {
        if (!results) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
        else {
          res.send(results);
          console.log("Le champs result :" + results);
        }
      } else {
        console.log("Une erreur est survenue : " + err);
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