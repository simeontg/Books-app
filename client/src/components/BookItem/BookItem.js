import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BookItem.module.css'

const BookItem = ({book}) => {
  return (
    <article className={styles['book-item-container']}>
        <div className={styles["cover-container"]}>
            <img src={book.imageUrl} alt='book-cover'/>
        </div>
        <div className={styles['book-info']}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.genre}</p>
        </div>
        <Link to={`/catalog/${book._id}`} className={styles['book-item-btn']}>
            Details
        </Link>
    </article>
  )
}

export default BookItem