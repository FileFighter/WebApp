import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, TokenActionsTypes, TokensState, AccessToken, CHECKED_COOKIES, REMOVE_TOKENS} from "../actions/tokenTypes";

const initialState: TokensState = {
    refreshToken: null,
    accessToken: null,
    checkedCookies: false,
};

export default function (state = initialState, action: TokenActionsTypes) {
    switch (action.type) {
        case ADD_REFRESH_TOKEN: {
            console.log('[Redux] adding refreshToken')
            const refreshToken: string = action.payload;
            return {
                refreshToken: refreshToken,
                accessToken: state.accessToken,
                checkedCookies: state.checkedCookies
            };
        }
        case ADD_ACCESS_TOKEN: {
            console.log('[Redux] adding accessToken')
            const accessToken: AccessToken = action.payload;
            return {
                refreshToken: state.refreshToken,
                accessToken: accessToken,
                checkedCookies: state.checkedCookies
            };
        }
        case REMOVE_TOKENS:{
            return {
                refreshToken: null,
                accessToken: null,
                checkedCookies: true
            }
        }
        case CHECKED_COOKIES: {
            return {
                refreshToken: state.refreshToken,
                accessToken: state.accessToken,
                checkedCookies: action.payload
            };
        }
        default:
            return state;
    }
}
