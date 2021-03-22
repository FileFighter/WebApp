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

    Axios.get(hostname + filesystemPath + "/contents", config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

type ApiActionFnFsEntity = (a: FsEntity) => Promise<any>;
type ApiActionFnFile = (a: File) => Promise<any>;

export function handleMultipleApiActions(
  items: (FsEntity | File)[],
  action: ApiActionFnFile | ApiActionFnFsEntity,
  type: ApiActionType,
  apiAction?: ApiAction
) {
  let currentIndex;
  if (!apiAction) {
    currentIndex = 0;
    apiAction = {
      key: Date.now() + type,
      type: type,
      status: ApiActionStatus.ONGOING,
      progress: 0,
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
    store.dispatch(
      nextFsEntity({
        key: apiAction.key,
        currentFsEntity: items[apiAction.progress + 1]
      })
    );
    currentIndex = apiAction.progress + 1;
  }

  action(items[currentIndex])
    .then((response) => {
      handleMultipleApiActions(items, action, type);
    })
    .catch((error) => {
      store.dispatch(
        changeStatus({
          key: apiAction?.key ?? "ts sucks",
          status: ApiActionStatus.ERROR
        })
      );
    });
}
