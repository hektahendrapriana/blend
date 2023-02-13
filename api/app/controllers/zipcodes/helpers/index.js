const { zipcodeExists } = require('./zipcodeExists')
const { zipcodeExistsExcludingItself } = require('./zipcodeExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  zipcodeExists,
  zipcodeExistsExcludingItself,
  getAllItemsFromDB
}
