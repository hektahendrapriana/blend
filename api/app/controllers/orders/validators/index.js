const { validateCreateOrder } = require('./validateCreateOrder')
const { validateDeleteOrder } = require('./validateDeleteOrder')
const { validateGetOrder } = require('./validateGetOrder')
const { validateUpdateOrder } = require('./validateUpdateOrder')
const { validateUploadBukti } = require('./validateUploadBukti')
const { validateUpdateStatus } = require('./validateUpdateStatus')

module.exports = {
  validateCreateOrder,
  validateDeleteOrder,
  validateGetOrder,
  validateUpdateOrder,
  validateUploadBukti,
  validateUpdateStatus
}
