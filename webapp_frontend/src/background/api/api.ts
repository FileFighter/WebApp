import Axios, {} from "axios";

const hostname:string = window.location.hostname+'/api';


interface BackendHealthData {
    uptimeInSeconds: number;
    userCount: number
}

function callBackendHealth():Promise<BackendHealthData>{
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

export { callBackendHealth}