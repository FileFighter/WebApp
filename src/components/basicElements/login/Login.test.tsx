import { render } from "@testing-library/react";
import React from "react";
import Login from "./Login";
import { Wrapper } from "../../../dev/testUtils/Wrapper";

test("renders Login page", () => {
    const breadcrumb = render(
        <Wrapper>
            <Login />
        </Wrapper>
    );

    expect(breadcrumb).toMatchSnapshot();
});
