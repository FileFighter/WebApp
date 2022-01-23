import { FsEntity } from "../../../background/api/filesystemTypes"
import React, { ReactElement } from "react"
import { Col, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getDateAsStringFromTimestamp } from "../../../background/methods/dataTypes/time"
import { formatBytes } from "../../../background/methods/dataTypes/bytes"
import { connect, ConnectedProps } from "react-redux"
import { SystemState } from "../../../background/redux/actions/sytemState"
import {
    addToSelected,
    removeFromSelected,
} from "../../../background/redux/actions/filesystem"
import FileIcon from "./fileIcon/FileIcon"
import FileItemContextMenu from "./FileItemContextMenu"
import fileListSize from "./fileListSize"

const mapState = (state: SystemState) => ({
    filesystem: {
        selectedFsEntities: state.filesystem.selectedFsEntities,
    },
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addToSelected,
    removeFromSelected,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    fileListItem: FsEntity
}

function FileListItem(props: Props): ReactElement {
    let isSelected = !!props.filesystem.selectedFsEntities.find(
        (e: FsEntity) => e.fileSystemId === props.fileListItem.fileSystemId
    )

    const handleSelectedChanged = () => {
        if (!isSelected) {
            return props.addToSelected(props.fileListItem)
        }
        props.removeFromSelected(props.fileListItem)
    }

    const isFolder =
        props.fileListItem.type && props.fileListItem.type === "FOLDER"

    return (
        <>
            {/*Checkbox*/}
            <Col
                xs={fileListSize.checkbox.xs}
                md={fileListSize.checkbox.md}
                className="fileRow"
            >
                <Form.Group controlId="formBasicCheckbox" className={"pl-3"}>
                    <Form.Check
                        checked={isSelected}
                        type="checkbox"
                        onChange={handleSelectedChanged}
                    />
                </Form.Group>
            </Col>
            {/*Icon*/}
            <Col xs={fileListSize.icon.xs} md={fileListSize.icon.md}>
                <FileIcon
                    type={props.fileListItem.type}
                    mimeType={props.fileListItem.mimeType}
                    name={props.fileListItem.name}
                />
            </Col>
            {/*Context Menu*/}
            <Col
                xs={fileListSize.contextMenu.xs}
                md={fileListSize.contextMenu.md}
            >
                <FileItemContextMenu fsEntity={props.fileListItem} />
            </Col>
            {/*Name*/}
            <Col
                xs={fileListSize.name.xs}
                md={fileListSize.name.md}
                className="text-truncate"
            >
                <Link
                    target={isFolder ? undefined : "_blank"}
                    to={
                        isFolder
                            ? `/file${props.fileListItem.path ?? ""}`
                            : "/data/preview/" +
                              props.fileListItem.fileSystemId +
                              "/" +
                              props.fileListItem.name
                    }
                >
                    {props.fileListItem.name}
                </Link>
            </Col>
            {/*Modified by*/}
            <Col
                xs={fileListSize.modifiedBy.xs}
                md={fileListSize.modifiedBy.md}
                className="text-truncate"
            >
                {props.fileListItem.lastUpdatedBy.username}
            </Col>
            {/*Modified on*/}
            <Col
                xs={fileListSize.modifiedOn.xs}
                md={fileListSize.modifiedOn.md}
            >
                {getDateAsStringFromTimestamp(props.fileListItem.lastUpdated)}
            </Col>
            {/*Size*/}
            <Col xs={fileListSize.size.xs} md={fileListSize.size.md}>
                {formatBytes(props.fileListItem.size)}
            </Col>
        </>
    )
}

export default connector(FileListItem)
