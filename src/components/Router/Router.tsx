import React, {ReactElement} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Health from "../pages/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/Login";
import Registration from "../pages/User/Registration";
import FileSystem, {filesBaseUrl} from "../pages/filesytem/Filesystem";
import Profile from "../pages/User/Profile";

export default function Router(): ReactElement {

    return (
        <Switch>
            <Route exact path={"/"} component={Health}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/start"}>
                <Redirect to={"/"}/>
            </Route>
            <Route path={filesBaseUrl} component={FileSystem}/>
            <Route path={"/health"}>
                <Redirect to={"/"}/>
            </Route>
            <Route path={"/registration"} component={Registration}/>
            {<Route path={"/profile"} component={Profile}/>}
            <Route path={"*"} component={Error404}/>
        </Switch>
    )
}
