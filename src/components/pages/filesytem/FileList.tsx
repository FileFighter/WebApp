import React, { ReactElement, useEffect, useState } from "react"
import { getFolderContents } from "../../../background/api/filesystem"
import {
    ContentsResource,
    FsEntity,
} from "../../../background/api/filesystemTypes"
import { Col, Container, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { FilesBreadcrumb } from "./FilesBreadcrumb"
import { filesBaseUrl } from "./Filesystem"
import FileListItem from "./FileListItem"
import { SystemState } from "../../../background/redux/actions/sytemState"
import {
    addToSelected,
    clearSelected,
    setContents,
    setCurrentFsItemId,
    setCurrentPath,
} from "../../../background/redux/actions/filesystem"
import { connect, ConnectedProps } from "react-redux"
import { FFLoading } from "../../basicElements/Loading"
import { AxiosResponse } from "axios"
import FileListHeader from "./FileListHeader"
import SelectedFsEntities from "./SelectedFsEntities"
import ToolbarActions from "./ToolbarActions"
import fileListSize from "./fileListSize"

const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities,
        folderContents: state.filesystem.folderContents,
        currentFsItemId: state.filesystem.currentFsItemId,
        currentPath: state.filesystem.currentPath,
    },
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addToSelected,
    clearSelected,
    setContents,
    setCurrentFsItemId,
    setCurrentPath,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type reduxProps = PropsFromRedux & {}

function FileList(props: reduxProps): ReactElement {
    let location = useLocation()

    const path = props.filesystem.currentPath

    const filesAndFolders: FsEntity[] = props.filesystem.folderContents
    const setFilesAndFolders = props.setContents
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const allAreSelected =
        filesAndFolders?.length ===
            props.filesystem.selectedFsEntities.length &&
        !!filesAndFolders?.length

    const clearSelected = props.clearSelected
    const setContents = props.setContents
    const setCurrentPath = props.setCurrentPath
    const setCurrentFsItemId = props.setCurrentFsItemId

    useEffect((): void => {
        function updateStates(newPath: string): void {
            getFolderContents(newPath)
                .then((response: AxiosResponse<ContentsResource>) => {
                    console.log("got folder content", response)
                    setLoading(false)
                    setContents([
                        ...response.data.inodes.filter(
                            (fsEntity: FsEntity) => fsEntity.mimeType === null
                        ),
                        ...response.data.inodes.filter(
                            (fsEntity: FsEntity) => fsEntity.mimeType !== null
                        ),
                    ])
                    setError("")
                    setCurrentFsItemId(response.headers["x-ff-current"])
                })
                .catch((err) => {
                    setError(err.response?.data?.message)
                    setFilesAndFolders([])
                })
        }
        const newPath = location.pathname.slice(filesBaseUrl.length) || "/"
        setCurrentPath(newPath)
        clearSelected()
        setLoading(true)
        updateStates(newPath)
    }, [
        setContents,
        setCurrentFsItemId,
        setFilesAndFolders,
        clearSelected,
        setCurrentPath,
        location,
    ])

    function FileListStatus(): ReactElement {
        if (error && !filesAndFolders.length) {
            return <Col className={"text-center"}>{error}</Col>
        }
        if (loading) {
            return <FFLoading />
        }
        if (filesAndFolders.length === 0) {
            return <Col className={"text-center"}>Nothing to see here.</Col>
        }

        return <></>
    }

    // console.log("[FileList path]" + path, filesAndFolders);
    return (
        <Container fluid className="py-1 d-flex flex-column h-100">
            <div className="flex-shrink-0">
                <FilesBreadcrumb path={path} />
                <div
                    id="fileToolbar"
                    className={
                        "pb-1 d-flex justify-content-between align-items-center"
                    }
                >
                    <SelectedFsEntities />
                    <ToolbarActions />
                </div>
                {/*Table Head*/}
                <FileListHeader
                    allAreSelected={allAreSelected}
                    filesAndFolders={filesAndFolders}
                    setFilesAndFolders={setFilesAndFolders}
                />
            </div>
            <div className="overflow-auto flex-grow-1">
                {/*Table Body*/}
                <FileListStatus />
                {filesAndFolders?.map((folder: FsEntity) => {
                    return (
                        <Row className="m-0">
                            {/*<React.Fragment key={folder.fileSystemId}>*/}
                            <FileListItem fileListItem={folder} />
                            <Col
                                xs={fileListSize.border.xs}
                                className="border-top my-2"
                            />
                            {/*</React.Fragment>*/}
                        </Row>
                    )
                })}
            </div>
        </Container>
    )
}

export default connector(FileList)
