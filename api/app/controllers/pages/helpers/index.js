const { pageExists } = require('./pageExists')
const { pageExistsExcludingItself } = require('./pageExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  pageExists,
  pageExistsExcludingItself,
  getAllItemsFromDB
}
