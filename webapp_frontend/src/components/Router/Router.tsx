import React, {ReactElement} from "react";
import {useLocation, Redirect, Route, BrowserRouter, Switch} from "react-router-dom";
import {Health} from "../health/Health";
import {Error404} from "../pages/Error404";

export function Router(props: Object): ReactElement {
    const {} = props;


    return (
        <Switch>
            <Route path={"/health"} component={Health}/>
            <Route exact path={"/"}>
                <Redirect to={"/health"}/>
            </Route>
            <Route path={"*"} component={Error404}/>
        </Switch>
    )
}