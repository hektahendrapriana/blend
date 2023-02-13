const UserActivity = require('../../models/userActivity')
const { createItem } = require('../../middleware/db')
const { handleError, getIP, getBrowserInfo } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createActivity = async (req, res) => {
  try {
    const browser = getBrowserInfo(req)
    const ip = getIP(req)
    const user_id = req.user._id;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    createData.ip = ip
    createData.browser = browser
    
    res.status(201).json(await createItem(createData, UserActivity))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createActivity }
