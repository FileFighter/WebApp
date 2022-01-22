import React from "react";
import { BrowserRouter } from "react-router-dom";
import store from "../../background/redux/store";
import { Provider } from "react-redux";

export const Wrapper: React.FC = ({ children }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
};
