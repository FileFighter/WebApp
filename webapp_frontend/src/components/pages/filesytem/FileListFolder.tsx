import React, {ReactElement} from "react";
import {Folder} from "../../../background/api/filesystemTypes";
import FileListItem from "./FileListItem";

type Props = {
    folder: Folder
    setPath: Function

}

export default function FileListFolder(props: Props): ReactElement {


    const fileListEntity = {
        createdByUserId: props.folder.createdByUserId,
        id: props.folder.id,
        lastUpdated: props.folder.lastUpdated,
        name: props.folder.name,
        permissionSet: props.folder.permissionSet,
        size: props.folder.size,
        type: props.folder.type,
        isFolder: true,
        path: props.folder.path,


    };

    return (<FileListItem setPath={props.setPath} fileListItem={fileListEntity}/>)
}

