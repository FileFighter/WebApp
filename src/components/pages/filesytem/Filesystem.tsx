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
            <div className="flex-grow-1 overflow-auto d-flex h-100 flex-column" id="fileView">
                <div id="fileList" className="flex-grow-1 overflow-auto">
                    <FileList />
                </div>
                <div id="uploadInformation" className="flex-shrink-0">
                    <ApiActionsInfo />
                </div>
            </div>
            <div className="flex-shrink-0" id="uploadZone">
                <UploadZone />
            </div>
        </div>
    );
}

export default FileSystem;
