const express = require('express')
const route = express.Router()
const createError = require('http-errors')

const User = require('../Models/User.model')
const { userValidate } = require('../helpers/validation')
const { signAccessToken } = require('../helpers/jwt_service')

route.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { error } = userValidate(req.body)
    console.log('error validation ::: ', error)
    if (error) {
      throw createError(error.details[0].message)
    }

    const isExists = await User.findOne({
      username: email
    })

    if (isExists) {
      throw createError.Conflict(`${email} already exists`)
    }

    const user = new User({
      email,
      password
    })

    const savedUser = await user.save()

    return res.json({
      status: 'OK',
      elements: savedUser
    })
  } catch (error) {
    next(error)
  }
})

route.post('/refresh-token', (req, res, next) => {
  res.send('Fucntion REFRESH-TOKEN')
})

route.post('/login', async(req, res, next) => {
  try {
    const { email, password } = req.body
    const { error } = userValidate(req.body)
    console.log('error validation ::: ', error)
    if (error) {
      throw createError(error.details[0].message)
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw createError.NotFound('User not registed')
    }

    const isValid = await user.isCheckPassword(password)
    if (!isValid) {
      throw createError.Unauthorized()
    }

    const accessToken = await signAccessToken(user._id)
    res.json({
      accessToken
    })
  } catch (error) {
    next(error)
  }
})
route.post('/logout', (req, res, next) => {
  res.send('Fucntion LOGOUT')
})

module.exports = route
