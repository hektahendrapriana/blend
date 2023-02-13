const { validateCreateCountry } = require('./validateCreateCountry')
const { validateDeleteCountry } = require('./validateDeleteCountry')
const { validateGetCountry } = require('./validateGetCountry')
const { validateUpdateCountry } = require('./validateUpdateCountry')

module.exports = {
  validateCreateCountry,
  validateDeleteCountry,
  validateGetCountry,
  validateUpdateCountry
}
