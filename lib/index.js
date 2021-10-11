const express = require('express')
const mongoose = require('mongoose')
const config = require('../config')
const MONGO_URL = config.mongo.url
const { ElasticSetup } = require('../elasticSearch')
let EsInstance = new ElasticSetup({ host: config.elastic.url })
EsInstance.InitializeElasticSearch().then(() => {
  console.log(EsInstance)
  require('./models/user.model')
})
// const userModel =
mongoose.Promise = global.Promise
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected at ${MONGO_URL}`))
  .catch(err => console.log(`Database connection error: ${err.message}`))

const app = express()
app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`)
})
