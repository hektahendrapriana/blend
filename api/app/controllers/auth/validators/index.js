const { validateForgotPassword } = require('./validateForgotPassword')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateRegisterPasien } = require('./validateRegisterPasien')
const { validateResetPassword } = require('./validateResetPassword')
const { validateVerify } = require('./validateVerify')
const { validateVerifyOTP } = require('./validateVerifyOTP')
const { validateCheckNik } = require('./validateCheckNik')

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateRegisterPasien,
  validateResetPassword,
  validateVerify,
  validateVerifyOTP,
  validateCheckNik
}
