import {FsEntity} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";
import {Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getDateAsStringFromTimestamp} from "../../../background/methods/time";
import {formatBytes} from "../../../background/methods/bytes";
import {connect, ConnectedProps} from "react-redux";
import {SystemState} from "../../../background/redux/actions/sytemState";
import {addToSelected, removeFromSelected} from "../../../background/redux/actions/filesystem";
import FileIcon from "./FileIcon";

const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities
    }
});

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addToSelected,
    removeFromSelected
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    fileListItem: FsEntity;
    setPath?: Function;
};

function FileListItem(props: Props): ReactElement {
    let isSelected = !!props.filesystem.selectedFsEntities.find(
        (e: FsEntity) => e.fileSystemId === props.fileListItem.fileSystemId
    );


    const onClick = () => {
        if (
            props.fileListItem.type === "FOLDER" &&
            props.setPath &&
            props.fileListItem.path
        ) {
            props.setPath(props.fileListItem.path);
        }
    };

    const handleSelectedChanged = () => {
        if (isSelected) {
            props.removeFromSelected(props.fileListItem);
        } else {
            props.addToSelected(props.fileListItem);
        }
    };

    return (
        <>
            <Col xs={2} md={1} className="fileRow">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        checked={isSelected}
                        type="checkbox"
                        onChange={handleSelectedChanged}
                    />
                </Form.Group>
            </Col>
            <Col xs={2} md={1}>
                {FileIcon(
                    props.fileListItem.type === "FOLDER",
                    props.fileListItem.name
                )}
            </Col>
            <Col xs={1}>...</Col>
            <Col xs={7} md={4}>
                <Link
                    to={
                        props.fileListItem.path && props.fileListItem.type === "FOLDER"
                            ? `/file${props.fileListItem.path ?? ""}`
                            : `#${props.fileListItem.name}`
                    }
                    onClick={onClick}
                >
                    {props.fileListItem.name}
                </Link>
            </Col>
            <Col xs={6} md={3}>
                {props.fileListItem.lastUpdatedBy.username}
            </Col>
            <Col xs={3} md={1}>
                {getDateAsStringFromTimestamp(props.fileListItem.lastUpdated)}
            </Col>
            <Col xs={3} md={1}>
                {formatBytes(props.fileListItem.size)}
            </Col>
        </>
    );
}

export default connector(FileListItem);
