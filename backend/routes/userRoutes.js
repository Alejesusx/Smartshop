import express from 'express'
const router = express.Router()
import { admin, protect } from '../Middleware/authMiddleware.js'
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserAdmin,
} from '../controllers/userController.js'

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserAdmin)
  .get(protect, admin, getUserById)

export default router
 