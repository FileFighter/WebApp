
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

export interface File {
    createdByUserId: number;
    id: number;
    lastUpdated: number;
    name: string;
    permissionSet: PermissionSet;
    size: number;
    type: string;
}

export interface Folder {
    createdByUserId: number;
    id: number;
    lastUpdated: number;
    name: string;
    path: string;
    permissionSet: PermissionSet;
    size: number;
    type: string;
}

export interface BackendFolderContentsData {
    files: File[];
    folders: Folder[];
}


