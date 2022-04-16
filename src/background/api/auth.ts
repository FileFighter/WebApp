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
import { deleteCookie, getCookie, setCookie } from "../methods/cookies"
import { updateUser } from "../redux/actions/user"
import { hashPassword } from "../methods/passwords"

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

/**
 * If there's a refresh token cookie, add it to the store and get an access token with it
 * @returns the dispatch of the action creator checkedCookies.
 */
export const checkForCookie = () => {
    let refreshTokenCookieValue = getCookie(cookieName)
    if (!refreshTokenCookieValue) {
        return store.dispatch(checkedCookies(CookieStatus.FINISHED))
    }

    store.dispatch(addRefreshToken(refreshTokenCookieValue))
    store.dispatch(checkedCookies(CookieStatus.LOADING))
    getAccessTokenWithRefreshToken()
}

/**
 * It takes a username and password, hashes the password, and sends it to the backend. If the backend returns a valid
 * response, it stores the refresh token in the Redux store and in a cookie
 * @param {string} userName The username of the user
 * @param {string} password The password of the user
 * @param {boolean} stayLoggedIn
 * @returns A promise that resolves to a BackendLoginData object.
 */
export const loginWithUsernameAndPassword = async (
    userName: string,
    password: string,
    stayLoggedIn: boolean
): Promise<BackendLoginData> => {
    console.log("[Auth] loginWithUsernameAndPassword", userName)
    let hashed = await hashPassword(password)
    return new Promise<BackendLoginData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Basic ${btoa(userName + ":" + hashed)}`,
            },
        }

        return Axios.get<BackendLoginData>(
            hostname + userPath + "/login",
            config
        )
            .then((data: AxiosResponse<BackendLoginData>) => {
                console.log(data.data)
                store.dispatch(addRefreshToken(data.data.tokenValue))
                store.dispatch(updateUser(data.data.user as UserState))

                if (stayLoggedIn) {
                    setCookie(cookieName, data.data.tokenValue, 60)
                }

                getAccessTokenWithRefreshToken()
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * It gets the refresh token from the Redux store, sends it to the backend, and if the backend returns a new access token,
 * it sets the access token in the Redux store and gets the user data from the backend
 */
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
                getOwnUserData(data.data.userId)
            }
        })
        .catch((error) => {
            store.dispatch(removeTokens())
            store.dispatch(checkedCookies(CookieStatus.FINISHED))

            console.log(error)
            //you probably want to notify the user, maybe with a toast or similar
        })
}

/**
 * @private
 * It makes a GET request to the server, and if the request is successful, it updates the user state in the Redux store
 * @param {number} userId The userId of the user you want to get the data of.
 */
export const getOwnUserData = (userId: number) => {
    Axios.get<UserState>(`${hostname}${userPath}/${userId}/info`)
        .then((response: AxiosResponse<UserState>) => {
            store.dispatch(updateUser(response.data))
        })
        .catch((error) => {
            console.log(error)
        })
}

/**
 * It removes the tokens from the Redux store and deletes the cookie
 */
export const logout = () => {
    store.dispatch(removeTokens())
    deleteCookie(cookieName)
}

/**
 * @private
 * It sets the Authorization header to the Axios instance
 * @param {string} accessToken The access token that you want to set to the header.
 */
export function setAuthHeaderToAxios(accessToken: string) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}
