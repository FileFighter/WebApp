import React, { ReactElement } from "react";
import FileList from "./FileList";
import SelectedFsEntities from "./SelectedFsEntities";
import { Container } from "react-bootstrap";
import ToolbarActions from "./ToolbarActions";
import { ApiActionsInfo } from "./ApiActionsInfo";
import UploadZone from "./upload/UploadZone";

export const filesBaseUrl = "/file";

type Props = {};

function FileSystem(props: Props): ReactElement {

    return (
        <div className="d-flex flex-column align-content-between justify-content-between h-100">
            <Container
                id="fileToolbar"
                fluid
                className={"py-1 border d-flex justify-content-between flex-shrink-0"}
            >
                <SelectedFsEntities />
                <ToolbarActions />
            </Container>
            <div className="flex-grow-1 overflow-auto" id="fileView">
                <FileList />
                <ApiActionsInfo />
            </div>
            <div className="flex-shrink-0" id="uploadZone">
                <UploadZone />
            </div>
        </div>
    );
}

export default FileSystem;
