import React, {useEffect, useState} from "react";
import logo from "../../assets/images/logos/logo.png";
import {Button, Table, Container} from "react-bootstrap";
import {callBackendHealth} from "../../background/api/api";
import {audioOnOff, setAudioVolumeByID} from "../../background/methods/sound"
import {logout} from "../../background/api/auth";

export default function Health() {

    // TODO: maybe refactor this?
    const [backendLiveTime, setBackendLiveTime] = useState<number | "not reachable">("not reachable");
    const [backendUserCount, setBackendUserCount] = useState<number | "not reachable">("not reachable");
    const [dataIntegrity, setDataIntegrity] = useState<string | "not reachable">("not reachable");
    const [deployment, setDeployment] = useState<string | "not reachable">("not reachable");
    const [usedStorageInMb, setUsedStorageInMb] = useState<number | "not reachable">("not reachable");
    const [version, setVersion] = useState<string | "not reachable">("not reachable");


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
                setBackendUserCount(backendHealthData.userCount);
                setDataIntegrity(backendHealthData.dataIntegrity);
                setDeployment(backendHealthData.deployment);
                setUsedStorageInMb(backendHealthData.usedStorageInMb);
                setVersion(backendHealthData.version)
            })
            .catch(() => {
                setBackendLiveTime("not reachable");
                setBackendUserCount("not reachable");
                setDataIntegrity("not reachable");
                setDeployment("not reachable");
                setUsedStorageInMb("not reachable");
                setVersion("not reachable")
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
                <Table striped bordered hover id={"ff-heath-table"}>
                    <thead>
                    <tr>
                        <th>System Health</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Deployment Type</td>
                        <td>{deployment}</td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>{version}</td>
                    </tr>
                    <tr>
                        <td>Uptime</td>
                        <td>{backendLiveTime} seconds</td> { /* TODO: implement this as hrs, mins, secs. */}
                    </tr>
                    <tr>
                        <td>Usercount</td>
                        <td>{backendUserCount}</td>
                    </tr>
                    <tr>
                        <td>Used Storage</td>
                        <td>{usedStorageInMb} Mb</td>
                    </tr>
                    <tr>
                        <td>Data Integrity</td> { /* TODO: implement this as img or traffic light. */}
                        <td>{dataIntegrity}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <Button onClick={() => logout()}>Logout</Button>
        </Container>
    )
}
