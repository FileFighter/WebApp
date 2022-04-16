import React, { ReactElement } from "react"

/**
 * It returns a styled div with the text "Black Lives Matter"
 * @returns FileFighter's top banner
 */
export function TopBanner(): ReactElement {
    return (
        <div className="d-flex justify-content-center bg-dark text-yellow p-0">
            Black Lives Matter
        </div>
    )
}
