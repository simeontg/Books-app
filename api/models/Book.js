import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
        maxlength: [100, 'Title must be a maximum of 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Please provide author'],
        maxlength: [40, 'Author must be a maximum of 40 characters']
    },
    genre: {
        type: String,
        required: [true, 'Please provide genre'],
        maxlength: [20, 'Genre must be a maximum of 20 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [200, 'Description must be a maximum of 200 characters']
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
        type: [Object],
        default: []
    }
},
{ timestamps : true })

export default mongoose.model('Book', BookSchema)