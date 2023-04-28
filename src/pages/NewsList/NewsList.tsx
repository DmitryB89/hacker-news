import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/providers/store/store";
import {useNavigate} from "react-router-dom";
import {fetchNews} from "./news_slice";
import {dateHandler} from "../../shared/utils/dateHandler";


export const NewsList = () => {
    const news = useAppSelector((state) => state.news.news)

    const navigate = useNavigate()

    const [update, setUpdate] = useState(false)
    const dispatch = useAppDispatch()



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

    return <div className={'newsListWrapper'}>
        <button onClick={() => setUpdate(true)}>refresh</button>
        <ol className={'newsList'}>
        {news.map(({by, descendants, id, score, time, title}, i: number) => (
            <div  key={id}>
                    <li onClick={() => navigate(`news/${id}`)} value={i + 1}
                        className={'newsTitle'}>{title}</li>
                    <div className={"newsInfo"}>
                        <div className={'author'}>
                            by {by}
                        </div>
                        <div>
                            <b>Score:</b> {score}
                        </div>
                        <div>
                            <b>Comments:</b> {descendants}
                        </div>
                        <div>
                            <b>Date:</b> {dateHandler(time)}
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        )}
    </ol>
    </div>
}






