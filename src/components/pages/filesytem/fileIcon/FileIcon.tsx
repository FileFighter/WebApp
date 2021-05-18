import React, { ReactElement } from "react";
import {
    FileEarmarkIcon,
    FileEarmarkImageIcon,
    FileEarmarkMusicIcon,
    FileEarmarkPlayIcon,
    FolderIcon
} from "../../../../assets/images/icons/reactSvgIcons/SymbolFile";
import { getFileExtension } from "../../../../background/methods/filesystem";
import FileIconApplication from "./FileIconApplication";
import FileIconText from "./FileIconText";

export interface IconPreferencesInterface {
    height: string,
    width: string,
    color: string
}

const ICON_PREFERENCES: IconPreferencesInterface = {
    height: "40px",
    width: "100%",
    color: "secondary"
};

export interface FileIconInterface {
    type: string;
    mimeType: string;
    name: string;
}

function FileIcon(props: FileIconInterface): ReactElement {
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { type, name } = props;
    if (type.toUpperCase() === "FOLDER") return <FolderIcon {...ICON_PREFERENCES} />;
    if (getFileExtension(name) === "") return <FileEarmarkIcon {...ICON_PREFERENCES} />;

    switch (type.toLowerCase()) {
        case "folder":
            return <FolderIcon {...ICON_PREFERENCES} />;
        case "text":
            return <FileIconText {...ICON_PREFERENCES} {...props} />;
        case "image":
            return <FileEarmarkImageIcon {...ICON_PREFERENCES} />;
        case "video":
            return <FileEarmarkPlayIcon {...ICON_PREFERENCES} />;
        case "audio":
            return <FileEarmarkMusicIcon {...ICON_PREFERENCES} />;
        case "application":
        default:
            return <FileIconApplication ICON_PREFERENCES={ICON_PREFERENCES} FileInformation={props} />;
    }
}

export default FileIcon;