import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { data } from '../data'



const Detail = () => {
   
    const {bookId} = useParams()
    const book = data.find(book => book._id == bookId)

    console.log(data)
    console.log(bookId)
    console.log(book)

  return (
    <section className='details-container'>
        <div className="book-cover-container">
            <img src={book.imageUrl} alt="" />
        </div>
        <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quisquam, recusandae amet ducimus perspiciatis temporibus asperiores corporis, obcaecati dolores blanditiis ad laboriosam ab dolorem minima modi velit laudantium voluptatibus tempore!</p>
            <div className="details-buttons">
                <Link to={`/`} className='edit detail-btn'>Edit</Link>
                <button className='del detail-btn'>Delete</button>
                <button className='wishlist detail-btn'>Add to wishlist</button>
            </div>
        </div>
    </section>
  )
}

export default Detail