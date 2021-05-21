import { TopBanner } from "./TopBanner";
import Header from "./Header";
import React from "react";


export default function HeadArea(){
    return(
        <div className="fixed-top">
            <TopBanner />
            <Header />
        </div>
    )
}