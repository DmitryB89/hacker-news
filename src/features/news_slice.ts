import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://hacker-news.firebaseio.com/v0/newstories.json"


type InitialStateType = {
    news_loading: boolean
    news_error: string | null
    news:NewsType[]
    latestNewsIds:number[]

}

type NewsTitleType = "job" | "story" | "comment" | "poll" | "pollopt"

export type NewsType = {
    id:string
    deleted:boolean
    type: NewsTitleType
    by:string
    time:string
    text:string
    dead:boolean
    parent:string
    poll:string
    kids:string
    url:string
    score:number
    title:string
    parts:string
    descendants:number
}
type ProductsResponseType = number[]

const initialState: InitialStateType = {
    news_loading: false,
    news_error: null,
    news:[],
    latestNewsIds:[]
}

export const fetchNews = createAsyncThunk<ProductsResponseType, void, { rejectValue: string }>(
    'news/fetchNews',
    async (_, thunkAPI) => {

        try {
            const response = await axios.get<ProductsResponseType>(baseUrl)

            return response.data
            console.log(response.data)

        } catch (e) {
            return thunkAPI.rejectWithValue('Some error occured')
        }
    }
)



export const news_slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
           },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.news_loading = true
                state.news_error = null
            })
            .addCase(fetchNews.fulfilled, (state,action) => {
                // state.news = action.payload
                state.news_loading = false
                state.latestNewsIds=action.payload



            })
            .addCase(fetchNews.rejected, (state) => {
                state.news_loading = false
                state.news_error = 'Error occured'
            })

    }

})
export default news_slice.reducer
