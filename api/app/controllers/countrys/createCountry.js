const Country = require('../../models/country')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { countryExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCountry = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    // console.log('req', req);
    const createData = req;
    createData.createdBy = user_id;
    
    // console.log('createData', createData);
    const doesCountryExists = await countryExists(req.name, req.code)
    if (!doesCountryExists) {
      res.status(201).json(await createItem(req, Country))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createCountry }
