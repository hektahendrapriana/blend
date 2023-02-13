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
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  verifyUser
} = require('../controllers/users')

const {
  validateCreateUser,
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser,
  validateVerifyUser
} = require('../controllers/users/validators')


router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getUsers
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateUser,
  createUser
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetUser,
  getUser
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateUser,
  updateUser
)

router.patch(
  '/verify/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateVerifyUser,
  verifyUser
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteUser,
  deleteUser
)

module.exports = router
