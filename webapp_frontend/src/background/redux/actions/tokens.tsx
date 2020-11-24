import {
    ADD_REFRESH_TOKEN,
    ADD_ACCESS_TOKEN,
    AccessToken,
    CHECKED_COOKIES,
    REMOVE_TOKENS,
    AddRefreshToken, AddAccessToken, RemoveTokens, CheckedCookies
} from "./tokenTypes";


export const addRefreshToken = (content: string):AddRefreshToken => ({
    type: ADD_REFRESH_TOKEN,
    payload: content
});

export const addAccessToken = (content: AccessToken):AddAccessToken => ({
    type: ADD_ACCESS_TOKEN,
    payload: content
});

export const removeTokens = ():RemoveTokens=>({
    type: REMOVE_TOKENS
})

export const checkedCookies = (content: boolean):CheckedCookies => ({
    type: CHECKED_COOKIES,
    payload: content
});
