const { handleError } = require('../../middleware/utils')
const { checkQueryString, getItems } = require('../../middleware/db')
const Product = require('../../models/product')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBrands = async (req, res) => {
  try {
    // res.status(200).json(await Product.aggregate([
    //     { $group: { _id: { brand: "$brand" } } },
    //     { $sort: { "_id.brand": 1 }},
    //   ]))
    const brands = await Product.distinct("brand")
    const resp = []
    for(let i=0; i<brands.length; i++)
    {
      resp.push({id: i+1, label: brands[i], value: brands[i], brand: brands[i]})
    }
    res.status(200).json(resp)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBrands }
