export const dataTypeMapping = {
  'String': {
    "type": "text",
    "fields": {
      "keyword": {
        "type": "keyword",
        "ignore_above": 256
      }
    }
  },
  'ObjectID': {
    "type": "text",
    "fields": {
      "keyword": {
        "type": "keyword",
        "ignore_above": 256
      }
    }
  },
  'Number': {"type": "long"},
  'Date': {"type": "date"},
  'Array': {"type": "object"},
  'Boolean': {"type": "boolean"}
};
