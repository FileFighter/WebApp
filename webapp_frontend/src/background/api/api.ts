import Axios, { } from "axios";
import { constants } from "../constants";

export const hostname: string = constants.url.API_URL;

export const userPath: string = '/v1/users';

export const filesystemPath: string = '/v1/filesystem';

enum DataIntegrity {
    STABLE = "systemHealth/traffic_green.png",
    POSSIBLE_RISK = "systemHealth/traffic_yellow.png",
    UNSTABLE = "systemHealth/traffic_red.png"
}

interface SystemHealthData {
    uptimeInSeconds: number;
    userCount: number;
    dataIntegrity: string;
    deployment: string;
    usedStorageInMb: number;
    version: string;
}

function callBackendHealth(): Promise<SystemHealthData> {
    return new Promise((resolve, reject) => {
        Axios.get(`${hostname}/health`)
            .then((data) => {
                resolve(data.data);
            })
            .catch(((error) => {
                reject(error);
            }));
    });
}

export { callBackendHealth, DataIntegrity };
export type { SystemHealthData };