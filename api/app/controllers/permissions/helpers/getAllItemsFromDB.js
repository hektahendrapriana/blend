const Permission = require('../../../models/permission')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Permission.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          role_id: 1
        }
        
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        resolve(items)
      }
    ).populate('role_id, page_id createdBy modifiedBy', 'name path method first_name middle_name last_name nik user_name email')
  })
}

module.exports = { getAllItemsFromDB }
