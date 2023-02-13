const Country = require('../../../models/country')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} id - name of item
 * @param {string} name - name of item
 * @param {string} code - name of item
 */
const countryExistsExcludingItself = (id, name = '', code = '') => {
  return new Promise((resolve, reject) => {
    Country.findOne(
      {
        name,
        code,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'COUNTRY_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { countryExistsExcludingItself }
