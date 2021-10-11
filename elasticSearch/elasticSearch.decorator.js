import { dataTypeMapping } from './mongoToElasticTypeMapping.js'

export function EsIndex (
  ElasticSearchHelper,
  { model, name, exclude, include, mappings, settings }
) {
  console.log('Elastic index name: ' + name, ElasticSearchHelper)
  if (!ElasticSearchHelper) {
    console.log('Please initialze the elasticsearch  ')
  }

  return function decorator (t) {
    ElasticSearchHelper.indexExists(name).then(exists => {
      if (!exists) {
        let mapping = {}
        if (mappings && Object.keys(mappings).length) {
          mapping = mappings
        } else {
          mapping = getMongoFields({ model, exclude, include })
        }
        ElasticSearchHelper.createIndex({ name, mapping, settings }).then(
          function (data) {
            console.log('CREATED Index For : ' + name)
          }
        )
      }
    })
  }
}

const createMapping = ({ name, value, exclude, include }, context) => {
  let internalMapping = {}
  var addField = true
  if (include?.length) {
    addField = include.some(function (val) {
      if (name.startsWith(val)) {
        return true
      }
    })
  } else if (exclude?.length) {
    exclude.some(function (val) {
      if (name.startsWith(val)) {
        addField = false
        return false
      }
    })
  }

  if (addField) {
    var parts = name.replace(/\./g, '.properties.').split('.'),
      p = parts.pop()
    if (value.instance == 'Array') {
      // If value is array then we have to traverse it again for internal schema
      if (value.schema != undefined) {
        internalMapping = getMongoFields(value.schema)
      }
    }
    for (var i = 0, j; context && (j = parts[i]); i++) {
      context = j in context ? context[j] : (context[j] = {})
    }
    if (context && p) {
      if (Object.keys(internalMapping).length) {
        context[p] = { properties: internalMapping }
      } else {
        context[p] = dataTypeMapping[value.instance]
      }
    } else {
      context = {}
    }
  }
  return context
}

const getMongoFields = ({ model, exclude, include }) => {
  let mapping = {}
  model.eachPath(function (path) {
    let options = { name: path, value: model.paths[path], exclude, include }
    if (path !== '_id') createMapping(options, mapping)
  })
  return mapping
}
