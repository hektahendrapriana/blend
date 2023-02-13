const { checkPermissions, checkRoles } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { saveUserActivity } = require('./saveUserActivity')

/**
 * Roles authorization function called by route
 */
const roleAuth = () => async (req, res, next) => {
  try {
    let access_url = req.originalUrl
    let target_id = req.originalUrl.split('/')[3]
    const pathUrl = req.originalUrl.split('/')[2]
    const pathSource = pathUrl.split('?')[0]
    
    req.query.module = pathSource

    req.query.user_id = req.user._id
      
    req.query.method = req.method
    req.query.source = 'API'
    req.query.request_id = target_id
    req.query.access_url = access_url
    if( pathSource !== 'activitys' && pathSource !== 'token' )
    {
      const activity = await saveUserActivity(req)
    }
    
    
    
    
    const data = {
      id: req.user._id,
      path: pathSource,
      method: req.method
    }
    // console.log(data);
    await checkRoles(data, next)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { roleAuth }
