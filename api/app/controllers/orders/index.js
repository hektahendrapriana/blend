const { createOrder } = require('./createOrder')
const { deleteOrder } = require('./deleteOrder')
const { getAllOrders } = require('./getAllOrders')
const { getOrder } = require('./getOrder')
const { getOrders } = require('./getOrders')
const { updateOrder } = require('./updateOrder')
const { updateStatus } = require('./updateStatus')
const { uploadBukti } = require('./uploadBukti')
const { downloadBukti } = require('./uploadBukti')

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getOrders,
  updateOrder,
  updateStatus,
  downloadBukti,
  uploadBukti
}
