const Purchase = require('../../models/purchase')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { purchaseExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createPurchase = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    
    const doesPurchaseExists = await purchaseExists(createData.path, createData.method, createData.source)
    if (!doesPurchaseExists) {
      res.status(201).json(await createItem(createData, Purchase))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createPurchase }
