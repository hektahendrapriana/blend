const Balance = require('../../../models/balance')
const { buildErrObject, handleError } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} path - path of item
 * @param {string} method - method of item
 * @param {string} source - source of item
 */

const balanceExists = (path = '', method = '', source = {} ) => {
  return new Promise((resolve, reject) => {
    Balance.findOne(
      {
        path, method, source
      },
    ).then((reseponse) => {
      console.log('reseponse', reseponse)
      if( reseponse )
      {
        console.log('reseponse', reseponse)
        console.log('ada')
        return reject(buildErrObject(203, 'Balance_ALREADY_EXISTS'))
      }
      resolve(false);
      
    }).catch( (err) => {
      console.log(err)
      return reject(buildErrObject(203, 'ERROR'))
    })
  });
  // return new Promise((resolve, reject) => {
  //   Balance.findOne(
  //     {
  //       path, method, source
  //     },
  //     (err, item) => {
  //       console.log('err', err)
  //       if (err) {
  //         return reject(buildErrObject(422, err.message))
  //       }

  //       if (item) {
  //         return reject(buildErrObject(422, 'Balance_ALREADY_EXISTS'))
  //       }
  //       resolve(false)
  //     }
  //   )
  // })
}

module.exports = { balanceExists }
