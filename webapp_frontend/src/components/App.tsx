import React, {ReactElement} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import Header from "./basicElements/Header";
import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router";

function App(): ReactElement {


    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Container>
                    <Router/>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
