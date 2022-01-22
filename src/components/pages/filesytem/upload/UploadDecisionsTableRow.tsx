import React, {useCallback} from "react"
import {Form} from "react-bootstrap"
import {
    EditablePreflightEntityOrFile,
    PeflightEntiesActionTypes,
    PREFLIGHT_CHANGE_NAME,
    PREFLIGHT_TOGGLE_OVERWRITE,
    PREFLIGHT_UPDATE_NAME,
    PreflightChangeName,
    PreflightToggleOverwrite,
    PreflightUpdateName,
} from "./preflightTypes"

interface Props {
    preflightEntity: EditablePreflightEntityOrFile
    setPreflightResultDispatch: (a: PeflightEntiesActionTypes) => void
}

const UploadDecisionsTableRow = ({
                                     preflightEntity,
                                     setPreflightResultDispatch,
                                 }: Props) => {
    const onNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let val = event.target.value

            const change: PreflightChangeName = {
                type: PREFLIGHT_CHANGE_NAME,
                payload: {
                    path: preflightEntity.path,
                    newName: val,
                },
            }
            setPreflightResultDispatch(change)
        },
        [preflightEntity.path, setPreflightResultDispatch]
    )
    const onNameInputLeaver = useCallback(
        (event) => {
            console.log("onNameInputLeaver");
            let val = event.target.value;

            const change: PreflightUpdateName = {
                type: PREFLIGHT_UPDATE_NAME,
                payload: {
                    path: preflightEntity.path,
                    newName: val,
                },
            }
            setPreflightResultDispatch(change)
        },
        [preflightEntity.path, setPreflightResultDispatch]
    )
    const onSelectedChange = useCallback(() => {
        const change: PreflightToggleOverwrite = {
            type: PREFLIGHT_TOGGLE_OVERWRITE,
            payload: {
                path: preflightEntity.path,
                overwrite: !preflightEntity.overwrite,
            },
        }
        setPreflightResultDispatch(change)
    }, [preflightEntity, setPreflightResultDispatch])

    let requiresNameChange =
        (!preflightEntity.nameIsValid ||
            (!preflightEntity.permissionIsSufficient &&
                preflightEntity.overwrite)) &&
        !preflightEntity.newName
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
                                : preflightEntity.newName ??
                                preflightEntity.name
                        }
                        onChange={onNameChange}
                        onBlur={onNameInputLeaver}
                    />
                </Form.Group>
                {preflightEntity.error && (
                    <small className={"text-warning"}>
                        {preflightEntity.error}
                    </small>
                )}
                {requiresNameChange && (
                    <small className={"text-warning"}>
                        Name must be changed
                    </small>
                )}
            </td>
            <td>
                <Form.Group className="pl-4 mb-3">
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
    )
}

export default UploadDecisionsTableRow
