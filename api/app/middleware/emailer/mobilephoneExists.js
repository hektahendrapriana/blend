const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} mobile_phone - user email
 */
const mobilephoneExists = (mobile_phone = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        mobile_phone
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'MOBILEPHONE_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { mobilephoneExists }
