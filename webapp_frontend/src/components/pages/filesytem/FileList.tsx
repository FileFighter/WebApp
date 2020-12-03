import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {Folder, File, BackendFolderContentsData} from "../../../background/api/filesystemTypes";
import {Row, Container, Col, Form} from "react-bootstrap";
import {Link, useLocation} from 'react-router-dom'
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
        function updateStates(): void {
            getFolderContents(path)
                .then(
                    (response: BackendFolderContentsData) => {
                        setFiles(response.files)
                        setFolders(response.folders)
                    }
                )

        }

        updateStates()

    }, [path]);

    return (
        <Container fluid>
            <FilesBreadcrumb path={path} setPath={setPath}/>
            <Row>
                <Col xs={1}> <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => console.log(`selected all files` /*TODO*/)}/>
                </Form.Group></Col>
                <Col xs={2}>{}</Col>
                <Col xs={3}>{"Name"}</Col>
                <Col xs={4}>{"Owner"}</Col>
                <Col xs={1}>{"Last changes"}</Col>
                <Col xs={1}>{"Size"}</Col>
            </Row>
            <hr/>
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
