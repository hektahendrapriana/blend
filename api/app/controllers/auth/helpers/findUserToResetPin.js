const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by mobile_phone to reset password
 * @param {string} mobile_phone - user mobile_phone
 */
const findUserToResetPin = (mobile_phone = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        mobile_phone
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUserToResetPin }
