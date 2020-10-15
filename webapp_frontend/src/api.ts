import Axios from "axios";
import {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";

const uri = "localhost:8080";

interface BackendHealthData {
    time: number
}

function callBackendHealth():any{//BackendHealthData{
    return new Promise((resolve, reject) => {
        Axios.get("localhost:8080/health")//`${uri}/health`)
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