import React, {ReactElement} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import Header from "./basicElements/Header";
import Footer from "./basicElements/Footer";
import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router";
import PermanentAssets from "./basicElements/PermanentAssets";

function App(): ReactElement {


    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Container>
                    <Router/>
                </Container>
                <Footer/>
                <PermanentAssets/>
            </BrowserRouter>
        </div>
    );
}

export default App;
