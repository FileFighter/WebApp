import Axios, { AxiosResponse } from "axios";

import { hostname, userPath } from "./api";

import { UserState } from "../redux/actions/userTypes";
import store from "../redux/store";
import {
  addAccessToken,
  addRefreshToken,
  checkedCookies,
  removeTokens
} from "../redux/actions/tokens";
import { addUser } from "../redux/actions/user";
import { AccessToken, CookieStatus } from "../redux/actions/tokenTypes";
import { deleteCookie, getCookie, setCookie } from "../methods/cookies";

// reference: https://daveceddia.com/access-redux-store-outside-react/

const cookieName: string = "refreshToken";

export interface BackendLoginData {
  tokenValue: string;
  user: UserState;
}

export interface BackendAuthData {
  tokenValue: string;
  userId: number;
  validUntil: number;
}

export const checkForCookie = () => {
  let refreshTokenCookieValue = getCookie(cookieName);
  if (refreshTokenCookieValue) {
    store.dispatch(addRefreshToken(refreshTokenCookieValue));
    store.dispatch(checkedCookies(CookieStatus.LOADING));
    getAccessTokenWithRefreshToken();
  } else {
    store.dispatch(checkedCookies(CookieStatus.FINISHED));
  }
};

export const loginWithUsernameAndPassword = (
  userName: string,
  password: string,
  stayLoggedIn: boolean
): Promise<BackendLoginData> => {
  console.log("[Auth] loginWithUsernameAndPassword", userName, password);
  return new Promise<BackendLoginData>((resolve, reject) => {
    let config = {
      headers: {
        Authorization: `Basic ${btoa(userName + ":" + password)}`
      }
    };

    return Axios.get<BackendLoginData>(hostname + userPath + "/login", config)
      .then((data: AxiosResponse<BackendLoginData>) => {
        console.log(data.data);
        store.dispatch(addRefreshToken(data.data.tokenValue));
        store.dispatch(addUser(data.data.user as UserState));

        if (stayLoggedIn) {
          setCookie(cookieName, data.data.tokenValue, 60);
        }

        getAccessTokenWithRefreshToken();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAccessTokenWithRefreshToken = () => {
  console.log("getAccessTokenWithRefreshToken");

  let refreshToken: string | null = store.getState().tokens.refreshToken;

  let config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  };

  Axios.get<BackendAuthData>(hostname + userPath + "/auth", config)
    .then((data: AxiosResponse<BackendAuthData>) => {
      store.dispatch(checkedCookies(CookieStatus.FINISHED));
      setAuthHeaderToAxios(data.data.tokenValue);

      store.dispatch(
        addAccessToken({
          token: data.data.tokenValue,
          timestamp: data.data.validUntil
        } as AccessToken)
      );
      if (!store.getState().user.username) {
        getOwnUserData(data.data.userId);
      }
    })
    .catch((error) => {
      store.dispatch(removeTokens());
      store.dispatch(checkedCookies(CookieStatus.FINISHED));

      console.log(error);
      //you probably want to notify the user, maybe with a toast or similar
    });
};

const getOwnUserData = (userId: number) => {
  Axios.get<UserState>(`${hostname}${userPath}/${userId}/info`)
    .then((response: AxiosResponse<UserState>) => {
      store.dispatch(addUser(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => {
  store.dispatch(removeTokens());
  deleteCookie(cookieName);
};

function setAuthHeaderToAxios(accessToken: string) {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}