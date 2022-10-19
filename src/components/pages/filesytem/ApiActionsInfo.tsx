import { ApiAction } from "background/redux/actions/apiActionsTypes"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../background/redux/store"

export const ApiActionsInfo = (): JSX.Element => {
    const ongoingActions = useSelector(
        (state: RootState) => state.apiActions.actions
    )

    return (
        <>
            {ongoingActions
                .sort((a, b) => {
                    return a.timestamp - b.timestamp
                })
                .map((action: ApiAction) => (
                    <div key={action.key}>
                        <span className={"px-2"}>
                            {action.status} {action.type}
                        </span>
                        {action.totalAmount > 1 && (
                            <span className={"px-2"}>
                                {action.progress + 1} / {action.totalAmount}
                            </span>
                        )}
                        {action.currentFsEntity.name}
                    </div>
                ))}
        </>
    )
}
