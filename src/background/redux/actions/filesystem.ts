import { FsEntity } from "../../api/filesystemTypes";
import {
  ADD_TO_CONTENTS,
  ADD_TO_SELECTED,
  AddToContents,
  AddToSelected,
  CLEAR_SELECTED,
  ClearSelected,
  REMOVE_FROM_CONTENTS,
  REMOVE_FROM_SELECTED,
  RemoveFromContents,
  RemoveFromSelected,
  REPLACE_SELECTED,
  ReplaceSelected,
  SET_CONTENTS,
  SET_CURRENT_FSITEMID,
  SetContents,
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

export const setContents = (content: FsEntity[]): SetContents => ({
  type: SET_CONTENTS,
  payload: content
});

export const addToContents = (content: FsEntity): AddToContents => ({
  type: ADD_TO_CONTENTS,
  payload: content
});

export const removeFromContents = (content: FsEntity): RemoveFromContents => ({
  type: REMOVE_FROM_CONTENTS,
  payload: content
});

export const setCurrentFsItemId = (content: string): SetCurrentFsItemId => ({
  type: SET_CURRENT_FSITEMID,
  payload: content
});
