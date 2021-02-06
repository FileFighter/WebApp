import {
  AccessToken,
  ADD_ACCESS_TOKEN,
  ADD_REFRESH_TOKEN,
  CHECKED_COOKIES,
  REMOVE_TOKENS,
  TokenActionsTypes,
  TokensState
} from "../actions/tokenTypes";

const initialState: TokensState = {
  refreshToken: null,
  accessToken: null,
  checkedCookies: 0
};

export default function tokens(
  state = initialState,
  action: TokenActionsTypes
) {
  switch (action.type) {
    case ADD_REFRESH_TOKEN: {
      console.log("[Redux] adding refreshToken");
      const refreshToken: string = action.payload;
      return {
        refreshToken: refreshToken,
        accessToken: state.accessToken,
        checkedCookies: state.checkedCookies
      };
    }
    case ADD_ACCESS_TOKEN: {
      console.log("[Redux] adding accessToken");
      const accessToken: AccessToken = action.payload;
      return {
        refreshToken: state.refreshToken,
        accessToken: accessToken,
        checkedCookies: state.checkedCookies
      };
    }
    case REMOVE_TOKENS: {
      return {
        refreshToken: null,
        accessToken: null,
        checkedCookies: state.checkedCookies
      };
    }
    case CHECKED_COOKIES: {
      return {
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
        checkedCookies: action.payload
      };
    }
    default:
      return state;
  }
}
