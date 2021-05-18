import React from "react";
import {Dropdown} from "react-bootstrap";

interface FileItemContextMenuInterface {
    id: string|number
}

interface DropdownItemTitleInterface {
    icon?: string;
    description: string;
    target: string;
    disabled?:boolean;
}

const DropdownItem = (props:DropdownItemTitleInterface) => {
    const {icon, description, target, disabled=false} = props;
    return(
        <Dropdown.Item href={target} disabled={disabled}>
            <span className="d-flex w-100">
            <span className="flex-grow-0 pr-1 w-25 align-content-center">{icon}</span>
            <span className="flex-grow-1"> {description}</span>
        </span>
        </Dropdown.Item>
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
                <DropdownItem icon="&#128393;" description="Rename" target="#/action-1" disabled={true}/>
                <DropdownItem icon="&#128190;" description="Download" target={"#/action-2"}/>
                <DropdownItem icon="&#9959;" description="Delete" target={"#/action-3"} disabled={true}/>
                <Dropdown.Divider />
                <DropdownItem icon="&#10551;" description="Share" target={"#/action-4"} disabled={true}/>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FileItemContextMenu;