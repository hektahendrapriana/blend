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
  getAllActivitys,
  getActivitys,
  createActivity,
  getActivity,
  deleteActivity
} = require('../controllers/activitys')

const {
  validateCreateActivity,
  validateGetActivity,
  validateDeleteActivity
} = require('../controllers/activitys/validators')


router.get('/all', 
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getAllActivitys
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getActivitys
)

router.post(
  '/',
  requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateCreateActivity,
  createActivity
)

router.get(
  '/:id',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateGetActivity,
  getActivity
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteActivity,
  deleteActivity
)

module.exports = router
