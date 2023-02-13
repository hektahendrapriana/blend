const { blockIsExpired } = require('./blockIsExpired')
const { buildErrObject } = require('../../../middleware/utils')

/**
 *
 * @param {Object} user - user object.
 */
const checkSendOTPAttempts = (user = {}) => {
  return new Promise((resolve, reject) => {
    user.loginAttempts = 0
      user.save((err, result) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        if (result) {
          return resolve(true)
        }
      })
    resolve(true)
  })
}

module.exports = { checkSendOTPAttempts }
