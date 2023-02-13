const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { emailExistsExcludingMyself } = require('../../middleware/emailer')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verifyUser = async (req, res) => {
  try {
    req = matchedData(req)
    console.log(req);
    const id = await isIDGood(req.id)
    res.status(200).json(await updateItem(id, User, req))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verifyUser }
