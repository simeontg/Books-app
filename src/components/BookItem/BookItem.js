import React from 'react'
import styles from './BookItem.module.css'

const BookItem = () => {
  return (
    <article className={styles['book-item-container']}>
        <div className={styles["cover-container"]}>
            <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2F9781408855652-png.jpg" alt="harry-potter-cover" />
        </div>
        <div className={styles['book-info']}>
            <p>Harry Potter and the Philosopher's Stone</p>
            <p>J.K. Rowling</p>
            <p>Fantasy</p>
        </div>
        <button className={styles['book-item-btn']}>
            See more
        </button>
    </article>
  )
}

export default BookItem