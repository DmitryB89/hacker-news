import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar';
import {Container, Pagination, TablePagination} from "@mui/material";
import {NewsTable} from "./components/NewsTable";

function App() {
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
