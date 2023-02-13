const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { getItem } = require('../../middleware/db')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, User, 'role_id createdBy modifiedBy', 'name role descriptions first_degree degree bio first_name middle_name last_name nik user_name email'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUser }
