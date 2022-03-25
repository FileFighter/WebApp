import { storiesOf } from "@storybook/react"
import React from "react"

import { FsEntity } from "../../../../background/api/filesystemTypes"
import FileItemContextMenu from "./FileItemContextMenu"

const item: FsEntity = {
    id: 34,
    path: "/admin/systemnahe/2021-05-19-14-07-30.mp4",
    name: "2021-05-19-14-07-30.mp4",
    size: 2402456.0,
    lastUpdatedBy: { id: 1, username: "Admin", privileges: "ADMIN" },
    lastUpdated: 1621427873,
    mimeType: "application/octet-stream",
}

storiesOf("Filesystem", module).add("FilesystemContextMenu", () => {
    return <FileItemContextMenu fsEntity={item} />
})
