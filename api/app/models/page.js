const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    parent: {
      type: String,
      ref: "Page"
    },
    method: {
      type: String,
      enum: ['GET', 'POST', 'PATCH', 'DELETE'],
      default: 'GET',
      required: true
    },
    source: {
      type: String,
      enum: ['API', 'ADMIN', 'WEBSITE'],
      default: 'API',
      required: false
    },
    createdBy: {
        type: String,
        ref: "User"
    },
    modifiedBy: {
        type: String,
        ref: "User"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
PageSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Page', PageSchema)
