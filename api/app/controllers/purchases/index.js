const { createPurchase } = require('./createPurchase')
const { deletePurchase } = require('./deletePurchase')
const { getAllPurchases } = require('./getAllPurchases')
const { getPurchase } = require('./getPurchase')
const { getPurchases } = require('./getPurchases')
const { updatePurchase } = require('./updatePurchase')

module.exports = {
  createPurchase,
  deletePurchase,
  getAllPurchases,
  getPurchase,
  getPurchases,
  updatePurchase
}
