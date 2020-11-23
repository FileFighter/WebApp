import {ADD_USER, AddUser, UserState} from "./userTypes";

export const addUser = (content: UserState):AddUser => ({
    type: ADD_USER,
    payload: content
});
