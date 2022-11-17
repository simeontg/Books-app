import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem/BookItem'


const Home = () => {
  const [books, setBooks] = useState([])

  console.log('rendering...')

  useEffect(() => {
     axios.get('http://localhost:5000/api/v1/books')
     .then(result => {
      setBooks(result.data.books.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).splice(0,4))
    })
     .catch(err => console.log(err))
  }, [])

  return (
    <section className="latest">
       <h1>Latest Books</h1>
       <div className='catalog-container'>
       {books?.map(book => <BookItem key={book._id} book={book}/>)}
    </div>
    </section>
 
  )
}

export default Home