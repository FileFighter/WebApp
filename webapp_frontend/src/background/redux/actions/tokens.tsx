import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, AccessToken, CHECKED_COOKIES, REMOVE_TOKENS} from "./tokenTypes";


export const addRefreshToken = (content: string) => ({
    type: ADD_REFRESH_TOKEN,
    payload: content
});

export const addAccessToken = (content: AccessToken) => ({
    type: ADD_ACCESS_TOKEN,
    payload: content
});

export const removeTokens = ()=>({
    type: REMOVE_TOKENS
})

export const checkedCookies = (content: boolean) => ({
    type: CHECKED_COOKIES,
    payload: content
});
