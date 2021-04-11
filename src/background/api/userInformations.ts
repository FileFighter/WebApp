import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import { UserState } from "../redux/actions/userTypes";
import store from "../redux/store";
import {updateUser} from "../redux/actions/user";

export const changeUserInformation = (userWithNewInformation: any): Promise<UserState> => {
    console.log("[userInformations] changeUserInformations: user: ", userWithNewInformation);
    return new Promise<any>((resolve, reject) => {
        return Axios.put<any>(`${hostname}${userPath}/${userWithNewInformation.userId}/edit`, userWithNewInformation)
            .then((response: AxiosResponse<UserState>) => {
                console.log("answer: ", response.data)
                store.dispatch(updateUser(response.data));
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })

};