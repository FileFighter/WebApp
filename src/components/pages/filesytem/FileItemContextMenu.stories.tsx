import {storiesOf} from "@storybook/react";
import React from "react";
import FileItemContextMenu from "./FileItemContextMenu";


storiesOf("Filesystem Context Menu", module)
    .add("default", () => {
        return (
            <FileItemContextMenu id={0}/>
        );
    });