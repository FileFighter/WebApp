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
  PreflightEntity,
  PreflightEntityChange
} from "../../../../background/api/filesystemTypes";
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent";
import { divideArrayByCondition } from "../../../../background/methods/arrays";

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

  const [preflightResult, setPreflightResultDispatch] = useReducer<
    Reducer<
      EditablePreflightEntityOrFile[],
      PreflightEntityChange | EditablePreflightEntityOrFile[]
    >
  >(preflightResultReducer, []);

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

export const preflightResultReducer: Reducer<
  EditablePreflightEntityOrFile[],
  PreflightEntityChange | EditablePreflightEntityOrFile[]
> = (currentState, action) => {
  console.log(currentState.filter((e) => !e.isFile));
  console.log(action);
  if (action instanceof Array) {
    return action.sort(sortPreflightResult);
  } else {
    let [[elementToReplace], restOfElements] = divideArrayByCondition(
      currentState,
      (e) => e.path === action.path
    );

    //console.log(elementToReplace, restOfElements);
    if (action.newName) {
      //change the path in all subfoders / subfiles

      let oldPath = elementToReplace.newPath ?? elementToReplace.path;

      let newPath =
        oldPath.substring(
          0,
          oldPath.lastIndexOf(elementToReplace.newName ?? elementToReplace.name)
        ) + action.newName;

      if (action.update) {
        let newPathAlreadyExits = restOfElements.some(
          (e: EditablePreflightEntityOrFile) => {
            let localPath = e.newPath ?? e.path;
            return localPath === newPath;
          }
        );

        if (newPathAlreadyExits) {
          console.log("already exist");
          elementToReplace.error = true;
          elementToReplace.newPath =
            elementToReplace.prefNewPath ?? elementToReplace.path;
          elementToReplace.newName =
            elementToReplace.prefNewName ?? elementToReplace.name;
        } else {
          let prevOldPath =
            elementToReplace.prefNewPath ?? elementToReplace.path;
          restOfElements = restOfElements.map((e) => {
            let currentPath = e.newPath ?? e.path;
            let currentName = e.newName ?? e.name;
            let currentPathWithoutName = currentPath.substr(
              0,
              currentPath.lastIndexOf(currentName)
            );
            let index = currentPathWithoutName.indexOf(prevOldPath);

            // console.log(oldPath, index, action.newPath);
            if (index === 0) {
              e.newPath = newPath + currentPath.substr(prevOldPath?.length);
            }
            return e;
          });
          elementToReplace.prefNewPath = newPath;
          elementToReplace.prefNewName = action.newName;
          elementToReplace.newPath = newPath;
          elementToReplace.newName = action.newName;
        }
      } else {
        elementToReplace.newPath = newPath;
        elementToReplace.newName = action.newName;
      }

      return [...restOfElements, elementToReplace].sort(sortPreflightResult);
    } else {
      // @ts-ignore
      elementToReplace.overwrite = action.overwrite;

      return [...restOfElements, elementToReplace].sort(sortPreflightResult); // do sorting here?
    }
  }
};

const sortPreflightResult = (
  a: EditablePreflightEntityOrFile,
  b: EditablePreflightEntityOrFile
) => {
  return a.path.localeCompare(b.path);
};

export default UploadZone;
