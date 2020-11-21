
import {ADD_USER, UserState} from "./userTypes";

export const addUser = (content: UserState) => ({
    type: ADD_USER,
    payload: content
});
