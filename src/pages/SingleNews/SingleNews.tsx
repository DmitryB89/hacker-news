import {useNavigate, useParams} from "react-router";
import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/providers/store/store";
import {fetchSingleNews} from "./singlenews_slice";
import {Comments} from "../../features/comments/Comments";
import {ArrowBackIosNewRounded} from '@mui/icons-material';

export const SingleNews = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const news = useAppSelector(state => state.singleNews.singleNews)
    useEffect(() => {
        if (!id) return;
        dispatch(fetchSingleNews({newsId: id}));
    }, [id, dispatch]);


    return (<>
        <div className={'buttonBloc'} onClick={() => navigate(-1)}>
        <ArrowBackIosNewRounded/><span>back to news</span>
        </div>
        <div className={'singlePageWrapper'}>

            <h2>{news.title}</h2>
            <a href={news.url}>{news.url}</a>
            <div>{news.time}</div>
            <div>{news.by}</div>
            <div>{news.descendants}</div>
            <Comments kids={news.kids}/>
        </div>
    </>);
};