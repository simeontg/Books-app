import BadRequestError from "../errors/bad-request.js";
import Comment from "../models/Comment.js";

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

    if(req.body.parentId){

    }

    const comment = await Comment.create({
        message: req.body.message,
        user,
        book: req.params.bookId,
        parentId: req.body.parentId
    })

    const {createdAt, _id, message, parentId, user: publisher} = comment
    res.status(200).json({
        createdAt,
        _id,
        message,
        parentId,
        user: publisher
    })
}

export {
    getAllComments,
    createComment
}