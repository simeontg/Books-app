import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
        maxlength:50
    },
    author: {
        type: String,
        required: [true, 'Please provide author'],
        maxlength:50
    },
    genre: {
        type: String,
        required: [true, 'Please provide genre'],
        maxlength: 20
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: 400
    },
    imageUrl:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
    comments: {
        type: [mongoose.Types.ObjectId],
        ref: 'Comment',
        default: []
    }
},
{ timestamps : true })

export default mongoose.model('Book', BookSchema)