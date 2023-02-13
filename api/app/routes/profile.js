const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization, roleAuth } = require('../controllers/auth')

const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/profile')

const {
  validateUpdateProfile,
  validateChangePassword
} = require('../controllers/profile/validators')


router.get(
  '/',
  requireAuth,
  // roleAuth(),
  trimRequest.all,
  getProfile
)

router.patch(
  '/',
  requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateUpdateProfile,
  updateProfile
)

router.post(
  '/changepassword',
  requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateChangePassword,
  changePassword
)

module.exports = router
