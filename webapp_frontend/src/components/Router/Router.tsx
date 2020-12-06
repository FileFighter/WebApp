import React, {ReactElement} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Health from "../pages/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/Login";
import Registration from "../pages/Registration";
import FileList from "../pages/filesytem/FileList";
import {filesBaseUrl} from "../pages/filesytem/Filesystem";

export default function Router(): ReactElement {

    return (
        <Switch>
            <Route exact path={"/"} component={Health}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/start"}>
                <Redirect to={"/"}/>
            </Route>
            <Route path={filesBaseUrl} component={FileList}/>
            <Route path={"/health"}>
                <Redirect to={"/"}/>
            </Route>
            <Route path={"/registration"} component={Registration}/>
            <Route path={"*"} component={Error404}/>
        </Switch>
    )
}