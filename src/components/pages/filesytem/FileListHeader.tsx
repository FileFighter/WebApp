import { FsEntity } from "../../../background/api/filesystemTypes";
import React, { ReactElement, useState } from "react";
import { ClearSelected } from "../../../background/redux/actions/filesystemTypes";
import { Col, Form, Row } from "react-bootstrap";
import {
    clearSelected,
    replaceSelected
} from "../../../background/redux/actions/filesystem";
import { connect, ConnectedProps } from "react-redux";
import { SystemState } from "../../../background/redux/actions/sytemState";
import fileListSize from "./fileListSize";

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
    clearSelected,
    replaceSelected
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TReduxProps = PropsFromRedux & FileListHeaderInterface;

function FileListHeader(props: TReduxProps): ReactElement {
    const {
        allAreSelected,
        filesAndFolders,
        setFilesAndFolders,
        clearSelected,
        replaceSelected
    } = props;

    const [sortIncreasing, setSortIncreasing] = useState<boolean>(false);
    const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null);

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

    return (
        <Row>
            {/*Checkbox*/}
            <Col xs={fileListSize.checkbox.xs} md={fileListSize.checkbox.md}>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        checked={allAreSelected}
                        type="checkbox"
                        onChange={handleSelectAllChanged}
                    />
                </Form.Group>
            </Col>
            {/*Icon*/}
            <Col
                xs={fileListSize.icon.xs}
                md={fileListSize.icon.md}
                className="text-center"
                onClick={() => handleSortClick("type")}
            >
                {"Type"}
            </Col>
            {/*Context Menu*/}
            <Col
                xs={fileListSize.contextMenu.xs}
                md={fileListSize.contextMenu.md}
            >
                Interact
            </Col>
            {/*Name*/}
            <Col
                xs={fileListSize.name.xs}
                md={fileListSize.name.md}
                onClick={() => handleSortClick("name")}
            >
                Name
            </Col>
            {/*Modified by*/}
            <Col
                xs={fileListSize.modifiedBy.xs}
                md={fileListSize.modifiedBy.md}
                onClick={() => handleSortClick("lastUpdatedBy")}
            >
                Modified by
            </Col>
            {/*Modified on*/}
            <Col
                xs={fileListSize.modifiedOn.xs}
                md={fileListSize.modifiedOn.md}
                onClick={() => handleSortClick("lastUpdated")}
            >
                Modified on
            </Col>
            {/*Size*/}
            <Col
                xs={fileListSize.size.xs}
                md={fileListSize.size.md}
                onClick={() => handleSortClick("size")}
            >
                {"Size"}
            </Col>
            <Col xs={fileListSize.border.xs} className="border-top my-2" />
        </Row>
    );
}

export default connector(FileListHeader);
