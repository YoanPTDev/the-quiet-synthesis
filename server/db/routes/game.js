// Code tiré en partie de la section MERN de MongoDB

// db/routes/game.js

// Des méthodes qui devaient servir à une éventuelle implémentation d'une architecture REST.
// Finalement cette méthode de transfert de données entre serveur et BD a été remplacé assez
// tôt dans la conception pour faire place aux WebSockets, qui s'avéraient plus avantageux pour
// un projet moins demandant au niveau graphique mais qui nécessitait un temps de réponse plus
// rapide que REST. Je laisse le code ici pour témoignée d'une architecture qui ne fut jamais.

// Ces méthodes auraient été utilisées par le serveur pour recevoir les requetes du client et les
// envoyer à notre base de donnée MongoDB.

// Nicolas Drolet (auteur)
// Yoan Poulin Truchon
// Raphael Lavoie

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

//Récupérer un Adventure Log par son id
gameRoutes.route("/game/log").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.body.id) };
  db_connect
    .collection("adventure_logs")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });