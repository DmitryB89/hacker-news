import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/providers/store/store";
import {useNavigate} from "react-router-dom";
import {fetchNews} from "./news_slice";


export const NewsList = () => {
    const news = useAppSelector((state) => state.news.news)
    const navigate = useNavigate()

    const [update, setUpdate] = useState(false)
    const dispatch = useAppDispatch()
    const refreshNewsList = () => {
        setUpdate(true)
    }


    useEffect(() => {
        if (!news.length || update) {
            dispatch(fetchNews())
            setUpdate(false)
        }
        const interval = setInterval(() => {
            dispatch(fetchNews())
        }, 60000)
        return () => {
            clearInterval(interval)
        }
    }, [dispatch, news, update])

    return <div>
        <button onClick={() => setUpdate(true)}>refresh</button>
        <ol>
        {news.map((news, i: number) => (
                <div className={'newsContainer'} key={news.id}>
                    <li onClick={() => navigate(`news/${news.id}`)} value={i + 1}
                        className={'newsTitle'}>{news.title}</li>
                    <div className={"newsInfo"}>
                        <div className={'author'}>
                            by {news.by}
                        </div>
                        <div>
                            <b>score:</b> {news.score}
                        </div>
                        <div>
                            <b>comments:</b> {news.descendants}
                        </div>
                        <div>
                            <b>date:</b> {news.time}
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        )}
    </ol>
    </div>
}






