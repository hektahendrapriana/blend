const Role = require('../../../models/role')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} role - name of item
 */
const roleExists = (role = '') => {
  return new Promise((resolve, reject) => {
    Role.findOne(
      {
        role
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'ROLE_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { roleExists }
