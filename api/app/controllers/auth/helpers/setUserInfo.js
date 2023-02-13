/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      first_degree: req.first_degree,
      degree: req.degree,
      first_name: req.first_name,
      middle_name: req.middle_name,
      last_name: req.last_name,
      user_name: req.user_name,
      gender: req.gender,
      date_of_birth: req.date_of_birth,
      nik: req.nik,
      mobile_phone: req.mobile_phone,
      email: req.email,
      role_id: req.role_id,
      verified: req.verified,
      permissions:req.permissions,
      allow_remote:req.allow_remote,
      client_id:req.client_id
    }
    // Adds verification for testing purposes
    user = {
      ...user,
      verification: req.verification
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
