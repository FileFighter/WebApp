import { TopBanner } from "./TopBanner"
import Header from "./Header"
import React from "react"

/**
 * Get HeadArea of the page containing TopBanner and Header
 * @returns The HeadArea
 * */
export default function HeadArea() {
    return (
        <div className="flex-shrink-0" id="headArea">
            <TopBanner />
            <Header />
        </div>
    )
}
