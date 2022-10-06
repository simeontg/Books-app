import React from 'react'
import BookItem from '../components/BookItem/BookItem'
import Navbar from '../components/Navbar/Navbar'
import { data } from '../data'

const Home = () => {
  return (
    <>
    <section className="latest">
       <h1>Latest Books</h1>
       <div className='catalog-container'>
      {data.map((data) => <BookItem key={data._id} book={data}/>)}
    </div>
    </section>
     
    </>
  )
}

export default Home