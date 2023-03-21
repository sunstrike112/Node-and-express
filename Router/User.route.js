const express = require('express')
const route = express.Router()
const createError = require('http-errors')

const User = require('../Models/User.model')

route.post('/register', async(req, res, next) => {
  try {
    const { email, password } = req.body
    if(!email || !password) {
      throw createError.BadRequest()
    }

    const isExists = await User.findOne({
      username: email
    })
    if (isExists) {
      throw createError.Conflict(`${email} already exists`)
    }

    const isCreate =  await User.create({
      username: email,
      password
    })
    
    return res.json({
      status: 'OK',
      elements: isCreate
    })
  } catch (error) {
    next(error)
  }
})
route.post('/refresh-token', (req, res, next) => {
  res.send('Fucntion REFRESH-TOKEN')
})
route.post('/login', (req, res, next) => {
  res.send('Fucntion LOGIN')
})
route.post('/logout', (req, res, next) => {
  res.send('Fucntion LOGOUT')
})

module.exports = route
