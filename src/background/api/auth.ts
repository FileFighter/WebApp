import Axios, { AxiosResponse } from "axios"

import { hostname, userPath } from "./api"

import { UserState } from "../redux/actions/userTypes"
import store from "../redux/store"
import {
    addAccessToken,
    checkedCookies,
    removeTokens,
} from "../redux/actions/tokens"
import { AccessToken, CookieStatus } from "../redux/actions/tokenTypes"
import { deleteCookie } from "../methods/cookies"
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

const setUpAxios = () => {
    Axios.defaults.withCredentials = constants.axios.withCredentials
}

export const checkForCookie = () => {
    console.log("Checking for cookies")
    setUpAxios()
    store.dispatch(checkedCookies(CookieStatus.LOADING))
    getOwnUserData()
        .then(() => {
            store.dispatch(checkedCookies(CookieStatus.FINISHED))
        })
        .catch(() => {
            store.dispatch(checkedCookies(CookieStatus.FINISHED))
        })
}

export const loginWithUsernameAndPassword = async (
    userName: string,
    password: string,
    stayLoggedIn: boolean
): Promise<BackendLoginData> => {
    let hashed = await hashPassword(password)
    console.log("[Auth] loginWithUsernameAndPassword", userName, hashed)
    return new Promise<BackendLoginData>((resolve, reject) => {
        let config = {
            headers: {
                Authorization: `Basic ${btoa(userName + ":" + hashed)}`,
            },
        }

        return Axios.post(hostname + userPath + "/authenticate", {}, config)
            .then((response: AxiosResponse) => {
                console.log("Login successful!", response.config.headers)
                getOwnUserData()
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

const getOwnUserData = async () => {
    console.log("getOwnUserData")
    return new Promise(async (resolve, reject) => {
        console.log("getOwnUserData Call")
        try {
            const response = await Axios.get<UserState>(
                `${hostname}${userPath}/info`
            )
            store.dispatch(updateUser(response.data))
            resolve(null)
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

export const logout = () => {
    store.dispatch(removeTokens())
    deleteCookie(cookieName)
    window.location.reload()
}

function setAuthHeaderToAxios(headerString: string) {
    Axios.defaults.headers.common["Authorization"] = headerString
}
