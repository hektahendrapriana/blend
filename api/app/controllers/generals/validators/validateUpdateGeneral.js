const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateGeneral = [
  check('email'),
  check('latitude'),
  check('longitude'),
  check('name'),
  check('phone_number'),
  check('mobile_phone'),
  check('alamat'),
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

module.exports = { validateUpdateGeneral }
