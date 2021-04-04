import { FsEntity } from "./filesystemTypes";
import { filesystemPath, hostname } from "./api";
import Axios from "axios";

// @ts-ignore
import { saveAs } from "file-saver";
// @ts-ignore

import store from "../redux/store";
import {
  ApiAction,
  ApiActionStatus,
  ApiActionType
} from "../redux/actions/apiActionsTypes";
import {
  addApiAction,
  changeStatus,
  nextFsEntity
} from "../redux/actions/apiActions";
import { addToContents } from "../redux/actions/filesystem";

export const getFolderContents = (path: string) =>
  new Promise<FsEntity[]>((resolve, reject) => {
    let config = {
      headers: {
        "X-FF-PATH": path
      }
    };

    Axios.get(hostname + filesystemPath + "contents", config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export function handleMultipleApiActions<Type extends File | FsEntity>(
  items: Type[],
  action: (a: Type) => Promise<any>,
  type: ApiActionType,
  apiAction?: ApiAction
) {
  let currentIndex;
  if (!apiAction) {
    currentIndex = 0;
    apiAction = {
      key: Date.now() + type,
      timestamp: Date.now(),
      type: type,
      status: ApiActionStatus.ONGOING,
      progress: currentIndex,
      totalAmount: items.length,
      currentFsEntity: items[0]
    };
    store.dispatch(addApiAction(apiAction));
  } else {
    // get the info from the store
    apiAction = store
      .getState()
      .apiActions.actions.find((a: ApiAction) => a.key === apiAction?.key);

    if (
      !apiAction ||
      apiAction.status === ApiActionStatus.ABORTED ||
      apiAction.status === ApiActionStatus.ERROR
    ) {
      return;
    }
    currentIndex = apiAction.progress + 1;
    console.log(
      "current amout " + currentIndex + " total: " + apiAction.totalAmount
    );

    if (currentIndex === apiAction.totalAmount) {
      store.dispatch(
        changeStatus({ key: apiAction.key, status: ApiActionStatus.FINISHED })
      );
      return;
    } else {
      console.log("dispatch nextFsEntity");
      store.dispatch(
        nextFsEntity({
          key: apiAction.key,
          currentFsEntity: items[currentIndex]
        })
      );
    }
  }

  action(items[currentIndex])
    .then((response) => {
      console.log("[API filesystem] handleMultipleApiActions next iteration");
      handleMultipleApiActions(items, action, type, apiAction);
    })
    .catch((error) => {
      console.log("errorr", error);
      store.dispatch(
        changeStatus({
          key: apiAction?.key ?? "ts sucks",
          status: ApiActionStatus.ERROR,
          error: error.response?.data.message
        })
      );
    });
}

export const uploadFiles = (files: File[], parentFolderID: string) => {
  parentFolderID = "1"; //TODO
  console.log(files);
  const apiCall = (file: File) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("file", file);
      Axios.post(
        "http://localhost:5000/data/upload/" + parentFolderID,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress(progress) {
            console.log("upload progress:", progress);
          }
        }
      )
        .then((response) => {
          store.dispatch(addToContents(response.data));
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  };

  handleMultipleApiActions(files, apiCall, ApiActionType.UPLOAD);
};

export const downloadFiles = () => {
  console.log("download");
  /*new JsFileDownloader({
    url: "http://localhost:5000/download",
    headers: [
      { name: "Authorization", value: "Bearer ABC123..." },
      // @ts-ignore
      { name: "X-FF-IDS", value: "bla" }
    ]
  });*/

  Axios.get("http://localhost:5000/download", {
    responseType: "blob", // Important
    headers: {
      "Content-Type": "multipart/form-data",
      "X-FF-IDS": "dfsghzufg"
    },
    onDownloadProgress(progress) {
      //console.log("download progress:", progress);
    }
  }).then((response) => {
    // fileDownload(response.data, "bild.png");
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
  });
};

export const downloadFileFetch = async () => {
  let url = "http://localhost:5000/download";
  let fetchProps = {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-FF-IDS": "dfsghzufg",
      Authorization: "bla"
    }
  };

  try {
    const response = await fetch(url, fetchProps);

    if (!response.ok) {
      // @ts-ignore
      throw new Error(response);
    }

    // Extract filename from header
    // @ts-ignore
    const filename = response.headers
      .get("content-disposition")
      .split(";")
      .find((n) => n.includes("filename="))
      .replace("filename=", "")
      .trim();
    const blob = await response.blob();

    // Download the file
    saveAs(blob, filename);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFsEntities = (files: FsEntity[]) => {
  const apiCall = (fsEntity: FsEntity) => {
    return Axios.delete(
      hostname + filesystemPath + fsEntity.fileSystemId + "/delete"
    );
  };
  handleMultipleApiActions(files, apiCall, ApiActionType.DELETE);
};
