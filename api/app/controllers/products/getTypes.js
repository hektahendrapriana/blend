const { handleError } = require('../../middleware/utils')
const { checkQueryString, getItems } = require('../../middleware/db')
const Product = require('../../models/product')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTypes = async (req, res) => {
  try {
    // res.status(200).json(await Product.aggregate([
    //   { $group: { _id: { product_type: "$product_type" } } },
    //   { $sort: { "_id.product_type": 1 }},
    // ]))
    const cats = await Product.distinct("product_type")
    const resp = []
    for(let i=0; i<cats.length; i++)
    {
      resp.push({id: i+1, label: cats[i], value: cats[i], category: cats[i]})
    }
    res.status(200).json(resp)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getTypes }
