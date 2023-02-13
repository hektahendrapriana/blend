const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
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
CountrySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Country', CountrySchema)
