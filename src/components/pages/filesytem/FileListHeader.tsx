import { FsEntity } from "../../../background/api/filesystemTypes";
import React, { ReactElement, useState } from "react";
import { ClearSelected } from "../../../background/redux/actions/filesystemTypes";
import { Col, Form, Row } from "react-bootstrap";
import { clearSelected, replaceSelected } from "../../../background/redux/actions/filesystem";
import { connect } from "react-redux";
import { SystemState } from "../../../background/redux/actions/sytemState";

interface FileListHeaderInterface {
    allAreSelected: boolean;
    filesAndFolders: FsEntity[];
    setFilesAndFolders: (content: FsEntity[]) => {};
}

export const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities,
        folderContents: state.filesystem.folderContents,
        currentFsItemId: state.filesystem.currentFsItemId
    }
});

// this takes the redux actions and maps them to the props
const mapDispatch = {
    replaceSelected
};

const connector = connect(mapState, mapDispatch);

function FileListHeader(props: FileListHeaderInterface): ReactElement {
    const { allAreSelected, filesAndFolders, setFilesAndFolders } = props;

    const [sortIncreasing, setSortIncreasing] = useState<boolean>(false);
    const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null);

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

    const handleSelectAllChanged = (): void | ClearSelected => {
        if (allAreSelected) {
            return clearSelected();
        }
        if (filesAndFolders) {
            replaceSelected([...filesAndFolders]);
        }
    };

    function handleSortClick(property: keyof FsEntity): void {
        if (!filesAndFolders || filesAndFolders.length < 2) {
            return;
        }

        setSortingOrder(property);
        let toSort = [...(filesAndFolders ?? [])];

        toSort.sort(getSortingFunction(property));
        setFilesAndFolders(sortIncreasing ? toSort.reverse() : toSort);
    }

    return (
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
            <Col xs={12} className="border-top my-2" />
        </Row>
    );
}

export default connector(FileListHeader);