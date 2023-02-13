const Page = require('../../models/page')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { pageExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createPage = async (req, res) => {
  try {
    const user_id = req.user._id;
    const methode = req.body.method;
    const sources = req.body.source;
    req = matchedData(req)
    const createData = req;
    createData.createdBy = user_id;
    createData.method = methode;
    createData.source = sources;
    
    const doesPageExists = await pageExists(createData.path, createData.method, createData.source)
    if (!doesPageExists) {
      res.status(201).json(await createItem(createData, Page))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createPage }
