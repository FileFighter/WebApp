import { FsEntity } from "./filesystemTypes";
import { filesystemPath, hostname } from "./api";
import Axios from "axios";
import fileDownload from "js-file-download";

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

export const uploadFile = (file: File) => {
  let formData = new FormData();
  formData.append("file", file);
  Axios.post("http://localhost:5002/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-FF-ParentID": "dfsghzufg"
    }
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const downloadFile = () => {
  Axios.get("http://localhost:5002/download", {
    responseType: "blob", // Important
    headers: {
      "Content-Type": "multipart/form-data",
      "X-FF-FileIDs": "dfsghzufg"
    }
  }).then((response) => {
    fileDownload(response.data, "bild.png");
  });
};
