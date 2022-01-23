import React from "react"
import { storiesOf } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"
import "../../../style/custom.scss"
import Profile from "./Profile"
import { Provider } from "react-redux"
import store from "../../../background/redux/store"

storiesOf("Profile", module).add("default", () => (
    <Provider store={store}>
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    </Provider>
))
