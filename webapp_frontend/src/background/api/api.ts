import Axios, {AxiosResponse} from "axios";

let uri:string;
const hostname:string = window.location.hostname;
const backendPortFilePath:string = "./backend.cfg";

function setBackendPort():Promise<string>{
    return new Promise((resolve, reject) => {
        Axios.get(backendPortFilePath)
            .then((data:AxiosResponse<string>) => {
                uri = hostname + ":" + data.data;
                console.log(`[API] ${uri}`)
                resolve(data.data);
            })
            .catch(((error:any) => {
                reject(error);
            }));
    });
}

interface BackendHealthData {
    uptimeInSeconds: number;
    userCount: number
}

function callBackendHealth():Promise<BackendHealthData>{
    return new Promise((resolve, reject) => {
        Axios.get(`${uri}/health`)
            .then((data) => {
                resolve(data.data);
            })
            .catch(((error) => {
                reject(error);
            }));
    });
}

export {setBackendPort, callBackendHealth}