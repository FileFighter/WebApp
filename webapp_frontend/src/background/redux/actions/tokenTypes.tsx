export const ADD_REFRESH_TOKEN = "ADD_REFRESH_TOKEN";
export const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN";
export const CHECKED_COOKIES = "CHECKED_COOKIES";
export const REMOVE_TOKENS = "REMOVE_TOKENS";


export interface AccessToken {
    token: string | null;
    timestamp: number | null;
}


export interface TokensState {
    refreshToken: string | null;
    accessToken: AccessToken | null;
    checkedCookies: boolean;
}


export interface AddRefreshToken {
    type: typeof ADD_REFRESH_TOKEN
    payload: string
}

export interface AddAccessToken {
    type: typeof ADD_ACCESS_TOKEN
    payload: AccessToken
}

export interface RemoveTokens {
    type: typeof REMOVE_TOKENS
}

export interface CheckedCookies {
    type: typeof CHECKED_COOKIES,
    payload: boolean
}

export type TokenActionsTypes = AddRefreshToken | AddAccessToken | RemoveTokens | CheckedCookies;

