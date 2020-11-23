import {AccessToken, TokensState} from "../redux/actions/tokenTypes";
import store from "../redux/store";
import Axios, {AxiosError, AxiosResponse} from "axios";
import {hostname} from "./api";
import {UserState} from "../redux/actions/userTypes";

export interface BackendRegistrationData {
    user:UserState
}

export const registerNewUser = (username: string, password: string, passwordConfirmation: string): Promise<BackendRegistrationData> => {

    let accessToken: AccessToken|null = (store.getState().tokens as TokensState).accessToken;

    return new Promise<BackendRegistrationData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            payload: {
                username: username,
                password: password,
                confirmationPassword: passwordConfirmation
            }
        };

        return Axios.get(hostname + username + "/register", config)
            .then((data:AxiosResponse<object>) => {
                console.log(data.status + ": " + data.statusText);
                alert(data.status + ": " + data.statusText);
            })
            .catch((error:AxiosError) => {
                //if(error.response!.status === 409){
                console.log("Error " + error.response!.status + ": " + error.response!.statusText);
                //}
                reject(error);
            })
    })
}