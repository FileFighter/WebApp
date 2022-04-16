import Footer from "./Footer"
import { BottomBanner } from "./BottomBanner"
import React from "react"

/**
 * It returns a div with that contains a Footer component and a BottomBanner component
 * @returns div with Footer and BottomBanner
 */
export default function BottomArea() {
    return (
        <div id="bottomArea" className="flex-shrink-0">
            <Footer />
            <BottomBanner />
        </div>
    )
}
