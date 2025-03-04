const { matchedData } = require('express-validator')
const Page = require('../../models/page')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPage = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Page, 'createdBy modifiedBy', 'first_name middle_name last_name role nik user_name email'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPage }
