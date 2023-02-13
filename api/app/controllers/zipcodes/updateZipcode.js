const Zipcode = require('../../models/zipcode')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { zipcodeExists, zipcodeExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateZipcode = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    
    const id = await isIDGood(req.id)
    const doesZipcodeExists = await zipcodeExistsExcludingItself(id, req.provinsi, req.kabupaten, req.kecamatan, req.kelurahan, req.kodepos)
    if (!doesZipcodeExists) {
      res.status(200).json(await updateItem(id, Zipcode, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateZipcode }
