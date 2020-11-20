import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, TokenActionsTypes, TokensState, AccessToken, CHECKED_COOKIES} from "../actions/tokenTypes";

const initialState: TokensState = {
    refreshToken: null,
    accessToken: null,
    checkedCookies:false,
};

export default function (state = initialState, action: TokenActionsTypes) {
    switch (action.type) {
        case ADD_REFRESH_TOKEN: {
            const refreshToken: string = action.payload;
            return {
                refreshToken: refreshToken,
                accessToken: initialState.accessToken,
                checkedCookies: initialState.checkedCookies
            };
        }
        case ADD_ACCESS_TOKEN: {
            const accessToken: AccessToken = action.payload;
            return {
                refreshToken: initialState.refreshToken,
                accessToken: accessToken,
                checkedCookies: initialState.checkedCookies
            };
        }
        case CHECKED_COOKIES: {
            return  {
                refreshToken: initialState.refreshToken,
                accessToken: initialState.refreshToken,
                checkedCookies:action.payload
            };
        }
        default:
            return state;
    }
}
