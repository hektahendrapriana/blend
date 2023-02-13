const Permission = require('../../models/permission')
const { matchedData } = require('express-validator')
const { checkQueryString, getItems, getItemsByRole, getItemsFind } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPermissionsByRole = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItemsByRole(id, Permission, 'role_id page_id createdBy modifiedBy', 'name path method first_name middle_name last_name nik user_name email'))

    // const query = await checkQueryString(req.query)
    // res.status(200).json(await getItemsFind(req, Permission, query, { path: 'role_id page_id createdBy modifiedBy', select: 'name path method first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPermissionsByRole }
