const { matchedData } = require('express-validator')
const Balance = require('../../models/balance')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBalance = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Balance, 'token_id createdBy modifiedBy', 'sku name token price first_name middle_name last_name role nik user_name email'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBalance }
