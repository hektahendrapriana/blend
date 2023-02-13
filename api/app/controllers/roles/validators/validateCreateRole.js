const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateRole = [
  check('name'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('descriptions'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateRole }
