import React, {ReactElement} from 'react';
import './App.css';


import {Container} from 'react-bootstrap';
import Header from "./basicElements/Header";
import {Health} from "./health/Health";

function App(): ReactElement {


    return (
        <div className="App">
            <Header/>
            <Container>
                <Health/>
            </Container>
        </div>
    );
}

export default App;
