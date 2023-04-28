import React, { useEffect, useRef } from 'react'

import { useNavigate, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/providers/store/store'
import arrow from '../../assets/arrow_back.svg'
import { Comments } from '../../features/comments/Comments'
import { dateHandler } from '../../shared/utils/dateHandler'

import { fetchSingleNews } from './singleNewsSlice'

export const SingleNews = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const news = useAppSelector(state => state.singleNews.singleNews)
  const { title, url, time, by, kids } = news

  useEffect(() => {
    if (!id) return
    dispatch(fetchSingleNews({ newsId: id }))
  }, [id, dispatch])

  return (
    <div className={'singleNewsContainer'}>
      <div className={'buttonBloc'} onClick={() => navigate(-1)}>
        <img src={arrow} alt="arrow" className={'arrow'} />
        <span>back to news</span>
      </div>
      <div className={'singleNewsData'}>
        <h2>{title}</h2>
        <div className={'author'}>by {by}</div>
        <NavLink to={url}>{url}</NavLink>
        <div>
          <div>
            <b>Date:</b> {dateHandler(time)}
          </div>
          <hr />
        </div>
        <Comments kids={kids} />
      </div>
    </div>
  )
}
