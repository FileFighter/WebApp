import Axios, {AxiosResponse} from "axios";

let uri:string = 'api';
const hostname:string = window.location.hostname;


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

export { callBackendHealth}