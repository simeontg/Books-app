import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookItem from '../components/BookItem/BookItem'

const Search = () => {
    const {searchTerm} = useParams()
    const [books, setBooks] = useState([])

    useEffect(() => {
         axios.get('http://localhost:5000/api/v1/books')
         .then(result => {
          setBooks(result.data.books.filter(b=>b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase())))
        })
         .catch(err => console.log(err))
      }, [searchTerm])

    
  return (
    <div>{ books.length > 0 ? books.map(book => (
        <BookItem key={book._id} book={book}/>
    )) : <p>No result found for this search: "<span>{searchTerm}</span>"!</p> }</div>
  )
}

export default Search