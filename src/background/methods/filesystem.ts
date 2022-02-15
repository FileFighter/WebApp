import { FsEntity } from "../api/filesystemTypes"
import { reverseString } from "./dataTypes/strings"

export const getPathWithoutName = (
    pathWithName: string,
    name: string
): string => {
    return pathWithName.substr(0, pathWithName.lastIndexOf(name.toLowerCase()))
}

export const removeTrailingBackslash = (path: string): string => {
    if (path.lastIndexOf("/") + 1 === path.length) {
        return path.substr(0, path.length - 1)
    }
    return path
}

export const removeLeadingBackslash = (path: string): string => {
    if (path.indexOf("/") === 0) {
        return path.substr(1, path.length)
    }
    return path
}

export const isFsEntityInFolder = (fsEntity: FsEntity, path: string) => {
    let fsEntityPath = getPathWithoutName(fsEntity.path, fsEntity.name)
    fsEntityPath = removeTrailingBackslash(fsEntityPath)

    return fsEntityPath === path.toLocaleLowerCase()
}

export const getFileExtension = (fileName: string): string => {
    let positionOfPoint = reverseString(fileName).indexOf(".")
    return reverseString(reverseString(fileName).substr(0, positionOfPoint))
}

export const isFileNameValid = (name: string) => {
    return !(!name || name.includes("/") || name.match('[~#@*+:!?&%<>|"^\\\\]'))
}
