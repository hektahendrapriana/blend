const Order = require('../../models/order')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { OrderExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateStatus = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    res.status(200).json(await updateItem(id, Order, updateData))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateStatus }
