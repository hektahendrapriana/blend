const { buildErrObject } = require('../../middleware/utils')

const { listInitOptions } = require('./listInitOptions')
const { cleanPaginationID } = require('./cleanPaginationID')

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
// const getItems = async (req = {}, model = {}, query = {}, populate = {}, aggregate = {}) => {
//   const options = await listInitOptions(req, populate, aggregate)
const getItems = async (req = {}, model = {}, query = {}, populate = {}) => {
  const options = await listInitOptions(req, populate)
  return new Promise((resolve, reject) => {
    model.paginate(query, options, (err, items) => {
      if (err) {
        return reject(buildErrObject(203, err.message))
      }
      resolve(cleanPaginationID(items))
    })
  })
}

module.exports = { getItems }
