import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {Folder, File, BackendFolderContentsData} from "../../../background/api/filesystemTypes";
import {Row, Container} from "react-bootstrap";
import { useLocation } from 'react-router-dom'
import FileListItem from "./FileListItem";
import FileListFolder from "./FileListFolder";
import FileListFile from "./FileListFile";
import {FilesBreadcrumb} from "./FilesBreadcrumb";
import {filesBaseUrl} from "./Filesystem";


type Props = {}


export default function FileList(props: Props): ReactElement {

    const [path, setPath] = useState<string>(useLocation().pathname.slice(filesBaseUrl.length) || "/")
    const [files, setFiles] = useState<File[] | null>(null)
    const [folders, setFolders] = useState<Folder[] | null>(null)


    console.log("[FileList path]" + path)
    useEffect(() => {
        updateStates()
    }, [path]);

    function updateStates(): void {
        getFolderContents(path)
            .then(
                (response: BackendFolderContentsData) => {
                    setFiles(response.files)
                    setFolders(response.folders)
                }
            )

    }

    return (
        <Container fluid>
            <FilesBreadcrumb path={path} setPath={setPath}/>
            <Row>
                {folders?.map((folder: Folder, i: number) => {
                    return (<FileListFolder key={i.toString()} setPath={setPath} folder={folder}/>)
                })}
                {files?.map((file: File, i: number) => {
                    return (<FileListFile key={i.toString()} file={file}/>)
                })}
            </Row>
        </Container>)

}
