import React, { ReactElement } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { constants } from "../../../background/constants";

interface FileItemContextMenuInterface {
    id: number
}

interface DropdownItemTitleInterface {
    icon?: string;
    description: string;
    selectedID: number;
    target?: string;
    disabled?: boolean;
}

const DropdownItem = (props: DropdownItemTitleInterface): ReactElement => {
    const { icon, description, target, disabled = false } = props;
    return (
        <Dropdown.Item href={target} disabled={disabled}>
            <span className="d-flex w-100">
            <span className="flex-grow-0 pr-1 w-25 align-content-center">{icon}</span>
            <span className="flex-grow-1"> {description}</span>
        </span>
        </Dropdown.Item>
    );
};

const DropdownItemDownload = (props: DropdownItemTitleInterface) => {
    const { icon, description, selectedID, disabled = false } = props;
    return (
        <form method="get" className="d-inline"
              action={constants.url.FH_URL + "/download?ids=" + selectedID}>
            <Dropdown.Item as={Button} type="submit" disabled={disabled}>
                <span className="d-flex w-100">
                    <span className="flex-grow-0 pr-1 w-25 align-content-center">{icon}</span>
                    <span className="flex-grow-1"> {description}</span>
                </span>
            </Dropdown.Item>
        </form>
    );
};

function FileItemContextMenu(props: FileItemContextMenuInterface) {
    const { id } = props;
    return (
        <Dropdown id={"fileListItemDropdownButton-" + id} className="fileListItemDropdownButton">
            <Dropdown.Toggle variant="primary" id={"fileListItemDropdownButton-" + id + "-button"} className="no-after">
                &#9679;&#9679;&#9679;
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <DropdownItem icon="&#128393;" description="Rename" selectedID={id} target="#/action-1"
                              disabled={true} />
                <DropdownItemDownload icon="&#128190;" description="Download" selectedID={id} />
                <DropdownItem icon="&#9959;" description="Delete" selectedID={id} target={"#/action-3"}
                              disabled={true} />
                <Dropdown.Divider />
                <DropdownItem icon="&#10551;" description="Share" selectedID={id} target={"#/action-4"}
                              disabled={true} />
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default FileItemContextMenu;
