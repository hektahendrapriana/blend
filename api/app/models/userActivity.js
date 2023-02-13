const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserActivitySchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: false
    },
    access_url: {
      type: String,
      required: false
    },
    method: {
      type: String,
      required: false
    },
    target_id: {
      type: String,
      required: false
    },
    lat: {
      type: String,
      required: false
    },
    long: {
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
    source: {
      type: String,
      enum: ['API', 'DASHBOARD', 'ADMIN', 'DOKTER', 'PASIEN'],
      default: 'API',
      required: false
    },
    createdBy: {
      type: String,
      ref: "User"
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
UserActivitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('UserActivity', UserActivitySchema)