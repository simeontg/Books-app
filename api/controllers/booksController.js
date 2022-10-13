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


export {createBook}