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
  getAllBalances,
  getBalances,
  createBalance,
  getBalance,
  getInBalance,
  getOutBalance,
  updateBalance,
  deleteBalance
} = require('../controllers/balances')

const {
  validateCreateBalance,
  validateGetBalance,
  validateUpdateBalance,
  validateDeleteBalance
} = require('../controllers/balances/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllBalances
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getBalances
)

router.get(
  '/in',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getInBalance
)
router.get(
  '/out',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getOutBalance
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateBalance,
  createBalance
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetBalance,
  getBalance
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateBalance,
  updateBalance
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteBalance,
  deleteBalance
)

module.exports = router
