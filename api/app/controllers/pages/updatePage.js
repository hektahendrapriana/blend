const Page = require('../../models/page')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { pageExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updatePage = async (req, res) => {
  try {
    var user_id = req.user._id;
    const methode = req.body.method;
    const sources = req.body.source;
    req = matchedData(req)

    const updateData = req;
    updateData.modifiedBy = user_id;
    updateData.method = methode;
    updateData.source = sources;
    
    const id = await isIDGood(req.id)
    const doesPageExists = await pageExistsExcludingItself(id, updateData.path, updateData.method, updateData.source)
    if (!doesPageExists) {
      res.status(200).json(await updateItem(id, Page, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updatePage }
