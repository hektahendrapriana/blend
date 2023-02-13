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
  getAllPurchases,
  getPurchases,
  createPurchase,
  getPurchase,
  updatePurchase,
  deletePurchase
} = require('../controllers/purchases')

const {
  validateCreatePurchase,
  validateGetPurchase,
  validateUpdatePurchase,
  validateDeletePurchase
} = require('../controllers/purchases/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllPurchases
)

router.get(
  '/',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getPurchases
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreatePurchase,
  createPurchase
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetPurchase,
  getPurchase
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdatePurchase,
  updatePurchase
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeletePurchase,
  deletePurchase
)

module.exports = router
