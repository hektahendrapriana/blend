const Page = require('../../models/page')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPages = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Page, query, { path: 'createdBy modifiedBy', select: 'first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPages }
