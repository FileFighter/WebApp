import { SystemState } from "../../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";
import React, { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FsEntity } from "../../../background/api/filesystemTypes";

const mapState = (state: SystemState) => ({
  selectedFsEnties: state.filesystem.selectedFsEnties
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function SelectedFsEntities(props: Props): ReactElement {
  if (props.selectedFsEnties?.length > 0)
    return (
      <>
        <OverlayTrigger
          placement={"bottom"}
          overlay={
            <Tooltip id={`tooltip-bottom`} className={""}>
              <ul className={"list-group"}>
                {props.selectedFsEnties.map((e: FsEntity, i) => {
                  return (
                    <li
                      className={"list-group-item list-group-item-dark"}
                      key={i}
                    >
                      {e.path}
                    </li>
                  );
                })}
              </ul>
            </Tooltip>
          }
        >
          <span className={"pr-2 pt-2"}>
            Selected {props.selectedFsEnties.length} file
            {props.selectedFsEnties.length > 1 ? "s" : ""}
          </span>
        </OverlayTrigger>
      </>
    );
  else return <span></span>;
}

export default connector(SelectedFsEntities);
