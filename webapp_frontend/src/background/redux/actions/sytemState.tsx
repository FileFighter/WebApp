import {TokensState} from "./tokenTypes";
import {UserState} from "./userTypes";

export interface SystemState {
    tokens: TokensState
    user: UserState
}
