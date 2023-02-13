const User = require('../../../models/user')
const Permission = require('../../../models/permission')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = (userId = '') => {
  return new Promise((resolve, reject) => {
    User.findById(userId, async (err, item) => {
      try {
        await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
        item.permissions = [];
        const role = item.role_id.role
        const role_id = item.role_id._id
        // console.log('role', role)
        // console.log('role_id', role_id)
        if( role!== 'su' )
        {
          Permission.find({ role_id: role_id }, '-role_id -createdBy -createdAt -updatedAt -modifiedBy -_id', async (err, accessLists) => {
            try {
              await itemNotFound(err, accessLists, 'PERMISSION_DOES_NOT_EXIST')
              
              item.permissions = accessLists;
              // console.log(item)
              resolve(item)
            } catch (error) {
              reject(error)
            }
          }).populate('page_id', 'name path method source')
        }
        else{
          resolve(item)
        }
        
        

        // resolve(item)
      } catch (error) {
        reject(error)
      }
    }).populate('role_id', 'name role')
  })
}

module.exports = { findUserById }
