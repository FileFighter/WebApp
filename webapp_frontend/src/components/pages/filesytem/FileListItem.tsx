import {Folder, File, PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Col} from "react-bootstrap";


type Props = {
    fileListItem:FileListEntity;
}


export interface FileListEntity{
    createdByUserId:number
    id:number
    lastUpdated:number
    name:string
    permissionSet:PermissionSet
    size:number;
    type:string;
    isFolder:boolean


}

export default function FileListItem(props: Props): ReactElement {






    // @ts-ignore
    return (
    <>
        <Col xs={2}>Checkbox</Col>
        <Col xs={1}>{props.fileListItem.type}</Col>
        <Col xs={3}>{props.fileListItem.name}</Col>
        <Col xs={4}>{props.fileListItem.createdByUserId}</Col>
        <Col xs={1}>{props.fileListItem.lastUpdated}</Col>
        <Col xs={1}>{props.fileListItem.size}</Col>
    </>
    )
}
