const Country = require('../../../models/country')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 * @param {string} code - name of item
 */
const countryExists = (name = '', code = '') => {
  return new Promise((resolve, reject) => {
    Country.findOne(
      {
        name,
        code
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

module.exports = { countryExists }
