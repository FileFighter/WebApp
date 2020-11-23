import Axios from "axios";


import {hostname, userPath} from "./api";

import {AddUser, UserState} from "../redux/actions/userTypes";
import store from "../redux/store";
import {addAccessToken, addRefreshToken} from "../redux/actions/tokens";
import {addUser} from "../redux/actions/user";
import {AccessToken, AddAccessToken, AddRefreshToken, TokensState} from "../redux/actions/tokenTypes";


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
                store.dispatch(addRefreshToken(data.data.refreshToken) as AddRefreshToken)
                store.dispatch(addUser(data.data.user as UserState) as AddUser)

                getAccessTokenWithRefreshToken()
            })
            .catch(((error) => {

                reject(error);
            }))


    })
}

export const getAccessTokenWithRefreshToken = () => {
    console.log("getAccessTokenWithRefreshToken")

    let refreshToken: string|null = (store.getState().tokens as TokensState).refreshToken;

    let config = {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    };

    Axios.get(hostname + userPath + '/auth', config)
        .then((data) => {
            setAuthHeaderToAxios(data.data.token)

            store.dispatch(addAccessToken({token: data.data.token, timestamp: data.data.validUntil}as AccessToken) as AddAccessToken);

        })
        .catch(((error) => {
            console.log(error)
        }));

}

function setAuthHeaderToAxios(accessToken: string) {
    Axios.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`;
}