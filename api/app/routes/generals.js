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
  getGeneral,
  updateGeneral
} = require('../controllers/generals')

const {
  validateGetGeneral,
  validateUpdateGeneral
} = require('../controllers/generals/validators')


router.get(
  '/',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getGeneral
)

router.patch(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateGeneral,
  updateGeneral
)


module.exports = router
