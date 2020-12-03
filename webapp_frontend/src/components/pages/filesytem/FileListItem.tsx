import {Folder, File, PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Button, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";


type Props = {
    fileListItem:FileListEntity;
    setPath?:Function,
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
    if (props.fileListItem.isFolder && props.setPath){
        props.setPath(props.fileListItem.path)
    }

}



    return (
    <>
        <Col xs={1}> <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox"  onChange={() => console.log(`[files] selected ${props.fileListItem.id}`)}/>
        </Form.Group></Col>
        <Col xs={2} >{props.fileListItem.type}</Col>
        <Col xs={3}><Link to={`/file${props.fileListItem.path?? ""}`}  onClick={()=>onClick()}>{props.fileListItem.name}</Link></Col>
        <Col xs={4}>{props.fileListItem.createdByUserId}</Col>
        <Col xs={1}>{props.fileListItem.lastUpdated}</Col>
        <Col xs={1}>{props.fileListItem.size}</Col>
    </>
    )
}
