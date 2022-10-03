import React from 'react'
import BookItem from '../components/BookItem/BookItem'
import { data } from '../data'

const Catalog = () => {
  return (
    <div className='catalog-container'>
      {data.map((data) => <BookItem book={data}/>)}
    </div>
  )
}

export default Catalog