const Balance = require('../../models/balance')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { balanceExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBalance = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    
    const doesBalanceExists = await balanceExists(createData.path, createData.method, createData.source)
    if (!doesBalanceExists) {
      res.status(201).json(await createItem(createData, Balance))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createBalance }
