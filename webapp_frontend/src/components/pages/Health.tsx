import React, {useEffect, useState} from "react";
import logo from "../../assets/images/logos/logo.png";
import {Button, Table, Container} from "react-bootstrap";
import {callBackendHealth} from "../../background/api/api";
import {audioOnOff, setAudioVolumeByID} from "../../background/methods/sound"
import {logout} from "../../background/api/auth";

export default function Health() {

    const [backendLiveTime, setBackendLiveTime] = useState<number | "not reachable">("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | "not reachable">("not reachable");

    useEffect(() => {
        updateVariables();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            updateVariables()
        }, 60000)
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds);
                setBackendUserCount(backendHealthData.userCount)
            })
            .catch(() => {
                setBackendLiveTime("not reachable");
                setBackendUserCount("not reachable");
            })
    }

    return (
        <Container>
            <h1>
                FileFighter
            </h1>

            <img
                src={logo}
                alt="Logo FileFighter"
                onClick={() => {
                    setAudioVolumeByID("audio_viking", 0.5)
                    audioOnOff("audio_viking")
                }}
            />


            <div>
                <Table striped bordered hover>
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
            <Button onClick={() => logout()}>Logout</Button>
        </Container>
    )
}
