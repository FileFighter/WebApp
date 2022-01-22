import { render } from "@testing-library/react"
import React from "react"
import Registration from "./Registration"
import { Wrapper } from "../../../dev/testUtils/Wrapper"

test("renders Login page", () => {
    const breadcrumb = render(
        <Wrapper>
            <Registration />
        </Wrapper>
    )

    expect(breadcrumb).toMatchSnapshot()
})
