import React, {useEffect, useState} from 'react';
import '../App.scss';
import {Navbar} from '../components/Navbar';

import {Footer} from "../components/Footer";
import {AppRouter} from "./providers/router/AppRouter";


function App() {


    return (<>
        <Navbar/>
            <AppRouter/>
        <Footer/>
    </>);
}

export default App;
