import React, {
    ReactElement,
    Reducer,
    useCallback,
    useReducer,
    useState,
} from "react"
import { useDropzone } from "react-dropzone"
import { useSelector } from "react-redux"
import { RootState } from "../../../../background/redux/store"
import { Modal } from "react-bootstrap"
import {
    uploadFiles,
    uploadPreflight,
} from "../../../../background/api/filesystem"
import { FsEntity } from "../../../../background/api/filesystemTypes"
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent"
import { divideArrayByCondition } from "../../../../background/methods/dataTypes/arrays"
import {
    getPathWithoutName,
    isFileNameValid,
    removeLeadingBackslash,
} from "../../../../background/methods/filesystem"
import {
    EditableEntityError,
    EditableFileWithPreflightInfo,
    EditablePreflightEntityOrFile,
    PeflightEntiesActionTypes,
    PREFLIGHT_ADD_ENTITIES,
    PREFLIGHT_CHANGE_NAME,
    PREFLIGHT_TOGGLE_ALL,
    PREFLIGHT_TOGGLE_OVERWRITE,
    PREFLIGHT_UPDATE_NAME,
    PreflightEntity,
} from "./preflightTypes"
import { preflightResultCombine } from "./preflightResponseParser"

export const UploadZone = (): ReactElement => {
    const [showUploadDialog, setShowUploadDialog] = useState(false)
    const handleClose = () => {
        setPreflightResultDispatch({
            type: PREFLIGHT_ADD_ENTITIES,
            payload: [],
        })
        setShowUploadDialog(false)
    }
    const handleShow = () => setShowUploadDialog(true)

    const currentFsItemId = useSelector(
        (state: RootState) => state.filesystem.currentFsItemId
    )
    const [fsItemIdToUpload, setFsItemIdToUpload] = useState(currentFsItemId)
    const currentFsContent = useSelector(
        (state: RootState) => state.filesystem.folderContents
    )

    const onDrop = useCallback(
        (acceptedFiles: EditableFileWithPreflightInfo[]) => {
            if (!acceptedFiles.length) {
                return // TODO: dispatch a action to show that a empty folder could not be uploaded
            }

            //check if preflight is needed
            let preflightNeeded = acceptedFiles.some(
                (file: EditablePreflightEntityOrFile) => {
                    return (
                        file.path.includes("/") ||
                        !isFileNameValid(file.name) ||
                        currentFsContent.some(
                            (fsEntiy: FsEntity) => fsEntiy.name === file.name
                        )
                    )
                }
            )
            console.log(
                "[Upload Zone, add files]",
                acceptedFiles,
                preflightNeeded
            )

            if (preflightNeeded) {
                setFsItemIdToUpload(currentFsItemId)
                uploadPreflight(acceptedFiles, currentFsItemId).then(
                    (response) => {
                        const actionsNeeded = response.some(
                            (e: PreflightEntity) =>
                                !e.permissionIsSufficient ||
                                e.nameAlreadyInUse ||
                                !e.nameIsValid
                        )
                        if (actionsNeeded) {
                            const combined = preflightResultCombine(
                                acceptedFiles,
                                response
                            )
                            console.log("combined", combined)

                            setPreflightResultDispatch({
                                type: PREFLIGHT_ADD_ENTITIES,
                                payload: [
                                    ...combined,
                                    ...response.filter((f) => !f.isFile),
                                ],
                            })
                            handleShow()
                        } else {
                            uploadFiles(
                                acceptedFiles as unknown as File[],
                                currentFsItemId
                            )
                        }
                    }
                )
            } else {
                uploadFiles(acceptedFiles as unknown as File[], currentFsItemId)
            }
        },
        [currentFsItemId, currentFsContent]
    )

    const [preflightResult, setPreflightResultDispatch] = useReducer<
        Reducer<EditablePreflightEntityOrFile[], PeflightEntiesActionTypes>
    >(preflightResultReducer, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        // @ts-ignore
        onDrop,
    })

    if (currentFsItemId === "-1") {
        return <></>
    }
    return (
        <>
            <div {...getRootProps()} className={"text-center border py-4 mx-3"}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop files or folders here, or click to select
                        files
                    </p>
                )}
            </div>

            <Modal
                size="xl"
                scrollable
                show={showUploadDialog}
                onHide={handleClose}
                contentClassName={"bg-body"}
            >
                <UploadDecisionsModalContent
                    handleClose={handleClose}
                    preflightResult={preflightResult}
                    setPreflightResultDispatch={setPreflightResultDispatch}
                    fsItemIdToUpload={fsItemIdToUpload}
                />
            </Modal>
        </>
    )
}

export const preflightResultReducer: Reducer<
    EditablePreflightEntityOrFile[],
    PeflightEntiesActionTypes
