import {Folder, File, PermissionSet} from "../../../background/api/filesystemTypes";
import React, {ReactElement} from "react";


type Props = {
    file?: File
    folder?: Folder
}


type fileOrFolder={
    createdByUserId:number
    id:number
    lastUpdated:number
    name:string
    permissionSet:PermissionSet
    size:number;
    type:string;
    path?:string;
    isFolder:boolean

}

export default function FileListItem(props: Props): ReactElement {



    // this is really ugly :(
    // @ts-ignore
    let fileOrFolder:fileOrFolder={};
    if (props.file){
        for(let k in props.file) { // @ts-ignore
            fileOrFolder[k]=props.file[k];
        }
        fileOrFolder.isFolder=false;
    }
    else {
        for(let k in props.folder) { // @ts-ignore
            fileOrFolder[k]=props.folder[k];
        }
        fileOrFolder.isFolder=true;
    }


    return (<div> dsad</div>)
}
