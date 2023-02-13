const { buildErrObject } = require('../utils')

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {string} pin - pin
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPasswordOrPin = (password = '', pin = '', user = {}) => {

    const passOrpin = 
    password.length > 0
    ? password : pin;

    return new Promise((resolve, reject) => {
        if(password.length > 0  )
        {
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return reject(buildErrObject(203, err.message))
                }
                if (!isMatch) {
                    resolve(false)
                }
                resolve(true)
            })
        }
        else
        {
            user.comparePin(pin, (err, isMatch) => {
                if (err) {
                    return reject(buildErrObject(203, err.message))
                }
                if (!isMatch) {
                    resolve(false)
                }
                resolve(true)
            })
        }
        
    })
}

module.exports = { checkPasswordOrPin }
