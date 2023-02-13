const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateOrder = [
  check('token_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('payment_type'),
  check('clint_id'),
  check('payment_status'),
  check('bank_name'),
  check('account_no'),
  check('account_name'),
  check('token'),
  check('price'),
  check('uniq_code'),
  check('total'),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateOrder }
