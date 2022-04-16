import React, { ReactElement } from "react"

/**
 * It returns a styled div with the text "Queer Lives Matter"
 * @returns A ReactElement
 */
export function BottomBanner(): ReactElement {
    return (
        <div className="d-flex justify-content-center bg-dark queer-banner p-0">
            Queer Lives Matter
        </div>
    )
}
