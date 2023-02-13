const { validateCreatePermission } = require('./validateCreatePermission')
const { validateDeletePermission } = require('./validateDeletePermission')
const { validateGetPermission } = require('./validateGetPermission')
const { validateUpdatePermission } = require('./validateUpdatePermission')

module.exports = {
  validateCreatePermission,
  validateDeletePermission,
  validateGetPermission,
  validateUpdatePermission
}
