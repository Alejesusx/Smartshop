import express from 'express'
const router = express.Router()
import { admin, protect } from '../Middleware/authMiddleware.js'
import {
  addOrder,
  getAllOrders,
  getOrderByID,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js'

router.route('/').post(protect, addOrder).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router
