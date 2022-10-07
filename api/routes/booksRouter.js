import express from 'express'
const router = express.Router()

import {createBook} from '../controllers/booksController.js'

router.route('/').post(createBook)


export default router