import Axios from "axios"
import { constants } from "../constants"
import exp from "constants"

export const hostname: string = constants.url.API_URL

export const userPath: string = "/v1/users"

export const filesystemPath: string = "/v1/filesystem/"

enum DataIntegrity {
    STABLE = "bg-success",
    POSSIBLE_RISK = "bg-warning",
    UNSTABLE = "bg-danger",
}

export interface SystemHealthData {
    /** how long since system started */
    uptimeInSeconds: number
    /** number of registered users */
    userCount: number
    /** status of data integrity (stable, possible risk, unstable) */
    dataIntegrity: string
    deployment: string
    /** size of all stored data in bytes */
    usedStorageInBytes: number
    /** system's version */
    version: string
}

/**
 * It returns a promise that resolves to a SystemHealthData object
 * @returns A promise that resolves to a SystemHealthData object.
 */
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
