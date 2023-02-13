const UserActivity = require('../../../models/userActivity')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    UserActivity.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          createdAt: 1
        }
        
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        resolve(items)
      }
    ).populate('createdBy', 'first_name middle_name last_name nik user_name email')
  })
}

module.exports = { getAllItemsFromDB }
