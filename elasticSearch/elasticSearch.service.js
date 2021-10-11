const { elasticClient } = require('./elasticClient')

export const createIndex = async ({ name, mapping, settings }) => {
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
    let indexCreate = await elasticClient.indices.create(createObj)
    return indexCreate
  } catch (err) {
    console.log(err)
  }
}

export const indexExists = async indexName => {
  return await elasticClient.indices.exists({
    index: indexName
  })
}
