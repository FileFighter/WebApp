import React, { ReactElement } from "react"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Router from "./Router/Router"
import PermanentAssets from "./basicElements/PermanentAssets"

import Login, { LoginHeader } from "./basicElements/login/Login"
import HeadArea from "./basicElements/topArea/HeadArea"
import BottomArea from "./basicElements/bottomArea/BottomArea"

import { connect, ConnectedProps } from "react-redux"
import {
    addAccessToken,
    addRefreshToken,
    checkedCookies,
} from "../background/redux/actions/tokens"
import { SystemState } from "../background/redux/actions/sytemState"
import { checkForCookie } from "../background/api/auth"
import { FFLoading } from "./basicElements/Loading"
import { CookieStatus } from "../background/redux/actions/tokenTypes"
import Error400 from "./pages/errors/Error400"
import { Container } from "react-bootstrap"

// this takes the redux store and maps everything that is needed to the function props
const mapState = (state: SystemState) => ({
    tokens: {
        refreshToken: state.tokens.refreshToken,
        accessToken: state.tokens.accessToken,
        checkedCookies: state.tokens.checkedCookies,
    },
    user: state.user,
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addRefreshToken,
    addAccessToken,
    checkedCookies,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux

/**
 * **The WebApp's main component.**
 *
 * Contains whole visible WebApp including the Router, subdivision in HeadArea, Page and BottomArea as well as the PermanentAssets.
 * If user is not logged in and wants to access to internal resources, it shows an error page, else it redirects to the login page
 * @param props e.g. Tokens and User, extracted from Redux
 * @return The App component
 */
export function App(props: Props): ReactElement {
    console.log(
        "[App] props.tokens: ",
        props.tokens.refreshToken,
        props.tokens,
        props.user
    )

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
            )
        } else {
            console.log("[APP] showing login")
            return (
                <Container fluid className="h-100 ml-0 mr-0 login-page">
                    <div className="login-container pr-1 pl-1 mr-auto ml-auto">
                        <LoginHeader />
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path={"/error"}
                                    element={<Error400 needsLogin />}
                                />
                                <Route path={"*"} element={<Login />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </Container>
            )
        }
    } else {
        if (props.tokens.checkedCookies === CookieStatus.NOT_STARTED) {
            checkForCookie()
        }

        return <FFLoading />
    }
}

/**
 * Returns component containing the App component connected to Redux.
 */
export default connector(App)
