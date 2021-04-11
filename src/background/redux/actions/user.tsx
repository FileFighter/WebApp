import {ADD_USER, AddUser, UPDATE_USER, UpdateUser, UserState} from "./userTypes";

export const addUser = (content: UserState):AddUser => ({
    type: ADD_USER,
    payload: content
});

export const updateUser = (content: UserState):UpdateUser => ({
    type: UPDATE_USER,
    payload: content
})
