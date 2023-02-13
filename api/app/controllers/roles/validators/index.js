const { validateCreateRole } = require('./validateCreateRole')
const { validateDeleteRole } = require('./validateDeleteRole')
const { validateGetRole } = require('./validateGetRole')
const { validateUpdateRole } = require('./validateUpdateRole')

module.exports = {
  validateCreateRole,
  validateDeleteRole,
  validateGetRole,
  validateUpdateRole
}
