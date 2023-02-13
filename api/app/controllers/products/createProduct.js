const Product = require('../../models/product')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { productExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createProduct = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    
    const doesProductExists = await productExists(createData.path, createData.method, createData.source)
    if (!doesProductExists) {
      res.status(201).json(await createItem(createData, Product))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createProduct }
