import { FsEntity } from "../api/filesystemTypes"
import { reverseString } from "./dataTypes/strings"

/**
 * It takes a path with a file name and returns the path without the file name
 * @param {string} pathWithName - The path with the name of the file.
 * @param {string} name - The name of the file.
 * @returns The path without the name.
 */
export const getPathWithoutName = (
    pathWithName: string,
    name: string
): string => {
    return pathWithName.substr(0, pathWithName.lastIndexOf(name.toLowerCase()))
}

/**
 * If the last character of the path is a forward slash, remove it.
 * @param {string} path - The path to remove the trailing backslash from.
 * @returns A function that takes a string and returns a string.
 */
export const removeTrailingBackslash = (path: string): string => {
    if (path.lastIndexOf("/") + 1 === path.length) {
        return path.substr(0, path.length - 1)
    }
    return path
}

/**
 * If the path starts with a forward slash, remove it.
 * @param {string} path - The path to the file you want to read.
 * @returns A function that takes a string and returns a string.
 */
export const removeLeadingBackslash = (path: string): string => {
    if (path.indexOf("/") === 0) {
        return path.substr(1, path.length)
    }
    return path
}

/**
 * It returns true if the given fsEntity is in the given folder
 * @param {FsEntity} fsEntity - The FsEntity that we want to check if it's in the folder.
 * @param {string} path - The path of the folder you want to check if the fsEntity is in.
 * @returns A boolean value.
 */
export const isFsEntityInFolder = (fsEntity: FsEntity, path: string) => {
    let fsEntityPath = getPathWithoutName(fsEntity.path, fsEntity.name)
    fsEntityPath = removeTrailingBackslash(fsEntityPath)

    return fsEntityPath === path.toLocaleLowerCase()
}

/**
 * It reverses the string, finds the position of the first period, then reverses the string again and returns the substring
 * from the beginning of the string to the position of the period
 * @param {string} fileName - The name of the file you want to get the extension of.
 * @returns The file extension of the file name.
 */
export const getFileExtension = (fileName: string): string => {
    let positionOfPoint = reverseString(fileName).indexOf(".")
    return reverseString(reverseString(fileName).substr(0, positionOfPoint))
}

/**
 * It returns true if the name is not empty, does not contain a slash, and does not contain any of the following
 * characters: ~ # @ * + : ! ? & % < > | " ^ \
 * @param {string} name - The name of the file to be created.
 * @returns A function that takes a string and returns a boolean.
 */
export const isFileNameValid = (name: string) => {
    return !(!name || name.includes("/") || name.match('[~#@*+:!?&%<>|"^\\\\]'))
}
