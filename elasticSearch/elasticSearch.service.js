const { elasticClient } = require('./elasticClient')

export default class ElasticSearchService {
  elasticClient = null
  constructor (esClient) {
    this.elasticClient = esClient
  }
  createIndex = async ({ name, mapping, settings }) => {
    try {
      let createObj = {
        index: name,
        body: {}
      }
      if (mapping && Object.keys(mapping).length) {
        createObj.body.mappings = {
          properties: mapping
        }
      }
      if (settings && Object.keys(settings).length) {
        createObj.body.settings = settings
      }
      let indexCreate = await this.elasticClient.indices.create(createObj)
      return indexCreate
    } catch (err) {
      console.log(err)
    }
  }

  indexExists = async indexName => {
    return await this.elasticClient.indices.exists({
      index: indexName
    })
  }
}
