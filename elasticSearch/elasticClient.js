const elasticsearch = require('elasticsearch')
const config = require('../config')

let elasticClient = new elasticsearch.Client({
  host: config.elastic.url
})

export { elasticClient }
