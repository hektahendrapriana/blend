const Role = require('../../../models/role')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} role - name of item
 */
const roleExistsExcludingItself = (id = '', role = '') => {
  return new Promise((resolve, reject) => {
    Role.findOne(
      {
        role,
        _id: {
          $ne: id
        }
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

module.exports = { roleExistsExcludingItself }
