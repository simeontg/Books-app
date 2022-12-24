import React, { useMemo } from 'react'
import CommentItem from '../CommentItem/CommentItem'
import styles from './CommentsList.module.css'

const CommentsList = ({comments}) => {

    const commentsByParentId = useMemo(() => {
        const group = {}
        comments.forEach(comment => {
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
        })
        return group
    }, [comments])

    const getReplies = (parentId) => {
        return commentsByParentId[parentId]
    }

    const rootComments = commentsByParentId[null] || []
   
  return (
    rootComments.map(comment => (
        <div key={comment._id} className={styles['comment-stack']}>
            <CommentItem {...comment} getReplies={getReplies}/>
        </div>
    ))
  )
}

export default CommentsList