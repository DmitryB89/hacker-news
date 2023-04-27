import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar} from './components/Navbar';
import {Container, Pagination, TablePagination} from "@mui/material";
import {NewsList} from "./features/news/NewsList";
import {useAppDispatch, useAppSelector} from "./store/store";
import {fetchNews} from "./features/news/news_slice";
import {SingleNews} from "./components/SingleNews";
import {Navigate, Route, Routes} from "react-router";
import {Footer} from "./components/Footer";


function App() {
    const [update, setUpdate] = useState(false)
    const dispatch = useAppDispatch()
    const news = useAppSelector(state => state.news.news)


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

    return (<>
        <Navbar/>

        <Container maxWidth="xl">

            <button onClick={() => setUpdate(true)}>update</button>


            <Routes>
            <Route path={'/'} element={<NewsList/>}/>
            <Route path={'/news/:id'} element={<SingleNews/>}/>
            <Route path={'/404'} element={<div style={{
                display: 'flex',
                textAlign: "center",
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%'
            }}>404 NOT FOUND</div>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>

            <Footer/>

         </Container>
    </>);
}

export default App;
