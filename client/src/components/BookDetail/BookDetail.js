import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import * as bookService from '../../services/bookService'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import styles from './BookDetail.module.css'

const BookDetail = ({bookId}) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [book, setBook] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    const [isNonOwner, setIsNonOwner] = useState(false)
    const [loading, setLoading] = useState(false)
    const [wishlist, setWishlist] = useState(null)


    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/v1/books/${bookId}`)
        .then(result => {
            console.log(result.data)
            setBook(result.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
        if(user.username){
            axios.get('http://localhost:5000/api/v1/auth/wishlist', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            .then(result => {
                setWishlist(result.data.wishlist)
            }).catch(err => console.log(err))
        }
    },[bookId, user])

    useEffect(() => {
      
        if(user.id && user.id !== book.createdBy){
            setIsNonOwner(true)
          }else{
            setIsNonOwner(false)
          }
          if(user.id === book.createdBy){
            setIsOwner(true)
          }else{
            setIsOwner(false)
          }
    }, [user.id, book.createdBy])

    const onDeleteClick = async () => {
        try{
            await axios.delete(`http://localhost:5000/api/v1/books/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    const onAddToWishlist = async () => {
        try{
           console.log(wishlist)
           await bookService.addToWishlist(bookId, user.token)
           setWishlist(wishlist => [...wishlist, bookId])
        }catch(err){
           console.log(err)
        }
    }

    const onRemoveFromWishlist = async () => {
        try{
            await bookService.removeFromWishlist(bookId, user.token)
            setWishlist(wishlist => wishlist.filter(b => b !== bookId))
        }catch(err){
            console.log(err)
        }
    }

  
  return (
    loading ? <Spinner /> :
    <section className={styles['details-container']}>
        <div className={styles["book-cover-container"]}>
            <img src={book.imageUrl} alt="" />
        </div>
        <div className={styles["book-info"]}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p className={styles.description}>{book.description}</p>
            <div className={styles["details-buttons"]}>
            <Link to={`/edit/${bookId}`} className={`${styles.edit} ${styles['detail-btn']} ${styles.owner}`} style={{display: isOwner ? 'inline' : 'none'}}>Edit</Link>
            <button 
            className={`${styles.del} ${styles['detail-btn']}`} 
            style={{display: isOwner ? 'inline' : 'none'}} 
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?') && isOwner) onDeleteClick() } }
            >
            Delete
            </button>
            {wishlist?.includes(bookId) ? <button 
            className={`${styles.wishlist} ${styles['detail-btn']}`} 
            style={{display: isNonOwner ? 'inline' : 'none'}}
            onClick={onRemoveFromWishlist}
            >
            Remove from wishlist
            </button> : <button 
            className={`${styles.wishlist} ${styles['detail-btn']}`} 
            style={{display: isNonOwner ? 'inline' : 'none'}}
            onClick={onAddToWishlist}
            >
            Add to wishlist
            </button>} 
            </div>
        </div>
    </section>
  )
}


export default BookDetail