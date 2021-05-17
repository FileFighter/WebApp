import React from "react";
import {Dropdown} from "react-bootstrap";

interface FileItemContextMenuInterface {
    id: string|number
}

interface DropdownItemTitleInterface {
    icon?: string;
    description: string
}

const DropdownItemTitle = (props:DropdownItemTitleInterface) => {
    const {icon, description} = props;
    return(
        <span className="d-flex w-100">
            <span className="flex-grow-0 pr-2 w-75">{icon}</span>
            <span className="flex-grow-1"> {description}</span>
        </span>
    )
}

function FileItemContextMenu(props:FileItemContextMenuInterface) {
    const {id} = props;
    return(
        <Dropdown id={"fileListItemDropdownButton-" + id} className="fileListItemDropdownButton">
            <Dropdown.Toggle variant="primary" id={"fileListItemDropdownButton-" + id + "-button"}>
                &#9679;&#9679;&#9679;
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"><DropdownItemTitle icon={"&#128393;"} description={"Rename"}/></Dropdown.Item>
                <Dropdown.Item href="#/action-2">&#128190; Download</Dropdown.Item>
                <Dropdown.Item href="#/action-3">&#9959; Details</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-4">&#10551; Share</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FileItemContextMenu;