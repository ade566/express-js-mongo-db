const { MongoClient } = require("mongodb");
const connection = 'mongodb://localhost:27017'

const db = new MongoClient(connection);

(async () => {
  try {
    await db.connect()
  } catch (err) {
    console.log(err)
  }
})()

module.exports = db