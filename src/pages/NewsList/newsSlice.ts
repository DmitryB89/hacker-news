import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiUrl } from '../../shared/constants/baseUrl'

import { InitialStateType, NewsResponseType, NewsType } from './NewsListTypes'

const initialState: InitialStateType = {
  news_loading: false,
  news_error: null,
  news: [],
}

export const fetchNews = createAsyncThunk<NewsResponseType, void, { rejectValue: string }>(
  'news/fetchNews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<number[]>(`${apiUrl}/newstories.json`)
      const newsIds = response.data.slice(0, 100)
      const requests = newsIds.map((newsId: number) =>
        axios.get<NewsType>(`${apiUrl}/item/${newsId}.json`)
      )
      const responses = await Promise.all(requests)
      const newsList = responses.map(response => response.data)

      return newsList
    } catch (e) {
      return thunkAPI.rejectWithValue('Some error occured')
    }
  }
)
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(fetchNews.pending, state => {
        state.news_loading = true
        state.news_error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news_loading = false
        state.news = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.news_loading = false
        state.news_error = action.error.message || null
      })
  },
})
export const { reducer: newsReducer } = newsSlice
