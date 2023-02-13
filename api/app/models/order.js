const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrderSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      ref: "Hospital"
    },
    token_id: {
      type: String,
      ref: "Token"
    },
    payment_type: {
      type: String,
      enum: ['BANK TRANSFER', 'CREDIT CARD', 'VIRTUAL ACCOUNT', 'GOPAY', 'OVO', 'DANA'],
      default: 'BANK TRANSFER',
      required: false
    },
    payment_status: {
      type: String,
      enum: ['ORDER', 'CONFIRMATION', 'PAID', 'VOID'],
      default: 'ORDER',
      required: false
    },
    bank_name: {
      type: String
    },
    account_no: {
      type: String
    },
    account_name: {
      type: String
    },
    token: {
      type: Number
    },
    price: {
      type: Number
    },
    uniq_code: {
      type: Number
    },
    total: {
      type: Number
    },
    filename: {
      type: String
    },
    folder: {
        type: String,
        required: false
    },
    upload_file: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    mimetype: {
        type: String,
        required: false
    },
    size: {
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
OrderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Order', OrderSchema)
