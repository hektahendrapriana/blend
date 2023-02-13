const {
    isIDGood,
    handleError,
    buildErrObject
  } = require('../../middleware/utils')
  const { matchedData } = require('express-validator')
  const { changePasswordInDB } = require('../profile/helpers')
  
  /**
   * Change password function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  const changePassword = async (req, res) => {
    try {
      const id = await isIDGood(req.params.id)
      req = matchedData(req)
      res.status(200).json(await changePasswordInDB(id, req))
    } catch (error) {
      handleError(res, error)
    }
  }
  
  module.exports = { changePassword }
  