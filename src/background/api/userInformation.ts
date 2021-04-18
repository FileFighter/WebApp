import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import store from "../redux/store";
import {updateUser} from "../redux/actions/user";
import {UserState} from "../redux/actions/userTypes";

export interface UserInformation {
    userId: number | null;
    username?: string | null;
    groups?: number[]|null;
    password?: string;
    confirmationPassword?: string;
}

export const changeUserInformation = (userWithNewInformation: UserInformation): Promise<UserState> => {
    console.log("User given tu update user api:")
    console.log(userWithNewInformation)
    return new Promise((resolve, reject) => {
        return Axios.put(`${hostname}${userPath}/${userWithNewInformation.userId}/edit`, userWithNewInformation)
            .then((response: AxiosResponse<UserState>) => {
                store.dispatch(updateUser(JSON.parse(response.config.data)));
                resolve(response.data)
            })
            .catch((error) => {
                console.log("[userInformation.ts] " + error);
                reject(error);
            });
    })
};