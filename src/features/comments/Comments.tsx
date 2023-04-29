import React, { FC, memo, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/providers/store/store'
import { useToggle } from '../../shared/hooks/useToggle'
import { createMarkup } from '../../shared/utils/createMarkup'
import s from '../comments/Comments.module.scss'

import { fetchChildrenComments, fetchComments } from './commentsSlice'
import { CommentsType } from './CommentsTypes'

type CommentsPropsType = {
  kids: number[]
}
export const Comments: FC<CommentsPropsType> = memo(({ kids }) => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments.comments)
  const childrenComments = useAppSelector(state => state.comments.childrenComments)
  const { descendants } = useAppSelector(state => state.singleNews.singleNews)
  const [isRefreshed, setIsRefreshed] = useState(false)

  const getComments = (kids: number[]) => {
    dispatch(fetchChildrenComments(kids))
  }
  const refreshComments = () => {
    setIsRefreshed(true)
  }

  useEffect(() => {
    dispatch(fetchComments(kids))
    setIsRefreshed(false)
  }, [dispatch, kids, isRefreshed])

  return (
    <div>
      <b>Comments: </b> ({descendants})<button onClick={refreshComments}>refresh</button>
      <ul>
        {comments.map(({ text, id, kids }: CommentsType) => {
          const count = kids ? kids.length : ''

          return (
            <li key={id}>
              <div dangerouslySetInnerHTML={createMarkup(text)} />
              {count && <button onClick={() => getComments(kids)}>show more comments</button>}
              {childrenComments && (
                <ul className={s.childrenComments}>
                  {childrenComments.map((comment: CommentsType) => {
                    return (
                      comment.parent === id && (
                        <li key={comment.id}>
                          <div dangerouslySetInnerHTML={createMarkup(comment.text)} />
                        </li>
                      )
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
})
