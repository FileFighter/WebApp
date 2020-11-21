import Axios from "axios";


import {hostname, userPath} from "./api";

import {UserState} from "../redux/actions/userTypes";


export interface BackendLoginData {
    refreshToken: string,
    user: UserState

}

export const loginWithUsernameAndPassword = (userName: string, password: string): Promise<BackendLoginData> => {

    return new Promise<BackendLoginData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Basic ${btoa(userName + ':' + password)}`,
            },
        };

        return Axios.get(hostname + userPath + '/login', config)
            .then((data) => {
                resolve(data.data)
            })
            .catch(((error) => {
                reject(error);
            }));
    })
}

export interface BackendAuthData {
    token: string,
    userId: number,
    validUntil: number
}


export const getAccessTokenWithRefreshToken = (refreshToken: string): Promise<BackendAuthData> => {

    return new Promise<BackendAuthData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        };

        return Axios.get(hostname + userPath + '/auth', config)
            .then((data) => {
                resolve(data.data)
            })
            .catch(((error) => {
                reject(error);
            }));
    })
}

