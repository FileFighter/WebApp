import React, { ReactElement } from "react";
import FileList from "./FileList";
import SelectedFsEntities from "./SelectedFsEntities";
import { Container } from "react-bootstrap";
import ToolbarActions from "./ToolbarActions";
import { ApiActionsInfo } from "./ApiActionsInfo";
import UploadZone from "./UploadZone";

export const filesBaseUrl = "/file";

type Props = {};

function FileSystem(props: Props): ReactElement {
  return (
    <>
      <Container fluid className={"py-1 border d-flex justify-content-between"}>
        <SelectedFsEntities />
        <ToolbarActions />
      </Container>
      <FileList />
      <UploadZone />
      <ApiActionsInfo />
    </>
  );
}

export default FileSystem;
