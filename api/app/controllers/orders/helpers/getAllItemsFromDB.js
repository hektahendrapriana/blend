const Order = require('../../../models/order')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Order.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          path: 1
        }
        
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        resolve(items)
      }
    ).populate('client_id token_id createdBy modifiedBy', 'name sku descriptions price token first_name middle_name last_name nik user_name email')
  })
}

module.exports = { getAllItemsFromDB }
