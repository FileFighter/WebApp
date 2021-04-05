import React, { ReactElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { RootState } from "../../../background/redux/store";
import { Button, Modal } from "react-bootstrap";
import {
  uploadFiles,
  uploadPreflight
} from "../../../background/api/filesystem";
import {
  FileWithPreflightInfo,
  FsEntity,
  PreflightEnitiy
} from "../../../background/api/filesystemTypes";

export const UploadZone = (): ReactElement => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const handleClose = () => setShowUploadDialog(false);
  const handleShow = () => setShowUploadDialog(true);

  const [preflightResult, setPreflightResult] = useState<
    FileWithPreflightInfo[]
  >([]);

  const currentFsItemId = useSelector(
    (state: RootState) => state.filesystem.currentFsItemId
  );
  const currentFsContent = useSelector(
    (state: RootState) => state.filesystem.folderContents
  );

  const onDrop = useCallback(
    (acceptedFiles: FileWithPreflightInfo[]) => {
      //check if preflight is needed
      let preflightNeeded = acceptedFiles.some(
        (file: FileWithPreflightInfo) => {
          return (
            file.path.includes("/") ||
            file.webkitRelativePath?.includes("/") ||
            currentFsContent.some(
              (fsEntiy: FsEntity) => fsEntiy.name === file.name
            )
          );
        }
      );
      console.log(acceptedFiles, preflightNeeded);

      if (preflightNeeded) {
        uploadPreflight(
          (acceptedFiles as unknown) as File[],
          currentFsItemId
        ).then((response) => {
          const actionsNeeded = response.some(
            (e: PreflightEnitiy) =>
              !e.permissionIsSufficient || e.nameAlreadyInUse || !e.nameIsValid
          );

          if (actionsNeeded) {
            let combined = acceptedFiles.map((file) => {
              let resInfo = response.find((e) => e.path === file.path);
              file.permissionIsSufficient =
                resInfo?.permissionIsSufficient ?? true;
              file.nameAlreadyInUse = resInfo?.nameAlreadyInUse ?? false;
              file.nameIsValid = resInfo?.nameIsValid ?? true;

              return file;
            });
            setPreflightResult(combined);

            handleShow();
          } else {
            uploadFiles((acceptedFiles as unknown) as File[], currentFsItemId);
          }
        });
      } else {
        let file = acceptedFiles[0];
        console.log("file", file);
        let test = { ...file };
        console.log("test", test);

        uploadFiles(([test] as unknown) as File[], currentFsItemId);
      }
    },
    [currentFsItemId, currentFsContent]
  );

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className={"text-center border py-4 mx-3"}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here ...</p>
        ) : (
          <p>Drag 'n' drop files or folders here, or click to select files</p>
        )}
      </div>

      <Modal
        show={showUploadDialog}
        onHide={handleClose}
        contentClassName={"bg-body"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {preflightResult.map((e) => {
            return e.name;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadZone;
