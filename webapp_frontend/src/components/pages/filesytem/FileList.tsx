import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {FsEntity} from "../../../background/api/filesystemTypes";
import {Col, Container, Form, Row} from "react-bootstrap";
import {useLocation} from 'react-router-dom'
import {FilesBreadcrumb} from "./FilesBreadcrumb";
import {filesBaseUrl} from "./Filesystem";
import {sortObjectsInArrayByProperty} from "./sortFilesAndFolders";
import FileListItem from "./FileListItem";
import {SystemState} from "../../../background/redux/actions/sytemState";
import {addToSelected, removeFromSelected} from "../../../background/redux/actions/filesystem";
import {connect, ConnectedProps} from "react-redux";


const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEnties: state.filesystem.selectedFsEnties
    },
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addToSelected, removeFromSelected
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


type Props = PropsFromRedux & {}


function FileList(props: Props): ReactElement {
    let location = useLocation();

    const [path, setPath] = useState<string>(location.pathname.slice(filesBaseUrl.length) || "/")
    const [files, setFiles] = useState<FsEntity[] | null>(null)
    const [folders, setFolders] = useState<FsEntity[] | null>(null)
    const [error, setError] = useState<string>("");
    const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null)
    const [sortIncreasing, setSortIncreasing] = useState<boolean>(false)
    const [allAreSelected, setAllAreSelected] = useState<boolean | undefined>(false)
    const [currentFolderSelected, setCurrentFolderSelected] = useState<FsEntity[]>(props.filesystem.selectedFsEnties.filter((e: FsEntity) => e.path.substr(0, path.length) === path))


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

    useEffect(() => {
        setCurrentFolderSelected(props.filesystem.selectedFsEnties.filter((e: FsEntity) => e.path.substr(0, path.length) === path));
    }, [folders, files,path, props.filesystem.selectedFsEnties])

    useEffect(() => {
        if (files && folders)
            setAllAreSelected(folders.every((e: FsEntity) => currentFolderSelected.find((selectedEl: FsEntity) => e.fileSystemId === selectedEl.fileSystemId)) &&
                files.every((e: FsEntity) => currentFolderSelected.find((selectedEl: FsEntity) => e.fileSystemId === selectedEl.fileSystemId)));
    }, [folders, files, currentFolderSelected])

    const handleSelectAllChanged = () => {

        if (allAreSelected) {
            files?.forEach((e: FsEntity) => props.removeFromSelected(e));
            folders?.forEach((e: FsEntity) => props.removeFromSelected(e));
        } else {
            files?.forEach((e: FsEntity) => props.addToSelected(e));
            folders?.forEach((e: FsEntity) => props.addToSelected(e));
        }

    }

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
                    <Form.Check checked={allAreSelected} type="checkbox" onChange={handleSelectAllChanged}/>
                </Form.Group></Col>
                <Col xs={1} onClick={() => handleSortClick("type")}>{"Type"}</Col>
                <Col xs={1}>{}</Col>
                <Col xs={1}>{"Share"}</Col>
                <Col xs={3} onClick={() => handleSortClick("name")}>{"Name"}</Col>
                <Col xs={3} onClick={() => handleSortClick("createdByUser")}>{"Owner"}</Col>
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
                    return (<FileListItem key={i.toString()} setPath={setPath} fileListItem={folder} currentFolderSelected={currentFolderSelected}/>)
                })}
                {files?.map((file: FsEntity, i: number) => {
                    return (<FileListItem key={i.toString()} fileListItem={file} currentFolderSelected={currentFolderSelected}/>)
                })}
            </Row>
        </Container>)

}

export default connector(FileList);
