const Zipcode = require('../../../models/zipcode')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} id - name of item
 * @param {string} provinsi - name of item
 * @param {string} kabupaten - name of item
 * @param {string} kecamatan - name of item
 * @param {string} kelurahan - name of item
 * @param {string} kodepos - name of item
 */
const zipcodeExistsExcludingItself = (id, provinsi = '', kabupaten = '', kecamatan = '', kelurahan = '', kodepos = '') => {
  return new Promise((resolve, reject) => {
    Zipcode.findOne(
      {
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        kodepos,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'ZIP_CODE_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { zipcodeExistsExcludingItself }
