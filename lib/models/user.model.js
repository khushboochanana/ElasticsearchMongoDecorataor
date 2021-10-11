import mongoose, { model } from 'mongoose'
const { ElasticIndex } = require('../../elasticSearch/elasticSearch.decorator')

const crypto = require('crypto')
const extendSchema = (Schema, definition, options) =>
  new mongoose.Schema(Object.assign({}, Schema.obj, definition), options)

let UserSchema = extendSchema(
  {},
  {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    name: {
      first: String,
      last: String,
      full: String
    },
    password: String,
    activate: Boolean,
    location: {
      living: {
        loc: {
          type: { type: String, default: 'Point' },
          coordinates: Array // lng, lat
        },
        geoId: String,
        name: String,
        countryCode: String
      },
      current: {
        loc: {
          type: { type: String, default: 'Point' },
          coordinates: Array // lng, lat
        },
        geoId: String,
        name: String,
        countryCode: String
      }
    }
  }
)

UserSchema.pre('save', function () {
  if (!this.name.full) {
    this.name.full = this.name.first
    if (this.name.last) {
      this.name.full = `${this.name.first} ${this.name.last}`
    }
  }
})

let elasticConfig = {
  model: UserSchema, //Mandatory
  name: 'user', // Mandatory
  exclude: ['location.living.geoId'], //optional
  include: ['name.first', 'name.last', 'email', 'activate', 'dateCreated'], //optional
  mappings: {},
  settings: {}
}

@ElasticIndex(elasticConfig) // To create  Elastic Index with default mapping
class userSchemaMethod {
  getSalt () {
    return '{' + (this.oldId || '') + '}'
  }

  encryptPassword (plainPassword) {
    return crypto
      .createHash('md5')
      .update(plainPassword + this.getSalt())
      .digest('hex')
      .toString()
  }

  authenticate (plainPassword) {
    return this.encryptPassword(plainPassword) === this.password
  }
}

UserSchema.loadClass(userSchemaMethod)
UserSchema.index({ name: 1 })
UserSchema.index({ email: 1, password: 1 })

let UserModel = null

try {
  UserModel = model('User', UserSchema)
} catch (e) {
  UserModel = model('User')
}

export default UserModel
