import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem/BookItem'
import Spinner from '../components/Spinner/Spinner'

const Catalog = () => {

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
     axios.get('http://localhost:5000/api/v1/books')
     .then(result => {
      setBooks(result.data.books)
      setLoading(false)
    })
     .catch(err => console.log(err))
    
  }, [])
  

  return (
    loading ? <Spinner /> :
    <div className='catalog-container'>
      {books.map(book => <BookItem key={book._id} book={book}/>)}
    </div>
  )
}

export default Catalog