import React from 'react'
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
        <button className={styles['book-item-btn']}>
            Details
        </button>
    </article>
  )
}

export default BookItem