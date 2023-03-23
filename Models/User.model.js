const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { testConnection } = require('../helpers/connect_multi_mongodb')
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
  email: {
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

UserSchema.pre('save', async function (next) {
  try {
    console.log('Called before save ::: ', this.email, this.password)
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
  } catch (error) {
    next(error)
  }
})

module.exports = testConnection.model('user', UserSchema)
