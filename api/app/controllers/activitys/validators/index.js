const { validateCreateActivity } = require('./validateCreateActivity')
const { validateDeleteActivity } = require('./validateDeleteActivity')
const { validateGetActivity } = require('./validateGetActivity')

module.exports = {
  validateCreateActivity,
  validateDeleteActivity,
  validateGetActivity
}
