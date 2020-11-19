import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, TokenActionsTypes, TokensState, AccessToken} from "../actions/tokenTypes";

const initialState: TokensState = {
    refreshToken: null,
    accessToken: null,
};

export default function (state = initialState, action: TokenActionsTypes) {
    switch (action.type) {
        case ADD_REFRESH_TOKEN: {
            const refreshToken: string = action.payload;
            return {
                refreshToken: refreshToken,
                accessToken: initialState.accessToken
            };
        }
        case ADD_ACCESS_TOKEN: {
            const accessToken: AccessToken = action.payload;
            return {
                refreshToken: initialState.refreshToken,
                accessToken: accessToken
            };
        }
        default:
            return state;
    }
}
