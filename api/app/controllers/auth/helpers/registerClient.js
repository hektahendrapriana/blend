const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerClient = (req = {}) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      id_register_pasien: req.body.id_register_pasien,
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      role_id: req.body.role_id,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      mobile_phone: req.body.mobile_phone,
      email: req.body.email,
      pin: req.body.pin,
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

module.exports = { registerClient }
