import {
  EditablePreflightEntityOrFile,
  PreflightEntityChange
} from "../../../../background/api/filesystemTypes";
import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

interface Props {
  preflightEntity: EditablePreflightEntityOrFile;
  setPreflightResultDispatch: (
    a: EditablePreflightEntityOrFile[] | PreflightEntityChange
  ) => void;
}

const UploadDecisionsTableRow = ({
  preflightEntity,
  setPreflightResultDispatch
}: Props) => {
  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let val = event.target.value;

      const change: PreflightEntityChange = {
        path: preflightEntity.path,
        newName: val
      };
      setPreflightResultDispatch(change);
    },
    [preflightEntity.path, setPreflightResultDispatch]
  );
  const onNameInputLeaver = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("onNameInputLeaver");
      let val = event.target.value;

      const change: PreflightEntityChange = {
        path: preflightEntity.path,
        newName: val,
        update: true
      };
      setPreflightResultDispatch(change);
    },
    [preflightEntity.path, setPreflightResultDispatch]
  );
  const onSelectedChange = useCallback(() => {
    const change: PreflightEntityChange = {
      path: preflightEntity.path,
      overwrite: !preflightEntity.overwrite
    };
    setPreflightResultDispatch(change);
  }, [preflightEntity, setPreflightResultDispatch]);

  let requiresNameChange =
    (!preflightEntity.nameIsValid ||
      (!preflightEntity.permissionIsSufficient && preflightEntity.overwrite)) &&
    !preflightEntity.newName;
  return (
    <tr key={preflightEntity.path}>
      <td>
        {preflightEntity.overwrite
          ? preflightEntity.path
          : preflightEntity.newPath ?? preflightEntity.path}
      </td>
      <td>
        <Form.Group>
          <Form.Control
            disabled={preflightEntity.overwrite}
            type="text"
            placeholder="A new valid name"
            value={
              preflightEntity.overwrite
                ? preflightEntity.name
                : preflightEntity.newName ?? preflightEntity.name
            }
            onChange={onNameChange}
            onBlur={onNameInputLeaver}
          />
        </Form.Group>
        {preflightEntity.error && (
          <small className={"text-warning"}>
            Name not valid or already exists
          </small>
        )}
        {requiresNameChange && (
          <small className={"text-warning"}>Name must be changed</small>
        )}
      </td>
      <td>
        <Form.Group>
          <Form.Check
            disabled={
              !preflightEntity.nameIsValid ||
              !preflightEntity.permissionIsSufficient
            }
            type="checkbox"
            checked={preflightEntity.overwrite}
            onChange={onSelectedChange}
          />
        </Form.Group>
      </td>
    </tr>
  );
};

export default UploadDecisionsTableRow;
