import React, {ReactElement, useEffect, useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import {callBackendHealth} from "../api";
import {Button} from 'react-bootstrap';

function App():ReactElement {
    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("Init");

    useEffect(() => {
        updateVariables()
    });

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds)
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hello World
                </p>


                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button style={{marginTop: "20px"}} onClick={() => updateVariables()}>Test</button>
                <Button>Dieser Bootstrap-Button funktioniert</Button>
                <p>{backendLiveTime}</p>
            </header>
        </div>
    );
}

export default App;
