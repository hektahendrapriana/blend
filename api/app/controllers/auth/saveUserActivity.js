const UserActivity = require('../../models/userActivity')
const { setUserInfo } = require('./helpers/setUserInfo')
const {
  getIP,
  getBrowserInfo,
  buildErrObject
} = require('../../middleware/utils')
const axios = require('axios');
/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 */
const saveUserActivity = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    
    await axios.get(`https://api.geoiplookup.net/?query=${getIP(req)}&json=true`, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    }).then(function (response) {
      let lat = '';
      let long = '';
      if( response.data.error !== undefined || !response.data.error || typeof(response.data.error) !== undefined  || !typeof(response.data.error))
      {
        lat = response.data.latitude;
        long = response.data.longitude;
      }
      const userActivity = new UserActivity({
        access_url: req.query.access_url,
        createdBy: req.query.user_id,
        module: req.query.module,
        method: req.query.method,
        source: req.query.source,
        target_id: req.query.request_id,
        lat: lat,
        long: long,
        ip: getIP(req),
        browser: getBrowserInfo(req),
      })
      userActivity.save(async (err) => {
        try {
          if (err) {
            return reject(buildErrObject(203, err.message))
          }
          let data = {
            activity: userActivity
          }
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    })
    
  })
}

module.exports = { saveUserActivity }
