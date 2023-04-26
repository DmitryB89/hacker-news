import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from './components/Navbar';
import {Container, Pagination, TablePagination} from "@mui/material";
import {NewsTable} from "./components/NewsTable";
import {useAppDispatch, useAppSelector} from "./store/store";
import {fetchNews} from "./features/news_slice";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchNews())
    },[])

    return (<>
        <Navbar/>
        <Container maxWidth="xl">
            <NewsTable/>
{/*<ol>
   <li></li>
</ol>*/}

        </Container>
    </>);
}

export default App;
