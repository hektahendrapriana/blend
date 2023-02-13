const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PurchaseSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      ref: "Hospital"
    },
    product_id: {
      type: String,
      ref: "Product"
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Deactive',
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
PurchaseSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Purchase', PurchaseSchema)
