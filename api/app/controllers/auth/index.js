const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { register } = require('./register')
const { registerPasien } = require('./registerPasien')
const { resetPassword } = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { roleAuth } = require('./roleAuth')
const { verify } = require('./verify')
const { verifyOtp } = require('./verifyOtp')
const { saveUserActivity } = require('./saveUserActivity')
const { checkNik } = require('./checkNik')

module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  register,
  registerPasien,
  resetPassword,
  roleAuthorization,
  roleAuth,
  verify,
  verifyOtp,
  saveUserActivity,
  checkNik
}
