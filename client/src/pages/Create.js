import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as gameService from '../services/gameService'

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

  const onChangeHandler = (e) => {
    setBookState({
        ...bookState,
        [e.target.name]: e.target.value
        })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    gameService.createBook(bookState,user.token)
    navigate('/catalog')
  }


  return (
    <section className='form-container'>
    <form onSubmit={onSubmit}>
        <div className="form-data-container">
            <h1>Create Book</h1>
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
   </section>
  )
}

export default Create