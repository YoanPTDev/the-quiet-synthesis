// SOURCE: https://www.mongodb.com/languages/mern-stack-tutorial

import { MongoClient } from 'mongodb';
const Db = "mongodb+srv://ndroletCVM:xc8biqOytEyvO0y9lV4IFUXhTow4GjQY@tqyonline.ljgkpby.mongodb.net/?retryWrites=true&w=majority"
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


// const dbo = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (db) {
//         _db = db.db('theQuietYearDB');
//         console.log('Successfully connected to MongoDB.');
//       }
//       return callback(err);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };

// export default dbo;
export { connectToDatabase, getDatabase };