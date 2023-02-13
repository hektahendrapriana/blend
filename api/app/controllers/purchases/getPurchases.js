const Purchase = require('../../models/purchase')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPurchases = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)

    if( typeof(req.query.status) !== 'undefined' )
    {
      query.status = req.query.status;
    }
    if( typeof(req.query.client_id) !== 'undefined' )
    {
      query.client_id = req.query.client_id;
    }
    res.status(200).json(await getItems(req, Purchase, query, { path: 'client_id product_id createdBy modifiedBy', select: 'sku name token price first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPurchases }
