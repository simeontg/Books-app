import axios from "axios"

const mainUrl = 'http://localhost:5000/api/v1/books'

export const createBook = async (book, userToken) => {
    try{
        const result = await axios.post(mainUrl, book, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        return result
    }catch(err){
        return Promise.reject(err)
    }
}

export const updateBook = async (book, bookId, userToken) => {
  try{
    const result = await axios.patch(`${mainUrl}/${bookId}`, book, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    return result
  }catch(err){
    return Promise.reject(err)
  }
}

export const addToWishlist = async (bookId, userToken) => {
    try{
        const result = await axios.get(`${mainUrl}/wishlistAdd/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        return result
    }catch(err){
        return Promise.reject(err)
    }
}

export const removeFromWishlist = async (bookId, userToken) => {
    try{
        const result = await axios.get(`${mainUrl}/wishlistRemove/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        return result
    }catch(err){
        return Promise.reject(err)
    }
}