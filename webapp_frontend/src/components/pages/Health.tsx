import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logos/logo.png";
import { Button, Table, Container } from "react-bootstrap";
import {
  callBackendHealth,
  DataIntegrity,
  SystemHealthData,
} from "../../background/api/api";
import { audioOnOff, setAudioVolumeByID } from "../../background/methods/sound";
import { logout } from "../../background/api/auth";
import { getDurationAsString } from "../../background/methods/time";
import { hasKey } from "../../background/methods/ObjectKeysTS";
import { formatBytes } from "../../background/methods/bytes";
import { FFLoading } from "../../components/basicElements/Loading";

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
                  <td>{systemHealthData.deployment}</td>
                </tr>
                <tr>
                  <td>Version</td>
                  <td>{systemHealthData.version}</td>
                </tr>
                <tr>
                  <td>Uptime</td>
                  <td>
                    {getDurationAsString(systemHealthData.uptimeInSeconds)}
                  </td>
                </tr>
                <tr>
                  <td>Usercount</td>
                  <td>{systemHealthData.userCount}</td>
                </tr>
                <tr>
                  <td>Used Storage</td>
                  <td>{formatBytes(systemHealthData.usedStorageInBytes)}</td>
                </tr>
                <tr>
                  <td>Data Integrity</td>
                  <td>
                    <img
                      src={getPathOfDataIntegrity(
                        systemHealthData.dataIntegrity
                      )}
                      alt={systemHealthData.dataIntegrity}
                    ></img>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button onClick={() => logout()}>Logout</Button>
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
