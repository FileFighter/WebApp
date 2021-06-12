import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logos/logo.png";
import { Container, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import {
    callBackendHealth,
    DataIntegrity,
    SystemHealthData
} from "../../../background/api/api";
import {
    audioOnOff,
    setAudioVolumeByID
} from "../../../background/methods/sound";
import { getDurationAsString } from "../../../background/methods/dataTypes/time";
import { hasKey } from "../../../background/methods/dataTypes/objects/ObjectKeysTS";
import { formatBytes } from "../../../background/methods/dataTypes/bytes";
import { FFLoading } from "../../basicElements/Loading";
import traffic_light from "../../../assets/images/icons/material.io/traffic_light.svg";

export default function Health() {
    const [systemHealthData, setSystemHealthData] = useState<
        SystemHealthData | null | "loading"
    >("loading");
    const errorMsg = "not reachable";

    useEffect(() => {
        updateVariables();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateVariables();
        }, 60000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    function updateVariables(): void {
        Promise.all([callBackendHealth()])
            .then(([data]) => {
                setSystemHealthData(data);
            })
            .catch(() => {
                setSystemHealthData(null);
            });
    }

    function getPathOfDataIntegrity(dataIntegrity: string): string {
        if (hasKey(DataIntegrity, dataIntegrity)) {
            return DataIntegrity[dataIntegrity];
        }
        console.log("[HEALTH] Couldn't parse SystemHealth string to enum.");
        return errorMsg;
    }

    function HealthContainer(): JSX.Element {
        if (systemHealthData === null) {
            return <p>{errorMsg}</p>;
        }
        if (systemHealthData === "loading") {
            return <FFLoading />;
        } else {
            return (
                <Container>
                    <Table striped bordered hover id={"ff-heath-table"}>
                        <thead>
                            <tr>
                                <th>System Health</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Deployment Type</td>
                                <td>{systemHealthData.deployment}</td>
                            </tr>
                            <tr>
                                <td>Version</td>
                                <td>{systemHealthData.version}</td>
                            </tr>
                            <tr>
                                <td>Uptime</td>
                                <td>
                                    {getDurationAsString(
                                        systemHealthData.uptimeInSeconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Usercount</td>
                                <td>{systemHealthData.userCount}</td>
                            </tr>
                            <tr>
                                <td>Used Storage</td>
                                <td>
                                    {formatBytes(
                                        systemHealthData.usedStorageInBytes
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Data Integrity</td>
                                <td>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                            <Tooltip
                                                id="button-tooltip"
                                                className={"pl-3"}
                                            >
                                                {systemHealthData.dataIntegrity}
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className={getPathOfDataIntegrity(
                                                systemHealthData.dataIntegrity
                                            )}
                                            src={traffic_light}
                                            alt={systemHealthData.dataIntegrity}
                                        />
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            );
        }
    }

    return (
        <Container>
            <h1>FileFighter</h1>

            <img
                src={logo}
                alt="Logo FileFighter"
                onClick={() => {
                    setAudioVolumeByID("audio_viking", 0.5);
                    audioOnOff("audio_viking");
                }}
            />

            <HealthContainer />
        </Container>
    );
}
