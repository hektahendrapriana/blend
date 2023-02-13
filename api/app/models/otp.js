const mongoose = require('mongoose')
const validator = require('validator')

const OtpSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User"
    },
    mobile_phone: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    verification: {
      type: String
    },
    used: {
      type: Boolean,
      default: false
    },
    ipRequest: {
      type: String
    },
    browserRequest: {
      type: String
    },
    ipChanged: {
      type: String
    },
    browserChanged: {
      type: String
    },
    sendingAttempts: {
      type: Number,
      default: 1
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Otp', OtpSchema)
