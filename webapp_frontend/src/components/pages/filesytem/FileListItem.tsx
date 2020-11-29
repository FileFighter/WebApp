import {Folder, File, PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Button, Col} from "react-bootstrap";


type Props = {
    fileListItem:FileListEntity;
    SetPath?:Function,
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
    path?:string


}

export default function FileListItem(props: Props): ReactElement {


const onClick=()=>{
    if (props.fileListItem.isFolder && props.SetPath){
        props.SetPath(props.fileListItem.path)
    }

}



    return (
    <>
        <Col xs={1}>Checkbox</Col>
        <Col xs={2} ><Button onClick={()=>onClick()}>{props.fileListItem.type}</Button></Col>
        <Col xs={3}>{props.fileListItem.name}</Col>
        <Col xs={4}>{props.fileListItem.createdByUserId}</Col>
        <Col xs={1}>{props.fileListItem.lastUpdated}</Col>
        <Col xs={1}>{props.fileListItem.size}</Col>
    </>
    )
}
