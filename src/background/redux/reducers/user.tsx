import {ADD_USER, UPDATE_USER, UserActionTypes, UserState} from "../actions/userTypes";

const initialState: UserState = {
    groups: [],
    userId: null,
    username: null
};

export default function users(state = initialState, action: UserActionTypes) {
    switch (action.type) {
        case ADD_USER: {
            console.log("[Redux] adding user");
            return action.payload;
        }
        case UPDATE_USER: {
            console.log("[Redux] updating user");
            return action.payload;
        }

        default:
            return state;
    }
}
