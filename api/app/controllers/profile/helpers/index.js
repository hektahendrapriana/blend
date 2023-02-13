const { changePasswordInDB } = require('./changePasswordInDB')
const { changePinInDB } = require('./changePinInDB')
const { findUser } = require('./findUser')
const { getProfileFromDB } = require('./getProfileFromDB')
const { updateProfileInDB } = require('./updateProfileInDB')

module.exports = {
  changePasswordInDB,
  changePinInDB,
  findUser,
  getProfileFromDB,
  updateProfileInDB
}
