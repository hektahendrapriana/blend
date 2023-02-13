const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} user_name - name of item
 */
const userExistsExcludingItself = (id = '', user_name = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        user_name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'EMAIL_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { userExistsExcludingItself }
