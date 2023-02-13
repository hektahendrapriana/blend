const { blockIsExpired } = require('./blockIsExpired')
const { blockUser } = require('./blockUser')
const {
  checkLoginAttemptsAndBlockExpires
} = require('./checkLoginAttemptsAndBlockExpires')
const { checkPermissions } = require('./checkPermissions')
const { checkRoles } = require('./checkRoles')
const { findForgotPassword } = require('./findForgotPassword')
const { findUser } = require('./findUser')
const { findUserById } = require('./findUserById')
const { findUserByNik } = require('./findUserByNik')
const { findUserToResetPassword } = require('./findUserToResetPassword')
const { findUserToResetPin } = require('./findUserToResetPin')

const { forgotPasswordResponse } = require('./forgotPasswordResponse')
const { generateToken } = require('./generateToken')
const { getUserIdFromToken } = require('./getUserIdFromToken')
const { markResetPasswordAsUsed } = require('./markResetPasswordAsUsed')
const { markResetPinAsUsed } = require('./markResetPinAsUsed')

const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { registerUser } = require('./registerUser')
const { registerClient } = require('./registerClient')
const { returnRegisterToken } = require('./returnRegisterToken')
const { saveForgotPassword } = require('./saveForgotPassword')
const { saveOTP } = require('./saveOTP')
const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const {
  saveUserAccessAndReturnToken
} = require('./saveUserAccessAndReturnToken')
const { setUserInfo } = require('./setUserInfo')
const { updatePassword } = require('./updatePassword')
const { userIsBlocked } = require('./userIsBlocked')
const { userNotVerified } = require('./userNotVerified')
const { verificationExists } = require('./verificationExists')
const { otpExists } = require('./otpExists')
const { verifyUser } = require('./verifyUser')
const { verifyOTPUser } = require('./verifyOTPUser')

module.exports = {
  blockIsExpired,
  blockUser,
  checkLoginAttemptsAndBlockExpires,
  checkPermissions,
  checkRoles,
  findForgotPassword,
  findUser,
  findUserById,
  findUserByNik,
  findUserToResetPassword,
  findUserToResetPin,
  forgotPasswordResponse,
  generateToken,
  getUserIdFromToken,
  markResetPasswordAsUsed,
  markResetPinAsUsed,
  passwordsDoNotMatch,
  registerUser,
  registerClient,
  returnRegisterToken,
  saveForgotPassword,
  saveOTP,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  setUserInfo,
  updatePassword,
  userIsBlocked,
  userNotVerified,
  verificationExists,
  otpExists,
  verifyUser,
  verifyOTPUser
}
