const Zipcode = require('../../models/zipcode')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { zipcodeExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createZipcode = async (req, res) => {
  try {
    const user_id = req.user._id;
    req = matchedData(req)
    // console.log('req', req);
    const createData = req;
    createData.createdBy = user_id;
    
    // console.log('createData', createData);
    const doesZipcodeExists = await zipcodeExists(req.provinsi, req.kabupaten, req.kecamatan, req.kelurahan, req.kodepos)
    if (!doesZipcodeExists) {
      res.status(201).json(await createItem(req, Zipcode))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createZipcode }
