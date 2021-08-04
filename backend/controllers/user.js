const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../database");
const nodemailer = require("nodemailer");



// async..await is not allowed in global scope, must use a wrapper
async function sendMail(destinataire) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Groupomania admin" ' & process.env.MAIL_USER, // sender address
    to: destinataire, // list of receivers
    subject: "Changement de mot de passe", // Subject line
    text: "Bonjour, vous avez demandé à changer de mot de passe. Merci de suivre le lien suivant pour en créer un nouveau : <Lien>", // plain text body
    html: "<b>Bonjour, vous avez demandé à changer de mot de passe.<br/><br/> Merci de suivre le lien suivant pour en créer un nouveau : \
    <a href=\"http://localhost:3001/ReinitMDP\">Réinitialisation</a></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return(info);
  // res.status(201).json({ message: 'Mail envoyé' });
}






exports.verifToken = (req, res, next) => {
  // console.log(req.body);
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      res.status(200).json({ reponse: "Connexion maintenue" })
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

exports.signup = (req, res, next) => {
  var sql = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.usermail);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
      //user trouvé, pas bon
      console.log("Utilisateur existant, requete non jouee");
      return res.status(401).json({ error: 'Utilisateur existant, requete non jouee' });
    } else {
      //mail non présent, creation du user et insert
      console.log("Requete aboutie avec succes !");
      // return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const motdepasse = hash
          var post = { user_name: req.body.username, user_mail: req.body.usermail, user_password: motdepasse };
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
    }
  });
};

exports.login = (req, res, next) => {
  var sql = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.username);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
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
  var sql = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.usermail);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
      // user trouvé

      //marche

      // sendMail(req.body.usermail).catch(console.error)
      sendMail("tom.chardon.dev@gmail.com").catch(console.error)
      .then((message) => {
        if (message.accepted)  {
          return res.status(201).json({ message: 'Mail correctement envoyé' })
        }
      });

      // return res.status(201).json({ message: 'Mail correctement envoyé'});

      // console.log("fonction sendMail lancée");




      const nouveauMDP = "nouveauMDP"; // a modifier pour variable
      // bcrypt.hash(nouveauMDP, 10)
      //   .then(hash => {
      //     const motdepasse = hash
      //     var post = { user_password: motdepasse };
      //     var query = connection.query('UPDATE Users SET ?  WHERE user_name = ?', [post, results[0].user_mail], function (error, results, fields) {
      //       if (error) throw error;
      //       else {
      //         console.log("Requete jouée : ");
      //         console.log(query.sql); // INSERT INTO Users SET `user_name` = 'user', `user_mail` = 'mail', user_password = le mot de passe
      //         res.status(201).json({ message: 'Mot de passe envoyé !' })
      //       }
      //       // Neat!
      //     });
      //   });
      // console.log(results);
      // res.status(200).json()
    } else {
      console.log("Requete aboutie sans succes !");
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
  })

};

exports.getProfile = (req, res, next) => {
  var sql = 'SELECT * FROM Users where id = ' + connection.escape(req.params.id);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
      // user trouvé
      res.send(results);
    } else {
      console.log("Requete aboutie sans succes !");
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
  })
}

exports.updateProfile = (req, res, next) => {
  var sql = 'SELECT * FROM Users where id = ' + connection.escape(req.body.userId);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
      // user trouvé
      // console.log(results);
      if (req.body.newusername) { //si on modifie le nom d'utilisateur
        var donnees = { user_name: req.body.newusername };
      }
      if (req.body.newusermail) { //si on modifie le mail
        var sqlmail = 'SELECT * FROM Users where user_mail = ' + connection.escape(req.body.newusermail);
        connection.query(sqlmail, function (er, results) {
          if (er) throw er;
          let longueur = results.length
          if (longueur > 0) {
            //user trouvé, pas bon
            console.log("Utilisateur existant, requete non jouee");
            return res.status(401).json({ error: 'Utilisateur existant, requete non jouee' });
          }
        });
        var donnees = { user_mail: req.body.newusermail };
      }
      console.log(donnees);
      connection.query('UPDATE Users SET ?  WHERE id = ?', [donnees, connection.escape(req.body.userId)], function (error, results, fields) {
        if (error) throw error;
        else {
          console.log("update ok !");
          res.status(200).json("Modifications effectuée !")
        }
      })
    } else {
      console.log("Requete aboutie sans succes !");
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
  })
};

exports.deleteUser = (req, res, next) => {
  var sql = 'SELECT * FROM Users where id = ' + connection.escape(req.body.userId);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    let longueur = results.length
    if (longueur > 0) {
      // user trouvé

      connection.query('DELETE FROM Users where id = ?', connection.escape(req.body.userId), function (error, results, fields) {
        if (error) throw error;
        else {
          console.log("Compte supprimé !!");
          res.status(200).json("Compte supprimé !!")
        }
      })
    } else {
      console.log("Requete aboutie sans succes !");
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
  })
}