import {
    ADD_API_ACTION,
    AddApiAction,
    ApiAction,
    CHANGE_STATUS,
    ChangeStatus,
    ChangeStatusPayload,
    NEXT_FS_ENTITY,
    NextFsEntity,
    NextFsEntityPayload,
    REPLACE_API_ACTION,
    ReplaceApiAction
} from "./apiActionsTypes";

export const addApiAction = (content: ApiAction): AddApiAction => ({
    type: ADD_API_ACTION,
    payload: content
});

export const replaceApiAction = (content: ApiAction): ReplaceApiAction => ({
    type: REPLACE_API_ACTION,
    payload: content
});

export const changeStatus = (content: ChangeStatusPayload): ChangeStatus => ({
    type: CHANGE_STATUS,
    payload: content
});

export const nextFsEntity = (content: NextFsEntityPayload): NextFsEntity => ({
    type: NEXT_FS_ENTITY,
    payload: content
});
