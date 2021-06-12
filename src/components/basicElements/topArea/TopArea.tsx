import { TopBanner } from "./TopBanner";
import Header from "./Header";
import React from "react";

export default function HeadArea() {
    return (
        <div className="flex-shrink-0" id="headArea">
            <TopBanner />
            <Header />
        </div>
    );
}
