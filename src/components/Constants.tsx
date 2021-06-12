import React, { ReactElement } from "react";
import App from "./App";

import { Provider } from "react-redux";
import store from "../background/redux/store";

function Constants(): ReactElement {
    // userinfos
    // url + host of backend

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Constants;
