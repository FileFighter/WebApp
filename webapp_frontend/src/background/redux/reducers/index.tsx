import {combineReducers} from "redux";
import tokens from "./tokens";
import user from "./user";
import filesystem from "./filesystem";

// this combines all the stores from the reducers

export default combineReducers({tokens, user,filesystem});
