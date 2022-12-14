import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error/Error';
import { AuthContext } from '../context/AuthContext';
import * as bookService from '../services/bookService'
import hideError from '../utils/hideError';

const Create = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [bookState, setBookState] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    imageUrl: '',
  });
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  const onChangeHandler = (e) => {
    setBookState({
        ...bookState,
        [e.target.name]: e.target.value
        })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // const {title, author, genre, description, imageUrl} = bookState;
    // // if(title === '' || author === '' || genre ==='' || description === '' || imageUrl === '' ){
    // //   return
    // // }
    try{
      await bookService.createBook(bookState,user.token)
      setUpdating(true)
      setTimeout(() => {
        navigate('/catalog')
      }, 1000)
    }catch(err){
      setError(err.response.data.msg)
      hideError(setError, 2000)
    }
   
  }


  return (
    <section className='form-container'>
    <form onSubmit={onSubmit}>
        <div className="form-data-container">
            <h1>Create Book</h1>
            {error && <Error message={error}/>}
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Harry Potter"
                value={bookState.title}
                onChange={onChangeHandler}
            />
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                name="author"
                placeholder="J.K. Rowling"
                value={bookState.author}
                onChange={onChangeHandler}
            />
            <label htmlFor="genre">Genre:</label>
            <input 
            type="text" 
            id="genre" 
            name="genre" 
            placeholder='Fantasy'
            value={bookState.genre}
            onChange={onChangeHandler}
            />
            <label htmlFor="description">Brief Description:</label>
            <textarea 
            id="description" 
            name="description" 
            value={bookState.description}
            onChange={onChangeHandler}
            />
            <label htmlFor="imageUrl">Book Cover:</label>
            <input 
            type="text" 
            id="imageUrl" 
            name="imageUrl" 
            value={bookState.imageUrl}
            onChange={onChangeHandler}
            placeholder='https://'
            />
            <input type="submit" className="btn register" value="Create Book" />
        </div>
    </form>
    {updating && <p className='update-success'>Book created successfuly! Redirecting...</p>}
   </section>
  )
}

export default Create