import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {newsReducer} from '../../../pages/NewsList/news_slice'
import {commentsReducer} from "../../../features/comments/comments_slice";
import {singleNews} from "../../../pages/SingleNews/singlenews_slice";
export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
        singleNews: singleNews
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


