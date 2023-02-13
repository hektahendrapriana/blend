const { matchedData } = require('express-validator')
const {
  findUser,
  findUserByNik,
  forgotPasswordResponse
} = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { sendResetPasswordEmailMessage } = require('../../middleware/emailer')

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const checkNik = async (req, res) => {
  try {
    const data = matchedData(req)

    res.status(200).json(await findUserByNik(data.nik))
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { checkNik }
