export const UPDATE_USER = "UPDATE_USER";

export interface UserState {
    userId: number | null;
    username: string | null;
    groups: string[];
}

export interface UpdateUser {
    type: typeof UPDATE_USER;
    payload: UserState;
}

export type UserActionTypes = UpdateUser;
