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

export interface PreflightEnitiy {
  name: string;
  path: string;
  permissionIsSufficient: boolean; // can upload and can overwrite
  nameAlreadyInUse: boolean;
  nameIsValid: boolean;
  isFile: boolean;
}

export interface FileWithPreflightInfo extends File, PreflightEnitiy {
  webkitRelativePath?: string;
  readonly name: string;
}
