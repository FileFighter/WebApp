import {
    ADD_API_ACTION,
    ApiAction,
    ApiActionsState,
    ApiActionsTypes,
    CHANGE_STATUS,
    NEXT_FS_ENTITY,
    REPLACE_API_ACTION
} from "../actions/apiActionsTypes";

const initialState: ApiActionsState = {
    actions: []
};

export default function apiActions(
    state = initialState,
    action: ApiActionsTypes
) {
    switch (action.type) {
        case ADD_API_ACTION: {
            return {
                actions: [...state.actions, action.payload]
            };
        }
        case REPLACE_API_ACTION: {
            return {
                actions: [
                    ...state.actions.filter(
                        (a: ApiAction) => a.key !== action.payload.key
                    ),
                    action.payload
                ]
            };
        }
        case CHANGE_STATUS: {
            let actionToChange = state.actions.find(
                (a: ApiAction) => a.key === action.payload.key
            );
            console.log(actionToChange);
            console.log(action.payload);
            if (actionToChange) {
                actionToChange.status = action.payload.status;
                actionToChange.error = action.payload.error;
                return {
                    actions: [
                        ...state.actions.filter(
                            (a: ApiAction) => a.key !== action.payload.key
                        ),
                        actionToChange
                    ]
                };
            } else return state;
        }
        case NEXT_FS_ENTITY: {
            let actionToChange = state.actions.find(
                (a: ApiAction) => a.key === action.payload.key
            );
            console.log("[Reducer ApiAction] new progress", actionToChange);
            if (actionToChange) {
                actionToChange.currentFsEntity = action.payload.currentFsEntity;
                actionToChange.progress = actionToChange.progress + 1;

                return {
                    actions: [
                        ...state.actions.filter(
                            (a: ApiAction) => a.key !== action.payload.key
                        ),
                        actionToChange
                    ]
                };
            } else return state;
        }
        default:
            return state;
    }
}
