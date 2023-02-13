const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    descriptions: {
      type: String,
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
RoleSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Role', RoleSchema)
