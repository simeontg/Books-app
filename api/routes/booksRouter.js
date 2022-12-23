import express from 'express'
import authenticateUser from '../middleware/auth.js'
import {createBook,deleteBook,getAllBooks, getBookById, updateBook, addToWishlist, removeFromWishlist} from '../controllers/booksController.js'
import { createComment } from '../controllers/commentController.js'

const router = express.Router()
router.route('/').get(getAllBooks).post(authenticateUser,createBook)
router.route('/:bookId').get(getBookById).patch(authenticateUser,updateBook).delete(authenticateUser, deleteBook)
router.route('/wishlistAdd/:bookId').get(authenticateUser, addToWishlist)
router.route('/wishlistRemove/:bookId').get(authenticateUser, removeFromWishlist)
router.route('/:bookId/comments').post(authenticateUser, createComment)


export default router