import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import store from "../redux/store";
import { updateUser } from "../redux/actions/user";
import { UserState } from "../redux/actions/userTypes";

export interface UserInformation {
    userId: number | null;
    username?: string | null;
    groups?: string[] | null;
    password?: string;
    confirmationPassword?: string;  // TODO remove this.
}

/**
 * Interface describing the classic return value of the backend
 */
// FIXME does this type already exist?
export interface UpdateUserErrorResponse {
    errorCode: number;
    error: { statusMessage: string, errorMessage: string };
}

export const changeUserInformation = (
    userWithNewInformation: UserInformation
): Promise<UserState> => {
    console.log("[API] userinformation: User given to update user api:");
    console.log(userWithNewInformation);
    return new Promise((resolve, reject) => {
        return Axios.put(
            `${hostname}${userPath}/${userWithNewInformation.userId}/edit`,
            userWithNewInformation
        )
            .then((response: AxiosResponse<UserState>) => {
                store.dispatch(updateUser(JSON.parse(response.config.data)));
                resolve(response.data);
            })
            .catch((error) => {
                const errorResponse: UpdateUserErrorResponse = {
                    errorCode: error.response.status,
                    error: {
                        statusMessage: error.response.data.status,
                        errorMessage: error.response.data.message
                    }
                }
                reject(errorResponse);
            });
    });
}
