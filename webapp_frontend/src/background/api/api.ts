import Axios, {} from "axios";
import {constants} from "../constants";

export const hostname: string = constants.url.API_URL;

export const userPath: string = '/v1/users';

export const filesystemPath: string = '/v1/filesystem';


interface BackendHealthData {
    uptimeInSeconds: number;
    userCount: number
}

function callBackendHealth(): Promise<BackendHealthData> {
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

export {callBackendHealth}
