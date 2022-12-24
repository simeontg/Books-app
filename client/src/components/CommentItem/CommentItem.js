import React, { useContext } from 'react'
import IconBtn from '../UI/IconBtn/IconBtn'
import styles from './CommentItem.module.css'
import {FaEdit, FaHeart, FaReply, FaTrash} from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short'})

const CommentItem = ({id, message, user, createdAt, getReplies}) => {

    const {user: loggedUser} = useContext(AuthContext)

    const buttons = (
        <div className={styles.footer}>
        <IconBtn Icon={FaHeart} aria-label='Like'/>
        <IconBtn Icon={FaReply} aria-label='Reply'/>
        <IconBtn Icon={FaEdit} aria-label='Edit'/>
        <IconBtn Icon={FaTrash} aria-label='Delete'/>
    </div>
    )

    const childComments = getReplies(id)
    console.log(childComments)

  return (<>
   <div className={styles.comment}>
    <div className={styles.header}>
        <span className={styles.name}>{user.username}</span>
        <span className={styles.date}>{dateFormatter.format(Date.parse(createdAt))}</span>
    </div>
    <div className={styles.message}>{message}</div>
    {loggedUser.username && buttons}
   </div>
  </>
  )
}

export default CommentItem