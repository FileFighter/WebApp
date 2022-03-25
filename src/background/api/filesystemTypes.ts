export interface UsersSet {
    groups: string[]
    id: number
    username: string
}

export interface PermissionSet {
    editableForGroups: string[]
    editableForUsers: UsersSet[]
    visibleForGroups: string[]
    visibleForUsers: UsersSet[]
}

export interface User {
    id: number
    username: string
    privileges: string
}

export interface FsEntity {
    lastUpdatedBy: User
    id: number
    lastUpdated: number
    name: string
    path: string
    size: number
    mimeType: string
}

export interface ContentsResource {
    owner: User
    inodes: FsEntity[]
}
