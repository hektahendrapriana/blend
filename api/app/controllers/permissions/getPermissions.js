const Permission = require('../../models/permission')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPermissions = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)

    if( typeof(req.query.role_id) !== 'undefined' )
    {
      query.role_id = req.query.role_id;
    }
    res.status(200).json(await getItems(req, Permission, query, { path: 'role_id page_id createdBy modifiedBy', select: 'name role name path method source first_name middle_name last_name nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPermissions }
