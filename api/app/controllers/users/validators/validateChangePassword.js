const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates change password request
 */
const validateChangePassword = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('newPassword')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
    check('confirmNewPassword')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5')
        .custom((value,{req}) => {
            if(value === req.body.newPassword){
                return true;
            }
            return false;
        })
        .withMessage('CONFIRM_NEW_PASSWORD_NOT_MATCH'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateChangePassword }
