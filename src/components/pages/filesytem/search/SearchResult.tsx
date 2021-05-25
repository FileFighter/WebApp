import { FsEntity } from "../../../../background/api/filesystemTypes";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { getPathWithoutName } from "../../../../background/methods/filesystem";

interface Props {
    fsEntity: FsEntity;
    handleClose: () => void;
}

function SearchResult({ fsEntity, handleClose }: Props): ReactElement {
    const pathWithoutName = getPathWithoutName(fsEntity.path, fsEntity.name);
    return (
        <Row className="m-0">
            <Col>{fsEntity.name}</Col>
            <Col>
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
    );
}

export default SearchResult;
