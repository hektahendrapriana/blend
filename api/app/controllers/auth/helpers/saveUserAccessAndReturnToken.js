const UserAccess = require('../../../models/userAccess')
const { setUserInfo } = require('./setUserInfo')
const { generateToken } = require('./generateToken')
const {
  getIP,
  getBrowserInfo,
  getCountry,
  buildErrObject
} = require('../../../middleware/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = (req = {}, user = {}) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      nik: user.nik,
      user_name: user.user_name,
      ip: getIP(req),
      browser: getBrowserInfo(req),
      country: getCountry(req)
    })
    userAccess.save(async (err) => {
      try {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        const userInfo = await setUserInfo(user)
        // Returns data with access token
        let data = {
          token: generateToken(user._id),
          user: userInfo
        }
        data.user.token = generateToken(user._id);
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { saveUserAccessAndReturnToken }
