// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

// Database Name
const dbName = 'TodoApp';

// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

function insertDocument(db, collection, document) {
  
  if (!db || !collection || !document) return

  db.collection(collection).insertOne(document, (err, res) => {
    if (err) {
      return console.log(`Unable to insert into ${collection}`, err)
    }

    console.log(res.ops[0]._id.getTimestamp())
  })
}

function findDocuments (db, collection) {

  db.collection(collection).find({ 
    // location: 'London'
    _id: new ObjectID('5abdd7645a50fd1ecf282818')
  }).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log(`Found the following ${docs.length} record(s)`);
    console.log(docs)
  });
}

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {

  if (err) {
    return console.log('Unable to connect mongodb')
  }

  console.log('Connected to Mongodb Server')

  const db = client.db(dbName)

  // insertDocument(db, 'Users', {
  //   name: 'Shaw',
  //   location: 'New York City'
  // })

  findDocuments(db, 'Users')

  client.close()
});
