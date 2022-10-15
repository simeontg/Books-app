import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Detail = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const {bookId} = useParams()
    const [book, setBook] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    const [isNonOwner, setIsNonOwner] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/books/${bookId}`)
        .then(result => setBook(result.data))
        .catch(err => console.log(err))
    },[bookId])

    useEffect(() => {
      
        if(user.id && user.id != book.createdBy){
            setIsNonOwner(true)
          }else{
            setIsNonOwner(false)
          }
          if(user.id == book.createdBy){
            setIsOwner(true)
          }else{
            setIsOwner(false)
          }
      
      
    }, [user.id, book.createdBy])

    const onDeleteClick = async () => {
        console.log('fsafafasfsfsafas')
        try{
            await axios.delete(`http://localhost:5000/api/v1/books/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

  
  return (
    <section className='details-container'>
        <div className="book-cover-container">
            <img src={book.imageUrl} alt="" />
        </div>
        <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p className='description'>{book.description}</p>
            <div className="details-buttons">
            <Link to={`/edit/${bookId}`} className='edit detail-btn owner' style={{display: isOwner ? 'inline' : 'none'}}>Edit</Link>
            <button className='del detail-btn' style={{display: isOwner ? 'inline' : 'none'}} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDeleteClick() } }>Delete</button>
            <button className='wishlist detail-btn' style={{display: isNonOwner ? 'inline' : 'none'}}>Add to wishlist</button>
            </div>
        </div>
    </section>
  )
}

export default Detail