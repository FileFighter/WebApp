import React from "react";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import store from "../../background/redux/store";
import { Provider } from "react-redux";

export const Wrapper: React.FC = ({ children }) => {
    const history = createMemoryHistory();

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router history={history}> {children} </Router>
            </BrowserRouter>
        </Provider>
    );
};
