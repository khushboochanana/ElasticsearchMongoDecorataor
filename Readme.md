## Use **Elasticsearch decorator** to create Index for Elasticsearch similar to mongoDB Schema

Add **@ElasticIndex** decorator above the MongoSchema class

```javascript

Setup Elasticsearch
// Add in Node Server File
let EsInstance = new ElasticSetup({ host: config.elastic.url })
EsInstance.InitializeElasticSearch().then(() => {
  console.log(EsInstance) // EsInstance will contains ElasticSearchClient, ElasticSerachHelper
  //Import all mongo models after Elasticsearch initialization
  require('./models/user.model')
})


let elasticConfig = {
  model: UserSchema, //Mandatory
  name: 'user', // Mandatory
  exclude: [], //optional
  include: [], //optional
  mappings: {}, // custom mappings for UserIndex
  settings: {} // custom settings for UserIndex
}
@ElasticIndex(elasticConfig) // To create Elastic Index with default mapping
class userSchemaMethod {} //Mongo schema

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  name: {
    first: String,
    last: String,
    full: String
  },
})


userSchema.loadClass(userSchemaMethod)

```

After that an Auto index will be created for Elasticsearch with user name
http://localhost:9200/user/
