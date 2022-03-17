export const UPDATE_USER = "UPDATE_USER"

export interface UserState {
    id: number | null
    username: string | null
    privileges: string | null
}

export interface UpdateUser {
    type: typeof UPDATE_USER
    payload: UserState
}

export type UserActionTypes = UpdateUser
