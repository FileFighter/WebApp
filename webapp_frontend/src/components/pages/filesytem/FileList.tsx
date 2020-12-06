import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {Folder, File, BackendFolderContentsData} from "../../../background/api/filesystemTypes";
import {Row, Container, Col, Form} from "react-bootstrap";
import {useLocation} from 'react-router-dom'
import FileListFolder from "./FileListFolder";
import FileListFile from "./FileListFile";
import {FilesBreadcrumb} from "./FilesBreadcrumb";
import {filesBaseUrl} from "./Filesystem";


type Props = {}


export default function FileList(props: Props): ReactElement {
    let location = useLocation();

    const [path, setPath] = useState<string>(location.pathname.slice(filesBaseUrl.length) || "/")
    const [files, setFiles] = useState<File[] | null>(null)
    const [folders, setFolders] = useState<Folder[] | null>(null)
    const [error, setError] = useState<string>("");


    console.log("[FileList path]" + path)

    useEffect(() => {
        function updateStates(): void {
            getFolderContents(path)
                .then(
                    (response: BackendFolderContentsData) => {
                        setFiles(response.files)
                        setFolders(response.folders)
                        setError("")
                    }
                )
                .catch(error => {
                    setError(error.response?.data.message)
                    setFiles([])
                    setFolders([])
                });

        }

        setPath(location.pathname.slice(filesBaseUrl.length) || "/")
        updateStates()

    }, [path, location]);




    return (
        <Container fluid>
            <FilesBreadcrumb path={path} setPath={setPath}/>
            <Row>
                <Col xs={1}> <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => console.log(`selected all files` /*TODO*/)}/>
                </Form.Group></Col>
                <Col xs={1}>{"Type"}</Col>
                <Col xs={1}>{}</Col>
                <Col xs={1}>{"Share"}</Col>
                <Col xs={3}>{"Name"}</Col>
                <Col xs={3}>{"Owner"}</Col>
                <Col xs={1}>{"Last changes"}</Col>
                <Col xs={1}>{"Size"}</Col>
            </Row>
            <hr/>
            <Row>

                {error ?
                    <Col className={"text-center"}> {error}</Col> : (!folders && !files) ?
                        <Col className={"text-center"}> Nothing to see here.</Col> : null
                }


                {folders?.map((folder: Folder, i: number) => {
                    return (<FileListFolder key={i.toString()} setPath={setPath} folder={folder}/>)
                })}
                {files?.map((file: File, i: number) => {
                    return (<FileListFile key={i.toString()} file={file}/>)
                })}
            </Row>
        </Container>)

}
