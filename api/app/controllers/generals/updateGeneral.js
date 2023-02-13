const General = require('../../models/general')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateGeneral = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    const doesRoleExists = await roleExistsExcludingItself(id, req.role)
    if (!doesRoleExists) {
      res.status(200).json(await updateItem(id, Role, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateGeneral }
