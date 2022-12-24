import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        maxlength: 200
    },
    user: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        },
        username: {
            type: String
        }
    }, 
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Please provide book']
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    children: {
        type: [Object],
        default: []
    }
}, {timestamps: true})

CommentSchema.pre('deleteOne', function(next){
    
    next()
})

export default mongoose.model('Comments', CommentSchema)