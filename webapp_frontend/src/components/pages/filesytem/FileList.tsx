import React, {ReactElement, useEffect, useState} from "react";
import {getFolderContents} from "../../../background/api/filesystem";
import {Folder, File, BackendFolderContentsData} from "../../../background/api/filesystemTypes";
import {Row} from "react-bootstrap";
import FileListItem from "./FileListItem";
import FileListFolder from "./FileListFolder";
import FileListFile from "./FileListFile";


type Props = {}


export default function FileList(props: Props): ReactElement {
    const [path,SetPath] = useState<string>("/")
    const [files, setFiles] = useState<File[] | null>(null)
    const [folders, setFolders] = useState<Folder[] | null>(null)

    useEffect(() => {
        updateStates()
    }, []);

    function updateStates(): void {
        getFolderContents()
            .then(
                (response:BackendFolderContentsData) => {
                    setFiles(response.files)
                    setFolders(response.folders)
                }
            )

    }

    return (<Row>
        {folders?.map((folder:Folder,i:number)=>{return(<FileListFolder folder={folder}/>)})}
        {files?.map((file:File,i:number)=>{return(<FileListFile file={file}/>)})}
    </Row>)

}
