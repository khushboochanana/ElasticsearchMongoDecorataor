import { EsIndex } from './elasticSearch.decorator'
import ElasticClient from './elasticClient'
import EsService from './elasticSearch.service'

let ElasticIndex = null
class ElasticSetup {
  ElasticSearchHelper = null
  ElasticSearchClient = null
  clientConfig = { host: 'http:/localhost:9200' }
  constructor (clientConfig) {
    this.clientConfig = clientConfig
  }
  InitializeElasticSearch = async url => {
    try {
      let EsClient = await new ElasticClient(this.clientConfig)
      this.ElasticSearchHelper = new EsService(EsClient)
      this.ElasticSearchClient = EsClient.client
      ElasticIndex = EsIndex.bind(null, this.ElasticSearchHelper)
    } catch (error) {
      console.log('Error during Elastic search Initialization', error)
    }
  }
}

export { ElasticSetup, ElasticIndex }
