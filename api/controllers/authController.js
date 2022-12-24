import User from '../models/User.js'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import bcrypt from 'bcrypt'




const register = async (req, res, next) => {
        const {username, email, password, repass} = req.body
        if(!username || !email || !password || !repass){
            throw new BadRequestError('All fields must be filled')
        }
        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            throw new BadRequestError('Email already exists')
        }
        if(password !== repass){
            throw new BadRequestError('Passwords do not match')
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            email,
            password: hashedPass,
        })
        const token = user.createJWT()
        await user.save()
        res.status(201).json({
            email: user.email,
            username: user.username,
            token,
            id: user._id})
}

const login = async (req, res) => {
        const {email, password} = req.body
        if(!email || !password) {
            throw new BadRequestError('Please provide all values')
        }
    const user = await User.findOne({ email })
        if(!user){
            throw new UnauthenticatedError('Email or password does not match')
        }

        console.log(req.body.password, user.password)
    
        const hasMatch = await bcrypt.compare(req.body.password, user.password)
        if(!hasMatch){
           throw new UnauthenticatedError('Email or password does not match')
           }

           const token = user.createJWT()
           user.password = undefined

    res.status(201).json({
        email: user.email,
        username: user.username,
        token,
        id: user._id,
        wishlist: user.wishlist
    })
    
}

const getWishlist = async (req,res) => {
        const user = await User.findOne({_id: req.user.userId})
        // console.log(user)
        res.status(200).json({
            wishlist: user.wishlist
        })
   
}


export {register,login,getWishlist}