import {
  ADD_TO_CONTENTS,
  ADD_TO_SELECTED,
  CLEAR_SELECTED,
  FilesystemActionTypes,
  FilesystemState,
  REMOVE_FROM_CONTENTS,
  REMOVE_FROM_SELECTED,
  REPLACE_SELECTED,
  SET_CONTENTS,
  SET_CURRENT_FSITEMID, SET_CURRENT_PATH
} from "../actions/filesystemTypes";
import { FsEntity } from "../../api/filesystemTypes";

const initialState: FilesystemState = {
  selectedFsEntities: [],
  folderContents: [],
  currentFsItemId: "",
  currentPath: ""
};

export default function filesystem(
  state = initialState,
  action: FilesystemActionTypes
): FilesystemState {
  switch (action.type) {
    case ADD_TO_SELECTED: {
      console.log("[REDUX] ADD_TO_SELECTED", action.payload);
      return {
        selectedFsEntities: [...state.selectedFsEntities, action.payload], //concat because it does not modify the original array
        folderContents: state.folderContents,
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case REMOVE_FROM_SELECTED: {
      return {
        selectedFsEntities: state.selectedFsEntities.filter(
          (e: FsEntity) => e.fileSystemId !== action.payload.fileSystemId
        ), //filter return a new array
        folderContents: state.folderContents,
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case CLEAR_SELECTED: {
      return {
        selectedFsEntities: [],
        folderContents: state.folderContents,
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case REPLACE_SELECTED: {
      return {
        selectedFsEntities: action.payload,
        folderContents: state.folderContents,
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case SET_CONTENTS: {
      return {
        selectedFsEntities: state.selectedFsEntities,
        folderContents: action.payload,
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case ADD_TO_CONTENTS: {
      return {
        selectedFsEntities: state.selectedFsEntities,
        folderContents: [...state.folderContents, action.payload],
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case REMOVE_FROM_CONTENTS: {
      return {
        selectedFsEntities: state.selectedFsEntities,
        folderContents: state.folderContents.filter(
          (fse: FsEntity) => fse.fileSystemId !== action.payload.fileSystemId
        ),
        currentFsItemId: state.currentFsItemId,
        currentPath: state.currentPath
      };
    }
    case SET_CURRENT_FSITEMID: {
      return {
        selectedFsEntities: state.selectedFsEntities,
        folderContents: state.folderContents,
        currentFsItemId: action.payload,
        currentPath: state.currentPath
      };
    }
    case SET_CURRENT_PATH: {
      return {
        selectedFsEntities: state.selectedFsEntities,
        folderContents: state.folderContents,
        currentFsItemId: state.currentFsItemId,
        currentPath: action.payload
      };
    }

    default:
      return state;
  }
}
