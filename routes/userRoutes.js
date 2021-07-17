import express from 'express'
import { register, getAllUsers, authUser, deleteUser, getUserById, updateUser, updateUserProfile, getUserProfile } from '../controllers/userController.js'
const router = express.Router()

router.route('/').post(register).get(getAllUsers)
router.route('/login').post(authUser)
router.route('/profile').put(updateUserProfile).post(getUserProfile)
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser)

export default router