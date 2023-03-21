const mongoose = require('mongoose')
require('dotenv').config()

const conn = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

conn.on('connected', function() {
  console.log(`MongoDB::: connected::: ${this.name}`)
})

conn.on('disconnected', function() {
  console.log(`MongoDB::: disconnected::: ${this.name}`)
})

conn.on('error', function(error) {
  console.log(`MongoDB::: error::: ${JSON.stringify(error)}`)
})

process.on('SIGINT', async() => {
  await conn.close()
  process.exit(0)
})

module.exports = conn
