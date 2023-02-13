const User = require('../../../models/user')
const Permission = require('../../../models/permission')
const { itemNotFound, buildErrObject } = require('../../../middleware/utils')

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkRoles = ({ id = '', path = '', method = '', source = 'API' }, next) => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err, userDetails) => {
      try {
        await itemNotFound(err, userDetails, 'USER_NOT_FOUND')

        // console.log(userDetails);
        // console.log(userDetails.role_id);
        if( userDetails.role_id.role === 'su' )
        {
            return resolve(next())
        }
        if( path === 'token' && method === 'GET' )
        {
            return resolve(next())
        }

        Permission.find( { role_id : userDetails.role_id._id }, '-_id -role_id -createdBy -modifiedBy -createdAt -updatedAt', async (err, listAccess) => {
            try {
              // console.log('listAccess', listAccess);
              await itemNotFound(err, listAccess, 'PERMISSIONS_NOT_FOUND')
              
              if (listAccess.find(element => element.page_id.path === path) && listAccess.find(element => element.page_id.method === method) && listAccess.find(element => element.page_id.source === source) ) {
                return resolve(next())
              }
              reject(buildErrObject(401, 'UNAUTHORIZED'))
            } catch (error) {
              reject(error)
            }
        }).populate( 'page_id', 'path method source -_id' )

        // if (roles.indexOf(userDetails.role) > -1) {
        //   return resolve(next())
        // }
        // reject(buildErrObject(401, 'UNAUTHORIZED'))
      } catch (error) {
        reject(error)
      }
    }).populate( 'role_id', 'name role' )
  })
}

module.exports = { checkRoles }
