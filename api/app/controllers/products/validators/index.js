const { validateCreateProduct } = require('./validateCreateProduct')
const { validateDeleteProduct } = require('./validateDeleteProduct')
const { validateGetProduct } = require('./validateGetProduct')
const { validateGetProductSku } = require('./validateGetProductSku')
const { validateUpdateProduct } = require('./validateUpdateProduct')
const { validateUpdateProductMany } = require('./validateUpdateProductMany')

module.exports = {
  validateCreateProduct,
  validateDeleteProduct,
  validateGetProduct,
  validateGetProductSku,
  validateUpdateProduct,
  validateUpdateProductMany
}
