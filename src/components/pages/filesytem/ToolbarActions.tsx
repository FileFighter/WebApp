import React, {ReactElement} from "react";
import {Button, Fade} from "react-bootstrap";
import {SystemState} from "../../../background/redux/actions/sytemState";
import {connect, ConnectedProps} from "react-redux";
import {deleteFsEntities} from "../../../background/api/filesystem";
import {constants} from "../../../background/constants";
import {FsEntity} from "../../../background/api/filesystemTypes";

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
            downloadFiles(props.selectedFsEnties)
        } */

    return (
        <span>
      <Fade in={props.selectedFsEntities.length === 1}>
        <Button>Rename</Button>
      </Fade>
      <Fade in={props.selectedFsEntities.length > 0}>
        <span>
          <Button onClick={handleDeleteClicked}>Delete</Button>
        <form method="get" className="d-inline" action={constants.url.FH_URL + "/download?=" + props.selectedFsEntities.map((e: FsEntity) => e.fileSystemId + ",")}>
            <Button type="submit">Download</Button>
        </form>
        </span>
      </Fade>
      <Button>New Folder</Button>
    </span>
    );
}

export default connector(ToolbarActions);
