import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://hacker-news.firebaseio.com/v0/item/'

type InitialStateType = {
    singlenews_loading: boolean
    singlenews_error: string | null
    singlenews: NewsType
}

type NewsTitleType = "job" | "story" | "comment" | "poll" | "pollopt"

export type NewsType = {
    by: string;
    descendants: number;
    id: number;
    score: number;
    time: number;
    title: string;
    type: NewsTitleType;
    url: string;
    kids: number[];
}


const initialState: InitialStateType = {
    singlenews_loading: false,
    singlenews_error: null,
    singlenews: {
        by: "",
        descendants: 0,
        id: 0,
        score: 0,
        time: 0,
        title: "",
        type: "story",
        url: "",
        kids: [],
    }
}

/*export const fetchAloneNews = createAsyncThunk<
    ItemsSchema,
    { newsId: string },
    { rejectValue: string }
>("news/fetchNews", async ({ newsId }, thunkAPI) => {
    try {
        const res = await axios.get<ItemsSchema>(${apiUrl}/item/${newsId}.json);
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue("error");
    }
});*/


export const fetchSingleNews = createAsyncThunk<NewsType, { newsId:string }, { rejectValue: string }>
('singleNews/fetchSingleNews', async ({ newsId }, thunkAPI) => {
        try {
           const response = await axios.get(`${url}/${newsId}.json`)
            return response.data

        } catch (e) {
            return thunkAPI.rejectWithValue('Some error occured')
        }
    }
)
export const singlenews_slice = createSlice({
    name: 'singleNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchSingleNews.pending, (state) => {
                state.singlenews_loading = true
                state.singlenews_error = null
            })
            .addCase(fetchSingleNews.fulfilled, (state, action) => {
                state.singlenews_loading = false
                state.singlenews = action.payload

            })
            .addCase(fetchSingleNews.rejected, (state) => {
                state.singlenews_loading = false
                state.singlenews_error = 'Error occured'
            })
    }
})
export const {reducer: singleNews} = singlenews_slice