import React from "react";
import {Dropdown} from "react-bootstrap";

interface FileItemContextMenuInterface {
    id: string|number
}

function FileItemContextMenu(props:FileItemContextMenuInterface) {
    const {id} = props;
    return(
        <Dropdown id={"fileListItemDropdownButton-" + id} className="fileListItemDropdownButton">
            <Dropdown.Toggle variant="primary" id={"fileListItemDropdownButton-" + id + "-button"}>
                &#9679;&#9679;&#9679;
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FileItemContextMenu;