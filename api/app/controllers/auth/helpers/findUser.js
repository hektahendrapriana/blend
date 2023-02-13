const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 * @param {string} nik - user´s nik
 * @param {string} user_name - user´s user_name
 * @param {string} mobile_phone - user´s mobile_phone
 */
const findUser = (email = '', nik = '', user_name = '', mobile_phone = '') => {
  const nikOrEmailorUsernameorMobile = {};
  if( nik.length > 0 )
  {
    nikOrEmailorUsernameorMobile.nik = nik
  }
  else if( email.length > 0 )
  {
    nikOrEmailorUsernameorMobile.email = email
  }
  else if( user_name.length > 0 )
  {
    nikOrEmailorUsernameorMobile.user_name = user_name
  }
  else if( mobile_phone.length > 0 )
  {
    nikOrEmailorUsernameorMobile.mobile_phone = mobile_phone
  }
  console.log(nikOrEmailorUsernameorMobile)
  return new Promise((resolve, reject) => {
    User.findOne(
      nikOrEmailorUsernameorMobile,
      'password loginAttempts blockExpires first_degree degree bio first_name middle_name last_name gender id_register_pasien email mobile_phone pin role_id verified verification client_id',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUser }
