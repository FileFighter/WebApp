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
                .map((a) => (
                    <div key={a.key}>
                        <span className={"px-2"}>
                            {a.status} {a.type}
                        </span>
                        {a.totalAmount > 1 && (
                            <span className={"px-2"}>
                                {a.progress + 1} / {a.totalAmount}
                            </span>
                        )}
                        {a.currentFsEntity.name}
                    </div>
                ))}
        </>
    )
}
