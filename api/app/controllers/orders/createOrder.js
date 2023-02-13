const Order = require('../../models/order')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { orderExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createOrder = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    
    const doesOrderExists = await orderExists(createData.path, createData.method, createData.source)
    if (!doesOrderExists) {
      res.status(201).json(await createItem(createData, Order))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createOrder }
