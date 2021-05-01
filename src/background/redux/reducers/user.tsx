import {UPDATE_USER, UserActionTypes, UserState} from "../actions/userTypes";

const initialState: UserState = {
    groups: [],
    userId: null,
    username: null
};

export default function users(state = initialState, action: UserActionTypes) {
    switch (action.type) {
        case UPDATE_USER: {
            console.log("[Redux] updating user");
            return action.payload;
        }

        default:
            return state;
    }
}
