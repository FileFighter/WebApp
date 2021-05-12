import React, {ReactElement} from "react";
import {
    FileEarmarkCodeIcon,
    FileEarmarkIcon,
    FileEarmarkImageIcon,
    FileEarmarkLock2Icon,
    FileEarmarkMusicIcon,
    FileEarmarkPDFIcon,
    FileEarmarkPlayIcon,
    FileEarmarkRichtextIcon,
    FileEarmarkTextIcon,
    FileEarmarkZipIcon,
    FolderIcon
} from "../../../assets/images/icons/reactSvgIcons/SymbolFile";
import {reverseString} from "../../../background/methods/strings";

const ICON_PREFERENCES = {
    height: "40px",
    width: "100%",
    color: "secondary"
};

function FileIcon(isFolder: boolean, name: string): ReactElement {
    if (isFolder) return <FolderIcon {...ICON_PREFERENCES} />;

    let positionOfPoint = reverseString(name).indexOf(".");
    if (positionOfPoint < 0) return <FileEarmarkIcon {...ICON_PREFERENCES} />;

    const fileExtension = reverseString(
        reverseString(name).substr(0, positionOfPoint + 1)
    );
    switch (fileExtension) {
        case ".txt":
            return <FileEarmarkTextIcon {...ICON_PREFERENCES} />;
        case ".jpg":
            return <FileEarmarkImageIcon {...ICON_PREFERENCES} />;
        case ".mp4":
            return <FileEarmarkPlayIcon {...ICON_PREFERENCES} />;
        case ".mp3":
            return <FileEarmarkMusicIcon {...ICON_PREFERENCES} />;
        case ".crypt":
            return <FileEarmarkLock2Icon {...ICON_PREFERENCES} />;
        case ".pdf":
            return <FileEarmarkPDFIcon {...ICON_PREFERENCES} />;
        case ".zip":
        case ".7z":
            return <FileEarmarkZipIcon {...ICON_PREFERENCES} />;
        case ".ts":
        case ".tsx":
        case ".js":
        case ".jsx":
        case ".java":
            return <FileEarmarkCodeIcon {...ICON_PREFERENCES} />;
        case ".md":
        case ".html":
            return <FileEarmarkRichtextIcon {...ICON_PREFERENCES} />;
        default:
            return <FileEarmarkIcon {...ICON_PREFERENCES} />;
    }
}

export default FileIcon