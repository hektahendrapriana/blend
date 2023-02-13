const { matchedData } = require('express-validator')
const {
  findUser,
  findUserById,
  userIsBlocked,
  userNotVerified,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { checkPasswordOrPin } = require('../../middleware/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.email, data.nik, data.user_name, data.mobile_phone)
    
    await userIsBlocked(user)
    await checkLoginAttemptsAndBlockExpires(user)
    await userNotVerified(user)
    const isPasswordMatch = await checkPasswordOrPin(data.password, data.pin, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      user.loginAttempts = 0
      await saveLoginAttemptsToDB(user)
      const userDetails = await findUserById(user._id)
      res.status(200).json(await saveUserAccessAndReturnToken(req, userDetails))
    }
  } catch (error) {
    res.status(200).json(error)
    // handleError(res, error)
  }
}

module.exports = { login }
