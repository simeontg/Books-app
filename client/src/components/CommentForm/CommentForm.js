import React from 'react'
import { useState } from 'react'
import styles from './CommentForm.module.css'

const CommentForm = ({initialValue = '', onSubmit}) => {

    const [message, setMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(message).then(() => setMessage(''))
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles['comment-form-row']}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={styles['message-input']} />
            <button type='submit' className={styles.btn}>Post</button>
        </div>
    </form>
  )
}

export default CommentForm