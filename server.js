const express = require('express')
const app = express()
const createError =  require('http-errors')
const UserRoute = require('./Router/User.route')
// require('./helpers/connections_mongodb')
require('dotenv').config()

app.get('/', (req, res, next) => {
  res.send('Home Page')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', UserRoute)

app.use((req, res, next) => {
  // const error = new Error('Not Found')
  // error.status = 500
  // next(error)
  next(createError.NotFound('ROUTER does not exist'))
})

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})