import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import BookItem from '../components/BookItem/BookItem'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
    const {user} = useContext(AuthContext)
    const [listedBooks, setListedBooks] = useState([])
    const [createdBooks, setCreatedBooks] = useState([])
    const [showCreatedBooks, setShowCreatedBooks] = useState(true)
    const [showListedBooks, setShowListedBooks] = useState(false)

  useEffect(() => {
    async function getWishlist(){
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/wishlist', {
        headers: {'Authorization': `Bearer ${user.token}`}
    })
    return data.wishlist
  }
    async function getListedBooks(){
      const { data: {books} } = await axios.get('http://localhost:5000/api/v1/books')
      const wishlist = await getWishlist()
      setListedBooks(books.filter( b=> wishlist.includes(b._id)).splice(0,6))
      setCreatedBooks(books.filter( b => b.createdBy === user.id))
    }
    getListedBooks()
  }, [user])

  const onBooksCreatedClick = () => {
    setShowCreatedBooks(true)
    setShowListedBooks(false)
  }

  const onWishlistClick = () => {
    setShowCreatedBooks(false)
    setShowListedBooks(true)
  }

  return (
    <div className='profile-wrapper'>
        <div className='profile-info'>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
        <div className='profile-books'>
          <div className='profile-paragraphs'>
            <p onClick={onBooksCreatedClick} style={{borderBottom: showCreatedBooks ? '2px solid white' : ''}}>Books created</p>
            <p onClick={onWishlistClick} style={{borderBottom: showListedBooks ? '2px solid white' : ''}}>Wishlist</p>
          </div>
          <div className='profile-books-container'>
            { showCreatedBooks && createdBooks.map((book) => (
                <BookItem key={book._id} book={book}/>
            ))}
             { showListedBooks && listedBooks.map((book) => (
                <BookItem key={book._id} book={book}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Profile