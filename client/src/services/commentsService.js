import axios from "axios"
const mainUrl = 'http://localhost:5000/api/v1/books'


export const createComment = ({bookId, message, userToken, parentId}) => {
    return axios.post(`${mainUrl}/${bookId}/comments`, {message, parentId},{
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
}