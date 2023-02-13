const { matchedData } = require('express-validator')
const { verificationExists, otpExists, verifyOTPUser } = require('./helpers')

const { handleError } = require('../../middleware/utils')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verifyOtp = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await verificationExists(req.id)
    const otp = await otpExists(req.id, req.code, req.user_id)
    res.status(200).json(await verifyOTPUser(user, otp))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verifyOtp }
