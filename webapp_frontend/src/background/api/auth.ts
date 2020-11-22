import Axios from "axios";


import {hostname, userPath} from "./api";

import {AddUser, UserState} from "../redux/actions/userTypes";
import store from "../redux/store";
import {addAccessToken, addRefreshToken, checkedCookies, removeTokens} from "../redux/actions/tokens";
import {addUser} from "../redux/actions/user";
import {AccessToken, AddAccessToken, AddRefreshToken, CheckedCookies, RemoveTokens, TokensState} from "../redux/actions/tokenTypes";
import {deleteCookie, getCookie, setCookie} from "../methods/cookies";


// reference: https://daveceddia.com/access-redux-store-outside-react/


const cookieName:string='refreshToken';

export interface BackendLoginData {
    refreshToken: string,
    user: UserState

}


export const checkForCookie=()=>{
    let refreshTokenCookieValue=getCookie(cookieName)
    if (refreshTokenCookieValue){
        store.dispatch(addRefreshToken(refreshTokenCookieValue) as AddRefreshToken)
        getAccessTokenWithRefreshToken();
    }
    store.dispatch(checkedCookies(true) as CheckedCookies)


}



export const loginWithUsernameAndPassword = (userName: string, password: string,stayLoggedIn:boolean): Promise<BackendLoginData> => {

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

                if (stayLoggedIn){
                    setCookie(cookieName,data.data.refreshToken,60)
                }


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
            store.dispatch(removeTokens()as RemoveTokens);

            console.log(error)
            //you probably want to notify the user, maybe with a toast or similar
        }));

}

export const logout=()=>{
    store.dispatch(removeTokens()as RemoveTokens);
    deleteCookie(cookieName);
}

function setAuthHeaderToAxios(accessToken: string) {
    Axios.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`;
}


