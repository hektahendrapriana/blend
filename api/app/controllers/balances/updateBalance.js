const Balance = require('../../models/balance')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { balanceExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBalance = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    const doesBalanceExists = await balanceExistsExcludingItself(id, updateData.path, updateData.method, updateData.source)
    if (!doesBalanceExists) {
      res.status(200).json(await updateItem(id, Balance, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateBalance }
