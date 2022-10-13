import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    username: {type: String, 
        required: [true, 'Please provide name'],
     minlength:3,
      maxlength:20, 
      trim: true},

    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    wishlist: {
        type: [mongoose.Types.ObjectId],
        ref: 'Book',
        default: []
    }
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

export default mongoose.model('User', UserSchema)

// trips: {type: [ObjectId], ref: 'Trip', default: []}