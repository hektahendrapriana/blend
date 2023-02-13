const { matchedData } = require('express-validator')

const { registerClient, setUserInfo, returnRegisterToken, saveOTP } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const {
  emailExists,
  mobilephoneExists,
  nikExists,
  usernameExists,
  sendRegistrationPasienMessage,
  sendRegistrationEmailMessage,
  sendEmail
} = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const registerPasien = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    // req = matchedData(req)
    const doesEmailExists = await emailExists(req.body.email)
    const doesMobilephoneExists = await mobilephoneExists(req.body.mobile_phone)
    if (!doesEmailExists && !doesMobilephoneExists) {
      const item = await registerClient(req)
      const userInfo = await setUserInfo(item)
      const otpResp = await saveOTP(req, userInfo)
      item.otp = otpResp;
      const response = await returnRegisterToken(item, userInfo, otpResp)
      sendRegistrationPasienMessage(locale, item)
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { registerPasien }
