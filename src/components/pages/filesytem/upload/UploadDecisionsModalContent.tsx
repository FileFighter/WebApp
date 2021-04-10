import React, { ReactElement, useState } from "react";
import { Button, Form, ListGroup, Modal, Table } from "react-bootstrap";
import UploadDecisionsTableRow from "./UploadDecisionsTableRow";
import {
  EditablePreflightEntityOrFile,
  PeflightEntiesActionTypes,
  PREFLIGHT_TOGGLE_ALL
} from "./preflightTypes";

interface Props {
  handleClose: () => void;
  preflightResult: EditablePreflightEntityOrFile[];
  setPreflightResultDispatch: (a: PeflightEntiesActionTypes) => void;
}

export const UploadDecisionsModalContent = ({
  handleClose,
  preflightResult,
  setPreflightResultDispatch
}: Props): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const [selectAllFolders, setSelectAllFolders] = useState(false);
  const [selectAllFiles, setSelectAllFiles] = useState(false);

  const updateSelectAll = (isFolder: boolean) => {
    let newValue;
    if (isFolder) {
      setSelectAllFolders(!selectAllFolders);
      newValue = !selectAllFolders;
    } else {
      setSelectAllFiles(!selectAllFiles);
      newValue = !selectAllFiles;
    }
    setPreflightResultDispatch({
      type: PREFLIGHT_TOGGLE_ALL,
      payload: { isFolders: isFolder, newValue: newValue }
    });
  };

  const handleApply = () => {
    console.log(preflightResult);
  };

  const foldersToMerge = preflightResult.filter(
    (f: EditablePreflightEntityOrFile) => !f.isFile && f.nameAlreadyInUse
  );
  const entitiesWithInvalidName = preflightResult.filter(
    (f: EditablePreflightEntityOrFile) => !f.nameIsValid
  );
  const filesToOverwrite = preflightResult.filter(
    (f: EditablePreflightEntityOrFile) => f.isFile && f.nameAlreadyInUse
  );
  const insufficientPermission = preflightResult.filter(
    (f: EditablePreflightEntityOrFile) => !f.permissionIsSufficient
  );

  const smallFileList = (files: EditablePreflightEntityOrFile[]) => {
    return (
      <ListGroup variant="flush">
        {files.map((f: EditablePreflightEntityOrFile) => (
          <ListGroup.Item variant="dark">{f.path} </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const changeNamesOrOverwriteTable = (
    files: EditablePreflightEntityOrFile[],
    isFolders: boolean
  ) => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>relative Path</th>
            <th>New Name</th>
            <th>
              {isFolders ? "Merge" : "Overwrite"}
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  checked={isFolders ? selectAllFolders : selectAllFiles}
                  onChange={() => updateSelectAll(isFolders)}
                />
              </Form.Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((f: EditablePreflightEntityOrFile) => {
            return (
              <UploadDecisionsTableRow
                setPreflightResultDispatch={setPreflightResultDispatch}
                preflightEntity={f}
              />
            );
          })}
        </tbody>
      </Table>
    );
  };

  if (currentPage === 0)
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Uploading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!foldersToMerge.length && (
            <p>
              Folders that would be merged:
              {smallFileList(foldersToMerge)}
            </p>
          )}
          {!!filesToOverwrite.length && (
            <p>
              Files that would be overwritten:
              {smallFileList(filesToOverwrite)}
            </p>
          )}
          {!!insufficientPermission.length && (
            <p>
              Files of Folders that need to be renamed because you are not
              allowed to overwrite them
              {smallFileList(insufficientPermission)}
            </p>
          )}
          {!!entitiesWithInvalidName.length && (
            <p>
              Files of Folders that need to be renamed because their name is not
              valid
              {smallFileList(entitiesWithInvalidName)}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={nextPage}>
            Decide for each one
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            disabled={
              !!insufficientPermission.length ||
              !!entitiesWithInvalidName.length
            }
          >
            Merge and overwrite
          </Button>
        </Modal.Footer>
      </>
    );
  else
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Merge Folders and overwrite files?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!foldersToMerge.length && (
            <p>
              Folders that would be merged:
              {changeNamesOrOverwriteTable(foldersToMerge, true)}
            </p>
          )}
          {!!filesToOverwrite.length && (
            <p>
              Files that would be overwritten:
              {changeNamesOrOverwriteTable(filesToOverwrite, false)}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Upload with new Names
          </Button>
        </Modal.Footer>
      </>
    );
};
