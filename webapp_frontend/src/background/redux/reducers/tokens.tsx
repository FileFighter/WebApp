import {ADD_REFRESH_TOKEN, ADD_ACCESS_TOKEN, TokenActionsTypes, TokensState} from "../actions/tokenTypes";

const initialState: TokensState = {
    refreshToken: null,
    accessToken: null,
};

export default function (state = initialState, action: TokenActionsTypes) {
    switch (action.type) {
        case ADD_REFRESH_TOKEN: {
            const refreshToken: number = action.payload;
            return {
                refreshToken: refreshToken,
                accessToken: initialState.accessToken
            };
        }
        case ADD_ACCESS_TOKEN: {
            const accessToken: number = action.payload;
            return {
                refreshToken: initialState.refreshToken,
                accessToken: accessToken
            };
        }
        default:
            return state;
    }
}
