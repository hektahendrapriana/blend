const Order = require('../../../models/order')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} path - path of item
 * @param {string} method - method of item
 * @param {string} source - source of item
 */
const orderExistsExcludingItself = (id = '', path = '', method = '', source = {}) => {
  return new Promise((resolve, reject) => {
    Order.findOne(
      {
        path,
        method,
        source,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'Order_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { orderExistsExcludingItself }
