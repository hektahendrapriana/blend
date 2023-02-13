const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ZipcodeSchema = new mongoose.Schema(
  {
    provinsi: {
      type: String,
      required: true
    },
    kabupaten: {
      type: String,
      required: true
    },
    kecamatan: {
      type: String,
      required: true
    },
    kelurahan: {
      type: String,
      required: true
    },
    kodepos: {
      type: String,
      required: true
    },
    negara: {
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
ZipcodeSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Zipcode', ZipcodeSchema)
