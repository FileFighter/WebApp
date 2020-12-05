import {PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    FileEarmarkIcon,
    FileEarmarkImageIcon, FileEarmarkMusicIcon, FileEarmarkPlayIcon, FileEarmarkRichtextIcon,
    FileEarmarkTextIcon,
    FolderIcon
} from "../../../elements/svg/SymbolFile";
import {reverseString} from "../../../background/methods/strings";

type Props = {
    fileListItem: FileListEntity;
    setPath?: Function,
}


export interface FileListEntity {
    createdByUserId: number
    id: number
    lastUpdated: number
    name: string
    permissionSet: PermissionSet
    size: number;
    type: string;
    isFolder: boolean
    path?: string


}

export default function FileListItem(props: Props): ReactElement {

    const ICON_HEIGHT = "40px";

    const rightFileIcon = (type: string, name: string): ReactElement => {
        if (type.toLowerCase() === "folder") return <FolderIcon height={ICON_HEIGHT} width={"auto"}
                                                                color={"secondary"}/>
        let positionOfPoint = reverseString(name).indexOf(".");
        if (positionOfPoint < 0) return <FileEarmarkIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>

        const fileExtension = reverseString(reverseString(name).substr(0, positionOfPoint + 1));
        switch (fileExtension) {
            case ".txt" :
                return <FileEarmarkTextIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
            case ".jpg" :
                return <FileEarmarkImageIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
            case ".mp4" :
                return <FileEarmarkPlayIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
            case ".mp3" :
                return <FileEarmarkMusicIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
            case ".md" :
            case ".html" : return <FileEarmarkRichtextIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
            default :
                return <FileEarmarkIcon height={ICON_HEIGHT} width={"auto"} color={"secondary"}/>
        }
    }

    const onClick = () => {
        if (props.fileListItem.isFolder && props.setPath && props.fileListItem.path) {
            props.setPath(props.fileListItem.path)
        }

    }


    return (
        <>
            <Col xs={1}> <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onChange={() => console.log(`[files] selected ${props.fileListItem.id}`)}/>
            </Form.Group></Col>
            <Col xs={1}>{props.fileListItem.type}</Col>
            <Col xs={1}>{rightFileIcon(props.fileListItem.type, props.fileListItem.name)}</Col>
            <Col xs={1}>...</Col>
            <Col xs={3}><Link to={`/file${props.fileListItem.path ?? ""}`}
                              onClick={() => onClick()}>{props.fileListItem.name}</Link></Col>
            <Col xs={3}>{props.fileListItem.createdByUserId}</Col>
            <Col xs={1}>{props.fileListItem.lastUpdated}</Col>
            <Col xs={1}>{props.fileListItem.size}</Col>
        </>
    )
}
