const Otp = require('../../../models/otp')
const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Checks if verification id exists for user
 * @param {string} id - verification id
 * @param {string} code - verification id
 * @param {string} user_id - verification id
 */
const otpExists = (id = '', code = '', user_id = '') => {
  return new Promise((resolve, reject) => {
    Otp.findOne(
      {
        verification: id,
        code: code,
        user_id: user_id,
        used: false
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND_OR_ALREADY_VERIFIED')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { otpExists }
