import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUser,
} from '../controllers/userController.js'

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
router.route('/').post(registerUser)
router.route('/').get(getAllUsers)

export default router
