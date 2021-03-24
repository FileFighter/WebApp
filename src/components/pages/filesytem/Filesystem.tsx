import React, { ReactElement } from "react";
import FileList from "./FileList";
import SelectedFsEntities from "./SelectedFsEntities";
import { Button, Container } from "react-bootstrap";
import ToolbarActions from "./ToolbarActions";
import { ApiActionsInfo } from "./ApiActionsInfo";
import UploadZone from "./UploadZone";
import { downloadFiles } from "../../../background/api/filesystem";

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
      <Button onClick={downloadFiles}>test</Button>
    </>
  );
}

export default FileSystem;
