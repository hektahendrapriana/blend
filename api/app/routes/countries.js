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
  getAllCountrys,
  getCountrys,
  createCountry,
  getCountry,
  updateCountry,
  deleteCountry
} = require('../controllers/countrys')

const {
  validateCreateCountry,
  validateGetCountry,
  validateUpdateCountry,
  validateDeleteCountry
} = require('../controllers/countrys/validators')


router.get('/all', 
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getAllCountrys
)

router.get(
  '/',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getCountrys
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateCountry,
  createCountry
)

router.get(
  '/:id',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateGetCountry,
  getCountry
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateCountry,
  updateCountry
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteCountry,
  deleteCountry
)

module.exports = router
