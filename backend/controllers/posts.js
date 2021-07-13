// const fs = require('fs');
// const Post = require('../models/Posts');



// const express = require("express");
const { now } = require("mongoose");
const connection = require("../database");

exports.GetAllPosts = (req, res, next) => {
  connection.query(
    "SELECT * FROM Posts",
    (err, results, fields) => {
      if (!err) {
        res.send(results);
        // console.log(results);
      } else {
        console.log("Une erreur est survenue : " + err);
      }
    }
    // .then(allposts => res.status(200).json(allposts))
    // .catch(error => res.status(400).json({ error }));
  );
};


exports.CreatePost = (req, res, next) => {
  var post = {title: req.body.title, user_creation: req.body.user, date_creation: req.body.today, chemin_image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
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



// Router.post("/", (req, res) => {
//   let qb = req.body;
//   const sql =
//     "SET @ID = ?;SET @Name = ?;SET @Position = ?;SET @Team = ?;SET @OpposingTeam = ?;SET @JodySmith = ?;SET @EricMoody = ?;SET @JohnFerguson = ?;SET @FantasyData = ?; CALL Add_or_Update_QB(@ID, @Name, @Position, @Team, @OpposingTeam, @JodySmith, @EricMoody, @JohnFerguson, @FantasyData);";
//   mysqlConnection.query(
//     sql,
//     [
//       qb.ID,
//       qb.Name,
//       qb.Position,
//       qb.Team,
//       qb.OpposingTeam,
//       qb.JodySmith,
//       qb.EricMoody,
//       qb.JohnFerguson,
//       qb.FantasyData,
//     ],
//     (err, results, fields) => {
//       if (!err) {
//         results.forEach((element) => {
//           if (element.constructor == Array) res.send(element);
//         });
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Router.put("/", (req, res) => {
//   let qb = req.body;
//   const sql =
//     "SET @ID = ?;SET @Name = ?;SET @Position = ?;SET @Team = ?;SET @OpposingTeam = ?;SET @JodySmith = ?;SET @EricMoody = ?;SET @JohnFerguson = ?;SET @FantasyData = ?; CALL Add_or_Update_QB(@ID, @Name, @Position, @Team, @OpposingTeam, @JodySmith, @EricMoody, @JohnFerguson, @FantasyData);";
//   mysqlConnection.query(
//     sql,
//     [
//       qb.ID,
//       qb.Name,
//       qb.Position,
//       qb.Team,
//       qb.OpposingTeam,
//       qb.JodySmith,
//       qb.EricMoody,
//       qb.JohnFerguson,
//       qb.FantasyData,
//     ],
//     (err, results, fields) => {
//       if (!err) {
//         res.send(
//           "The data for the selected quarterback has been successfully updated."
//         );
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Router.delete("/:id", (req, res) => {
//   mysqlConnection.query(
//     "DELETE FROM quarterback_rankings WHERE ID= ? ",
//     [req.params.id],
//     (err, results, fields) => {
//       if (!err) {
//         res.send("The selected quarterback has been successfully deleted.");
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// module.exports = Router;












// anciennes fonctions

// const fs = require('fs');
// const Sauce = require('../models/Sauce');

// exports.createSauce = (req, res, next) => {
//   const sauceObject = JSON.parse(req.body.sauce);
//   const sauce = new Sauce({
//     ...sauceObject,
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//     likes: 0,
//     dislikes: 0,
//     usersLiked: [],
//     usersDisliked: []
//   });
//   sauce.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => {
//       console.log(error);
//       res.status(400).json({ error })
//     } );
// };

// exports.modifySauce = (req, res, next) => {
//   const sauceObject = req.file ?
//     {
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//   Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.deleteSauce = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       const filename = sauce.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, () => {
//         Sauce.deleteOne({ _id: req.params.id })
//           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//           .catch(error => res.status(400).json({ error }));
//       });
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// exports.GetOneSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id })
//       .then(sauce => res.status(200).json(sauce))
//       .catch(error => res.status(404).json({ error }));
// };

// exports.GetAllSauce = (req, res, next) => {
//     Sauce.find()
//     .then(sauces => res.status(200).json(sauces))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.likeSauce = ( req, res, next ) => {
//     if (req.body.like === 1 ) {
//       Sauce.updateOne({ _id: req.params.id }, {$inc : {likes: +1} , $push: { usersLiked: req.body.userId}})
//       .then(() => {res.status(200).json({ message: 'Objet modifié !'})} )
//     .catch(error => {
//       console.log(error);
//       res.status(400).json({ error })
//     } );
//     } 
//     //si negatif, update dislikes, ajout userId dans usersDisliked
//     else if (req.body.like === -1 ) {
//       Sauce.updateOne({ _id: req.params.id }, {$inc : {dislikes: +1} , $push: { usersDisliked: req.body.userId}})
//       .then(() => {res.status(200).json({ message: 'Objet modifié !'})} )
//       .catch(error => res.status(400).json({ error }));
//     }
//     //si zéro, chercher si c'est like ou dislike
//     else if (req.body.like === 0 ) {
//        Sauce.findOne({_id: req.params.id})
//        .then((result) => {
//         if (result.usersLiked.includes(req.body.userId)) { //si like
//             Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc : {likes: -1} })
//             .then(() => res.status(200).json({message: 'retrait du like'}))
//             .catch((error) => res.status(400).json({error}));
//         }
//         if (result.usersDisliked.includes(req.body.userId)) { //si dislike
//           Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc : {dislikes: -1} })
//           .then(() => res.status(200).json({message: 'retrait du dislike'}))
//           .catch((error) => res.status(400).json({error}));
//       }
//     }).catch((error) => res.status(404).json({error}));
//   }
// };