import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiUrl } from '../../shared/constants/baseUrl'

import { InitialStateType, NewsType } from './SingleNewsListTypes'

const initialState: InitialStateType = {
  singleNews_loading: false,
  singleNews_error: null,
  singleNews: {
    by: '',
    descendants: 0,
    id: 0,
    score: 0,
    time: 0,
    title: '',
    type: 'story',
    url: '',
    kids: [],
  },
}

export const fetchSingleNews = createAsyncThunk<
  NewsType,
  { newsId: string },
  { rejectValue: string }
>('singleNews/fetchSingleNews', async ({ newsId }, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}/item/${newsId}.json`)

    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue('Some error occured')
  }
})
export const singleNewsSlice = createSlice({
  name: 'singleNews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(fetchSingleNews.pending, state => {
        state.singleNews_loading = true
        state.singleNews_error = null
      })
      .addCase(fetchSingleNews.fulfilled, (state, action) => {
        state.singleNews_loading = false
        state.singleNews = action.payload
      })
      .addCase(fetchSingleNews.rejected, (state, action) => {
        state.singleNews_loading = false
        state.singleNews_error = action.error.message || null
      })
  },
})
export const { reducer: singleNews } = singleNewsSlice
