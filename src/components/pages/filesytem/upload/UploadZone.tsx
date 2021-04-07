import React, {
  ReactElement,
  Reducer,
  useCallback,
  useReducer,
  useState
} from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { RootState } from "../../../../background/redux/store";
import { Modal } from "react-bootstrap";
import {
  uploadFiles,
  uploadPreflight
} from "../../../../background/api/filesystem";
import {
  EditablePreflightEntityOrFile,
  FsEntity,
  PreflightEntity
} from "../../../../background/api/filesystemTypes";
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent";

export const UploadZone = (): ReactElement => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const handleClose = () => setShowUploadDialog(false);
  const handleShow = () => setShowUploadDialog(true);

  // const [preflightResult, ] = useReducer<
  //   Reducer<EditablePreflightEntityOrFile[], EditablePreflightEntityOrFile[]>
  //>(editablePreflightEntityOrFileReducer, []); // reducer fn is at bottom of file

  const currentFsItemId = useSelector(
    (state: RootState) => state.filesystem.currentFsItemId
  );
  const currentFsContent = useSelector(
    (state: RootState) => state.filesystem.folderContents
  );

  const onDrop = useCallback(
    (acceptedFiles: EditablePreflightEntityOrFile[]) => {
      //check if preflight is needed
      let preflightNeeded = acceptedFiles.some(
        (file: EditablePreflightEntityOrFile) => {
          return (
            file.path.includes("/") ||
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
            (e: PreflightEntity) =>
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
            setPreflightResultDispatch([
              ...combined,
              ...(response.filter(
                (f) => !f.isFile
              ) as EditablePreflightEntityOrFile[])
            ]);

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

  const [preflightResult, setPreflightResultState] = useState<
    EditablePreflightEntityOrFile[]
  >([]);
  const setPreflightResultDispatch = (
    action: EditablePreflightEntityOrFile[]
  ) => {
    let currentState = preflightResult;
    console.log(currentState.filter((e) => !e.isFile));
    if (action.length === 1) {
      if (!action[0].isFile && action[0].newPath) {
        //change the path in all subfoders / subfiles

        let elementToReplace: EditablePreflightEntityOrFile;
        let restOfElements: EditablePreflightEntityOrFile[] = [];

        currentState.forEach((e) => {
          if (e.path === action[0].path) {
            elementToReplace = e;
          } else restOfElements.push(e);
        });

        // @ts-ignore
        let oldPath = elementToReplace.prevNewPath ?? "ts sucks";

        let modifiedEntities = restOfElements.map((e) => {
          let currentPath = e.newPath ?? e.path;
          let index = currentPath.indexOf(oldPath);

          if (index === 0) {
            e.newPath = action[0].newPath + currentPath.substr(oldPath?.length);
            e.prevNewPath =
              action[0].newPath + currentPath.substr(oldPath?.length);
          }
          return e;
        });
        action[0].prevNewPath = action[0].newPath;
        console.log([...modifiedEntities, ...action].filter((e) => !e.isFile));
        setPreflightResultState([...modifiedEntities, ...action]);
      } else {
        setPreflightResultState([
          ...currentState.filter((e) => e.path !== action[0].path),
          ...action
        ]); // do sorting here?
      }
    } else setPreflightResultState(action);
  };

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
        size="lg"
        show={showUploadDialog}
        onHide={handleClose}
        contentClassName={"bg-body"}
      >
        <UploadDecisionsModalContent
          handleClose={handleClose}
          preflightResult={preflightResult}
          setPreflightResultDispatch={setPreflightResultDispatch}
        />
      </Modal>
    </>
  );
};

export default UploadZone;
