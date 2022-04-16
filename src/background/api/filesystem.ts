import { FsEntity } from "./filesystemTypes"
import { filesystemPath, hostname } from "./api"
import Axios, { AxiosError, AxiosResponse } from "axios"
import { constants } from "../constants"

import store from "../redux/store"
import {
    ApiAction,
    ApiActionStatus,
    ApiActionType,
} from "../redux/actions/apiActionsTypes"
import {
    addApiAction,
    changeStatus,
    nextFsEntity,
} from "../redux/actions/apiActions"
import {
    addToContents,
    removeFromContents,
    removeFromSelected,
} from "../redux/actions/filesystem"
import {
    EditableFileWithPreflightInfo,
    PreflightEntity,
} from "../../components/pages/filesytem/upload/preflightTypes"
import { isFsEntityInFolder } from "../methods/filesystem"

const fhHostname = constants.url.FH_URL

/**
 * It takes a path, and returns a promise that resolves to an array of FsEntity objects
 * @param {string} path The path to the folder you want to get the contents of.
 * @returns A promise that resolves to an AxiosResponse<FsEntity[]>
 */
export const getFolderContents = (path: string) => {
    console.log("[Get folder content", path)
    return new Promise<AxiosResponse<FsEntity[]>>((resolve, reject) => {
        let config = {
            headers: {
                "X-FF-PATH": decodeURI(path),
            },
        }
        Axios.get<FsEntity[]>(hostname + filesystemPath + "contents", config)
            .then((response: AxiosResponse<FsEntity[]>) => resolve(response))
            .catch((error) => reject(error))
    })
}

/**
 * It takes a list of files and a parent folder ID and sends a preflight upload request to the backend
 * @param {File[] | EditableFileWithPreflightInfo[]} files
 * @param {string} parentFolderID The ID of the folder you want to upload the files to.
 * @returns An array of PreflightEntity objects
 */
export const uploadPreflight = (
    files: File[] | EditableFileWithPreflightInfo[],
    parentFolderID: string
): Promise<PreflightEntity[]> => {
    const postData = files.map((f: File | EditableFileWithPreflightInfo) => ({
        // @ts-ignore
        name: f.newName ?? f.name,
        // @ts-ignore
        path: f.newPath ?? f.path,
        // @ts-ignore
        mimeType: f.type,
        size: f.size,
    }))
    return new Promise<PreflightEntity[]>((resolve, reject) => {
        Axios.post<PreflightEntity[]>(
            hostname + filesystemPath + parentFolderID + "/upload/preflight",
            postData
        )
            .then((response: AxiosResponse<PreflightEntity[]>) => {
                resolve(response.data)
            })
            .catch((error: Error) => reject(error))
    })
}

/**
 * It uploads files to the server
 * @param {File[] | EditableFileWithPreflightInfo[]} files
 * @param {string} parentFolderID The ID of the folder to upload the files to.
 */
export const uploadFiles = (
    files: File[] | EditableFileWithPreflightInfo[],
    parentFolderID: string
) => {
    console.log(
        "[API filesystem] uploading files to folderID",
        parentFolderID,
        files
    )
    const apiCall = (file: File | EditableFileWithPreflightInfo) => {
        return new Promise((resolve, reject) => {
            let formData = new FormData()
            formData.append("file", file)
            Axios.post<[FsEntity]>(
                fhHostname + "/upload/" + parentFolderID,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        // @ts-ignore
                        "X-FF-NAME": file.newName ?? file.name,
                        // @ts-ignore
                        "X-FF-PATH": file.newPath ?? file.path,
                        "X-FF-SIZE": file.size,
                    },
                    onUploadProgress(progress) {
                        console.log("upload progress:", progress)
                    },
                }
            )
                .then((response: AxiosResponse<[FsEntity]>) => {
                    const currentPath = store.getState().filesystem.currentPath

                    const fsEntityToShow = response.data.find(
                        (fsEntity: FsEntity) =>
                            isFsEntityInFolder(fsEntity, currentPath)
                    )

                    if (fsEntityToShow) {
                        store.dispatch(addToContents(fsEntityToShow))
                    }
                    resolve(response)
                })
                .catch((error) => reject(error))
        })
    }
    handleMultipleApiActions(files, apiCall, ApiActionType.UPLOAD)
}

