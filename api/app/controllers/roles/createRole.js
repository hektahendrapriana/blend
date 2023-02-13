const Role = require('../../models/role')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { roleExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createRole = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    // console.log('req', req);
    const createData = req;
    createData.createdBy = user_id;
    
    // console.log('createData', createData);
    const doesRoleExists = await roleExists(req.role)
    if (!doesRoleExists) {
      res.status(201).json(await createItem(req, Role))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createRole }
