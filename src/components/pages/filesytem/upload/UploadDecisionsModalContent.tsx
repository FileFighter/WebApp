import React, { ReactElement, useState } from "react"
import { Button, Form, ListGroup, Modal, Row, Table } from "react-bootstrap"
import UploadDecisionsTableRow from "./UploadDecisionsTableRow"
import {
    EditableFileWithPreflightInfo,
    EditablePreflightEntityOrFile,
    PeflightEntiesActionTypes,
    PREFLIGHT_ADD_ENTITIES,
    PREFLIGHT_TOGGLE_ALL,
    PreflightEntity,
} from "./preflightTypes"
import {
    uploadFiles,
    uploadPreflight,
} from "../../../../background/api/filesystem"
import { preflightResultCombine } from "./preflightResponseParser"
import { FFLoading } from "../../../basicElements/Loading"

interface Props {
    handleClose: () => void
    preflightResult: EditablePreflightEntityOrFile[]
    setPreflightResultDispatch: (a: PeflightEntiesActionTypes) => void
    parentPath: string
}

export const UploadDecisionsModalContent = ({
    handleClose,
    preflightResult,
    setPreflightResultDispatch,
    parentPath,
}: Props): ReactElement => {
    const [currentPage, setCurrentPage] = useState(0)
    const [showAllFiles, setShowAllFiles] = useState(false)
    const [showAllFolders, setShowAllFolders] = useState(false)
    const [loading, setLoading] = useState(false)
    const nextPage = () => setCurrentPage(currentPage + 1)
    const [selectAllFolders, setSelectAllFolders] = useState(false)
    const [selectAllFiles, setSelectAllFiles] = useState(false)
    const listLimitForFilesAndFolder = 2

    const updateSelectAll = (isFolder: boolean) => {
        let newValue
        if (isFolder) {
            setSelectAllFolders(!selectAllFolders)
            newValue = !selectAllFolders
        } else {
            setSelectAllFiles(!selectAllFiles)
            newValue = !selectAllFiles
        }
        setPreflightResultDispatch({
            type: PREFLIGHT_TOGGLE_ALL,
            payload: { isFolders: isFolder, newValue: newValue },
        })
    }

    const handleApply = () => {
        setLoading(true)
        uploadPreflight(
            preflightResult.filter(
                (e: EditablePreflightEntityOrFile) => e.isFile
            ) as EditableFileWithPreflightInfo[],
            parentPath
        ).then((response: PreflightEntity[]) => {
            const combined = preflightResultCombine(preflightResult, response)

            const actionsNeeded = combined.some(
                (e: EditablePreflightEntityOrFile) =>
                    !e.permissionIsSufficient ||
                    !e.nameIsValid ||
                    (e.nameAlreadyInUse && !e.overwrite)
            )

            if (actionsNeeded) {
                setPreflightResultDispatch({
                    type: PREFLIGHT_ADD_ENTITIES,
                    payload: combined,
                })
            } else {
                uploadFiles(
                    combined.filter(
                        (f: EditablePreflightEntityOrFile) => f.isFile
                    ) as EditableFileWithPreflightInfo[],
                    parentPath
                )
                handleClose()
                setPreflightResultDispatch({
                    type: PREFLIGHT_ADD_ENTITIES,
                    payload: [],
                })
            }
            setLoading(false)
        })
    }

    const handleOverWriteAll = () => {
        uploadFiles(
            preflightResult.filter(
                (f: EditablePreflightEntityOrFile) => f.isFile
            ) as EditableFileWithPreflightInfo[],
            parentPath
        )
        handleClose()
        setPreflightResultDispatch({
            type: PREFLIGHT_ADD_ENTITIES,
            payload: [],
        })
    }

    const foldersToMerge = preflightResult.filter(
        (f: EditablePreflightEntityOrFile) => !f.isFile && f.nameAlreadyInUse
    )
    const entitiesWithInvalidName = preflightResult.filter(
        (f: EditablePreflightEntityOrFile) => !f.nameIsValid
    )
    const filesToOverwrite = preflightResult.filter(
        (f: EditablePreflightEntityOrFile) => f.isFile && f.nameAlreadyInUse
    )
    const insufficientPermission = preflightResult.filter(
        (f: EditablePreflightEntityOrFile) => !f.permissionIsSufficient
    )

    const smallFileList = (files: EditablePreflightEntityOrFile[]) => {
        return (
            <ListGroup variant="flush">
                {files.map((f: EditablePreflightEntityOrFile) => (
                    <ListGroup.Item key={f.path} className="bg-body border">
                        {f.path}{" "}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }

    const changeNamesOrOverwriteTable = (
        files: EditablePreflightEntityOrFile[],
        isFolders: boolean
    ) => {
        return (
            <Table
                striped
                bordered
                hover
                variant="dark"
                className="uploadDecisionTable"
            >
                <thead>
                    <tr>
                        <th className="fw-40">relative Path</th>
                        <th className="fw-40">New Name</th>
                        <th className="fw-20">
                            {isFolders ? "Merge" : "Overwrite"}
                            <Form.Group className="pl-4 mb-3">
                                <Form.Check
                                    type="checkbox"
                                    checked={
                                        isFolders
                                            ? selectAllFolders
                                            : selectAllFiles
                                    }
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
                                key={f.path}
                                setPreflightResultDispatch={
                                    setPreflightResultDispatch
                                }
                                preflightEntity={f}
                            />
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    if (loading) {
        return <FFLoading />
    }

    if (currentPage === 0)
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Uploading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!!foldersToMerge.length && (
                        <div>
                            Folders that would be merged:
                            {smallFileList(
                                showAllFolders
                                    ? foldersToMerge
                                    : foldersToMerge.slice(
                                          0,
                                          listLimitForFilesAndFolder
                                      )
                            )}
                            {foldersToMerge.length >
                                listLimitForFilesAndFolder &&
                                !showAllFolders && (
                                    <Button
                                        onClick={() => setShowAllFolders(true)}
                                    >
                                        Show all ({foldersToMerge.length}){" "}
                                    </Button>
                                )}
                        </div>
                    )}
                    {!!filesToOverwrite.length && (
                        <div>
                            Files that would be overwritten:
                            {smallFileList(
                                showAllFiles
                                    ? filesToOverwrite
                                    : filesToOverwrite.slice(
                                          0,
                                          listLimitForFilesAndFolder
                                      )
                            )}
                            {filesToOverwrite.length >
                                listLimitForFilesAndFolder &&
                                !showAllFiles && (
                                    <Button
                                        onClick={() => setShowAllFiles(true)}
                                    >
                                        Show all ({filesToOverwrite.length}){" "}
                                    </Button>
                                )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {(!!insufficientPermission.length ||
                        !!entitiesWithInvalidName.length) && (
                        <Row className={"w-100 text-warning"}>
                            Some files or folders need to be renamed, because
                            their name is invalid or you have not the permission
                            to overwrite them{" "}
                        </Row>
                    )}
                    <Row className="w-100 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <div>
                            <Button
                                variant="secondary"
                                className="mx-2"
                                onClick={nextPage}
                            >
                                Decide for each one
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleOverWriteAll}
                                disabled={
                                    !!insufficientPermission.length ||
                                    !!entitiesWithInvalidName.length
                                }
                            >
                                Merge and overwrite
                            </Button>
                        </div>
                    </Row>
                </Modal.Footer>
            </>
        )
    else
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Merge Folders and overwrite files?
                    </Modal.Title>
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
                            {changeNamesOrOverwriteTable(
                                filesToOverwrite,
                                false
                            )}
                        </p>
                    )}
                    {(!!entitiesWithInvalidName.length ||
                        !!insufficientPermission.length) && (
                        <p>
                            Files that must be renamed:
                            {changeNamesOrOverwriteTable(
                                [
                                    ...entitiesWithInvalidName,
                                    ...insufficientPermission,
                                ],
                                false
                            )}
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100">
                        {" "}
                        All other files will be uploaded with their current
                        name.
                    </div>
                    <Row className="w-100 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Abort Upload
                        </Button>
                        <Button variant="primary" onClick={handleApply}>
                            Upload with new Names
                        </Button>
                    </Row>
                </Modal.Footer>
            </>
        )
}
