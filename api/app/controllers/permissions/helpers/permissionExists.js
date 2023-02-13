const Permission = require('../../../models/permission')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} role_id - path of item
 * @param {string} page_id - method of item
 */
const permissionExists = (role_id = '', page_id = '' ) => {
  return new Promise((resolve, reject) => {
    Permission.findOne(
      {
        role_id, page_id
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'PERMISSION_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { permissionExists }
