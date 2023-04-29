import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/providers/store/store'
import { dateHandler } from '../../shared/utils/dateHandler'
import s from '../NewsList/NewsList.module.scss'

import { fetchNews } from './newsSlice'

export const NewsList = () => {
  const news = useAppSelector(state => state.news.news)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [isRefreshed, setIsRefreshed] = useState(false)

  const refreshNews = () => {
    setIsRefreshed(true)
  }

  useEffect(() => {
    if (!news.length || isRefreshed) {
      dispatch(fetchNews())
      setIsRefreshed(false)
    }
    const interval = setInterval(() => {
      dispatch(fetchNews())
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, news, isRefreshed])

  return (
    <div className={s.newsListWrapper}>
      <button onClick={refreshNews}>Refresh news list</button>
      <ol className={s.newsList}>
        {news.map(({ by, descendants, id, score, time, title }, i: number) => (
          <div key={id}>
            <li onClick={() => navigate(`news/${id}`)} value={i + 1} className={s.newsTitle}>
              {title}
            </li>
            <div className={s.newsInfo}>
              <div className={s.author}>by {by}</div>
              <div>
                <b>Score:</b> {score}
              </div>
              <div>
                <b>Comments:</b> {descendants}
              </div>
              <div>
                <b>Date:</b> {dateHandler(time)}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </ol>
    </div>
  )
}
