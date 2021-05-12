import React, { ReactElement } from "react";
import { Button, Fade } from "react-bootstrap";
import { SystemState } from "../../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: SystemState) => ({
  selectedFsEntiesCount: state.filesystem.selectedFsEntities.length
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function ToolbarActions(props: Props): ReactElement | null {
  return (
    <span>
      <Fade in={props.selectedFsEntiesCount === 1}>
        <Button>Rename</Button>
      </Fade>
      <Fade in={props.selectedFsEntiesCount > 0}>
        <span>
          <Button>Delete</Button>
          <Button>Download</Button>
        </span>
      </Fade>
      <Button>New Folder</Button>
    </span>
  );
}

export default connector(ToolbarActions);
