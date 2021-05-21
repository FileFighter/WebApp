import { render } from "@testing-library/react";
import React from "react";
import Login from "./Login";
import {RouterWrapper} from "../../../dev/testUtils/RouterWrapper";

test("renders Login page", () => {
    const breadcrumb = render(
        <RouterWrapper>
            <Login />
        </RouterWrapper>
    );

    expect(breadcrumb).toMatchSnapshot();
});