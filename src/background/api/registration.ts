import Axios, { AxiosError, AxiosResponse } from "axios"
import { hostname, userPath } from "./api"
import { hashPassword } from "../methods/passwords"

export interface IRegisterServerResponse {
    httpStatus: number
    httpMessage: string
    outputMessage?: string
}

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
            privileges: "USER",
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
