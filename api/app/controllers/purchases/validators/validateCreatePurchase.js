const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreatePurchase = [
  check('client_id'),
  check('product_id'),
  check('status'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreatePurchase }
