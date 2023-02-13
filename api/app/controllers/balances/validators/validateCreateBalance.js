const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateBalance = [
  check('client_id'),
  check('order_id'),
  check('status'),
  check('in_token'),
  check('out_token'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateBalance }
