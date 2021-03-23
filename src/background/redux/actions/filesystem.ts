import { FsEntity } from "../../api/filesystemTypes";
import {
  ADD_TO_SELECTED,
  AddToSelected,
  CLEAR_SELECTED,
  ClearSelected,
  REMOVE_FROM_SELECTED,
  RemoveFromSelected,
  REPLACE_SELECTED,
  ReplaceSelected,
  SET_CURRENT_FSITEMID,
  SetCurrentFsItemId
} from "./filesystemTypes";

export const addToSelected = (content: FsEntity): AddToSelected => ({
  type: ADD_TO_SELECTED,
  payload: content
});

export const removeFromSelected = (content: FsEntity): RemoveFromSelected => ({
  type: REMOVE_FROM_SELECTED,
  payload: content
});

export const clearSelected = (): ClearSelected => ({
  type: CLEAR_SELECTED
});

export const replaceSelected = (content: FsEntity[]): ReplaceSelected => ({
  type: REPLACE_SELECTED,
  payload: content
});

export const setCurrentFsItemId = (content: string): SetCurrentFsItemId => ({
  type: SET_CURRENT_FSITEMID,
  payload: content
});
