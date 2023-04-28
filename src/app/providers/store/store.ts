import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { commentsReducer } from '../../../features/comments/commentsSlice'
import { newsReducer } from '../../../pages/NewsList/newsSlice'
import { singleNews } from '../../../pages/SingleNews/singleNewsSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
    singleNews: singleNews,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
