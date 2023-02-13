const Balance = require('../../models/balance')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBalances = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    if( typeof(req.query.client_id) !== 'undefined' )
    {
      query.client_id = req.query.client_id;
    }
    if( typeof(req.query.status) !== 'undefined' )
    {
      query.status = req.query.status;
    }
    res.status(200).json(await getItems(req, Balance, query, { path: 'token_id createdBy modifiedBy', select: 'sku name token price first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBalances }
