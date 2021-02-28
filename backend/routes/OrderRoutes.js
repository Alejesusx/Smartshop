import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import { addOrder, getOrderByID } from '../controllers/orderController.js'

router.route('/').post(protect, addOrder)
router.route('/:id').get(protect, getOrderByID)

export default router
