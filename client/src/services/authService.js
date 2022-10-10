import axios from 'axios'
const baseUrl = "http://localhost:5000/api/v1/auth"

export const register = async (username, email, password) => {
    try{
        const response = await axios.post(`${baseUrl}/register`, {username, email, password})
        console.log(response)
        return response.data
    } catch(err) {
        console.log(err)
    }
   
}

export const logout = async()  => {
    
}

export const login = async (email, password) => {
    try{
        const response = await axios.post(`${baseUrl}/login`, { email, password })
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
};