export const ADD_REFRESH_TOKEN = "ADD_REFRESH_TOKEN";
export const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN";


export interface SystemState {
    tokens: TokensState
}

export interface TokensState{
    refreshToken:number|null;
    accessToken:number|null;
}


interface AddRefreshToken {
    type: typeof ADD_REFRESH_TOKEN
    payload: number
}

interface AddAccessToken {
    type: typeof ADD_ACCESS_TOKEN
    payload: number
}

export type TokenActionsTypes = AddRefreshToken|AddAccessToken;

