import { useNavigate, useParams } from "react-router";
import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {fetchSingleNews} from "../features/news/singlenews_slice";
import {Comments} from "./Comments";

export const SingleNews = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const news = useAppSelector(state => state.singleNews.singlenews)
    useEffect(() => {
        if (!id) return;
        dispatch(fetchSingleNews({ newsId: id }));
    }, [id, dispatch]);




    return (
        <div >
            <button onClick={() => navigate(-1)}>
                назад
            </button>
            <h2 >{news.title}</h2>
            <a href={news.url}>{news.url}</a>
            <div>{news.time}</div>
            <div>{news.by}</div>
            <div>{news.descendants}</div>
            <Comments kids={news.kids} />
        </div>
    );
};