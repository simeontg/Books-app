import Book from "../models/Book.js"
import { BadRequestError, UnauthenticatedError} from '../errors/index.js'

const createBook = async (req, res) => {
   const {title, author, genre, description, imageUrl} = req.body


   if(!title || !author || !genre || !description || !imageUrl){
    throw new BadRequestError('Please provide all values')
   }
   try{
      req.body.createdBy = req.user.userId
      const book = await Book.create(req.body)
      res.status(201).json({book})
   }catch(err){
      console.log(err)
   }
   
}
const getAllBooks = async(req, res) => {
   try{
      const books = await Book.find({})
      res.status(201).json({books})
   }catch(err){
      console.log(err)
   }
}   

const getBookById = async(req, res) => {
   const id = req.params.bookId
   try{
      const book = await Book.findOne({_id: id})
      res.status(201).json(book)
   }catch(err){
      console.log(err)
   }
}   

export{
   createBook,
   getAllBooks,
   getBookById
}