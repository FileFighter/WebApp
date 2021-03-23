import React, { ReactElement } from "react";
import { Button, Fade } from "react-bootstrap";
import { SystemState } from "../../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";
import { deleteFsEntities } from "../../../background/api/filesystem";

const mapState = (state: SystemState) => ({
  selectedFsEnties: state.filesystem.selectedFsEnties
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function ToolbarActions(props: Props): ReactElement | null {
  function handleDeleteClicked() {
    deleteFsEntities(props.selectedFsEnties);
  }

  return (
    <span>
      <Fade in={props.selectedFsEnties.length === 1}>
        <Button>Rename</Button>
      </Fade>
      <Fade in={props.selectedFsEnties.length > 0}>
        <span>
          <Button onClick={handleDeleteClicked}>Delete</Button>
          <Button>Download</Button>
        </span>
      </Fade>
      <Button>New Folder</Button>
    </span>
  );
}

export default connector(ToolbarActions);
