import Footer from "./Footer";
import { BottomBanner } from "./BottomBanner";
import React from "react";

export default function BottomArea() {
    return (
        <div id="bottomArea" className="flex-shrink-0">
            <Footer />
            <BottomBanner />
        </div>
    );
}
