export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";

export interface UserState {
  //TODO: how is it called id here but the object in the store has "userId"?
  id: number | null;
  username: string | null;
  groups: number[];
}

export interface AddUser {
  type: typeof ADD_USER;
  payload: UserState;
}

export interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: UserState;
}

export type UserActionTypes = AddUser | UpdateUser;
