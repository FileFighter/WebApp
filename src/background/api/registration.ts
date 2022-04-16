import Axios, { AxiosError, AxiosResponse } from "axios"
import { hostname, userPath } from "./api"
import { hashPassword } from "../methods/passwords"

/**
 * @interface
 * @param {number} httpStatus
 * @param {string} httpMessage
 * @param {string} [outputMessage]
 */
export interface IRegisterServerResponse {
    httpStatus: number
    httpMessage: string
    outputMessage?: string
}

/**
 * This function takes in a username, password, and passwordConfirmation and registers a new user
 * @param {string} username The username of the user you want to create
 * @param {string} password The password that the user entered
 * @param {string} passwordConfirmation
 * @returns A promise that resolves to an IRegisterServerResponse object.
 */
export const registerNewUser = async (
    username: string,
    password: string,
    passwordConfirmation: string
): Promise<IRegisterServerResponse> => {
    if (password !== passwordConfirmation) {
        throw new Error("Password did not match passwordConfirmation")
    }
    let hashedPassword = await hashPassword(password)

    return new Promise((resolve, reject) => {
        const newUser = {
            username: username,
            password: hashedPassword,
            confirmationPassword: hashedPassword,
        }

        return Axios.post(hostname + userPath + "/register", newUser)
            .then((data: AxiosResponse<object>) => {
                console.log(data)
                const response: IRegisterServerResponse = {
                    httpStatus: data.status,
                    httpMessage: data.statusText,
                }
                if (data.status === 201) {
                    response.outputMessage = "User was successfully created."
                }
                resolve(response)
            })
            .catch((error: AxiosError) => {
                console.log(error.response)
                const response: IRegisterServerResponse = {
                    httpStatus: error.response?.status ?? 500,
                    httpMessage:
                        error.response?.statusText ?? "Internal Server Error",
                    outputMessage:
                        error.response?.data.message ?? "Internal Server Error",
                }
                reject(response)
            })
    })
}
