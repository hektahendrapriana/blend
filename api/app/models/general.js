const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const GeneralSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      ref: 'Hospital'
    },
    name: {
      type: String,
      required: true
    },
    alamat: {
      type: String,
      required: false
    },
    phone_number: {
      type: String,
      required: false
    },
    mobile_phone: {
      type: String,
      required: false
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: false
    },
    latitude: {
      type: String,
      required: false
    },
    longitude: {
      type: String,
      required: false
    },
    radius: {
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
GeneralSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('General', GeneralSchema)
