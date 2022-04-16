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
    userId: number
    username: string
    /** list of groups user is part of */
    groups: string[]
}

export interface FsEntity {
    /** User who owns file */
    owner: User
    /** last user to update file */
    lastUpdatedBy: User
    /** file's id */
    fileSystemId: number
    /** timestamp when file was last updated */
    lastUpdated: number
    /** name of file*/
    name: string
    /** path to file*/
    path: string
    /** is file shared with other user(s)?*/
    shared: boolean
    /** file's size */
    size: number
    type: string
    mimeType: string
}
