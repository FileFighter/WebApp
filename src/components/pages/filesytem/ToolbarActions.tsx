import React, { ReactElement } from "react";
import { Button, Dropdown, Fade } from "react-bootstrap";
import { SystemState } from "../../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";
import { deleteFsEntities } from "../../../background/api/filesystem";
import { constants } from "../../../background/constants";
import { FsEntity } from "../../../background/api/filesystemTypes";

const mapState = (state: SystemState) => ({
    selectedFsEntities: state.filesystem.selectedFsEntities
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function ToolbarActions(props: Props): ReactElement | null {
    function handleDeleteClicked() {
        deleteFsEntities(props.selectedFsEntities);
    }

    /*    function handleDownloadClicked() {
            downloadFiles(props.selectedFsEntities)
        } */

    return (
        <span>
      <Fade in={props.selectedFsEntities.length === 1}>
        <Button disabled={props.selectedFsEntities.length !== 1}>Rename</Button>
      </Fade>
      <Fade in={props.selectedFsEntities.length > 0}>
        <span>
          <Button onClick={handleDeleteClicked} disabled={props.selectedFsEntities.length < 1}>Delete</Button>
            <Button disabled={props.selectedFsEntities.length < 1}  href={constants.url.FH_URL + "/download?ids=" + props.selectedFsEntities.map((e: FsEntity) => e.fileSystemId.toString())} >Download</Button>
        </span>
      </Fade>
      <Button>New Folder</Button>
    </span>
    );
}

export default connector(ToolbarActions);
