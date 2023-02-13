const { validateCreatePurchase } = require('./validateCreatePurchase')
const { validateDeletePurchase } = require('./validateDeletePurchase')
const { validateGetPurchase } = require('./validateGetPurchase')
const { validateUpdatePurchase } = require('./validateUpdatePurchase')

module.exports = {
  validateCreatePurchase,
  validateDeletePurchase,
  validateGetPurchase,
  validateUpdatePurchase
}
