const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} nik - user nik
 */
const nikExists = (nik = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        nik
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'NIK_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { nikExists }
