import Axios, { AxiosResponse } from "axios"

import { hostname, userPath } from "./api"

import { UserState } from "../redux/actions/userTypes"
import store from "../redux/store"
import {
    addAccessToken,
    addRefreshToken,
    checkedCookies,
    removeTokens,
} from "../redux/actions/tokens"
import { AccessToken, CookieStatus } from "../redux/actions/tokenTypes"
import { deleteCookie, getCookie } from "../methods/cookies"
import { updateUser } from "../redux/actions/user"
import { hashPassword } from "../methods/passwords"
import { constants } from "../constants"

// reference: https://daveceddia.com/access-redux-store-outside-react/

const cookieName: string = "refreshToken"

export interface BackendLoginData {
    tokenValue: string
    user: UserState
}

export interface BackendAuthData {
    tokenValue: string
    userId: number
    validUntil: number
}

export const checkForCookie = () => {
    let refreshTokenCookieValue = getCookie(cookieName)
    refreshTokenCookieValue = ""
    if (!refreshTokenCookieValue) {
        return store.dispatch(checkedCookies(CookieStatus.FINISHED))
    }

    store.dispatch(addRefreshToken(refreshTokenCookieValue))
    store.dispatch(checkedCookies(CookieStatus.LOADING))
    getAccessTokenWithRefreshToken()
}

export const loginWithUsernameAndPassword = async (
    userName: string,
    password: string,
    stayLoggedIn: boolean
): Promise<BackendLoginData> => {
    let hashed = await hashPassword(password)
    console.log("[Auth] loginWithUsernameAndPassword", userName, hashed)
    return new Promise<BackendLoginData>((resolve, reject) => {
        Axios.defaults.withCredentials = constants.axios.withCredentials
        let config = {
            headers: {
                Authorization: `Basic ${btoa(userName + ":" + hashed)}`,
            },
        }

        return Axios.post(hostname + userPath + "/authenticate", {}, config)
            .then((response: AxiosResponse) => {
                console.log("Login successful!", response.config.headers)
                store.dispatch(
                    addAccessToken({
                        token: response.config.headers.Authorization,
                        timestamp: 123,
                    } as AccessToken)
                )
                if (stayLoggedIn) {
                    //TODO
                }
                if (!store.getState().user.username) {
                    getOwnUserData()
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getAccessTokenWithRefreshToken = () => {
    console.log("getAccessTokenWithRefreshToken")

    let refreshToken: string | null = store.getState().tokens.refreshToken

    let config = {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    }

    Axios.get<BackendAuthData>(hostname + userPath + "/auth", config)
        .then((data: AxiosResponse<BackendAuthData>) => {
            store.dispatch(checkedCookies(CookieStatus.FINISHED))
            setAuthHeaderToAxios(data.data.tokenValue)

            store.dispatch(
                addAccessToken({
                    token: data.data.tokenValue,
                    timestamp: data.data.validUntil,
                } as AccessToken)
            )
            if (!store.getState().user.username) {
                getOwnUserData()
            }
        })
        .catch((error) => {
            store.dispatch(removeTokens())
            store.dispatch(checkedCookies(CookieStatus.FINISHED))

            console.log(error)
            //you probably want to notify the user, maybe with a toast or similar
        })
}

const getOwnUserData = () => {
    Axios.get<UserState>(`${hostname}${userPath}/info`)
        .then((response: AxiosResponse<UserState>) => {
            store.dispatch(updateUser(response.data))
        })
        .catch((error) => {
            console.log(error)
        })
}

export const logout = () => {
    store.dispatch(removeTokens())
    deleteCookie(cookieName)
}

function setAuthHeaderToAxios(headerString: string) {
    Axios.defaults.headers.common["Authorization"] = headerString
}
