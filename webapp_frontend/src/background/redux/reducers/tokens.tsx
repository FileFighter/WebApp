import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, TokenActionsTypes, TokensState, AccessToken, CHECKED_COOKIES} from "../actions/tokenTypes";

const initialState: TokensState = {
    refreshToken: null,
    accessToken: null,
    checkedCookies:false,
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
            const accessToken: AccessToken = action.payload;
            return {
                refreshToken: state.refreshToken,
                accessToken: accessToken,
                checkedCookies: state.checkedCookies
            };
        }
        case CHECKED_COOKIES: {
            return  {
                refreshToken: state.refreshToken,
                accessToken: state.refreshToken,
                checkedCookies:action.payload
            };
        }
        default:
            return state;
    }
}
