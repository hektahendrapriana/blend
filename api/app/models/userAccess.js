const mongoose = require('mongoose')
const validator = require('validator')

const UserAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: false
    },
    nik: {
      type: String,
      required: false
    },
    user_name: {
      type: String,
      required: false
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
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
module.exports = mongoose.model('UserAccess', UserAccessSchema)
