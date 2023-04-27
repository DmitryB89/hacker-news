import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://hacker-news.firebaseio.com/v0/item/'

type InitialStateType = {
    news_loading: boolean
    news_error: string | null
    news: NewsType[]
}

type NewsTitleType = "job" | "story" | "comment" | "poll" | "pollopt"

export type NewsType = {
    id: number
    deleted: boolean
    type: NewsTitleType
    by: string
    time: string
    text: string
    dead: boolean
    parent: string
    poll: string
    kids: string
    url: string
    score: number
    title: string
    parts: string
    descendants: number
}

type NewsResponseType = NewsType

const initialState: InitialStateType = {
    news_loading: false,
    news_error: null,
    news: [],
}


export const fetchNews = createAsyncThunk<NewsResponseType[], void, { rejectValue: string }>
('news/fetchNews', async (_, thunkAPI) => {
        try {
            const response = await axios.get<number[]>("https://hacker-news.firebaseio.com/v0/newstories.json")
            const newsIds = response.data.slice(0, 100);
            const requests = newsIds.map((newsId: number) =>
                axios.get<NewsResponseType>(`${url}/${newsId}.json`)
            );
            const responses = await Promise.all(requests);
            const newsList = responses.map(response => response.data);
            return newsList;

        } catch (e) {
            return thunkAPI.rejectWithValue('Some error occured')
        }
    }
)
export const news_slice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchNews.pending, (state) => {
                state.news_loading = true
                state.news_error = null
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.news_loading = false
                state.news = action.payload

            })
            .addCase(fetchNews.rejected, (state) => {
                state.news_loading = false
                state.news_error = 'Error occured'
            })
    }
})
export const {reducer: newsReducer} = news_slice