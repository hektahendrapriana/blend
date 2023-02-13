const { matchedData } = require('express-validator')
const Country = require('../../models/country')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCountry = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Country, 'createdBy modifiedBy', 'first_name middle_name last_name nik user_name email'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getCountry }
