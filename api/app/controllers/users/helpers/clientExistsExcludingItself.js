const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} first_name - name of item
 * @param {string} middle_name - name of item
 * @param {string} last_name - name of item
 * @param {string} date_of_birth - name of item
 */
const clientExistsExcludingItself = (id = '', first_name = '', middle_name = '', last_name = '', date_of_birth = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'CLIENT_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { clientExistsExcludingItself }
