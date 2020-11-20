import React, {ReactElement} from "react";

export default function PermanentAssets(): ReactElement {
    return (
        <div>
            <audio id={"audio_viking"} preload={"metadata"}>
                <source src="/assets/audio/2017-04-01_-_Viking_Ship_-_David_Fesliyan.mp3"/>
            </audio>
        </div>
    )
}