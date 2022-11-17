import {Router} from 'express'
const router = Router()

import {register,login, getWishlist} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/wishlist', authenticateUser, getWishlist)

export default router