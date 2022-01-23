import { FsEntity } from "../../../../background/api/filesystemTypes"
import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { getPathWithoutName } from "../../../../background/methods/filesystem"
import FileIcon from "../fileIcon/FileIcon"
import FileItemContextMenu from "../FileItemContextMenu"

interface Props {
    fsEntity: FsEntity
    handleClose: () => void
}

function SearchResult({ fsEntity, handleClose }: Props): ReactElement {
    const pathWithoutName = getPathWithoutName(fsEntity.path, fsEntity.name)
    return (
        <Row className="m-0">
            <Col xs={1} className="p-0">
                <FileIcon
                    type={fsEntity.type}
                    mimeType={fsEntity.mimeType}
                    name={fsEntity.name}
                />
            </Col>
            <Col xs={2}>
                <FileItemContextMenu fsEntity={fsEntity} />
            </Col>
            <Col xs={3} className="text-truncate">
                {fsEntity.name}
            </Col>
            <Col xs={6} className="text-truncate">
                <Link
                    to={
                        fsEntity.path && fsEntity.type === "FOLDER"
                            ? `/file${fsEntity.path ?? ""}`
                            : `/file${pathWithoutName}#${fsEntity.name}`
                    }
                    onClick={handleClose}
                >
                    {pathWithoutName}
                </Link>
            </Col>
        </Row>
    )
}

export default SearchResult
