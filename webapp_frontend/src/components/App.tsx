import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import {callBackendHealth} from "../api";

function App() {
  const[test,setTest] = useState("test");

  useEffect(() => {
    Promise.all([callBackendHealth()])
        .then(([backendHealthData]) => {
          setTest(backendHealthData.uptimeInSeconds)
        })
  }, [test]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World
        </p>
        <img src={logo} className="App-logo" alt="logo" />
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
        <button onClick={() => setTest(callBackendHealth().data)}>Test</button>
        <p>{test}</p>
      </header>
    </div>
  );
}

export default App;
