const { buildErrObject } = require('../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 * @param {Object} otp - user object
 */
const verifyOTPUser = (user = {}, otp = {}) => {
  return new Promise((resolve, reject) => {
    user.verified = true
    user.save((err, item) => {
      if (err) {
        return reject(buildErrObject(203, err.message))
      }
      otp.used = true
      otp.save()
      
      resolve({
        email: item.email,
        verified: item.verified
      })
    })
  })
}

module.exports = { verifyOTPUser }
