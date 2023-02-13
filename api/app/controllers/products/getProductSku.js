const { matchedData } = require('express-validator')
const Product = require('../../models/product')
const { getItemBySku } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProductSku = async (req, res) => {
  try {
    const sku = req.params.name
    console.log(sku)
    res.status(200).json(await getItemBySku(sku, Product, 'createdBy modifiedBy', 'first_name middle_name last_name role nik user_name email'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getProductSku }
