import React, {ReactElement, useEffect, useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import {setBackendPort, callBackendHealth} from "../api";

function App(): ReactElement {
    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("Init");

    useEffect(() => {
        Promise.resolve(setBackendPort())
            .then((backendPort:string) => {
                console.log("[APP] Backend-Port = " + backendPort)
                callInitialBackendRequests()
            })
            .catch((error:any) => {
                alert("Error: Problems with backend.cfg - " + error)
            })
    });

    function callInitialBackendRequests():void {
        updateVariables()
    }

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
                <p>{backendLiveTime}</p>
            </header>
        </div>
    );
}

export default App;
