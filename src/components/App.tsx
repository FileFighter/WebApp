import React, { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Router from "./Router/Router";
import PermanentAssets from "./basicElements/PermanentAssets";

import Login from "./basicElements/login/Login";
import HeadArea from "./basicElements/topArea/TopArea";
import BottomArea from "./basicElements/bottomArea/BottomArea";

import { connect, ConnectedProps } from "react-redux";
import {
    addAccessToken,
    addRefreshToken,
    checkedCookies
} from "../background/redux/actions/tokens";
import { SystemState } from "../background/redux/actions/sytemState";
import { checkForCookie } from "../background/api/auth";
import { FFLoading } from "./basicElements/Loading";
import { CookieStatus } from "../background/redux/actions/tokenTypes";
import Error400 from "./pages/errors/Error400";

// this takes the redux store and maps everything that is needed to the function props
const mapState = (state: SystemState) => ({
    tokens: {
        refreshToken: state.tokens.refreshToken,
        accessToken: state.tokens.accessToken,
        checkedCookies: state.tokens.checkedCookies
    },
    user: state.user
});

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addRefreshToken,
    addAccessToken,
    checkedCookies
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux;

function App(props: Props): ReactElement {
    console.log(
        "[App] props.tokens: ",
        props.tokens.refreshToken,
        props.tokens,
        props.user
    );

    if (props.tokens.checkedCookies === CookieStatus.FINISHED) {
        if (props.tokens.refreshToken && props.tokens.accessToken?.token) {
            return (
                <div className="App h-100 d-flex flex-column">
                    <BrowserRouter>
                        <HeadArea />
                        <main role="main" className="flex-grow-1 overflow-auto">
                            <Router />
                        </main>
                        <BottomArea />
                        <PermanentAssets />
                    </BrowserRouter>
                </div>
            );
        } else {
            console.log("[APP] showing login");
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            path={"/error"}
                            component={() => <Error400 needsLogin />}
                        />
                        <Route path={"*"} component={Login} />
                    </Switch>
                </BrowserRouter>
            );
        }
    } else {
        if (props.tokens.checkedCookies === CookieStatus.NOT_STARTED) {
            checkForCookie();
        }

        return <FFLoading />;
    }
}

export default connector(App);
