import React, { ReactElement } from "react";
import { FileEarmarkPlayIcon } from "../../../../assets/images/icons/reactSvgIcons/SymbolFile";
import { IconPreferencesInterface } from "./FileIcon";

export default function FileIconVideo(ICON_PREFERENCES: IconPreferencesInterface): ReactElement {
    return <FileEarmarkPlayIcon {...ICON_PREFERENCES} />;
}