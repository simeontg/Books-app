import React from 'react'
import { Link } from 'react-router-dom'

const Detail = () => {
  return (
    <section className='details-container'>
        <div className="book-cover-container">
            <img src="https://static-cse.canva.com/blob/921487/ColorfulIllustrationYoungAdultBookCover.jpg" alt="" />
        </div>
        <div className="book-info">
            <h3>Harry Potter</h3>
            <p>J.K. Rowling</p>
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