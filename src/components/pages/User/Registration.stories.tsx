import React from "react"
import { storiesOf } from "@storybook/react"
import Registration from "./Registration"
import { BrowserRouter } from "react-router-dom"
import "../../../style/custom.scss"

storiesOf("Registration", module).add("default", () => (
    <BrowserRouter>
        <Registration />
    </BrowserRouter>
))
