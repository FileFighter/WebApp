import { render } from "@testing-library/react";
import React from "react";
import Registration from "./Registration";
import { RouterWrapper } from "../../../dev/testUtils/RouterWrapper";

test("renders Login page", () => {
    const breadcrumb = render(
        <RouterWrapper>
            <Registration />
        </RouterWrapper>
    );

    expect(breadcrumb).toMatchSnapshot();
});
