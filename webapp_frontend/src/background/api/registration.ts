import Axios, {AxiosError, AxiosResponse} from "axios";
import {hostname, userPath} from "./api";

export interface IRegisterServerResponse {
    httpStatus: number,
    httpMessage: string
    outputMessage?: string
}

export const registerNewUser = (username: string, password: string, passwordConfirmation: string): Promise<IRegisterServerResponse> => {

    return new Promise((resolve, reject) => {
        const newUser = {
            username: username,
            password: password,
            confirmationPassword: passwordConfirmation
        }

        return Axios.post(hostname + userPath + '/register', newUser)
            .then((data: AxiosResponse<object>) => {
                const response: IRegisterServerResponse = {
                    httpStatus: data.status,
                    httpMessage: data.statusText
                }
                if (data.status === 201) {
                    response.outputMessage = "User was successfully created."
                }
                resolve(response);
            })
            .catch((error: AxiosError) => {
                const response: IRegisterServerResponse = {
                    httpStatus: error.response!.status,
                    httpMessage: error.response!.statusText
                }
                if (error.response!.status === 409) {
                    response.outputMessage = "Username is already taken."
                }
                reject(response);
            })
    })
}
