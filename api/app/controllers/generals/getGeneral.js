const { matchedData } = require('express-validator')
const General = require('../../models/general')
const { getGeneralDb } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getGeneral = async (req, res) => {
  try {
    req = matchedData(req)
    res.status(200).json(await getGeneralDb(General))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getGeneral }
