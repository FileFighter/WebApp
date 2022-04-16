import Axios from "axios"
import { constants } from "../constants"

export const hostname: string = constants.url.API_URL

export const userPath: string = "/v1/users"

export const filesystemPath: string = "/v1/filesystem/"

enum DataIntegrity {
    STABLE = "bg-success",
    POSSIBLE_RISK = "bg-warning",
    UNSTABLE = "bg-danger",
}

/**
 * @interface
 * @param {number} uptimeInSeconds how long since system started
 * @param {number} userCount number of registered users
 * @param {string} dataIntegrity status of data integrity (stable, possible risk, unstable)
 * @param {string} deployment
 * @param {number} usedStorageInBytes size of all stored data in bytes
 * @param {string} version system's version
 */
interface SystemHealthData {
    uptimeInSeconds: number
    userCount: number
    dataIntegrity: string
    deployment: string
    usedStorageInBytes: number
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
export type { SystemHealthData }
