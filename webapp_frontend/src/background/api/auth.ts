import Axios from "axios";


import {hostname, userPath} from "./api";

import {UserState} from "../redux/actions/userTypes";
import store from "../redux/store";
import {addAccessToken, addRefreshToken, checkedCookies, removeTokens} from "../redux/actions/tokens";
import {addUser} from "../redux/actions/user";
import {AccessToken, RemoveTokens, TokensState} from "../redux/actions/tokenTypes";
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
        store.dispatch(addRefreshToken(refreshTokenCookieValue))
        getAccessTokenWithRefreshToken();

    }
    store.dispatch(checkedCookies(true))


}



export const loginWithUsernameAndPassword = (userName: string, password: string,stayLoggedIn:boolean): Promise<BackendLoginData> => {
console.log("[Auth] loginWithUsernameAndPassword")
    return new Promise<BackendLoginData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Basic ${btoa(userName + ':' + password)}`,
            },
        };

        return Axios.get(hostname + userPath + '/login', config)
            .then((data) => {
                console.log(data.data)
                store.dispatch(addRefreshToken(data.data.tokenValue))
                store.dispatch(addUser(data.data.user as UserState))

                if (stayLoggedIn){
                    setCookie(cookieName,data.data.tokenValue,60)
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
            setAuthHeaderToAxios(data.data.tokenValue)

            store.dispatch(addAccessToken({token: data.data.tokenValue, timestamp: data.data.validUntil}as AccessToken));

            //TODO: also get User data here


        })
        .catch(((error) => {
            store.dispatch(removeTokens()as RemoveTokens);

            console.log(error)
            //you probably want to notify the user, maybe with a toast or similar

        }));

}




export const logout=()=>{
    store.dispatch(removeTokens());
    deleteCookie(cookieName);
}

function setAuthHeaderToAxios(accessToken: string) {
    Axios.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`;
}
