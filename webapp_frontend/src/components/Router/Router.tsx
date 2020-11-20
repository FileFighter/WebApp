import React, {ReactElement} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Health from "../pages/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/Login";

export default function Router(): ReactElement {

    return (
        <Switch>
            <Route path={"/health"} component={Health}/>
            <Route path={"/login"} component={Login}/>
            <Route exact path={"/"}>
                <Redirect to={"/health"}/>
            </Route>
            <Route path={"*"} component={Error404}/>
        </Switch>
    )
}