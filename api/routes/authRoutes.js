import {Router} from 'express'
const router = Router()

import {register,login} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.post('/register', register)
router.post('/login', login)

export default router