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


export interface FsEntity {
    createdByUserId: number;
    fileSystemId: number;
    lastUpdated: number;
    name: string;
    path: string;
    shared: boolean;
    size: number;
    type: string;
}



