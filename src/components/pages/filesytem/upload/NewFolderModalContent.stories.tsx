import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../../background/redux/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { NewFolderModalContent } from "./NewFolderModalContent";
import { filesystemPath, hostname } from "../../../../background/api/api";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import folderContentMock from "../__tests__/folderContentMock.json";

storiesOf("Filesystem", module).add("New Folder Modal", () => {
    const API_REQUEST = hostname + filesystemPath + "2/folder/create";

    const mock = new MockAdapter(axios);
    mock.onPost(API_REQUEST).reply(200, folderContentMock[0]);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <NewFolderModalContent
                    handleClose={() => {}}
                    currentFsItemId={"2"}
                />
            </BrowserRouter>
        </Provider>
    );
});
