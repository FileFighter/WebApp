import React from "react"
import { storiesOf } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"
import "../../../style/custom.scss"
import FileSystem from "./Filesystem"
import { Provider } from "react-redux"
import store from "../../../background/redux/store"
import { filesystemPath, hostname } from "../../../background/api/api"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import folderContentMock from "./__tests__/folderContentMock.json"

const API_REQUEST = hostname + filesystemPath + "contents"

storiesOf("Filesystem", module).add("default", () => {
    const mock = new MockAdapter(axios)
    mock.onGet(API_REQUEST).reply(200, folderContentMock, {
        "x-ff-current": "3",
    })

    return (
        <Provider store={store}>
            <BrowserRouter>
                <FileSystem />
            </BrowserRouter>
        </Provider>
    )
})
