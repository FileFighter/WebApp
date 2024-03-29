import React from "react"
import { FileIconInterface, IconPreferencesInterface } from "./FileIcon"
import { getFileExtension } from "../../../../background/methods/filesystem"
import {
    FileEarmarkBinaryIcon,
    FileEarmarkCodeIcon,
    FileEarmarkIcon,
    FileEarmarkLock2Icon,
    FileEarmarkPDFIcon,
    FileEarmarkRichtextIcon,
    FileEarmarkZipIcon,
} from "../../../../assets/images/icons/reactSvgIcons/SymbolFile"
import FileIconVideo from "./FileIconVideo"

export default function FileIconApplication(props: {
    ICON_PREFERENCES: IconPreferencesInterface
    FileInformation: FileIconInterface
}) {
    const { ICON_PREFERENCES, FileInformation } = props
    // console.log("-------------------------");
    // console.log(getFileExtension(FileInformation.name.toLowerCase()));
    // console.table(FileInformation);
    // console.log(getMimeType(FileInformation.mimeType));
    // console.log("_________________________");
    switch (getFileExtension(FileInformation.name.toLowerCase())) {
        case "avi":
        case "mp4":
        case "mpeg":
        case "ogv":
        case "webm":
        case "3gp":
        case "3g2":
            return <FileIconVideo {...ICON_PREFERENCES} />
        case "java":
        case "jsx":
        case "ts":
        case "tsx":
            return <FileEarmarkCodeIcon {...ICON_PREFERENCES} />
        case "crypt":
            return <FileEarmarkLock2Icon {...ICON_PREFERENCES} />
        case "md":
            return <FileEarmarkRichtextIcon {...ICON_PREFERENCES} />
        case "pdf":
            return <FileEarmarkPDFIcon {...ICON_PREFERENCES} />
        case "7z":
        case "zip":
            return <FileEarmarkZipIcon {...ICON_PREFERENCES} />
        default: {
            if (
                FileInformation.mimeType.toLowerCase() ===
                "application/octet-stream"
            ) {
                //mime default type
                return <FileEarmarkIcon {...ICON_PREFERENCES} />
            }
            return <FileEarmarkBinaryIcon {...ICON_PREFERENCES} />
        }
    }
}
