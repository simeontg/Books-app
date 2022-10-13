import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem/BookItem'

const Catalog = () => {

  const [books, setBooks] = useState([])

  useEffect(() => {
     axios.get('http://localhost:5000/api/v1/books')
     .then(result => {
      console.log(result)
      setBooks(result.data.books)
    })
     .catch(err => console.log(err))
  }, [])

  return (
    <div className='catalog-container'>
      {books?.map(book => <BookItem key={book._id} book={book}/>)}
    </div>
  )
}

export default Catalog