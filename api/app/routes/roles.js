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
  getAllRoles,
  getRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole
} = require('../controllers/roles')

const {
  validateCreateRole,
  validateGetRole,
  validateUpdateRole,
  validateDeleteRole
} = require('../controllers/roles/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllRoles
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getRoles
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateRole,
  createRole
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetRole,
  getRole
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateRole,
  updateRole
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteRole,
  deleteRole
)

module.exports = router
