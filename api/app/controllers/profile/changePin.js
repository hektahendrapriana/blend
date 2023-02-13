const {
  isIDGood,
  handleError,
  buildErrObject
} = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { checkPassword, checkPin } = require('../../middleware/auth')
const { findUser, changePasswordInDB, changePinInDB } = require('./helpers')

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePin = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const user = await findUser(id)
    req = matchedData(req)
    const isPINMatch = await checkPin(req.oldPin, user)
    if (!isPINMatch) {
      return handleError(res, buildErrObject(409, 'WRONG_PIN'))
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePinInDB(id, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { changePin }
