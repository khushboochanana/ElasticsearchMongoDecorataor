import elasticsearch from 'elasticsearch'

export default class ElasticClient {
  client = null
  constructor (clientConfig) {
    this.client = new elasticsearch.Client(clientConfig)
  }
}
