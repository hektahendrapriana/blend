const User = require('../../../models/user')
const {
  itemNotFound,
  buildErrObject,
  buildSuccObject
} = require('../../../middleware/utils')

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePinInDB = (id = '', req = {}) => {
  return new Promise((resolve, reject) => {
    User.findById(id, '+pin', async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')

        // Assigns new password to user
        user.pin = req.newPin

        // Saves in DB
        user.save((error) => {
          if (err) {
            return reject(buildErrObject(203, error.message))
          }
          resolve(buildSuccObject('PASSWORD_CHANGED'))
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { changePinInDB }
