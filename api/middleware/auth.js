import  UnauthenticatedError from "../errors/unauthenticated.js"
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid!')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, username: payload.username }
        next()
    }catch(err){
        throw new UnauthenticatedError('Authentication invalid')
    }
    
   
}

export default auth