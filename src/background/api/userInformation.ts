import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import { UserState } from "../redux/actions/userTypes";
import store from "../redux/store";
import {updateUser} from "../redux/actions/user";

export const changeUserInformation = (userWithNewInformation: any): Promise<UserState> => {
    return new Promise((resolve, reject) => {
        return Axios.put(`${hostname}${userPath}/${userWithNewInformation.userId}/edit`, userWithNewInformation)
            .then((response: AxiosResponse<UserState>) => {
                store.dispatch(updateUser(JSON.parse(response.config.data)));
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })

};