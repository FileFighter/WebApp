import React, {ReactElement, useEffect, useState} from 'react';
import logo from '../assets/images/logos/logo.png';
import './App.css';
import {setBackendPort, callBackendHealth} from "../background/api/api";


import {Button, Table, Container} from 'react-bootstrap';
import Header from "./basicElements/Header";

function App():ReactElement {



    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | string>("not reachable");





    useEffect(() => {
        Promise.resolve(setBackendPort())
            .then((backendPort:string) => {
                console.log("[APP] Backend-Port = " + backendPort)
                callInitialBackendRequests()
            })
            .catch((error:any) => {
                alert("Error: Problems with backend.cfg - " + error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function callInitialBackendRequests():void {
        updateVariables()
    }

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds);
                setBackendUserCount(backendHealthData.userCount)
            })
    }

    return (
        <div className="App">
            <Header></Header>
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
