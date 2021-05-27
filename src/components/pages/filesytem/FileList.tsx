import React, { ReactElement, useEffect, useState } from "react";
import { getFolderContents } from "../../../background/api/filesystem";
import { FsEntity } from "../../../background/api/filesystemTypes";
import { Col, Container, Form, Row } from "react-bootstrap";
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
import { ClearSelected } from "../../../background/redux/actions/filesystemTypes";

const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities,
        folderContents: state.filesystem.folderContents,
        currentFsItemId: state.filesystem.currentFsItemId,
        currentPath: state.filesystem.currentPath
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

    const path = props.filesystem.currentPath;

    const filesAndFolders = props.filesystem.folderContents;
    const setFilesAndFolders = props.setContents;
    const [error, setError] = useState<string>("");
    const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null);
    const [sortIncreasing, setSortIncreasing] = useState<boolean>(false);
    const allAreSelected =
        filesAndFolders?.length ===
            props.filesystem.selectedFsEntities.length &&
        !!filesAndFolders?.length;

    const clearSelected = props.clearSelected;
    const setContents = props.setContents;
    const setCurrentPath = props.setCurrentPath;
    const setCurrentFsItemId = props.setCurrentFsItemId;

    useEffect((): void => {
        function updateStates(newPath: string): void {
            getFolderContents(newPath)
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
        const newPath = location.pathname.slice(filesBaseUrl.length) || "/";
        setCurrentPath(newPath);
        clearSelected();
        updateStates(newPath);
    }, [
        setContents,
        setCurrentFsItemId,
        setFilesAndFolders,
        clearSelected,
        setCurrentPath,
        location
    ]);

    const handleSelectAllChanged = (): void | ClearSelected => {
        if (allAreSelected) {
            return props.clearSelected();
        }
        if (filesAndFolders) {
            props.replaceSelected([...filesAndFolders]);
        }
    };

    function setSortingOrder(property: keyof FsEntity): void {
        if (sortedBy === property) {
            return setSortIncreasing(!sortIncreasing);
        }
        setSortedBy(property);
        setSortIncreasing(true);
    }

    function getSortingFunction(
        property: keyof FsEntity
    ): (a: any, b: any) => number {
        switch (property) {
            case "lastUpdatedBy":
            case "size":
                return (a: any, b: any) =>
                    a[property] - b[property] === 0
                        ? a.fileSystemId - b.fileSystemId
                        : a[property] - b[property];
            case "name":
            case "type":
                return (a: any, b: any) =>
                    a[property]
                        .toLowerCase()
                        .localeCompare(b[property].toLowerCase()) === 0
                        ? a.fileSystemId - b.fileSystemId
                        : a[property]
                              .toLowerCase()
                              .localeCompare(b[property].toLowerCase());
            case "lastUpdated":
            default:
                return (a: any, b: any) =>
                    a.lastUpdatedBy.username
                        .toLowerCase()
                        .localeCompare(
                            b.lastUpdatedBy.username.toLowerCase()
                        ) === 0
                        ? a.fileSystemId - b.fileSystemId
                        : a.lastUpdatedBy.username
                              .toLowerCase()
                              .localeCompare(
                                  b.lastUpdatedBy.username.toLowerCase()
                              );
        }
    }

    function handleSortClick(property: keyof FsEntity): void {
        if (!filesAndFolders || filesAndFolders.length < 2) {
            return;
        }

        setSortingOrder(property);
        let toSort = [...(filesAndFolders ?? [])];

        toSort.sort(getSortingFunction(property));
        setFilesAndFolders(sortIncreasing ? toSort.reverse() : toSort);
    }

    console.log("[FileList path]" + path, filesAndFolders);
    return (
        <Container fluid className="d-flex flex-column h-100">
            <div className="flex-shrink-0">
                <FilesBreadcrumb path={path} />
                {/*Table Head*/}
                <Row>
                    <Col xs={2} md={1}>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                checked={allAreSelected}
                                type="checkbox"
                                onChange={handleSelectAllChanged}
                            />
                        </Form.Group>
                    </Col>
                    <Col
                        xs={2}
                        md={1}
                        className="text-center"
                        onClick={() => handleSortClick("type")}
                    >
                        {"Type"}
                    </Col>
                    <Col xs={2} md={1}>
                        {"Interact"}
                    </Col>
                    <Col xs={6} md={4} onClick={() => handleSortClick("name")}>
                        {"Name"}
                    </Col>
                    <Col
                        xs={6}
                        md={3}
                        onClick={() => handleSortClick("lastUpdatedBy")}
                    >
                        Last updated by
                    </Col>
                    <Col
                        xs={3}
                        md={1}
                        onClick={() => handleSortClick("lastUpdated")}
                    >
                        {"Last changes"}
                    </Col>
                    <Col xs={3} md={1} onClick={() => handleSortClick("size")}>
                        {"Size"}
                    </Col>
                </Row>
            </div>
            <div className="overflow-auto flex-grow-1">
                {/*Table Body*/}
                <Row className="m-0">
                    {error && !filesAndFolders.length ? (
                        <Col className={"text-center"}> {error}</Col>
                    ) : filesAndFolders?.length === 0 ? (
                        <Col className={"text-center"}>
                            Nothing to see here.
                        </Col>
                    ) : (
                        !filesAndFolders && <FFLoading />
                    )}

                    {filesAndFolders?.map((folder: FsEntity) => {
                        return (
                            <React.Fragment key={folder.fileSystemId}>
                                <FileListItem fileListItem={folder} />
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
