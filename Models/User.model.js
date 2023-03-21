const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { testConnection } = require('../helpers/connect_multi_mongodb')

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = testConnection.model('users', UserSchema)
