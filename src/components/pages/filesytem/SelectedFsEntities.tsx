import { SystemState } from "../../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";
import React, { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FsEntity } from "../../../background/api/filesystemTypes";
import { clearSelected } from "../../../background/redux/actions/filesystem";

const mapState = (state: SystemState) => ({
    selectedFsEntities: state.filesystem.selectedFsEntities
});

const mapDispatch = {
    clearSelected
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function SelectedFsEntities(props: Props): ReactElement {
    if (props.selectedFsEntities?.length < 1) return <span>{}</span>;

    return (
        <div className={"pt-2"}>
            <OverlayTrigger
                placement={"bottom"}
                overlay={
                    <Tooltip id={`tooltip-bottom`} className={""}>
                        <ul className={"list-group"}>
                            {props.selectedFsEntities.map((e: FsEntity) => {
                                return (
                                    <li
                                        className={
                                            "list-group-item list-group-item-dark"
                                        }
                                        key={e.fileSystemId}
                                    >
                                        {e.path}
                                    </li>
                                );
                            })}
                        </ul>
                    </Tooltip>
                }
            >
                <span className={"pr-2"}>
                    Selected {props.selectedFsEntities.length} file
                    {props.selectedFsEntities.length > 1 ? "s" : ""}
                </span>
            </OverlayTrigger>
            <OverlayTrigger
                placement={"bottom"}
                overlay={
                    <Tooltip
                        id={`tooltip-bottom`}
                        className={"bg-light text-dark m-1"}
                    >
                        Clear the selection
                    </Tooltip>
                }
            >
                <button
                    type="button"
                    aria-label="Close"
                    className={"close mr-2 text-primary"}
                    onClick={props.clearSelected}
                >
                    <span className={"text-shadow-none"} aria-hidden="true">
                        &times;
                    </span>
                </button>
            </OverlayTrigger>
        </div>
    );
}

export default connector(SelectedFsEntities);
