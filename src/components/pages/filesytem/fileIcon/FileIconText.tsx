import React from "react"
import FileIcon, {
    FileIconInterface,
    IconPreferencesInterface,
} from "./FileIcon"
import { getFileExtension } from "../../../../background/methods/filesystem"
import {
    FileEarmarkCodeIcon,
    FileEarmarkRichtextIcon,
    FileEarmarkTextIcon,
} from "../../../../assets/images/icons/reactSvgIcons/SymbolFile"

export default function FileIconText(
    ICON_PREFERENCES: IconPreferencesInterface,
    FileInformation: FileIconInterface
) {
    switch (getFileExtension(FileIcon.name.toLowerCase())) {
        case "css":
        case "java":
        case "js":
        case "jsx":
        case "ts":
        case "tsx":
            return <FileEarmarkCodeIcon {...ICON_PREFERENCES} />
        case "html":
            return <FileEarmarkRichtextIcon {...ICON_PREFERENCES} />
        default:
            return <FileEarmarkTextIcon {...ICON_PREFERENCES} />
    }
}
