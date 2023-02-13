const Purchase = require('../../../models/purchase')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Purchase.find(
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
    ).populate('client_id product_id createdBy modifiedBy', 'sku name descriptions price token first_name middle_name last_name nik user_name email')
  })
}

module.exports = { getAllItemsFromDB }
