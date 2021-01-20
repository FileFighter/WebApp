import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logos/logo.png";
import { Button, Table, Container } from "react-bootstrap";
import { callBackendHealth, DataIntegrity, SystemHealthData } from "../../background/api/api";
import { audioOnOff, setAudioVolumeByID } from "../../background/methods/sound"
import { logout } from "../../background/api/auth";
import { getDurationAsString } from "../../background/methods/time";
import { hasKey } from "../../background/methods/ObjectKeysTS";

export default function Health() {

    const [systemHealthData, setSystemHealthData] = useState<SystemHealthData | null>(null);
    const errorMsg = "not reachable";

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
            .then(([data]) => {
                setSystemHealthData(data)
            })
            .catch(() => {
                setSystemHealthData(null)
            })
    }

    function transformToUptime(): string {
        if (null === systemHealthData) {
            return errorMsg
        } else {
            return getDurationAsString(systemHealthData.uptimeInSeconds)
        }
    }

    function getPathOfDataIntegrity(): string {
        if (null === systemHealthData) {
            return errorMsg
        } else {
            if (hasKey(DataIntegrity, systemHealthData.dataIntegrity)) {
                return DataIntegrity[systemHealthData.dataIntegrity]
            }
            console.log("[HEALTH] Couldn't parse SystemHealth string to enum.")
            return errorMsg
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
                            <td>{(systemHealthData === null || systemHealthData.deployment === null) ? errorMsg : systemHealthData.deployment}</td>
                        </tr>
                        <tr>
                            <td>Version</td>
                            <td>{(systemHealthData === null || systemHealthData.version === null) ? errorMsg : systemHealthData.version}</td>
                        </tr>
                        <tr>
                            <td>Uptime</td>
                            <td>{transformToUptime()}</td>
                        </tr>
                        <tr>
                            <td>Usercount</td>
                            <td>{(systemHealthData === null || systemHealthData.userCount === null) ? errorMsg : systemHealthData.userCount}</td>
                        </tr>
                        <tr>
                            <td>Used Storage</td>
                            <td>{(systemHealthData === null || systemHealthData.usedStorageInMb === null) ? errorMsg : systemHealthData.usedStorageInMb}</td>
                        </tr>
                        <tr>
                            <td>Data Integrity</td>
                            <td><img src={getPathOfDataIntegrity()} alt={(systemHealthData === null || systemHealthData.dataIntegrity === null) ? errorMsg : systemHealthData.dataIntegrity}></img></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Button onClick={() => logout()}>Logout</Button>
        </Container>
    )
}
