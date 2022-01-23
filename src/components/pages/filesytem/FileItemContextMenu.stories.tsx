import { storiesOf } from "@storybook/react"
import React from "react"
import FileItemContextMenu from "./FileItemContextMenu"

const item = {
    fileSystemId: 34,
    path: "/admin/systemnahe/2021-05-19-14-07-30.mp4",
    name: "2021-05-19-14-07-30.mp4",
    size: 2402456.0,
    owner: { userId: 1, username: "Admin", groups: ["ADMIN"] },
    lastUpdatedBy: { userId: 1, username: "Admin", groups: ["ADMIN"] },
    lastUpdated: 1621427873,
    type: "APPLICATION",
    mimeType: "application/octet-stream",
    shared: false,
}

storiesOf("Filesystem", module).add("FilesystemContextMenu", () => {
    return <FileItemContextMenu fsEntity={item} />
})
