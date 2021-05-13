export interface PreflightEntity {
  name: string;
  path: string;
  permissionIsSufficient: boolean; // can upload and can overwrite
  nameAlreadyInUse: boolean;
  nameIsValid: boolean;
  isFile: boolean;
}

export type EditablePreflightEntityOrFile =
  | EditableFileWithPreflightInfo
  | EditablePreflightEntity;

export interface EditableFileWithPreflightInfo
  extends File,
    EditableEntity,
    PreflightEntity {
  webkitRelativePath?: string;
  readonly name: string;
}

export interface EditablePreflightEntity
  extends PreflightEntity,
    EditableEntity {}

interface EditableEntity {
  newName?: string;
  newPath?: string;
  overwrite?: boolean;
  prefNewPath?: string;
  prefNewName?: string;
  error?: EditableEntityError;
}

export enum EditableEntityError {
  "ALREADYEXITS" = "Name already exits",
  "INVALIDNAME" = "Name is invalid"
}

export type PeflightEntiesActionTypes =
  | PreflightChangeName
  | PreflightToggleOverwrite
  | PreflightUpdateName
  | PreflightToggleAll
  | PreflightAddEntities;
export const PREFLIGHT_CHANGE_NAME = "PREFLIGHT_CHANGE_NAME";
export const PREFLIGHT_TOGGLE_OVERWRITE = "PREFLIGHT_TOGGLE_OVERWRITE";
export const PREFLIGHT_UPDATE_NAME = "PREFLIGHT_UPDATE_NAME";
export const PREFLIGHT_TOGGLE_ALL = "PREFLIGHT_TOGGLE_ALL";
export const PREFLIGHT_ADD_ENTITIES = "PREFLIGHT_ADD_ENTITIES";

export interface PreflightChangeName {
  type: typeof PREFLIGHT_CHANGE_NAME;
  payload: NameChangePayload;
}

export interface PreflightToggleOverwrite {
  type: typeof PREFLIGHT_TOGGLE_OVERWRITE;
  payload: OverwriteTogglePayload;
}

export interface PreflightUpdateName {
  type: typeof PREFLIGHT_UPDATE_NAME;
  payload: NameChangePayload;
}

export interface PreflightToggleAll {
  type: typeof PREFLIGHT_TOGGLE_ALL;
  payload: ToggleAllPayload;
}

export interface PreflightAddEntities {
  type: typeof PREFLIGHT_ADD_ENTITIES;
  payload: EditablePreflightEntityOrFile[];
}

interface NameChangePayload {
  path: string;
  newName: string;
}

interface OverwriteTogglePayload {
  path: string;
  overwrite: boolean;
}

interface ToggleAllPayload {
  isFolders: boolean;
  newValue: boolean;
}
