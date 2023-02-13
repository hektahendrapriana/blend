const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userNotVerified = (user = {}) => {
  return new Promise((resolve, reject) => {
    if (user.verified === false) {
      return reject(buildErrObject(409, 'UNVERIFIED_USER'))
    }
    resolve(true)
  })
}

module.exports = { userNotVerified }
