import React, { ReactElement } from "react"

/**
 * It returns a div with invisible assets like audios.
 * Those are placed in the site's header bar to be accessible from every page.
 * @returns A ReactElement for invisible assets which should be accessible from every (sub) page
 */
export default function PermanentAssets(): ReactElement {
    return (
        <div>
            <audio id={"audio_viking"} preload={"metadata"} loop>
                <source src="/assets/audio/2017-04-01_-_Viking_Ship_-_David_Fesliyan.mp3" />
            </audio>
        </div>
    )
}
