const UserActivity = require('../../models/userActivity')
const mongoose = require('mongoose')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError, buildErrObject, itemNotFound } = require('../../middleware/utils')
const { resolveConfig } = require('prettier')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getActivitys = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    const items = await getItems(req, UserActivity, query, { path: 'createdBy', select: 'first_name middle_name last_name nik user_name email' } )
   
    res.status(200).json(items)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getActivitys }
