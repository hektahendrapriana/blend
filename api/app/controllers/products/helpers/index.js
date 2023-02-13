const { productExists } = require('./productExists')
const { productExistsExcludingItself } = require('./productExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  productExists,
  productExistsExcludingItself,
  getAllItemsFromDB
}
