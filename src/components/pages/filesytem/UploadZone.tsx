import React, { ReactElement, useCallback } from "react";
import { uploadFiles } from "../../../background/api/filesystem";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { RootState } from "../../../background/redux/store";

export const UploadZone = (): ReactElement => {
  const currentFsItemId = useSelector(
    (state: RootState) => state.filesystem.currentFsItemId
  );
  console.log(currentFsItemId);
  const onDrop = useCallback(
    (acceptedFiles) => {
      uploadFiles(acceptedFiles, currentFsItemId);
    },
    [currentFsItemId]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={"text-center border py-4 mx-3"}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here ...</p>
      ) : (
        <p>Drag 'n' drop files or folders here, or click to select files</p>
      )}
    </div>
  );
};

export default UploadZone;
