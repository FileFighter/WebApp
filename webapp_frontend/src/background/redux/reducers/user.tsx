import {ADD_USER, UserActionTypes, UserState} from "../actions/userTypes";

const initialState: UserState = {
    groups: [], id: -1, username: ""

};


export default function (state = initialState, action: UserActionTypes) {
    switch (action.type) {
        case ADD_USER: {
            return action.payload;
        }
        default:
            return state;
    }
}
