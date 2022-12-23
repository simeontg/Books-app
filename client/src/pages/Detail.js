import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import BookDetail from "../components/BookDetail/BookDetail"
import CommentForm from '../components/CommentForm/CommentForm'
import { AuthContext } from '../context/AuthContext'
import { createComment } from '../services/commentsService'
import { useAsyncFn } from '../utils/asyncHook'



const Detail = () => {
    const {bookId} = useParams()
    const {user} = useContext(AuthContext)
    const userToken = user.token
    const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

    const onCommentCreate = (message) => {
        return createCommentFn({bookId, message, userToken}).then(comment => console.log(comment)).catch(err => console.log(err))
    }
  return (
  <>
    <BookDetail bookId={bookId}/>
    <h3>Comments</h3>
    {user.username && <CommentForm onSubmit={onCommentCreate}/>}
   </>
  )
}

export default Detail