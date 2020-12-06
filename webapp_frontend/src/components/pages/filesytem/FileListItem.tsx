import {PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    FileEarmarkCodeIcon,
    FileEarmarkIcon,
    FileEarmarkImageIcon,
    FileEarmarkLock2Icon,
    FileEarmarkMusicIcon,
    FileEarmarkPDFIcon,
    FileEarmarkPlayIcon,
    FileEarmarkRichtextIcon,
    FileEarmarkTextIcon, FileEarmarkZipIcon,
    FolderIcon
} from "../../../elements/svg/SymbolFile";
import {reverseString} from "../../../background/methods/strings";
import {getDateAsStringFromTimestamp} from "../../../background/methods/time";
import {formatBytes} from "../../../background/methods/bytes";

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

    const ICON_PREFERENCES = {height: "40px", width: "auto", color: "secondary"}

    const FileIcon = (isFolder: boolean, name: string): ReactElement => {


        if (isFolder) return <FolderIcon {...ICON_PREFERENCES}/>

        let positionOfPoint = reverseString(name).indexOf(".");
        if (positionOfPoint < 0) return <FileEarmarkIcon {...ICON_PREFERENCES}/>

        const fileExtension = reverseString(reverseString(name).substr(0, positionOfPoint + 1));
        switch (fileExtension) {
            case ".txt" :
                return <FileEarmarkTextIcon {...ICON_PREFERENCES}/>
            case ".jpg" :
                return <FileEarmarkImageIcon {...ICON_PREFERENCES}/>
            case ".mp4" :
                return <FileEarmarkPlayIcon {...ICON_PREFERENCES}/>
            case ".mp3" :
                return <FileEarmarkMusicIcon {...ICON_PREFERENCES}/>
            case ".crypt" :
                return <FileEarmarkLock2Icon {...ICON_PREFERENCES}/>
            case ".pdf" :
                return <FileEarmarkPDFIcon {...ICON_PREFERENCES}/>
            case ".zip" :
            case ".7z" :
                return <FileEarmarkZipIcon {...ICON_PREFERENCES}/>
            case ".ts" :
            case ".tsx" :
            case ".js" :
            case ".jsx" :
            case ".java" :
                return <FileEarmarkCodeIcon {...ICON_PREFERENCES}/>
            case ".md" :
            case ".html" :
                return <FileEarmarkRichtextIcon {...ICON_PREFERENCES}/>
            default :
                return <FileEarmarkIcon {...ICON_PREFERENCES}/>
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
            <Col xs={1}>{FileIcon(props.fileListItem.isFolder, props.fileListItem.name)}</Col>
            <Col xs={1}>...</Col>
            <Col xs={3}> <Link
                to={props.fileListItem.path ? `/file${props.fileListItem.path ?? ""}` : `#${props.fileListItem.name}`}
                onClick={onClick}>{props.fileListItem.name}</Link>
            </Col>
            <Col xs={3}>{props.fileListItem.createdByUserId}</Col>
            <Col xs={1}>{getDateAsStringFromTimestamp(props.fileListItem.lastUpdated)}</Col>
            <Col xs={1}>{formatBytes(props.fileListItem.size)}</Col>
        </>
    )
}