/**
 * It takes an array of files and folders, and then it calls the API to delete them
 * @param {FsEntity[]} files The files to be deleted
 */
export const deleteFsEntities = (files: FsEntity[]) => {
    const apiCall = (fsEntity: FsEntity) => {
        return new Promise((resolve, reject) => {
            Axios.delete<FsEntity[]>(
                fhHostname + "/delete/" + fsEntity.fileSystemId
            )
                .then((response: AxiosResponse<FsEntity[]>) => {
                    response.data.forEach((e) => {
                        store.dispatch(removeFromContents(e))
                        store.dispatch(removeFromSelected(e))
                    })
                    resolve(response)
                })
                .catch((error) => reject(error))
        })
    }
    handleMultipleApiActions(files, apiCall, ApiActionType.DELETE)
}

/**
 * This function creates a new folder with the given name in the given parent folder.
 *
 * @param {string} folderName - The name of the folder to be created
 * @param {string} parentFolderID - The ID of the folder you want to create the new folder in.
 * @returns A promise that resolves to an AxiosResponse<FsEntity>
 */
export const createNewFolder = (
    folderName: string,
    parentFolderID: string
): Promise<AxiosResponse<FsEntity>> => {
    const body = { name: folderName }

    return new Promise((resolve, reject) => {
        Axios.post<FsEntity>(
            hostname + filesystemPath + parentFolderID + "/folder/create",
            body
        )
            .then((response: AxiosResponse<FsEntity>) => resolve(response))
            .catch((error: AxiosError) => reject(error))
    })
}

/**
 * It returns a promise that resolves to an AxiosResponse<FsEntity[]> of files matching the request
 * @param {string} searchString - The string to search for.
 * @returns A promise that resolves to an AxiosResponse<FsEntity[]>
 */
export const searchFsEntities = (
    searchString: string
): Promise<AxiosResponse<FsEntity[]>> => {
    const config = { params: { name: searchString } }

    return new Promise((resolve, reject) => {
        Axios.get<FsEntity[]>(hostname + filesystemPath + "search", config)
            .then((response: AxiosResponse<FsEntity[]>) => resolve(response))
            .catch((error: AxiosError) => reject(error))
    })
}

function handleMultipleApiActions<Type extends File | FsEntity>(
    items: Type[],
    action: (a: Type) => Promise<any>,
    type: ApiActionType,
    apiAction?: ApiAction
) {
    let currentIndex
    if (!apiAction) {
        currentIndex = 0
        apiAction = {
            key: Date.now() + type,
            timestamp: Date.now(),
            type: type,
            status: ApiActionStatus.ONGOING,
            progress: currentIndex,
            totalAmount: items.length,
            currentFsEntity: items[0],
        }
        store.dispatch(addApiAction(apiAction))
    } else {
        // get the info from the store
        apiAction = store
            .getState()
            .apiActions.actions.find((a: ApiAction) => a.key === apiAction?.key)

        if (
            !apiAction ||
            apiAction.status === ApiActionStatus.ABORTED ||
            apiAction.status === ApiActionStatus.ERROR
        ) {
            return
        }
        currentIndex = apiAction.progress + 1
        console.log(
            "current amout " + currentIndex + " total: " + apiAction.totalAmount
        )

        if (currentIndex === apiAction.totalAmount) {
            store.dispatch(
                changeStatus({
                    key: apiAction.key,
                    status: ApiActionStatus.FINISHED,
                })
            )
            return
        } else {
            console.log("dispatch nextFsEntity")
            store.dispatch(
                nextFsEntity({
                    key: apiAction.key,
                    currentFsEntity: items[currentIndex],
                })
            )
        }
    }

    action(items[currentIndex])
        .then((response) => {
            console.log(
                "[API filesystem] handleMultipleApiActions next iteration"
            )
            handleMultipleApiActions(items, action, type, apiAction)
        })
        .catch((error) => {
            console.log("errorr", error)
            store.dispatch(
                changeStatus({
                    key: apiAction?.key ?? "ts sucks",
                    status: ApiActionStatus.ERROR,
                    error: error.response?.data.message,
                })
            )
        })
}
