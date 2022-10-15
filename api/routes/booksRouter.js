import express from 'express'
import authenticateUser from '../middleware/auth.js'
import {createBook,deleteBook,getAllBooks, getBookById, updateBook} from '../controllers/booksController.js'

const router = express.Router()
router.route('/').get(getAllBooks).post(authenticateUser,createBook)
router.route('/:bookId').get(getBookById).patch(authenticateUser,updateBook).delete(authenticateUser, deleteBook)


export default router