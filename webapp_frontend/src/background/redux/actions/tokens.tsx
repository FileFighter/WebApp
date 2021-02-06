import {
  AccessToken,
  ADD_ACCESS_TOKEN,
  ADD_REFRESH_TOKEN,
  AddAccessToken,
  AddRefreshToken,
  CHECKED_COOKIES,
  CheckedCookies,
  REMOVE_TOKENS,
  RemoveTokens
} from "./tokenTypes";

export const addRefreshToken = (content: string): AddRefreshToken => ({
  type: ADD_REFRESH_TOKEN,
  payload: content
});

export const addAccessToken = (content: AccessToken): AddAccessToken => ({
  type: ADD_ACCESS_TOKEN,
  payload: content
});

export const removeTokens = (): RemoveTokens => ({
  type: REMOVE_TOKENS
});

export const checkedCookies = (content: number): CheckedCookies => ({
  type: CHECKED_COOKIES,
  payload: content
});
