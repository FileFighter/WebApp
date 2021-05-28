import React, { ReactElement, useEffect, useState } from "react";
import { getFolderContents } from "../../../background/api/filesystem";
import { FsEntity } from "../../../background/api/filesystemTypes";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FilesBreadcrumb } from "./FilesBreadcrumb";
import { filesBaseUrl } from "./Filesystem";
import FileListItem from "./FileListItem";
import { SystemState } from "../../../background/redux/actions/sytemState";
import {
    addToSelected,
    clearSelected,
    removeFromSelected,
    replaceSelected,
    setContents,
    setCurrentFsItemId,
    setCurrentPath
} from "../../../background/redux/actions/filesystem";
import { connect, ConnectedProps } from "react-redux";
import { FFLoading } from "../../basicElements/Loading";
import { AxiosResponse } from "axios";
import FileListHeader from "./FileListHeader";
import SelectedFsEntities from "./SelectedFsEntities";
import ToolbarActions from "./ToolbarActions";

const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities,
        folderContents: state.filesystem.folderContents,
        currentFsItemId: state.filesystem.currentFsItemId
    }
});

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addToSelected,
    removeFromSelected,
    replaceSelected,
    clearSelected,
    setContents,
    setCurrentFsItemId,
    setCurrentPath
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function FileList(props: Props): ReactElement {
    let location = useLocation();

    const [path, setPath] = useState<string>(
        location.pathname.slice(filesBaseUrl.length) || "/"
    );

    const filesAndFolders: FsEntity[] = props.filesystem.folderContents;
    const setFilesAndFolders = props.setContents;
    const [error, setError] = useState<string>("");
    const allAreSelected =
        filesAndFolders?.length ===
        props.filesystem.selectedFsEntities.length &&
        !!filesAndFolders?.length;

    const clearSelected = props.clearSelected;
    const setContents = props.setContents;
    const setCurrentPath = props.setCurrentPath;
    const setCurrentFsItemId = props.setCurrentFsItemId;

    useEffect((): void => {
        function updateStates(): void {
            getFolderContents(path)
                .then((response: AxiosResponse<FsEntity[]>) => {
                    console.log("got folder content", response);

                    setContents([
                        ...response.data.filter(
                            (fsEntity: FsEntity) => fsEntity.type === "FOLDER"
                        ),
                        ...response.data.filter(
                            (fsEntity: FsEntity) => fsEntity.type !== "FOLDER"
                        )
                    ]);
                    setError("");
                    setCurrentFsItemId(response.headers["x-ff-current"]);
                })
                .catch((err) => {
                    setError(err.response?.data?.message);
                    setFilesAndFolders([]);
                });
        }

        setPath(location.pathname.slice(filesBaseUrl.length) || "/");
        setCurrentPath(path);
        clearSelected();
        updateStates();
    }, [
        setContents,
        setCurrentFsItemId,
        setFilesAndFolders,
        clearSelected,
        path,
        setCurrentPath,
        location
    ]);

    function FileListStatus(): ReactElement {
        if (error && !filesAndFolders.length) {
            return <Col className={"text-center"}> {error}</Col>;
        }
        if (filesAndFolders.length === 0) {
            return (
                <Col className={"text-center"}>
                    Nothing to see here.
                </Col>
            );
        }
        if (!filesAndFolders) {
            return <FFLoading />;
        }
        return <></>
    }

// console.log("[FileList path]" + path, filesAndFolders);
    return (
        <Container fluid className="py-1 d-flex flex-column h-100">
            <div className="flex-shrink-0">
                <FilesBreadcrumb path={path} setPath={setPath} />
                <div
                    id="fileToolbar"
                    className={"pb-1 d-flex justify-content-between align-items-center"}
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
                <Row className="m-0">
                    <FileListStatus />
                    {filesAndFolders?.map((folder: FsEntity) => {
                        return (
                            <React.Fragment key={folder.fileSystemId}>
                                <FileListItem
                                    setPath={setPath}
                                    fileListItem={folder}
                                />
                                <Col xs={12} className="border-top my-2" />
                            </React.Fragment>
                        );
                    })}
                </Row>
            </div>
        </Container>
    );
}

export default connector(FileList);
