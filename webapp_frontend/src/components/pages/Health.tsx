import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logos/logo.png";
import { Button, Table, Container } from "react-bootstrap";
import { callBackendHealth, DataIntegrity } from "../../background/api/api";
import { audioOnOff, setAudioVolumeByID } from "../../background/methods/sound"
import { logout } from "../../background/api/auth";
import { getDurationAsString } from "../../background/methods/time";
import { hasKey } from "../../background/methods/ObjectKeysTS";

export default function Health() {

    // TODO: maybe refactor this?
    const [uptimeInSeconds, setUptimeInSeconds] = useState<number | "not reachable">("not reachable");
    const [userCount, setUserCount] = useState<number | "not reachable">("not reachable");
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
                setUptimeInSeconds(backendHealthData.uptimeInSeconds);
                setUserCount(backendHealthData.userCount);
                setDataIntegrity(backendHealthData.dataIntegrity);
                setDeployment(backendHealthData.deployment);
                setUsedStorageInMb(backendHealthData.usedStorageInMb);
                setVersion(backendHealthData.version)
            })
            .catch(() => {
                setUptimeInSeconds("not reachable");
                setUserCount("not reachable");
                setDataIntegrity("not reachable");
                setDeployment("not reachable");
                setUsedStorageInMb("not reachable");
                setVersion("not reachable")
            })
    }

    function transformToUptime(): string {
        if (uptimeInSeconds === "not reachable") {
            return uptimeInSeconds
        } else {
            return getDurationAsString(uptimeInSeconds)
        }
    }

    function getPathOfDataIntegrity(): string {
        if (dataIntegrity === "not reachable") {
            return "not reachable"
        } else {
            if (hasKey(DataIntegrity, dataIntegrity)) {
                return DataIntegrity[dataIntegrity]
            }
            console.log("[HEALTH] Couldn't parse SystemHealth string to enum.")
            return "not reachable"
        }
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
                            <td>{transformToUptime()}</td>
                        </tr>
                        <tr>
                            <td>Usercount</td>
                            <td>{userCount}</td>
                        </tr>
                        <tr>
                            <td>Used Storage</td>
                            <td>{usedStorageInMb} Mb</td>
                        </tr>
                        <tr>
                            <td>Data Integrity</td>
                            <td><img src={getPathOfDataIntegrity()} alt={dataIntegrity}></img></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Button onClick={() => logout()}>Logout</Button>
        </Container>
    )
}
