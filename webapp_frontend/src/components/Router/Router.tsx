import React, {ReactElement} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Health from "../pages/Health";
import Error404 from "../pages/errors/Error404";
import Login from "../basicElements/Login";
import Registration from "../pages/Registration";

export default function Router(): ReactElement {

    return (
        <Switch>
            <Route path={"/health"} component={Health}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/start"}>
                <Redirect to={"/"}/>
            </Route>
            <Route exact path={"/"}>
                <Redirect to={"/health"}/>
            </Route>
            <Route path={"/registration"} component={Registration} />
            <Route path={"*"} component={Error404}/>
        </Switch>
    )
}