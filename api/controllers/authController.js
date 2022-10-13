import User from '../models/User.js'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import bcrypt from 'bcrypt'




const register = async (req, res, next) => {


        const {username, email, password} = req.body

        if(!username || !email || !password){
            throw new BadRequestError('All fields must be filled')
        }

        const userAlreadyExists = await User.findOne({email})

        if(userAlreadyExists){
            throw new BadRequestError('Email already exists')
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
    try{

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
        id: user._id
    })
    }catch(err){
      console.log(err)
    }
    
 
}

const updateUser = async (req, res) => {
    const {email, username} = req.body

    if(!email || !username) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({_id: req.user.userId})

    user.email = email
    user.username = username

    await user.save()
    const token = user.createJWT()
    res.status(201).json({user, token, location: user.location})
}

export {register,login,updateUser}