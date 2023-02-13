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
  getAllPages,
  getPages,
  createPage,
  getPage,
  updatePage,
  deletePage
} = require('../controllers/pages')

const {
  validateCreatePage,
  validateGetPage,
  validateUpdatePage,
  validateDeletePage
} = require('../controllers/pages/validators')


router.get('/all', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getAllPages
)

router.get(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  getPages
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreatePage,
  createPage
)

router.get(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateGetPage,
  getPage
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdatePage,
  updatePage
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeletePage,
  deletePage
)

module.exports = router
