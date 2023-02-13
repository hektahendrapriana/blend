const Purchase = require('../../models/purchase')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { purchaseExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updatePurchase = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    const doesPurchaseExists = await purchaseExistsExcludingItself(id, updateData.path, updateData.method, updateData.source)
    if (!doesPurchaseExists) {
      res.status(200).json(await updateItem(id, Purchase, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updatePurchase }
