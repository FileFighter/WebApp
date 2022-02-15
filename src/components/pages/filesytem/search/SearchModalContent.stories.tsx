import { storiesOf } from "@storybook/react"
import { Provider } from "react-redux"
import store from "../../../../background/redux/store"
import { BrowserRouter } from "react-router-dom"
import React from "react"
import { SearchModalContent } from "./SearchModalContent"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import folderContentMock from "../__tests__/folderContentMock.json"
import { filesystemPath, hostname } from "../../../../background/api/api"

const API_REQUEST = hostname + filesystemPath + "search"

storiesOf("Filesystem", module).add("SearchModal", () => {
    const mock = new MockAdapter(axios)
    mock.onGet(API_REQUEST).reply(200, folderContentMock)

    return (
        <Provider store={store}>
            <BrowserRouter>
                <SearchModalContent handleClose={() => {}} />
            </BrowserRouter>
        </Provider>
    )
})
