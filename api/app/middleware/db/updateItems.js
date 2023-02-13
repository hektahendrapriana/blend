const { itemNotFound } = require('../../middleware/utils')

/**
 * Updates an item in database by id
 * @param {string} filter - item id
 * @param {Object} req - request object
 */
const updateItems = (filter = {}, model = {}, req = {}) => {
  return new Promise((resolve, reject) => {
    model.updateMany(
        filter,
        req,
        {
            new: true,
            runValidators: true
        },
        async (err, item) => {
            try {
            await itemNotFound(err, item, 'NOT_FOUND')
            resolve(item)
            } catch (error) {
            reject(error)
            }
        }
    )
  })
}

module.exports = { updateItems }
