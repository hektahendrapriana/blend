const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateVerifyUser = [
  check('verified'),
  check('blockExpires'),
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

module.exports = { validateVerifyUser }
