const { itemNotFound } = require('../utils')

/**
 * Gets item from database by id
 * @param {string} populate - item id
 */
const getGeneralDb = (model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne( async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
    })
    
  })
}

module.exports = { getGeneralDb }
