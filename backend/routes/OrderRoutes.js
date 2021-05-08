import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import {
  addOrder,
  getOrderByID,
  getUserOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js'

router.route('/').post(protect, addOrder)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
