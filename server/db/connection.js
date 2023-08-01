// SOURCE: https://www.mongodb.com/languages/mern-stack-tutorial

// db/connection.js
// Le code qui fait la connection à la base de données MongoDB.  Elle contient les cartes, les adventures logs
// et les decks (qui eux contiennent les cartes).

// Nicolas Drolet (auteur)
// Yoan Poulin Truchon
// Raphael Lavoie


import { MongoClient } from 'mongodb';
require('dotenv').config();

const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db, { useNewUrlParser: true, useUnifiedTopology: true });

let _db = null;

const connectToDatabase = async () => {
  console.log("Attempting to connect...");
  try {
    await client.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.log('error connecting to database: '+ err);
  }
}

const getDatabase = () => {
  return client.db('theQuietYearDB');
}

export { connectToDatabase, getDatabase };