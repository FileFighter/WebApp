import React, { ReactElement } from "react"
import {
    FileEarmarkIcon,
    FileEarmarkImageIcon,
    FileEarmarkMusicIcon,
    FolderIcon,
} from "../../../../assets/images/icons/reactSvgIcons/SymbolFile"
import { getFileExtension } from "../../../../background/methods/filesystem"
import FileIconApplication from "./FileIconApplication"
import FileIconText from "./FileIconText"
import FileIconVideo from "./FileIconVideo"

export interface IconPreferencesInterface {
    height: string
    width: string
    color: string
}

const ICON_PREFERENCES: IconPreferencesInterface = {
    height: "40px",
    width: "100%",
    color: "secondary",
}

export interface FileIconInterface {
    mimeType: string | null
    name: string
}

function FileIcon(props: FileIconInterface): ReactElement {
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { mimeType, name } = props
    if (!mimeType) return <FolderIcon {...ICON_PREFERENCES} />
    if (getFileExtension(name) === "")
        return <FileEarmarkIcon {...ICON_PREFERENCES} />
    switch (mimeType.split("/")[0].toLowerCase()) {
        case "text":
            return <FileIconText {...ICON_PREFERENCES} {...props} />
        case "image":
            return <FileEarmarkImageIcon {...ICON_PREFERENCES} />
        case "video":
            return <FileIconVideo {...ICON_PREFERENCES} />
        case "audio":
            return <FileEarmarkMusicIcon {...ICON_PREFERENCES} />
        case "application":
        default:
            return (
                <FileIconApplication
                    ICON_PREFERENCES={ICON_PREFERENCES}
                    fileInformation={props}
                />
            )
    }
}

export default FileIcon
