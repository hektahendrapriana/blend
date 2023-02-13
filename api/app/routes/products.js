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
  getAllProducts,
  getProducts,
  createProduct,
  getProductSku,
  getProduct,
  getBrands,
  getTypes,
  updateProduct,
  updateMany,
  deleteProduct
} = require('../controllers/products')

const {
  validateCreateProduct,
  validateGetProductSku,
  validateGetProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateUpdateProductMany
} = require('../controllers/products/validators')

router.get('/all', 
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getAllProducts
)

router.get('/brands', 
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getBrands
)

router.get('/types', 
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getTypes
)

router.get('/updatemany', 
  requireAuth,
  roleAuth(),
  trimRequest.all,
  updateMany
)

router.get(
  '/',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  getProducts
)

router.post(
  '/',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateCreateProduct,
  createProduct
)

router.get(
  '/:id',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  validateGetProduct,
  getProduct
)

router.get(
  '/details/:name',
  // requireAuth,
  // roleAuth(),
  trimRequest.all,
  // validateGetProductSku,
  getProductSku
)

router.patch(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateUpdateProduct,
  updateProduct
)

router.delete(
  '/:id',
  requireAuth,
  roleAuth(),
  trimRequest.all,
  validateDeleteProduct,
  deleteProduct
)

module.exports = router
