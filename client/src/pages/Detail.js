import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const Detail = () => {
   
    const {bookId} = useParams()
    const [book, setBook] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/books/${bookId}`)
        .then(result => setBook(result.data))
        .catch(err => console.log(err))
    },[bookId])
  
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
                <Link to={`/`} className='edit detail-btn'>Edit</Link>
                <button className='del detail-btn'>Delete</button>
                <button className='wishlist detail-btn'>Add to wishlist</button>
            </div>
        </div>
    </section>
  )
}

export default Detail