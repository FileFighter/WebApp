import { TokensState } from "./tokenTypes";
import { UserState } from "./userTypes";
import { FilesystemState } from "./filesystemTypes";

export interface SystemState {
    tokens: TokensState;
    user: UserState;
    filesystem: FilesystemState;
}
