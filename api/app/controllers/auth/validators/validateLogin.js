const { validateResult } = require('../../../middleware/utils')
const { check, oneOf } = require('express-validator')

/**
 * Validates login request
 */
const validateLogin = [
  oneOf([
    check('email')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY')
      .isEmail()
      .withMessage('EMAIL_IS_NOT_VALID'),
    check('nik')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
    check('user_name')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
    check('mobile_phone')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
]),
oneOf([
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('pin')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 4
    })
    .withMessage('PIN_TOO_SHORT_MIN_4'),
]),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLogin }
