import BadRequestError from "../errors/bad-request.js";
import Book from "../models/Book.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const getAllComments = async (req, res) => {
    const comments = await Comment.find({})
    res.status(200).json(comments)
}

const createComment = async (req, res) => {
    if (req.body.message === '' || req.body.message === null) {
        throw new BadRequestError('Message is required')
    }
    const user = {
        userId: req.user.userId,
        username: req.user.username
    }

    try{
        const comment = await Comment.create({
            message: req.body.message,
            user,
            book: req.params.bookId,
            parentId: req.body.parentId
        })
    const {createdAt, _id, message, parentId, user: publisher, children} = comment
    const trimmedComment = {
        createdAt,
        _id,
        message,
        parentId,
        user: publisher,
        children
    }

    let parentComment

    if(req.body.parentId){
        parentComment = await Comment.findOne({_id: req.body.parentId})
        parentComment.children = [...parentComment.children, trimmedComment]
        await parentComment.save()
    }

    const commentCreator = await User.findOne({_id: req.user.userId})
    commentCreator.comments = [...commentCreator.comments, trimmedComment]
    await commentCreator.save()

    const book = await Book.findOne({_id: req.params.bookId})
    book.comments = [...book.comments, trimmedComment]
    if(parentComment){
        const parentCommentIdx = Object.values(book.comments).findIndex(c => c._id === parentComment._id)
        console.log(parentComment)
        book.comments.splice(parentCommentIdx,1)
        book.comments = [...book.comments, parentComment]
        console.log(parentCommentIdx)
    }
    await book.save()

    res.status(200).json(trimmedComment)
}catch(err){
    console.log(err)
    throw new BadRequestError('Something went wrong.')
}
    
}

export {
    getAllComments,
    createComment
}