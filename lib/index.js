const express = require('express')
const mongoose = require('mongoose')
const config = require('../config')
const MONGO_URL = config.mongo.url
const userModel = require('./models/user.model')
mongoose.Promise = global.Promise
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected at ${MONGO_URL}`))
  .catch(err => console.log(`Database connection error: ${err.message}`))

const app = express()
app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`)
})
