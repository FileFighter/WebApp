import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, AccessToken, CHECKED_COOKIES} from "./tokenTypes";


export const addRefreshToken = (content: string) => ({
    type: ADD_REFRESH_TOKEN,
    payload: content
});

export const addAccessToken = (content: AccessToken) => ({
    type: ADD_ACCESS_TOKEN,
    payload: content
});


export const checkedCookies = (content: boolean) => ({
    type: CHECKED_COOKIES,
    payload: content
});
