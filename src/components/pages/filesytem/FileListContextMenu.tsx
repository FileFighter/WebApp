import React from "react";
import useContextMenu from "../../../background/reactHooks/useContextMenu";

const FileListContextMenu = ({outerRef}: any) => {
    const {xPos, yPos, menu} = useContextMenu(outerRef);

    if (!menu) {
        return <></>
    }
    return (
        <ul className="fileListContextMenu" style={{ top: yPos, left: xPos }}>
            <li><a href={"./"}>Rename</a></li>
            <li><a href={"./"}>Delete</a></li>
            <li><a href={"./"}>Details</a></li>
            <hr/>
            <li>Share</li>
        </ul>
    );

};

export default FileListContextMenu;