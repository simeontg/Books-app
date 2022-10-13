import express from 'express'
import authenticateUser from '../middleware/auth.js'
import {createBook,getAllBooks, getBookById} from '../controllers/booksController.js'

const router = express.Router()
router.route('/').get(getAllBooks).post(authenticateUser,createBook)
router.route('/:bookId').get(getBookById)


export default router