const { handleError } = require('../../middleware/utils')
const { checkQueryString, getItems } = require('../../middleware/db')
const { getTotalInToken } = require('./helpers')
const Balance = require('../../models/balance')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOutBalance = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)

    if( typeof(req.query.client_id) !== 'undefined' )
    {
      query.client_id = req.query.client_id;
    }

    res.status(200).json(await Balance.aggregate([
        {
            $match : { client_id: query.client_id, status: 'OUT' }
        },
        {
          $group: {
            _id: "OUT",
            total_out : {
                $sum : "$out_token"
            }
          }
        }
      ]))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getOutBalance }
