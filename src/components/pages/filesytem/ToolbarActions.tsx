import React, { ReactElement } from "react"
import { Button, Fade } from "react-bootstrap"
import { SystemState } from "../../../background/redux/actions/sytemState"
import { connect, ConnectedProps } from "react-redux"
import { deleteFsEntities } from "../../../background/api/filesystem"
import { constants } from "../../../background/constants"
import { FsEntity } from "../../../background/api/filesystemTypes"
import { NewFolder } from "./upload/NewFolder"
import { Search } from "./search/Search"

const mapState = (state: SystemState) => ({
    selectedFsEntities: state.filesystem.selectedFsEntities,
    currentPath: state.filesystem.currentPath,
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

function ToolbarActions(props: Props): ReactElement | null {
    function handleDeleteClicked() {
        deleteFsEntities(props.selectedFsEntities)
    }

    return (
        <span>
            {/*
            <Fade in={props.selectedFsEntities.length === 1}>
                    <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={props.selectedFsEntities.length !== 1}
                    >
                        Rename
                    </Button>
            </Fade> */}
            <Fade in={props.selectedFsEntities.length > 0}>
                <span>
                    <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={handleDeleteClicked}
                        disabled={props.selectedFsEntities.length < 1}
                        className="mx-1"
                    >
                        Delete
                    </Button>
                    <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={props.selectedFsEntities.length < 1}
                        className="mx-1"
                        href={
                            constants.url.FH_URL +
                            "/download" +
                            props.currentPath +
                            "?children=" +
                            props.selectedFsEntities.map((e: FsEntity) =>
                                e.name.toString()
                            )
                        }
                    >
                        Download
                    </Button>
                </span>
            </Fade>
            <NewFolder />
            <Search />
        </span>
    )
}

export default connector(ToolbarActions)
