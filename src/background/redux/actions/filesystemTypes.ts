import { FsEntity } from "../../api/filesystemTypes";

export const ADD_TO_SELECTED = "ADD_TO_SELECTED";
export const CLEAR_SELECTED = "CLEAR_SELECTED";
export const REMOVE_FROM_SELECTED = "REMOVE_FROM_SELECTED";
export const REPLACE_SELECTED = "REPLACE_SELECTED";
export const SET_CURRENT_FSITEMID = "SET_CURRENT_FSITEMID";
export const SET_CURRENT_PATH = "SET_CURRENT_PATH";
export const SET_CONTENTS = "SET_CONTENTS";
export const ADD_TO_CONTENTS = "ADD_TO_CONTENTS";
export const REMOVE_FROM_CONTENTS = "REMOVE_FROM_CONTENTS";

export interface FilesystemState {
  selectedFsEntities: FsEntity[];
  folderContents: FsEntity[];
  currentFsItemId: string;
  currentPath: string
}

export interface AddToSelected {
  type: typeof ADD_TO_SELECTED;
  payload: FsEntity;
}
export interface RemoveFromSelected {
  type: typeof REMOVE_FROM_SELECTED;
  payload: FsEntity;
}

export interface ClearSelected {
  type: typeof CLEAR_SELECTED;
}

export interface ReplaceSelected {
  type: typeof REPLACE_SELECTED;
  payload: FsEntity[];
}

export interface SetCurrentFsItemId {
  type: typeof SET_CURRENT_FSITEMID;
  payload: string;
}
export interface SetCurrentPath {
  type: typeof SET_CURRENT_PATH;
  payload: string;
}

export interface SetContents {
  type: typeof SET_CONTENTS;
  payload: FsEntity[];
}

export interface AddToContents {
  type: typeof ADD_TO_CONTENTS;
  payload: FsEntity;
}
export interface RemoveFromContents {
  type: typeof REMOVE_FROM_CONTENTS;
  payload: FsEntity;
}

export type FilesystemActionTypes =
  | AddToSelected
  | RemoveFromSelected
  | ClearSelected
  | ReplaceSelected
  | SetContents
  | AddToContents
  | RemoveFromContents
  | SetCurrentFsItemId
  | SetCurrentPath;
