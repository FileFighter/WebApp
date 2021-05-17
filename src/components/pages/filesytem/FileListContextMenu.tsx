import React from "react";
import useContextMenu from "../../../background/reactHooks/useContextMenu";

const FileListContextMenu = ({outerRef}: any) => {
    const {xPos, yPos, menu} = useContextMenu(outerRef);

    if (!menu) {
        return <></>
    }
    return (
        <ul className="fileListContextMenu" style={{ top: yPos, left: xPos }}>
            <li><a href={"./"}>&#128393; Rename</a></li>
            <li><a href={"./"}>&#9959; Delete</a></li>
            <li><a href={"./"}>&#128712; Details</a></li>
            <hr/>
            <li>&#11177; Share</li>
        </ul>
    );

};

export default FileListContextMenu;