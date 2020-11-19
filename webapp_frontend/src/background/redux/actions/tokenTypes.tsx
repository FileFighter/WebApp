export const ADD_REFRESH_TOKEN = "ADD_REFRESH_TOKEN";
export const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN";


export interface AccessToken{
    token: string | null;
    timestamp: number | null;
}


export interface TokensState {
    refreshToken: string | null;
    accessToken: AccessToken | null;
}


interface AddRefreshToken {
    type: typeof ADD_REFRESH_TOKEN
    payload: string
}

interface AddAccessToken {
    type: typeof ADD_ACCESS_TOKEN
    payload: AccessToken
}

export type TokenActionsTypes = AddRefreshToken | AddAccessToken;

