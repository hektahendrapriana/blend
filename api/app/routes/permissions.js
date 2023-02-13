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
  getAllPermissions,
  getPermissions,
  createPermission,
  getPermission,
  updatePermission,
  deletePermission
} = require('../controllers/permissions')

const {
  validateCreatePermission,
  validateGetPermission,
  validateUpdatePermission,
  validateDeletePermission
} = require('../controllers/permissions/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllPermissions
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getPermissions
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreatePermission,
  createPermission
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetPermission,
  getPermission
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdatePermission,
  updatePermission
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeletePermission,
  deletePermission
)

module.exports = router
