import React from "react"
import { storiesOf } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"
import "../../../style/custom.scss"
import Health from "./Health"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { hostname } from "../../../background/api/api"
import healthApiMock from "./__tests__/healthApiMock.json"

const mock = new MockAdapter(axios)

// 2.1 the api request to be intercepted has to match exactly
const API_REQUEST = hostname + "/health"

storiesOf("Health", module).add("default", () => {
    mock.onGet(API_REQUEST).reply(200, healthApiMock)
    return (
        <BrowserRouter>
            <Health />
        </BrowserRouter>
    )
})
