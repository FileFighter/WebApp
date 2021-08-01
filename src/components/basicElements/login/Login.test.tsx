import { render } from "@testing-library/react";
import React from "react";
import Login from "./Login";
import { RouterWrapper } from "../../../dev/testUtils/RouterWrapper";
import store from "../../../background/redux/store";
import { Provider } from "react-redux";

test("renders Login page", () => {
    const breadcrumb = render(
        <Provider store={store}>
            <RouterWrapper>
                <Login />
            </RouterWrapper>
        </Provider>
    );

    expect(breadcrumb).toMatchSnapshot();
});
