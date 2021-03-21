import {FsEntity} from "../../api/filesystemTypes";

export const ADD_TO_SELECTED = "ADD_TO_SELECTED";
export const CLEAR_SELECTED = "CLEAR_SELECTED";
export const REMOVE_FROM_SELECTED = "REMOVE_FROM_SELECTED";
export const REPLACE_SELECTED = "REPLACE_SELECTED";

export interface FilesystemState {
    selectedFsEnties: FsEntity[],
}

export interface AddToSelected {
    type: typeof ADD_TO_SELECTED,
    payload: FsEntity,
}
export interface RemoveFromSelected {
    type: typeof REMOVE_FROM_SELECTED,
    payload: FsEntity,
}

export interface ClearSelected {
    type: typeof CLEAR_SELECTED,
}

export interface ReplaceSelected {
    type: typeof REPLACE_SELECTED,
    payload: FsEntity[],
}

export type FilesystemActionTypes = AddToSelected | RemoveFromSelected | ClearSelected | ReplaceSelected;
