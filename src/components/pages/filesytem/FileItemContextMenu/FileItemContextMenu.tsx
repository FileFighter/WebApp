import React, { ReactElement, useCallback } from "react"
import { Dropdown } from "react-bootstrap"
import { constants } from "../../../../background/constants"
import { FsEntity } from "../../../../background/api/filesystemTypes"
import { deleteFsEntities } from "../../../../background/api/filesystem"
import { DropdownItemTitleInterface } from "./DropdownItemTitleInterface"
import { DropdownItemRename } from "./DropdownItemRename"

interface FileItemContextMenuInterface {
    fsEntity: FsEntity
}

const DropdownItem = (props: DropdownItemTitleInterface): ReactElement => {
    const {
        icon,
        description,
        target,
        disabled = false,
        onclick = () => {},
    } = props
    return (
        <Dropdown.Item href={target} disabled={disabled} onClick={onclick}>
            <span className="d-flex w-100">
                <span className="flex-grow-0 pr-1 w-25 align-content-center">
                    {icon}
                </span>
                <span className="flex-grow-1"> {description}</span>
            </span>
        </Dropdown.Item>
    )
}

const DropdownItemDownload = (props: DropdownItemTitleInterface) => {
    const { icon, description, fsEntity, disabled = false } = props
    return (
        <Dropdown.Item
            disabled={disabled}
            href={constants.url.FH_URL + "/download?ids=" + fsEntity.id}
            download
        >
            <span className="d-flex w-100">
                <span className="flex-grow-0 pr-1 w-25 align-content-center">
                    {icon}
                </span>
                <span className="flex-grow-1"> {description}</span>
            </span>
        </Dropdown.Item>
    )
}

function FileItemContextMenu(props: FileItemContextMenuInterface) {
    const deleteAction = useCallback(
        () => deleteFsEntities([props.fsEntity]),
        [props.fsEntity]
    )
    const fsEntity = props.fsEntity

    return (
        <Dropdown
            id={"fileListItemDropdownButton-" + fsEntity.id}
            className="fileListItemDropdownButton"
        >
            <Dropdown.Toggle
                variant="primary"
                id={"fileListItemDropdownButton-" + fsEntity.id + "-button"}
                className="no-after btn-sm"
            >
                &#9679;&#9679;&#9679;
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <DropdownItem
                    icon="&#128393;"
                    description="Rename"
                    fsEntity={fsEntity}
                    target="#/action-1"
                    disabled={true}
                />
                <DropdownItemDownload
                    icon="&#128190;"
                    description="Download"
                    fsEntity={fsEntity}
                />
                {/* @ts-ignore */}
                <DropdownItem
                    icon="&#9959;"
                    description="Delete"
                    onclick={deleteAction}
                    fsEntity={fsEntity}
                />
                <DropdownItemRename
                    description="Rename"
                    fsEntity={props.fsEntity}
                />
                <Dropdown.Divider />
                <DropdownItem
                    icon="&#10551;"
                    description="Share"
                    fsEntity={fsEntity}
                    target={"#/action-4"}
                    disabled={true}
                />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FileItemContextMenu
