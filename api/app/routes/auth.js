const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  register,
  registerPasien,
  verify,
  verifyOtp,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  login,
  checkNik,
  roleAuthorization, roleAuth
} = require('../controllers/auth')

const {
  validateRegister,
  validateRegisterPasien,
  validateVerify,
  validateCheckNik,
  validateVerifyOTP,
  validateForgotPassword,
  validateResetPassword,
  validateLogin
} = require('../controllers/auth/validators')


router.post('/register', trimRequest.all, validateRegister, register)
router.post('/registerpasien', trimRequest.all, validateRegisterPasien, registerPasien)


router.post('/verify', trimRequest.all, validateVerify, verify)

router.post('/checknik', trimRequest.all, validateCheckNik, checkNik)

router.post('/verifyotp', trimRequest.all, validateVerifyOTP, verifyOtp)

router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

router.get(
  '/verify/:id',
  trimRequest.all,
  validateVerify,
  verify
)

router.get(
  '/token',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getRefreshToken
)

router.post('/login', trimRequest.all, validateLogin, login)

module.exports = router
