const Role = require('../../models/role')
const mongoose = require('mongoose')
const Permission = require('../../models/permission')
const { checkQueryString, getItems, getRolesWithPermissions } = require('../../middleware/db')
const { handleError, buildErrObject, itemNotFound } = require('../../middleware/utils')
const { resolveConfig } = require('prettier')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRoles = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    // await Role.aggregate([
    //   {
    //     $lookup: {
    //       from: 'permissions',
    //       let: { id: '$_id' },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: [
    //                 { $toObjectId: "$role_id" },
    //                 "$$id"
    //               ]
    //             }
    //           }
    //         }
    //       ],
    //       as: 'accesslists'
    //     }
    //   }
    // ],
    // function (error, data) {
    //   res.status(200).json(data)
    //   //handle error case also
    // });

    const items = await getItems(req, Role, query, { path: 'permisions createdBy modifiedBy', select: 'name path method first_name middle_name last_name nik user_name email' } )
   
    res.status(200).json(items)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getRoles }
