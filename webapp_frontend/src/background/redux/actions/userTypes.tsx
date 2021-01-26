export const ADD_USER = "ADD_USER";

export interface UserState {
  id: number | null;
  username: string | null;
  groups: number[];
}

export interface AddUser {
  type: typeof ADD_USER;
  payload: UserState;
}

export type UserActionTypes = AddUser;
