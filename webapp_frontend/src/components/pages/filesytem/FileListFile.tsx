import React, {ReactElement} from "react";
import {File} from "../../../background/api/filesystemTypes";
import FileListItem from "./FileListItem";

type Props={
    file:File
}

export default function FileListFile(props: Props): ReactElement {



    const fileListEntity = {
        createdByUserId: props.file.createdByUserId,
        id: props.file.id,
        lastUpdated: props.file.lastUpdated,
        name: props.file.name,
        permissionSet: props.file.permissionSet,
        size: props.file.size,
        type: props.file.type,
        isFolder:false


    };

    return (<FileListItem fileListItem={fileListEntity}/>)
}

