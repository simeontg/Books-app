import Comment from "../models/Comment.js";

const getAllComments = async (req, res) => {
    const comments = await Comment.find({})
    res.status(200).json(comments)
}


export {
    getAllComments
}