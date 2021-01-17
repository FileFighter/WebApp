import {SystemState} from "../../../background/redux/actions/sytemState";
import {connect, ConnectedProps} from "react-redux";
import React, {ReactElement} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FsEntity} from "../../../background/api/filesystemTypes";

const mapState = (state: SystemState) => ({
    selectedFsEnties: state.filesystem.selectedFsEnties
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}


function SelectedFsEntities(props: Props): ReactElement {


    if (props.selectedFsEnties.length>0) return (
        <>
            <OverlayTrigger

                placement={'bottom'}
                overlay={
                    <Tooltip id={`tooltip-bottom`} className={"bg-dark"}>
                        <ul>
                        {props.selectedFsEnties.map((e:FsEntity)=>{return(<li>{e.path}</li>)})}
                        </ul>
                    </Tooltip>
                }
            >
            <span>Selected {props.selectedFsEnties.length} file{props.selectedFsEnties.length > 1 ? "s" : ""}</span>
                </OverlayTrigger>
        </>
    )
    else return(<></>);
}


export default connector(SelectedFsEntities);
