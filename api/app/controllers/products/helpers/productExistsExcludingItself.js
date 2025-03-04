const Product = require('../../../models/product')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} path - path of item
 * @param {string} method - method of item
 * @param {string} source - source of item
 */
const productExistsExcludingItself = (id = '', path = '', method = '', source = {}) => {
  return new Promise((resolve, reject) => {
    Product.findOne(
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
          return reject(buildErrObject(203, 'Product_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { productExistsExcludingItself }
