import Axios from "axios"
import { constants } from "../constants"

export const hostname: string = constants.url.API_URL

export const userPath: string = "/api/user"

export const filesystemPath: string = "/api/filesystem/"

enum DataIntegrity {
    STABLE = "bg-success",
    POSSIBLE_RISK = "bg-warning",
    UNSTABLE = "bg-danger",
}

interface SystemHealthData {
    uptimeInSeconds: number
    userCount: number
    dataIntegrity: string
    deployment: string
    usedStorageInBytes: number
    version: string
}

function callBackendHealth(): Promise<SystemHealthData> {
    return new Promise((resolve, reject) => {
        Axios.get(`${hostname}/health`)
            .then((data) => {
                resolve(data.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export { callBackendHealth, DataIntegrity }
export type { SystemHealthData }