> = (currentState, action) => {
    switch (action.type) {
        case PREFLIGHT_ADD_ENTITIES: {
            return action.payload.sort(sortPreflightResult)
        }
        case PREFLIGHT_TOGGLE_ALL: {
            let [files, folders] = divideArrayByCondition(
                currentState,
                (e) => e.isFile
            )
            let toChange = action.payload.isFolders ? folders : files
            let notToChange = !action.payload.isFolders ? folders : files

            toChange = toChange.map((e: EditablePreflightEntityOrFile) => {
                if (e.nameIsValid && e.permissionIsSufficient) {
                    e.overwrite = action.payload?.newValue ?? false
                }
                return e
            })
            return [...toChange, ...notToChange].sort(sortPreflightResult)
        }
        case PREFLIGHT_TOGGLE_OVERWRITE: {
            let [[elementToReplace], restOfElements] = divideArrayByCondition(
                currentState,
                (e) => e.path === action.payload.path
            )
            elementToReplace.overwrite = action.payload.overwrite

            return [...restOfElements, elementToReplace].sort(
                sortPreflightResult
            )
        }
        case PREFLIGHT_CHANGE_NAME: {
            let [[elementToReplace], restOfElements] = divideArrayByCondition(
                currentState,
                (e) => e.path === action.payload.path
            )
            let oldPath = elementToReplace.newPath ?? elementToReplace.path
            elementToReplace.newPath =
                oldPath.substring(
                    0,
                    oldPath.lastIndexOf(
                        elementToReplace.newName ?? elementToReplace.name
                    )
                ) + action.payload.newName
            elementToReplace.newName = action.payload.newName
            elementToReplace.error = undefined
            return [...restOfElements, elementToReplace].sort(
                sortPreflightResult
            )
        }
        case PREFLIGHT_UPDATE_NAME: {
            let [[elementToReplace], restOfElements] = divideArrayByCondition(
                currentState,
                (e) => e.path === action.payload.path
            )
            let oldPath = elementToReplace.newPath ?? elementToReplace.path
            let newPath =
                oldPath.substring(
                    0,
                    oldPath.lastIndexOf(
                        elementToReplace.newName ?? elementToReplace.name
                    )
                ) + action.payload.newName

            let newPathAlreadyExits = restOfElements.some(
                (e: EditablePreflightEntityOrFile) => {
                    let localPath = e.newPath ?? e.path
                    return localPath === newPath
                }
            )

            let newNameIsNotValid = !isFileNameValid(action.payload.newName)

            if (newPathAlreadyExits || newNameIsNotValid) {
                elementToReplace.error = newPathAlreadyExits
                    ? EditableEntityError.ALREADYEXITS
                    : EditableEntityError.INVALIDNAME
                elementToReplace.newPath =
                    elementToReplace.prefNewPath ?? elementToReplace.path
                elementToReplace.newName =
                    elementToReplace.prefNewName ?? elementToReplace.name
            } else {
                console.log(
                    "PREFLIGHT_UPDATE_NAME",
                    elementToReplace.newPath,
                    elementToReplace.prefNewPath,
                    elementToReplace.path,
                    elementToReplace.newName
                )
                let prevOldPath =
                    elementToReplace.prefNewPath ??
                    removeLeadingBackslash(elementToReplace.path)
                restOfElements = restOfElements.map((e) => {
                    let currentPath =
                        e.newPath ?? removeLeadingBackslash(e.path)
                    let currentName = e.newName ?? e.name
                    let currentPathWithoutName = getPathWithoutName(
                        currentPath,
                        currentName
                    )

                    let index = currentPathWithoutName.indexOf(prevOldPath)

                    let pathNeedsChange = index === 0
                    console.log(
                        "PREFLIGHT_UPDATE_NAME",
                        prevOldPath,
                        currentPathWithoutName,
                        currentName
                    )
                    if (pathNeedsChange) {
                        e.newPath =
                            newPath +
                            removeLeadingBackslash(currentPath).substr(
                                prevOldPath?.length
                            )
                        e.prefNewPath = e.newPath
                    }
                    return e
                })
                elementToReplace.prefNewPath = newPath
                elementToReplace.prefNewName = action.payload.newName
                elementToReplace.newPath = newPath
                elementToReplace.newName = action.payload.newName
                elementToReplace.error = undefined
                console.log("updated")
            }
            return [...restOfElements, elementToReplace].sort(
                sortPreflightResult
            )
        }
    }
}

const sortPreflightResult = (
    a: EditablePreflightEntityOrFile,
    b: EditablePreflightEntityOrFile
) => {
    return a.path.localeCompare(b.path)
}

export default UploadZone
