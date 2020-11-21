import Axios from "axios";


import {hostname, userPath} from "./api";

import {UserState} from "../redux/actions/userTypes";
import store from "../redux/store";
import {addAccessToken, addRefreshToken} from "../redux/actions/tokens";
import {addUser} from "../redux/actions/user";


// reference: https://daveceddia.com/access-redux-store-outside-react/

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
                // @ts-ignore
                store.dispatch(addRefreshToken(data.data.refreshToken))
                // @ts-ignore
                store.dispatch(addUser(data.data.user))
                // resolve(data.data)
                getAccessTokenWithRefreshToken()
            })
            .catch(((error) => {

                reject(error);
            }))


    })
}

/*export interface BackendAuthData {
    token: string,
    userId: number,
    validUntil: number
}*/


export const getAccessTokenWithRefreshToken = () => {
    console.log("getAccessTokenWithRefreshToken")
    // @ts-ignore
    let refreshToken: string = store.getState().tokens.refreshToken;

    let config = {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    };

    Axios.get(hostname + userPath + '/auth', config)
        .then((data) => {
            setAuthHeaderToAxios(data.data.token)
            // @ts-ignore
            store.dispatch(addAccessToken({token: data.data.token, timestamp: data.data.validUntil}))

        })
        .catch(((error) => {
            console.log(error)
        }));

}

function setAuthHeaderToAxios(accessToken: string) {
    Axios.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`;
}


