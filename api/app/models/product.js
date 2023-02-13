const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    product_price: {
      type: String,
      required: true
    },
    product_type: {
      type: String,
      enum: ['IPHONE', 'IPAD', 'MAC', 'WATCH', 'ACCESORIES', 'TV'],
      default: 'IPHONE',
      required: true
    },
    brand: {
      type: String,
      required: false
    },
    product_image_url: {
      type: String,
      required: false
    },
    product_info: {
      type: String,
      required: false
    },
    real_pdp_url: {
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
ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema)
