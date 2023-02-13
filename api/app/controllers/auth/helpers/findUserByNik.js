const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by nik
 * @param {string} nik - user´s nik
 */
const findUserByNik = (nik = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        nik
      },
      'password loginAttempts blockExpires name nik role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'NIK_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUserByNik }
