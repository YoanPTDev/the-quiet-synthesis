// Code tiré en partie de la section MERN de MongoDB

const express = require("express");
const gameRoutes = express.Router();
 
const dbo = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;
 
// Créer une nouvelle partie
gameRoutes.route("/game/add").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 let myobj = {
    createdBy: req.body.createdBy,
    players: req.body.players,
    createdOn: req.body.createdOn,
    adventureLog: req.body.adventureLog,
    deck: req.body.deck
  };
  db_connect.collection("games").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });
 
// Récupérer toutes les parties d'un joueur
gameRoutes.route("/game").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { $or: [{createdBy: username}, {players: {$elemMatch: {players: username}}}] };
 db_connect
   .collection("games")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// Récupérer une partie spécifique
gameRoutes.route("/game/load").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { shortId: req.body.shortId };
    db_connect
      .collection("games")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });