export const ADD_USER = "ADD_USER";

export interface UserState{
    groups: number[],
    id: number,
    username:string,
}



interface AddUser {
    type: typeof ADD_USER,
    payload: UserState
}


export type UserActionTypes=AddUser;
