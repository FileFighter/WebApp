import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {callBackendHealth} from "../background/api/api";
import Header from "./basicElements/Header";
import {Button, Container, Table} from "react-bootstrap";
import logo from "../assets/images/logos/logo.png";

function Health(): ReactElement {


    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | string>("not reachable");

    const callInitialBackendRequests = useCallback(():void => {
        updateVariables()
    },[]);

    useEffect(() => {
        callInitialBackendRequests()
    }, [callInitialBackendRequests]);

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds);
                setBackendUserCount(backendHealthData.userCount)
            })
    }

    return (
        <div className="App">
            <Header/>
            <Container>
                <h1>
                    FileFighter
                </h1>


                <img src={logo} alt="logo"/>


                <div>
                    <Button className={"mt-3 mb-2 float-right"} onClick={() => updateVariables()}>Refresh</Button>
                    <Table striped bordered hover variant="dark">
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

export default Health;