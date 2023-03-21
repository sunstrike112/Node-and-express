const mongoose = require('mongoose')
require('dotenv').config()

function newConnection(uri) {
  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  conn.on('connected', function () {
    console.log(`MongoDB::: connected::: ${this.name}`)
  })

  conn.on('disconnected', function () {
    console.log(`MongoDB::: disconnected::: ${this.name}`)
  })

  conn.on('error', function (error) {
    console.log(`MongoDB::: error::: ${JSON.stringify(error)}`)
  })

  return conn
}

// make connection to DB test

const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const UserConnection = newConnection(process.env.URI_MONGODB_USER)

module.exports = {
  testConnection,
  UserConnection
}
