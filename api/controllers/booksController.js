import Book from "../models/Book.js"
import User from '../models/User.js'
import { BadRequestError, UnauthenticatedError} from '../errors/index.js'
import checkPermission from "../utils/checkPermission.js"

const createBook = async (req, res) => {
   const {title, author, genre, description, imageUrl} = req.body


   if(!title || !author || !genre || !description || !imageUrl){
    throw new BadRequestError('Please provide all values')
   }
      req.body.createdBy = req.user.userId
      const book = await Book.create(req.body)
      res.status(201).json({book})
   
   
}
const getAllBooks = async(req, res) => {
   try{
      const books = await Book.find({})
      res.status(200).json({books})
   }catch(err){
      console.log(err)
   }
}   

const getBookById = async(req, res) => {
   const id = req.params.bookId
   try{
      const book = await Book.findOne({_id: id})
      res.status(200).json(book)
   }catch(err){
      console.log(err)
   }
}   

const updateBook = async(req, res) => {

   const bookId = req.params.bookId
   const {title, author, genre, description, imageUrl} = req.body

   try{
      const book = await Book.findOne({_id: bookId})
      checkPermission(req.user, book.createdBy)

      if(!title || !author || !genre || !description || !imageUrl){
         throw new BadRequestError('Please provide all values')
      }
   
      book.title = title
      book.author = author
      book.genre = genre
      book.description = description
      book.imageUrl = imageUrl

      const updatedBook = await book.save()
      res.status(201).json(updatedBook)
   }catch(err){
      console.log(err)
   }

}

const deleteBook = async (req, res) => {
   const bookId = req.params.bookId
   try{
      const book = await Book.findOne({_id: bookId})
      checkPermission(req.user, book.createdBy)
      await book.remove()
      res.status(200).json({ msg: 'Book successfuly removed! '})
   }catch(err){
      console.log(err)
   }
}

const addToWishlist = async (req,res) => {
   const {bookId} = req.params
   const {userId} = req.user
   try{
      const user = await User.findOne({_id: userId})
      console.log(user.wishlist)
      if(user.wishlist.includes(bookId)){
         throw new BadRequestError('Book already in wishlist!')
      }else{
         user.wishlist = [...user.wishlist, bookId]
         await user.save()
         res.status(200).json({msg: 'Book added to wishlist!'})
      }
   }catch(err){
      console.log(err)
   }
}

const removeFromWishlist = async (req,res) => {
   const {bookId} = req.params
   const {userId} = req.user
   try{
      const user = await User.findOne({_id: userId})
      console.log(user.wishlist)
      if(user.wishlist.includes(bookId)){
        const index = user.wishlist.indexOf(bookId)
        user.wishlist.splice(index,1)
        console.log(user.wishlist)
        await user.save()
        res.status(200).json({msg: 'Book removed from wishlist!'})
      }else{
        throw new BadRequestError ('No such book in wishlist!')
      }
   }catch(err){
      console.log(err)
   }
}

export{
   createBook,
   getAllBooks,
   getBookById,
   updateBook,
   deleteBook,
   addToWishlist,
   removeFromWishlist
}