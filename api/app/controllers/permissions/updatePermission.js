const Permission = require('../../models/permission')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { permissionExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updatePermission = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    const doesPermissionExists = await permissionExistsExcludingItself(id, req.role_id, req.page_id)
    if (!doesPermissionExists) {
      res.status(200).json(await updateItem(id, Permission, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updatePermission }
