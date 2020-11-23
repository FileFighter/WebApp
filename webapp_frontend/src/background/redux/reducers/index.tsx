import {combineReducers} from "redux";
import tokens from "./tokens";
import user from "./user";

// this combines all the stores from the reducers

export default combineReducers({tokens, user});
