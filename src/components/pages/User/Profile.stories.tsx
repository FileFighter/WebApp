import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import "../../../style/custom.scss";
import Profile from "./Profile";
import { Provider } from "react-redux";
import store from "../../../background/redux/store";
import { hostname } from "../../../background/api/api";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

// const mock = new MockAdapter(axios);
// const API_REQUEST = hostname;// + filesystemPath + "/contents";

storiesOf("Profile", module)
    .add("default", () =>
        <Provider store={store}>
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        </Provider>
    )
