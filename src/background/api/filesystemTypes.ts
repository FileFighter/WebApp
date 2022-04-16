export interface UsersSet {
    groups: string[]
    id: number
    username: string
}

/**
 * @interface
 * @param {string[]} editableForGroups
 * @param {UsersSet[]} editableForUsers
 * @param {string[]} visibleForGroups
 * @param {UsersSet[]} visibleForUsers
 */
export interface PermissionSet {
    editableForGroups: string[]
    editableForUsers: UsersSet[]
    visibleForGroups: string[]
    visibleForUsers: UsersSet[]
}

/**
 * @interface
 * @param {number} userId Id of the user
 * @param {string} username name of user
 * @param {string[]} groups list of groups user is part of
 */
export interface User {
    userId: number
    username: string
    groups: string[]
}

/**
 * @interface
 * @param {User} owner User who owns file
 * @param {User} lastUpdatedBy last user to update file
 * @param {number} fileSystemId file's id
 * @param {number} lastUpdated timestamp when file was last updated
 * @param {string} name name of file
 * @param {string} path path to file
 * @param {boolean} shared is file shared with other user(s)?
 * @param {number} size file's size
 * @param {string} type
 * @param {string} mimeType
 */
export interface FsEntity {
    owner: User
    lastUpdatedBy: User
    fileSystemId: number
    lastUpdated: number
    name: string
    path: string
    shared: boolean
    size: number
    type: string
    mimeType: string
}
