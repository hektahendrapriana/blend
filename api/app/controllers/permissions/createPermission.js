const Permission = require('../../models/permission')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { permissionExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createPermission = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    // console.log('req', req);
    const createData = req;
    createData.createdBy = user_id;
    
    // console.log('createData', createData);
    const doesPermissionExists = await permissionExists(req.role_id, req.page_id)
    if (!doesPermissionExists) {
      res.status(201).json(await createItem(req, Permission))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createPermission }
