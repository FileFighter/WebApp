import Axios from "axios";

const uri = "http://localhost:8080";

interface BackendHealthData {
    uptimeInSeconds: number
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

export {callBackendHealth}