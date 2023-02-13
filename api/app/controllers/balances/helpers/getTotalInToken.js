const Balance = require('../../../models/balance')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getTotalInToken = () => {
  return new Promise((resolve, reject) => {
    Balance.aggregate([
      {
        $group: {
          _id: "$status"
        }
      }
    ])
  })
}

module.exports = { getTotalInToken }
