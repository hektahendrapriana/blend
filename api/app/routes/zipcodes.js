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
  getAllZipcodes,
  getZipcodes,
  createZipcode,
  getZipcode,
  updateZipcode,
  deleteZipcode
} = require('../controllers/zipcodes')

const {
  validateCreateZipcode,
  validateGetZipcode,
  validateUpdateZipcode,
  validateDeleteZipcode
} = require('../controllers/zipcodes/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllZipcodes
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getZipcodes
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateZipcode,
  createZipcode
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetZipcode,
  getZipcode
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateZipcode,
  updateZipcode
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteZipcode,
  deleteZipcode
)

module.exports = router
