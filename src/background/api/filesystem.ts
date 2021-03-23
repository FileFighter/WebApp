import { FsEntity } from "./filesystemTypes";
import { filesystemPath, hostname } from "./api";
import Axios from "axios";
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
  const apiCall = (file: File) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("file", file);
      Axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-FF-ID": parentFolderID
        }
      })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  handleMultipleApiActions(files, apiCall, ApiActionType.UPLOAD);
};

export const deleteFsEntities = (files: FsEntity[]) => {
  const apiCall = (fsEntity: FsEntity) => {
    return Axios.delete(
      hostname + filesystemPath + fsEntity.fileSystemId + "/delete"
    );
  };
  handleMultipleApiActions(files, apiCall, ApiActionType.DELETE);
};
