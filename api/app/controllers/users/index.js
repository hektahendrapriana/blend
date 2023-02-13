const { createUser } = require('./createUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getUsers } = require('./getUsers')
const { updateUser } = require('./updateUser')
const { verifyUser } = require('./verifyUser')
const { changePassword } = require('./changePassword')

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  verifyUser,
  changePassword
}
