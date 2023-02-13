const Order = require('../../models/order')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOrders = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    
    if( typeof(req.query.client_id) !== 'undefined' )
    {
      query.client_id = req.query.client_id;
    }
    if( typeof(req.query.payment_status) !== 'undefined' )
    {
      query.payment_status = req.query.payment_status;
    }
    res.status(200).json(await getItems(req, Order, query, { path: 'client_id token_id createdBy modifiedBy', select: 'sku name token price first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getOrders }
