const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} user_name - user user_name
 */
const usernameExists = (user_name = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        user_name
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'USERNAME_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { usernameExists }
