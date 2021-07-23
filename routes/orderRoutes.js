import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
const router = express.Router()

router.route('/').post(addOrderItems).get(getOrders)
router.route('/myorders/:id').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/deliver').put(updateOrderToDelivered)
router.route('/:id/pay').put( updateOrderToPaid)

export default router