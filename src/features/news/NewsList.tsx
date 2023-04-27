import React from 'react';
import { useAppSelector} from "../../store/store";
import {NavLink} from "react-router-dom";


/*type gridTitlesType = GridTitle[]
type GridTitle = {
    id: number
    title: string
}*/
/*const gridTitle: gridTitlesType = [
    {id: 1, title: 'title'},
    {id: 2, title: 'published by'},
    {id: 3, title: 'rating'},
    {id: 4, title: 'comments'},
    {id: 5, title: 'date'},
];*/

export const NewsList = () => {
    const news = useAppSelector((state) => state.news.news)

    return <ul>
        {news.map(news => (
            <ul>
            <NavLink to={`/news/${news.id}`} key={news.id}>{news.title}</NavLink>
            </ul>
        )
        )}
    </ul>
}



