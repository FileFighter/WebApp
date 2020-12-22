import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {FsEntity} from "../../../background/api/filesystemTypes";
import {Row, Container, Col, Form} from "react-bootstrap";
import {useLocation} from 'react-router-dom'
import {FilesBreadcrumb} from "./FilesBreadcrumb";
import {filesBaseUrl} from "./Filesystem";
import {sortObjectsInArrayByProperty} from "./sortFilesAndFolders";
import FileListItem from "./FileListItem";


type Props = {}


export default function FileList(props: Props): ReactElement {
    let location = useLocation();

    const [path, setPath] = useState<string>(location.pathname.slice(filesBaseUrl.length) || "/")
    const [files, setFiles] = useState<FsEntity[] | null>(null)
    const [folders, setFolders] = useState<FsEntity[] | null>(null)
    const [error, setError] = useState<string>("");
    const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null)
    const [sortIncreasing, setSortIncreasing] = useState<boolean>(false)


    console.log("[FileList path]" + path)

    useEffect(() => {
        function updateStates(): void {
            getFolderContents(path)
                .then(
                    (response: FsEntity[]) => {
                        setFiles(response.filter((fsEntiy: FsEntity) => fsEntiy.type !== "FOLDER"))
                        setFolders(response.filter((fsEntiy: FsEntity) => fsEntiy.type === "FOLDER"))
                        setError("")
                    }
                )
                .catch(err => {
                    setError(err.response?.data.message)
                    setFiles([])
                    setFolders([])
                });

        }

        setPath(location.pathname.slice(filesBaseUrl.length) || "/")
        updateStates()

    }, [path, location]);

    function handleSortClick(property: keyof FsEntity) {
        if (sortedBy === property) setSortIncreasing(!sortIncreasing);
        else {
            setSortedBy(property);
            setSortIncreasing(true)
        }
        setFolders(sortObjectsInArrayByProperty(folders, property, sortIncreasing));
        setFiles(sortObjectsInArrayByProperty(files, property, sortIncreasing));
    }

// console.log("--------------------------------------------------------------------------------------")
//     console.log(folders)
//     let foldersa = folders ? [...folders] : []
//     let filesa = files ? [...files] : []
//     let sortedFoldersa = sortObjectsInArrayByProperty(foldersa, "name")
//     let sortedFilesa = sortObjectsInArrayByProperty(filesa, "name")
//     console.log(sortedFoldersa)
//     console.log("---------")
//     console.log(filesa)
//     console.log()
// console.log("--------------------------------------------------------------------------------------")


    return (
        <Container fluid>
            <FilesBreadcrumb path={path} setPath={setPath}/>
            <Row>
                <Col xs={1}> <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => console.log(`selected all files` /*TODO*/)}/>
                </Form.Group></Col>
                <Col xs={1} onClick={() => handleSortClick("type")}>{"Type"}</Col>
                <Col xs={1}>{}</Col>
                <Col xs={1}>{"Share"}</Col>
                <Col xs={3} onClick={() => handleSortClick("name")}>{"Name"}</Col>
                <Col xs={3} onClick={() => handleSortClick("createdByUserId")}>{"Owner"}</Col>
                <Col xs={1} onClick={() => handleSortClick("lastUpdated")}>{"Last changes"}</Col>
                <Col xs={1} onClick={() => handleSortClick("size")}>{"Size"}</Col>
            </Row>
            <hr/>
            <Row>

                {error ?
                    <Col className={"text-center"}> {error}</Col> : (!folders && !files) ?
                        <Col className={"text-center"}> Nothing to see here.</Col> : null
                }


                {folders?.map((folder: FsEntity, i: number) => {
                    return (<FileListItem key={i.toString()} setPath={setPath} fileListItem={folder}/>)
                })}
                {files?.map((file: FsEntity, i: number) => {
                    return (<FileListItem key={i.toString()} fileListItem={file}/>)
                })}
            </Row>
        </Container>)

}
