import { FsEntity } from "./filesystemTypes";
import { filesystemPath, hostname } from "./api";
import Axios from "axios";

export const getFolderContents = (path: string) =>
  new Promise<FsEntity[]>((resolve, reject) => {
    let config = {
      headers: {
        "X-FF-PATH": path
      }
    };

    Axios.get(hostname + filesystemPath + "/contents", config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
