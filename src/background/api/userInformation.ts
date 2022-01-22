import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import store from "../redux/store";
import { updateUser } from "../redux/actions/user";
import { UserState } from "../redux/actions/userTypes";
import { ApiStatusResponse } from "../api/sharedApiTypes";

export interface UserInformation {
    userId: number | null;
    username?: string | null;
    groups?: string[] | null;
    password?: string;
    confirmationPassword?: string; // FIXME remove this in the backend
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
                const errorResponse: ApiStatusResponse = {
                    responseCode: error.response.status,
                    responseStatus: {
                        statusMessage: error.response.data.status,
                        message: error.response.data.message
                    }
                };
                reject(errorResponse);
            });
    });
};
