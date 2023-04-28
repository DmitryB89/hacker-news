import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../shared/constants/baseUrl";
import {CommentsType, InitialStateType} from "./CommentsTypes";

const initialState: InitialStateType = {
    comments_loading: false,
    comments_error: null,
    comments: [],
    childrenComments: []
}


export const fetchComments = createAsyncThunk<CommentsType[], number[], { rejectValue: string }>
('comments/fetchComments', async (ids, thunkAPI) => {
        try {
            const requests = ids.map((commentID: number) =>
                axios.get<CommentsType>(`${apiUrl}/item/${commentID}.json`)
            );
            const responses = await Promise.all(requests);
            return responses.map((response) => response.data);


        } catch (e) {
            return thunkAPI.rejectWithValue('Some error occured')
        }
    }
)

export const fetchChildrenComments = createAsyncThunk<
    CommentsType[],
    number[],
    { rejectValue: string }
>('comments/fetchChildrenComments', async (ids, thunkAPI) => {
    try {
        const requests = ids.map((commentID: number) =>
            axios.get<CommentsType>(`${apiUrl}/item/${commentID}.json`)
        )
        const responses = await Promise.all(requests)

        return responses.map(response => response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue('error')
    }
})

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
            .addCase(fetchChildrenComments.pending, state => {
                state.comments_loading = true
                state.comments_error = null
            })
            .addCase(fetchChildrenComments.fulfilled, (state, action) => {
                state.comments_loading = false
                state.childrenComments = action.payload
            })
            .addCase(fetchChildrenComments.rejected, (state, action) => {
                state.comments_loading = false
                state.comments_error = action.error.message || null
            })
    }
})
export const {reducer: commentsReducer} = comments_slice