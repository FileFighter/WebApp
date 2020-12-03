import React ,{ ReactElement} from "react";
import {Breadcrumb} from "react-bootstrap";
import { Link } from "react-router-dom";
import {filesBaseUrl} from "./Filesystem";


type Props={
    path:string,
    setPath:Function
}

export function FilesBreadcrumb(props:Props):ReactElement{


    return (<Breadcrumb>
        <Link className={'breadcrumb-item active'} to={filesBaseUrl+'/'} onClick={() => props.setPath("/")}>root </Link>
        {props.path.split('/').map((folder:string,i:number)=>{return( <Link className={'breadcrumb-item active'} to={filesBaseUrl+'/'+folder}>{folder} </Link>)})}
    </Breadcrumb>)


}
