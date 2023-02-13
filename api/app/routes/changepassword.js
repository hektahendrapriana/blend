const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization, roleAuth } = require('../controllers/auth')

const { changePassword } = require('../controllers/users')

const {
  validateChangePassword
} = require('../controllers/users/validators')

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateChangePassword,
  changePassword
)

module.exports = router
