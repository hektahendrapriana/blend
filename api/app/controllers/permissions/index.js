const { createPermission } = require('./createPermission')
const { deletePermission } = require('./deletePermission')
const { getAllPermissions } = require('./getAllPermissions')
const { getPermission } = require('./getPermission')
const { getPermissions } = require('./getPermissions')
const { updatePermission } = require('./updatePermission')
const { getPermissionsByRole } =  require('./getPermissionsByRole')

module.exports = {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermission,
  getPermissions,
  updatePermission,
  getPermissionsByRole
}
