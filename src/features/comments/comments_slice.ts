import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://hacker-news.firebaseio.com/v0/item/'

type InitialStateType = {
    comments_loading: boolean
    comments_error: string | null
    comments: CommentsType[]
}

export type CommentsType = {
    by: string;
    id: number;
    parent: number;
    time: number;
    text: string;
    type: string;
    kids: number[];
}


const initialState: InitialStateType = {
    comments_loading: false,
    comments_error: null,
    comments: [],
}


export const fetchComments = createAsyncThunk<CommentsType[], number[], { rejectValue: string }>
('comments/fetchComments', async (ids, thunkAPI) => {
        try {
            const requests = ids.map((commentID: number) =>
                axios.get<CommentsType>(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`)
            );
            const responses = await Promise.all(requests);
            const commentsList = responses.map((response) => response.data);
            return commentsList;

        } catch (e) {
            return thunkAPI.rejectWithValue('Some error occured')
        }
    }
)
export const comments_slice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchComments.pending, (state) => {
                state.comments_loading = true
                state.comments_error = null
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments_loading = false
                state.comments = action.payload

            })
            .addCase(fetchComments.rejected, (state) => {
                state.comments_loading = false
                state.comments_error = 'Error occured'
            })
    }
})
export const {reducer: commentsReducer} = comments_slice