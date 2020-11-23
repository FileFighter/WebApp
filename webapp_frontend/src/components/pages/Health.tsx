import React, {useEffect, useState} from "react";
import logo from "../../assets/images/logos/logo.png";
import {Button, Table} from "react-bootstrap";
import {callBackendHealth} from "../../background/api/api";
import {audioOnOff, setAudioVolumeByID} from "../../background/methods/sound"

export default function Health() {

    const [backendLiveTime, setBackendLiveTime] = useState<number | string>("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | string>("not reachable");

    useEffect(() => {
        updateVariables()
    },[]);

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([backendHealthData]) => {
                setBackendLiveTime(backendHealthData.uptimeInSeconds);
                setBackendUserCount(backendHealthData.userCount)
            })
    }

    return (
        <>
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
        </>
    )
}