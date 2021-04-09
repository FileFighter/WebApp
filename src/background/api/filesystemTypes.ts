export interface UsersSet {
  groups: string[];
  id: number;
  username: string;
}

export interface PermissionSet {
  editableForGroups: string[];
  editableForUsers: UsersSet[];
  visibleForGroups: string[];
  visibleForUsers: UsersSet[];
}

export interface User {
  id: number;
  username: string;
  groups: number[];
}

export interface FsEntity {
  owner: User;
  lastUpdatedBy: User;
  fileSystemId: number;
  lastUpdated: number;
  name: string;
  path: string;
  shared: boolean;
  size: number;
  type: string;
}

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
  error?: boolean;
}

export interface PreflightEntityChange {
  newName?: string;
  path: string;
  overwrite?: boolean;
  update?: boolean;
}
