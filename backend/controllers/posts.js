const fs = require('fs');
const connection = require("../database");

exports.GetOnePosts = (req, res, next) => {
  const sql = 'SELECT * FROM Posts where id = ' + connection.escape(req.params.id);
  connection.query(sql, function (err, results) {
    if (!err) {
      const Post = {};
      Post.post = results;
      const sqlcom = 'SELECT * FROM Commentaires where id_post = ' + connection.escape(req.params.id);
      connection.query(sqlcom, function (err, resultas) {
        if (!err) {
          Post.comment = resultas;
          res.send(Post);
        } else {
          console.log("Les commentaires n'ont pas pu être chargés : " + err);
        }
      })
    } else {
      console.log("Une erreur est survenue : " + err);
    }
  }
  );
};


exports.GetAllPosts = (req, res, next) => {
  connection.query(
    "SELECT * FROM Posts ORDER BY id DESC",
    (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        console.log("Une erreur est survenue : " + err);
      }
    }
  );
};


exports.CreatePost = (req, res, next) => {
  const post = {
    titre: req.body.titre,
    user_creation: req.body.userCreation,
    date_creation: req.body.datedujour,
    chemin_image: req.file ? req.file.filename : null,
    user_id: req.body.userId
  };

  connection.query(
    "INSERT INTO Posts SET ?", post,
    (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        console.log("Une erreur est survenue : " + err);
      }
    }
  );
};

exports.CreateCom = (req, res, next) => {
  const sql = 'SELECT * FROM Posts where id = ' + connection.escape(req.params.id);
  connection.query(sql, function (err, results) {
    if (!err) {
      //id trouvé, recherche d'user
      const sqluser = 'SELECT * FROM Users where id = ' + connection.escape(req.body.userid);
      connection.query(sqluser, function (errdeux, resultsdeux) {
        if (!errdeux) {
          //id trouvé, extraction infos
          const newcom = {
            id_post: req.params.id,
            user_name: resultsdeux[0].user_name,
            comment: req.body.comm,
            date_creation: req.body.datedujour
          };
          connection.query(
            "INSERT INTO Commentaires SET ?", newcom,
            (err, resultss, fields) => {
              if (!err) {
                res.send(resultss.insertId + "OK---" + resultsdeux[0].user_name)
              } else {
                console.log("Une erreur est survenue : " + err);
              }
            }
          );

        } else {
          console.log("Une erreur est survenue : " + errdeux);
        }
      }
      );
    } else {
      console.log("Une erreur est survenue : " + err);
    }
  }
  );
};