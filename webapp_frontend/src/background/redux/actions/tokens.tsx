import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, AccessToken} from "./tokenTypes";


export const addRefreshToken = (content: string) => ({
    type: ADD_REFRESH_TOKEN,
    payload: content
});

export const addAccessToken = (content: AccessToken) => ({
    type: ADD_ACCESS_TOKEN,
    payload: content
});