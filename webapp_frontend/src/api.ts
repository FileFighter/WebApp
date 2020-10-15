import Axios from "axios";
import {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";

const uri = "http://localhost:8080";

interface BackendHealthData {
    uptimeInSeconds: number
}

function callBackendHealth():any{//BackendHealthData{
    return new Promise((resolve, reject) => {
        Axios.get(`${uri}/health`)
            .then((data) => {
                resolve(data.data);
            })
            .catch(((error) => {
                console.log(error)
                //reject(error);
            }));
    });
}

export {callBackendHealth}