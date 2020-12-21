import {FsEntity} from "./filesystemTypes";
import {hostname, filesystemPath} from "./api";
import Axios from "axios";

export const getFolderContents = (path: string) => new Promise<FsEntity[]>((resolve, reject) => {


    let config = {
        headers: {
            "X-FF-PATH": path
        },
    };


    console.log(`[filesytem api] request folder content of ${path}`);

    Axios.get(hostname + filesystemPath + '/contents', config)
        .then(response => resolve(response.data))
        .catch(error => reject(error))


})
