import React, { ReactElement, useState } from "react";
import { Button, Form, ListGroup, Modal, Table } from "react-bootstrap";
import {
  FileWithPreflightInfo,
  PreflightEntity
} from "../../../../background/api/filesystemTypes";

interface Props {
  handleClose: () => void;
  preflightResult: (FileWithPreflightInfo | PreflightEntity)[];
  setPreflightResultDispatch: (
    a: (FileWithPreflightInfo | PreflightEntity)[]
  ) => void;
}

export const UploadDecisionsModalContent = ({
  handleClose,
  preflightResult,
  setPreflightResultDispatch
}: Props): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => setCurrentPage(currentPage + 1);

  const foldersToMerge = preflightResult.filter(
    (f: FileWithPreflightInfo | PreflightEntity) =>
      !f.isFile && f.nameAlreadyInUse
  );
  const entitiesWithInvalidName = preflightResult.filter(
    (f: FileWithPreflightInfo | PreflightEntity) => !f.nameIsValid
  );
  const filesToOverwrite = preflightResult.filter(
    (f: FileWithPreflightInfo | PreflightEntity) =>
      f.isFile && f.nameAlreadyInUse
  );
  const insufficientPermission = preflightResult.filter(
    (f: FileWithPreflightInfo | PreflightEntity) => !f.permissionIsSufficient
  );

  const smallFileList = (
    files: (FileWithPreflightInfo | PreflightEntity)[]
  ) => {
    return (
      <ListGroup variant="flush">
        {files.map((f: FileWithPreflightInfo | PreflightEntity) => (
          <ListGroup.Item variant="dark">{f.path} </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const changeNamesOrOverwriteTable = (
    files: (FileWithPreflightInfo | PreflightEntity)[]
  ) => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Local Name</th>
            <th>New Name</th>
            <th>Overwrite</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f: FileWithPreflightInfo | PreflightEntity) => (
            <tr>
              <td>{f.path} </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="A new valid name"
                    value={f.newName ?? f.name}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Check type="checkbox" checked={f.overwrite} />
                </Form.Group>
              </td>
            </tr>
          ))}
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
              {changeNamesOrOverwriteTable(foldersToMerge)}
            </p>
          )}
          {!!filesToOverwrite.length && (
            <p>
              Files that would be overwritten:
              {changeNamesOrOverwriteTable(filesToOverwrite)}
            </p>
          )}
          {!!insufficientPermission.length && (
            <p>
              Files of Folders that need to be renamed because you are not
              allowed to overwrite them
              {changeNamesOrOverwriteTable(insufficientPermission)}
            </p>
          )}
          {!!entitiesWithInvalidName.length && (
            <p>
              Files of Folders that need to be renamed because their name is not
              valid
              {changeNamesOrOverwriteTable(entitiesWithInvalidName)}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </>
    );
};
