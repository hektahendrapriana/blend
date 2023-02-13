const Product = require('../../models/product')
const { updateItem } = require('../../middleware/db')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateMany = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    if( typeof(req.query.brand) !== 'undefined' )
    {
      query.brand = req.query.brand;
    }
    const items = await getItems(req, Product, query, { path: '', select: '' })
    if( items.docs.length > 0 )
    {
      console.log('found')
      for(let i=0; i< items.docs.length; i++)
      {
        items.docs[i].brand = 'Apple'
        items.docs[i].product_type = 'ACCESORIES'
        console.log(items.docs[i])
        await updateItem(items.docs[i]._id, Product, items.docs[i])
      }
    }
    res.status(200).json(items)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateMany }
