const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BalanceSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      ref: "Hospital"
    },
    order_id: {
      type: String,
      ref: "Order"
    },
    status: {
      type: String,
      enum: ['IN', 'OUT', 'VOID'],
      required: false
    },
    in_token: {
      type: Number
    },
    out_token: {
      type: Number
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
BalanceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Balance', BalanceSchema)
