import {
  ADD_TO_SELECTED,
  CLEAR_SELECTED,
  FilesystemActionTypes,
  FilesystemState,
  REMOVE_FROM_SELECTED,
  REPLACE_SELECTED
} from "../actions/filesystemTypes";
import { FsEntity } from "../../api/filesystemTypes";

const initialState: FilesystemState = {
  selectedFsEntities: []
};

export default function filesystem(
  state = initialState,
  action: FilesystemActionTypes
) {
  switch (action.type) {
    case ADD_TO_SELECTED: {
      console.log("[REDUX] ADD_TO_SELECTED", action.payload);
      return {
        selectedFsEntities: [...state.selectedFsEntities, action.payload] //concat because it does not modify the original array
      };
    }
    case REMOVE_FROM_SELECTED: {
      return {
        selectedFsEntities: state.selectedFsEntities.filter(
          (e: FsEntity) => e.fileSystemId !== action.payload.fileSystemId
        ) //filter return a new array
      };
    }
    case CLEAR_SELECTED: {
      return {
        selectedFsEntities: []
      };
    }
    case REPLACE_SELECTED: {
      return {
        selectedFsEntities: action.payload
      };
    }
    default:
      return state;
  }
}
