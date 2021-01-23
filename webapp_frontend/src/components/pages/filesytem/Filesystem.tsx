import React, { ReactElement } from "react";
import FileList from "./FileList";
import SelectedFsEntities from "./SelectedFsEntities";

export const filesBaseUrl = "/file";

type Props = {};

function FileSystem(props: Props): ReactElement {
  return (
    <>
      <SelectedFsEntities />
      <FileList />
    </>
  );
}

export default FileSystem;
