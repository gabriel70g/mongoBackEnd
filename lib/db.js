'use stric'
const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?AuthMechanism=SCRAM-SHA-1`
//const mongoUrl = `mongodb://localhost:27017`


let connection

async function connectDB() {
  if (connection) return connection

  let client

  try {

    client = await MongoClient.connect(mongoUrl, {
      /*useNewUrlParser: true,*/
      useUnifiedTopology: true })
      client = await MongoClient.connect(mongoUrl)
      

      connection = client.db(DB_NAME)

  } catch (err) {
    console.error('\nno se pudo conectar\n', mongoUrl , err)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB