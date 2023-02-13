const { createProduct } = require('./createProduct')
const { deleteProduct } = require('./deleteProduct')
const { getAllProducts } = require('./getAllProducts')
const { getProductSku } = require('./getProductSku')
const { getProduct } = require('./getProduct')
const { getProducts } = require('./getProducts')
const { getBrands } = require('./getBrands')
const { getTypes } = require('./getTypes')
const { updateProduct } = require('./updateProduct')
const { updateMany } = require('./updateMany')

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductSku,
  getProduct,
  getProducts,
  getBrands,
  getTypes,
  updateProduct,
  updateMany
}
