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
    ReplaceApiAction,
} from "./apiActionsTypes"

/**
 * It takes an ApiAction and returns an AddApiAction
 * @param {ApiAction} content this is the type of the payload that will be passed to the reducer.
 */
export const addApiAction = (content: ApiAction): AddApiAction => ({
    type: ADD_API_ACTION,
    payload: content,
})

/**
 * It returns an object with a type property and a payload property
 * @param {ApiAction} content - this is the content of the action that you want to replace.
 */
export const replaceApiAction = (content: ApiAction): ReplaceApiAction => ({
    type: REPLACE_API_ACTION,
    payload: content,
})

/**
 * It takes a ChangeStatusPayload object and returns a ChangeStatus action
 * @param {ChangeStatusPayload} content
 */
export const changeStatus = (content: ChangeStatusPayload): ChangeStatus => ({
    type: CHANGE_STATUS,
    payload: content,
})

/**
 * It returns an object with a type property and a payload property
 * @param {NextFsEntityPayload} content
 */
export const nextFsEntity = (content: NextFsEntityPayload): NextFsEntity => ({
    type: NEXT_FS_ENTITY,
    payload: content,
})
