const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      id_register_pasien: req.id_register_pasien,
      first_name: req.first_name,
      middle_name: req.middle_name,
      last_name: req.last_name,
      user_name: req.user_name,
      role_id: req.role_id,
      gender: req.gender,
      date_of_birth: req.date_of_birth,
      nik: req.nik,
      mobile_phone: req.mobile_phone,
      email: req.email,
      password: req.password,
      pin: req.pin,
      verification: uuid.v4()
    })
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(203, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { registerUser }
