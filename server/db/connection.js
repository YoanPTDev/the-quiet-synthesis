// SOURCE: https://www.mongodb.com/languages/mern-stack-tutorial

import { MongoClient } from 'mongodb';
const Db = "mongodb+srv://ndroletCVM:xc8biqOytEyvO0y9lV4IFUXhTow4GjQY@tqyonline.ljgkpby.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(Db);

let _db = null;

const dbo = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db('theQuietYearDB');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

export default dbo;