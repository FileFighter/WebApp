import React, { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Health from "../pages/health/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/login/Login";
import Registration from "../pages/User/Registration";
import FileSystem, { filesBaseUrl } from "../pages/filesytem/Filesystem";
import Profile from "../pages/User/Profile";

export default function Router(): ReactElement {
    return (
        <Switch>
            <Route path={"/login"} component={Login} />
            <Route exact path={"/"}>
                <Redirect to={filesBaseUrl}/>
            </Route>
            <Route path={"/start"}>
                <Redirect to={"/"} />
            </Route>
            <Route path={"/health"}  component={Health}/>
            <Route path={filesBaseUrl} component={FileSystem} />
            <Route path={"/registration"} component={Registration} />
            {<Route path={"/profile"} component={Profile} />}
            <Route path={"*"} component={Error404} />
        </Switch>
    );
}
