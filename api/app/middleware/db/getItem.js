const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param {string} populate - item id
 * @param {string} fields - item id
 */
const getItem = (id = '', model = {}, populate = '', fields = '') => {
  return new Promise((resolve, reject) => {
    if( populate !== '' )
    {
      model.findById(id, async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          // console.log('item', item)
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }).populate( populate, fields)
    }
    else
    {
      model.findById(id, async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      })
    }
    
  })
}

module.exports = { getItem }
