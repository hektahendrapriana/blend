const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateActivity = [
  check('module'),
  check('method'),
  check('source'),
  check('target_id'),
  check('access_url'),
  check('lat'),
  check('long'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateActivity }