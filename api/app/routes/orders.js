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
  getAllOrders,
  getOrders,
  downloadBukti,
  createOrder,
  getOrder,
  updateOrder,
  updateStatus,
  uploadBukti,
  deleteOrder
} = require('../controllers/orders')

const {
  validateCreateOrder,
  validateGetOrder,
  validateUpdateOrder,
  validateUpdateStatus,
  validateUploadBukti,
  validateDeleteOrder
} = require('../controllers/orders/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllOrders
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getOrders
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateOrder,
  createOrder
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetOrder,
  getOrder
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateOrder,
  updateOrder
)


router.patch(
  '/updatestatus/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateStatus,
  updateStatus
)

router.patch(
  '/uploadbukti/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUploadBukti,
  uploadBukti
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteOrder,
  deleteOrder
)

router.get(
  '/:name',
  requireAuth,
  trimRequest.all,
  downloadBukti
)

module.exports = router
