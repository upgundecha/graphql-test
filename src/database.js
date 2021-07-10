const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

let database = null;

const mongo = new MongoMemoryServer();

async function startDatabase() {
  const uri = await mongo.getUri();
  const connection = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//insert test data
  if (!database) {
    database = connection.db();
    await database.collection("authors").insertMany(data.Authors);
  }

  return database;
}

async function stopDatabase() {
  await mongo.stop();
}

module.exports = {
  startDatabase,
  stopDatabase,
};