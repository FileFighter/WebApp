import React, {ReactElement, useEffect, useState} from 'react';
import logo from '../assets/images/logos/logo.png';
import './App.css';
import {callBackendHealth} from "../api";
import {Button, Table, Container} from 'react-bootstrap';

function App():ReactElement {
    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | string>("not reachable");

    useEffect(() => {
        updateVariables()
    });

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds);
                setBackendUserCount(backendHealthData.userCount)
            })
    }

    return (
        <div className="App">
            <header className=""> </header>
                <Container>
                <h1>
                    FileFighter
                </h1>


                <img src={logo}  alt="logo"/>



                <div>
                    <Button  className={"mt-3 mb-2 float-right"} onClick={() => updateVariables()}>Refresh</Button>
                    <Table striped bordered hover variant="dark" >
                        <thead>
                        <tr>
                            <th>Backend information</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Uptime</td>
                            <td>{backendLiveTime}</td>
                        </tr>
                        <tr>
                            <td>Usercount</td>
                            <td>{backendUserCount}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                </Container>
        </div>
    );
}

export default App;
