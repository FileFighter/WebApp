import React, {ReactElement} from "react";
import {Folder} from "../../../background/api/filesystemTypes";
import FileListFile from "./FileListFile";
import FileListItem, {FileListEntity} from "./FileListItem";

type Props = {
    folder: Folder
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
        isFolder:true


    };

    return (<FileListItem fileListItem={fileListEntity}/>)
}

