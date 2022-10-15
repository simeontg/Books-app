import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as bookService from '../services/bookService'

const Edit = () => {
    
    const navigate = useNavigate()
    const {bookId} = useParams()
    const {user} = useContext(AuthContext)
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        imageUrl: '',
      })
    const [updating, setUpdating] = useState(false) 
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/books/${bookId}`)
        .then(result => { 
            const {title, author, genre, description, imageUrl, createdBy} = result.data
            setBook({title, author, genre, description, imageUrl})
        })
        .catch(err => console.log(err))
    },[bookId])

    const onChangeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
            })
      }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        bookService.updateBook(book, bookId, user.token)
        setUpdating(true)
        setTimeout(() => {
            navigate('/catalog')
        }, 1000)
    }  

  return (
    <section className='form-container'>
    <form onSubmit={onSubmitHandler}>
        <div className="form-data-container">
            <h1>Edit Book</h1>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={book.title}
                onChange={onChangeHandler}
            />
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                name="author"
                onChange={onChangeHandler}
                value={book.author}
            />
            <label htmlFor="genre">Genre:</label>
            <input 
            type="text" 
            id="genre" 
            name="genre"
                onChange={onChangeHandler}
                value={book.genre}
            />
            <label htmlFor="description">Brief Description:</label>
            <textarea 
            id="description" 
            name="description" 
                onChange={onChangeHandler}
                value={book.description}
            />
            <label htmlFor="imageUrl">Book Cover:</label>
            <input 
            type="text" 
            id="imageUrl" 
            name="imageUrl" 
                onChange={onChangeHandler}
                value={book.imageUrl}
            />
            <input type="submit" className="btn register" value="Edit Book" />
        </div>
    </form>
    {updating && <p className='update-success'>Book updated successfuly! Redirecting...</p>}
   </section>
  )
}

export default Edit