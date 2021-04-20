import {UPDATE_USER, UpdateUser, UserState} from "./userTypes";

export const updateUser = (content: UserState):UpdateUser => ({
    type: UPDATE_USER,
    payload: content
})
