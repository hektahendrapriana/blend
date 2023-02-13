const Product = require('../../models/product')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProducts = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    if( typeof(req.query.brand) !== 'undefined' )
    {
      query.brand = req.query.brand;
    }
    if( typeof(req.query.product_type) !== 'undefined' )
    {
      query.product_type = req.query.product_type;
    }
    res.status(200).json(await getItems(req, Product, query, { path: 'createdBy modifiedBy', select: 'first_name middle_name last_name role nik user_name email' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getProducts }
