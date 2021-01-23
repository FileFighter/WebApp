import { ADD_USER, UserActionTypes, UserState } from "../actions/userTypes";

const initialState: UserState = {
  groups: [],
  id: null,
  username: null
};

export default function users(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case ADD_USER: {
      console.log("[Redux] adding user");
      return action.payload;
    }
    default:
      return state;
  }
}
