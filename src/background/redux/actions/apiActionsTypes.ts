import { FsEntity } from "../../api/filesystemTypes";

export const ADD_API_ACTION = "ADD_API_ACTION";
export const REPLACE_API_ACTION = "REPLACE_API_ACTION";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const NEXT_FS_ENTITY = "NEXT_FS_ENTITY";

export interface ApiActionsState {
  actions: ApiAction[];
}

export interface ApiAction {
  key: string;
  type: ApiActionType;
  status: ApiActionStatus;
  progress: number;
  totalAmount: number;
  currentFsEntity: FsEntity | File;
}

export enum ApiActionType {
  UPLOAD = "Uploading",
  DELETE = "Deleting"
}

export enum ApiActionStatus {
  ONGOING = "ONGOING",
  ABORTED = "ABORTED",
  ERROR = "error"
}

export interface AddApiAction {
  type: typeof ADD_API_ACTION;
  payload: ApiAction;
}
export interface ReplaceApiAction {
  type: typeof REPLACE_API_ACTION;
  payload: ApiAction;
}

export interface ChangeStatusPayload {
  key: string;
  status: ApiActionStatus;
}

export interface ChangeStatus {
  type: typeof CHANGE_STATUS;
  payload: ChangeStatusPayload;
}

export interface NextFsEntityPayload {
  key: string;
  currentFsEntity: FsEntity | File;
}

export interface NextFsEntity {
  type: typeof NEXT_FS_ENTITY;
  payload: NextFsEntityPayload;
}

export type ApiActionsTypes =
  | ChangeStatus
  | ReplaceApiAction
  | AddApiAction
  | NextFsEntity;
