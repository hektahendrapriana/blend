const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} sku - item id
 */
const getItemBySku = (sku = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne({ sku: sku }, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getItemBySku }
