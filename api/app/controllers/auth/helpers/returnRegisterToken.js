const { generateToken } = require('./generateToken')

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 * @param {Object} otpInfo - user object
 */
const returnRegisterToken = (
  { _id = '', verification = '' },
  userInfo = {}, 
  otpInfo = {}
) => {
  return new Promise((resolve) => {
    userInfo.verification = verification
    const data = {
      token: generateToken(_id),
      user: userInfo,
      otp: otpInfo
    }
    resolve(data)
  })
}

module.exports = { returnRegisterToken }
